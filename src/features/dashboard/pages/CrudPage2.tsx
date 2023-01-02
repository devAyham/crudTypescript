import React, { FC, useState } from "react";
import { Button, Table, Modal, Input } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CrudTable from "../components/tables/crudTable";
import { request } from "../../../lib/axios";
import {
  QueryKey,
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "react-query";
import { AxiosResponse } from "axios";
import {
  IContext,
  IEditingProduct,
  IProduct,
} from "../../../interfaces/intefaces";
import TT from "../components/tables/tt";

const CrudPage2: FC = () => {
  const queryClient = useQueryClient();

  const addProduct: UseMutationResult<
    AxiosResponse<IProduct, any>,
    Error,
    IEditingProduct
  > = useMutation<
    AxiosResponse<IProduct, any>,
    Error,
    IEditingProduct,
    IContext<IProduct> | undefined
  >(
    (body: IEditingProduct) => {
      return request({ url: "/posts", method: "POST", data: body });
    },
    {
      onSuccess: (newData) => {
        queryClient.setQueryData("getPosts", (oldData: any) => {
          return { ...oldData, data: [...oldData?.data, newData?.data] };
        });
      },
    }
  );
  const updataProduct: UseMutationResult<
    AxiosResponse<IProduct, any>,
    Error,
    IEditingProduct
  > = useMutation<
    AxiosResponse<IProduct, any>,
    Error,
    IEditingProduct,
    IContext<IProduct> | undefined
  >(
    (body: IEditingProduct) => {
      console.log("body", body);
      return request({ url: `/posts/${body.id}`, method: "PATCH", data: body });
    },
    {
      onSuccess: (newData) => {
        console.log("newnew", newData?.data);
        queryClient.setQueryData(
          "getPosts",
          (oldData: IContext<IProduct> | any) => {
            return {
              ...oldData,
              data: oldData.data.map((product: IProduct, i: number) => {
                if (product.id === newData.data.id) {
                  return newData.data;
                }
                return product;
              }),
            };
          }
        );
      },
    }
  );
  const updataAllProduct: UseMutationResult<
    AxiosResponse<IProduct, any>,
    Error,
    IProduct
  > = useMutation<
    AxiosResponse<IProduct, any>,
    Error,
    IProduct,
    IContext<IProduct> | undefined
  >(
    (body: IProduct) => {
      console.log("body", body);
      return request({ url: `/posts/${body.id}`, method: "PUT", data: body });
    },
    {
      onSuccess: (newData) => {
        console.log("newnew", newData?.data);
        queryClient.setQueryData(
          "getPosts",
          (oldData: IContext<IProduct> | any) => {
            return {
              ...oldData,
              data: oldData.data.map((product: IProduct, i: number) => {
                if (product.id === newData.data.id) {
                  return newData.data;
                }
                return product;
              }),
            };
          }
        );
      },
    }
  );
  //
  const deletProduct: UseMutationResult<
    [number, Promise<AxiosResponse>],
    Error,
    number
  > = useMutation<
    [number, Promise<AxiosResponse>],
    Error,
    number,
    IContext<IProduct> | undefined
  >(
    async (id: number) => {
      console.log("id", id);
      // return request({ url: `/posts/${id}`, method: "DELETE" });
      return [id, request({ url: `/posts/${id}`, method: "DELETE" })];
    },
    {
      onSuccess: (newData) => {
        newData[1].then((res) => {
          console.log(newData[0]);
          console.log(res);
          queryClient.setQueryData(
            "getPosts",
            (oldData: IContext<IProduct> | any) => {
              let resl: any = [];
              oldData.data.forEach((product: IProduct) => {
                if (product.id !== newData[0]) {
                  resl.push(product);
                }
              });
              return {
                ...oldData,
                data: resl,
              };
            }
          );
        });
      },
    }
  );
  let posts: UseQueryResult<AxiosResponse, Error> = useQuery("getPosts", () => {
    return request({ url: "posts", method: "GET" });
  });
  if (posts?.isLoading) {
    return <>Loading...</>;
  }
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        {/* <CrudTable
          columns={["id", "title", "author" ,"city"]}
          add={addProduct}
          deletee={deletProduct}
          update={updataProduct}
          updateAll={updataAllProduct}
          dataSource={posts}
        /> */}
        <TT/>
      </div>
    </>
  );
};

export default CrudPage2;
