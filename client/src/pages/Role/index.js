import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserList } from "../../services/userService";
import {Button, Modal, Select, Table} from "antd"
import { DownOutlined } from "@ant-design/icons";
import DeleteRole from "./DeleteRole";
import EditRole from "./EditRole";

function Role(){
   const currentData = useSelector((state) => state.currentDataReducer);
   const [dataAccount, setDataAccount] = useState("");
   const [isModalOpen, setIsModalOpen] = useState(false);
     const arrRole = ["ADMIN", "COMPANY", "QUALITY_UNIT", "CONSUMER"];
   const fetchApi = async () => {
        const token = localStorage.getItem("access_token");
        const response = await getUserList(token);
        console.log("response"+response);
     if (response) {
       setDataAccount(response);
     }
   };

    useEffect(() => {
      fetchApi();
    }, []);
    const handleReload = () => {
      fetchApi();
    };
    const showModal = () => {
      setIsModalOpen(true);
    };

    const handleCancel = () => {
      setIsModalOpen(false);
    };
    const columns = [
      {
        title: "STT",
        key: "index",
        render: (text, record, index) => index + 1,
      },
      {
        title: "Tên tài khoản",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
      },
      {
        title: "Quyền",
        dataIndex: "role",
        key: "role",
      },
      {
        title: "Hành động",
        key: "actions",
        render: (_, record) => {
          // record trả về từng bản ghi
          return (
            <>
              <EditRole
                key={`edit-${record.id}`}
                record={record}
                onReload={handleReload}
              />
              <DeleteRole
                key={`delete-${record.id}`}
                record={record}
                onReload={handleReload}
              />
            </>
          );
        },
      },
    ];

    return (
      <>
        <div style={{ color: "#00a139", fontSize: "22px", fontWeight: "500" }}>
          Phân quyền người dùng
        </div>
        <br />
        <Table rowKey="id" dataSource={dataAccount} columns={columns}></Table>
       
      </>
    );
}
export default Role;