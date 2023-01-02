// import CrudTable from "../components/tables/crudTable";

import axios from "axios";
import { FC, useState } from "react";
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "react-query";
import {
  request,
} from "../../../lib/axios";
import { baseURL } from "../../../shared/baseURL";

type CrudePageProps = {
  items?: {};
};
interface PostType {
  id: number;
  title: string;
  author: string;
}
type tType = {
  id: number;
  title: string;
  author: string;
};
interface ICreatePostParams {
  title: string;
  author: string;
}
interface Response {
  data: [tType];
}
interface IContext {
  previousdata: PostType | undefined;
}

const CrudPage: FC = ({ items }: CrudePageProps) => {
  // const [data, setdata] = useState("");
  const queryClient = useQueryClient();

  const { data: posts }: UseQueryResult<Response, Error> = useQuery(
    "getPosts ",
    () => {
      return request({ url: "posts", method: "GET" });
    }
  );
  let { mutate } = useMutation(async (body: ICreatePostParams) => {
    const res = await axios.post(`${baseURL}/posts`, body);
    return res.data;
  },{
    onSuccess : (newData : PostType)=>{
      queryClient.setQueryData("getPosts",(oldData)=>{
        console.log(oldData); 
      })
    }
  });

  return (
    <>
      {posts?.data.map((post) => {
        return (
          <div>
            {post.author} {post.title}
          </div>
        );
      })}
      <button
        onClick={() => {
          mutate({ title: "ayham", author: "aaaa" });
        }}
      >
        Add Bacalist
      </button>
    </>
  );
};
export default CrudPage;
