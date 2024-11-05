import { Badge, Button, Modal, Table, Tag, Tooltip } from "antd";
import { Link } from "react-router-dom";
import { EyeOutlined, DownOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { getSupplierList } from "../../services/supplierService";
import CreateSupplier from "./CreateSupplier";
import "./SupplierManage.scss"
import DeleteSupplier from "./DeleteSupplier";
import EditSupplier from "./EditSupplier";
function SupplierManage() {
  const [dataSupplier, setDataSupplier] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);  
  const fetchApi = async () => {
    const response = await getSupplierList();
    if (response) {
      setDataSupplier(response);
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
      title: "Tên nhà cung cấp",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Thông tin liên hệ",
      dataIndex: "contactInfo",
      key: "contactInfo",
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_, record) => {
        // record trả về từng bản ghi
        return (
          <>
            <EditSupplier
              key={`edit-${record.id}`}
              record={record}
              onReload={handleReload}
            />
            <DeleteSupplier
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
      <div style={{ color: "#00a139", fontSize:"22px" ,fontWeight:"500"}}>Danh sách nhà cung cấp</div>
      <br />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "30px",
        }}
      >
        <Button
          className="button-filter"
          icon={<DownOutlined />}
        >
          Bộ lọc
        </Button>
        <Button onClick={showModal} className="button-create">
          + Tạo việc mới
        </Button>
      </div>
      <Table rowKey="id" dataSource={dataSupplier} columns={columns}></Table>
      {/* Tạo nhà cung cấp */}
      <Modal
        title="Tạo nhà cung cấp"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <CreateSupplier onReload={handleReload} handleCancel={handleCancel} />
      </Modal>
    </>
  );
}
export default SupplierManage;
