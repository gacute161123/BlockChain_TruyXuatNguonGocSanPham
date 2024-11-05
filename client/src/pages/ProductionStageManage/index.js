import { Badge, Button, Modal, Table, Tag, Tooltip } from "antd";
import { Link } from "react-router-dom";
import { EyeOutlined, DownOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { getProductionStagesList } from "../../services/productionStagesService";
import CreateProductionStage from "./CreateProductionStage";
import DeleteProductionStage from "./DeleteProductionStage";
import EditProductionStage from "./EditProductionStage";

function ProductionStageManage() {
  const [dataProductionStage, setDataProductionStage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fetchApi = async () => {
    const response = await getProductionStagesList();
    if (response) {
      setDataProductionStage(response);
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
      title: "Tên giai đoạn",
      dataIndex: "stageName",
      key: "stageName",
    },
    {
      title: "Địa điểm giai đoạn",
      dataIndex: "stageAddress",
      key: "stageAddress",
    },
    {
      title: "Trạng thái hoàn thành",
      dataIndex: "stageStatus",
      key: "stageStatus",
      render: (stageStatus) =>
        stageStatus === "Hoàn thành" ? (
          <Tag color="green">Hoàn thành</Tag>
        ) : (
          <Tag color="red">Chưa hoàn thành</Tag>
        ),
    },
    {
      title: "Thời gian hoàn thành",
      dataIndex: "stageTimestamp",
      key: "stageTimestamp",
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_, record) => {
        // record trả về từng bản ghi
        return (
          <>
            <EditProductionStage
              key={`edit-${record.id}`}
              record={record}
              onReload={handleReload}
            />
            <DeleteProductionStage
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
        Danh sách giai đoạn sản xuất
      </div>
      <br />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "30px",
        }}
      >
        <Button className="button-filter" icon={<DownOutlined />}>
          Bộ lọc
        </Button>
        <Button onClick={showModal} className="button-create">
          + Tạo mới
        </Button>
      </div>
      <Table
        rowKey="id"
        dataSource={dataProductionStage}
        columns={columns}
      ></Table>
      {/* Tạo nhà cung cấp */}
      <Modal
        title="Tạo giai đoạn sản xuất"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <CreateProductionStage onReload={handleReload} handleCancel={handleCancel} />
      </Modal>
    </>
  );
}
export default ProductionStageManage;
