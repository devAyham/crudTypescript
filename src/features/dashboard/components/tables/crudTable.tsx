import React, { FC, useEffect, useState } from "react";
import { IProduct } from "../../../../interfaces/intefaces";
import { Button, Table, Modal, Input, Popconfirm, message } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
  PlusCircleTwoTone,
} from "@ant-design/icons";
import {
  useMutation,
  UseMutationResult,
  useQueries,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "react-query";
import { request } from "../../../../lib/axios";
import { AxiosResponse, ResponseType } from "axios";
import { ColumnsType } from "antd/es/table";
import { type } from "os";

type CrudTableProps = {
  columns: string[];
  dataSource: UseQueryResult<AxiosResponse, Error>;
  deletee: UseMutationResult<
    [number, Promise<AxiosResponse<any, any>>],
    Error,
    number,
    unknown
  >;
  add: UseMutationResult<AxiosResponse, unknown, any, unknown>;
  update: UseMutationResult<AxiosResponse, unknown, any, unknown>;
  updateAll: UseMutationResult<AxiosResponse, unknown, any, unknown>;
};

const CrudTable: FC<any> = ({
  add,
  deletee,
  update,
  updateAll,
  columns,
  dataSource,
}: CrudTableProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [editingproduct, setEditingproduct] = useState<any | null>(null);
  const [newItem, setnewItem] = useState<any | null>(null);
  const [selectedRows, setSelectedRows] = useState<any>([]);
  const [deleteRows, setdeleteRows] = useState<any>(false);
  const queryClient = useQueryClient();

  let tableColumns: ColumnsType<any> | any = columns.map(
    (column: string, key: number) => {
      return {
        key: key,
        title: column.toUpperCase(),
        dataIndex: column,
        sorter: (record1: any, record2: any) => {
          return record1.id > record2.id;
        },
        filters: [
          { text: "start with a", value: "a" },
          { text: "start with b", value: "b" },
        ],
        onFilter: (value: string, record: any) => {
          return record.title[0] === value;
        },
      };
    }
  );
  let tableActions = {
    key: (columns.length + 1).toString(),
    title: "Actions",
    render: (record: any) => {
      return (
        <>
          <Popconfirm
            title="Delte Product"
            description="Are you sure you want to delete it"
            onConfirm={(e) => confirmDelete(record.id)}
            onCancel={cancel}
            okType={"danger"}
            okText="Yes"
            cancelText="No"
            onOpenChange={() => {}}
            icon={<QuestionCircleOutlined style={{ color: "red" }} />}
          >
            <DeleteOutlined
              onClick={() => {
                console.log(record.id);
              }}
              style={{ color: "red", marginLeft: 12, fontSize: "20px" }}
            />{" "}
          </Popconfirm>
          <EditOutlined
            style={{ fontSize: "20px" }}
            onClick={() => {
              onEditproduct(record);
            }}
          />
        </>
      );
    },
  };
  const confirmDelete = (id: number) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(null);
        deletee.mutate(id);
        message.success("Deleted");
      }, 3000);
    });
  const cancel = () =>
    new Promise((resolve) => {
      resolve(null);
      message.error("Click on No");
    });
  const onAddProduct = async (newItem: any) => {
    add.mutate(newItem);
  };
  // const onDeleteproduct = (id: number) => {
  //   deletee.mutate(id)
  // };
  const onEditproduct = (record: any) => {
    setIsEditing(true);
    setEditingproduct({ ...record });
  };
  const resetEditing = () => {
    setIsEditing(false);
    setEditingproduct(null);
  };

  const rs = useQueries(
    selectedRows?.map((row: IProduct) => {
      return {
        queryKey: ["delete row", row.id],
        queryFn: () => {
          request({ url: `posts/${row.id}`, method: "DELETE" });
        },
        enabled: !!deleteRows,
        onSuccess: () => {
          queryClient.setQueryData("getPosts", (oldData: any) => {
            let resl: any = [];
            oldData.data.forEach((product: IProduct) => {
              if (product.id !== row.id) {
                resl.push(product);
              }
            });
            return {
              ...oldData,
              data: resl,
            };
          });
        },
      };
    })
  );
  useEffect(() => {
    console.log(rs);
    return () => {};
  }, [rs]);
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "nowrap",
          margin : 10
        }}
      >
        <Button
          disabled={selectedRows.length === 0}
          type="primary"
          danger
          icon={<DeleteOutlined />}
          style={{ marginLeft: 10, width: "20%" }}
          onClick={()=>{
            setdeleteRows(true);
          }}
        >
          Delete Rows
        </Button>
        <Button
          style={{ marginLeft: "auto", width: "20%" }}
          type="primary"
          icon={<PlusCircleTwoTone />}
          onClick={() => {
            setIsCreating(true);
          }}
        >
          Add a new Item
        </Button>
      </div>
      <Table
        scroll={{ y: 300 }}
        bordered
        //  loading={true}
        // pagination={{
        //   hideOnSinglePage: true,
        //   pageSize: 10,
        //   total: 100,
        //   // pageSizeOptions: [2,3,4,5]
        // }}
        caption={<></>}
        style={{ marginTop: 10 }}
        // pagination={4}
        columns={[...tableColumns, { ...tableActions }]}
        rowSelection={{
          type: "checkbox",
          onChange: (selectedRowKeys: React.Key[], selecteRows: any) => {
            setSelectedRows(selecteRows);
          },
          getCheckboxProps: (record: any) => ({
            disabled: record.id === 1,
          }),
        }}
        dataSource={dataSource.data?.data}
      ></Table>
      <Modal
        title="Edit product"
        open={isEditing}
        okText="Save"
        onCancel={() => {
          resetEditing();
        }}
        onOk={() => {
          update.mutate(editingproduct);
          resetEditing();
        }}
      >
        <Input
          placeholder={"Enter title"}
          style={{ margin: 5 }}
          value={editingproduct?.title}
          onChange={(e) => {
            setEditingproduct((pre: any) => {
              return { ...pre, title: e.target.value };
            });
          }}
        />
        <Input
          placeholder={"Enter city"}
          style={{ margin: 5 }}
          value={editingproduct?.city}
          onChange={(e) => {
            setEditingproduct((pre: any) => {
              return { ...pre, city: e.target.value };
            });
          }}
        />
        <Input
          placeholder={"Enter author"}
          style={{ margin: 5 }}
          value={editingproduct?.author}
          onChange={(e) => {
            setEditingproduct((pre: any) => {
              return { ...pre, author: e.target.value };
            });
          }}
        />
      </Modal>
      <Modal
        title="Create product"
        open={isCreating}
        okText="Create"
        onOk={() => {
          onAddProduct(newItem);
          setIsCreating(false);
          resetEditing();
        }}
        onCancel={() => {
          setIsCreating(false);
        }}
      >
        <Input
          placeholder={"Enter title"}
          style={{ margin: 5 }}
          value={newItem?.title}
          onChange={(e) => {
            setnewItem((pre: any) => {
              return { ...pre, title: e.target.value };
            });
          }}
        />
        <Input
          placeholder={"Enter city"}
          style={{ margin: 5 }}
          value={newItem?.city}
          onChange={(e) => {
            setnewItem((pre: any) => {
              return { ...pre, city: e.target.value };
            });
          }}
        />
        <Input
          placeholder={"Enter author"}
          style={{ margin: 5 }}
          value={newItem?.author}
          onChange={(e) => {
            setnewItem((pre: any) => {
              return { ...pre, author: e.target.value };
            });
          }}
        />
      </Modal>
    </>
  );
};

export default CrudTable;

// if(powers){
//   let actions = {
//     key : (columns.length + 1).toString(),
//     title : "Actions",
//     render : () =>{
//       return<>
//       {powers?.map((power , id)=>{
//         return <Button key={id} danger={power.color === 'red'} >{power.name}</Button>
//       })}
//       </>
//     }
//   }
//   tableColumns = [...tableColumns, {...actions}]
// }
