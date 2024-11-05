import { Badge, Button, Image, Modal, Table, Tag, Tooltip } from "antd";
import { Link } from "react-router-dom";
import { EyeOutlined, DownOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { getAuditlogList } from "../../services/auditlogService";
import { getProductionStagesFindByID } from "../../services/productionStagesService";
import CreateAuditlog from "./CreateAuditlog";
function AuditlogManage() {
  const [dataAuditlog, setDataAuditlog] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fetchApi = async () => {
    const response = await getAuditlogList();
    if (response) {
      const auditLogs = response || []; // Bảo đảm là mảng
      const enrichedLogs = await Promise.all(
        auditLogs.map(async (item) => {
          const resultProductionStage = await getProductionStagesFindByID(
            item.productionStageID
          );
          const productionStageName = resultProductionStage.stageName
          return {
            ...item,
            productionStageName,
          };
        })
      );
      setDataAuditlog(enrichedLogs); // Cập nhật dataAuditlog là mảng mới
    }
  };
  console.log(dataAuditlog);


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
      dataIndex: "productionStageName",
      key: "productionStageName",
    },
    {
      title: "Ngày kiểm tra",
      dataIndex: "inspectionDate",
      key: "inspectionDate",
    },
    {
      title: "Tên người kiểm tra",
      dataIndex: "inspector",
      key: "inspector",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (stageStatus) =>
        stageStatus === "Đạt" ? (
          <Tag color="green">Đạt</Tag>
        ) : (
          <Tag color="red">Không đạt</Tag>
        ),
    },
    {
      title: "Ghi chú",
      dataIndex: "notes",
      key: "notes",
    },
    {
      title: "Hình ảnh kiểm định",
      dataIndex: "certificateImage",
      key: "certificateImage",
      render: (certificateImage) => (
        <Image
          src={certificateImage}
          alt="certificateImage"
          style={{ width: "100px", height: "100px", objectFit: "cover" }}
        />
      ),
    },
    // {
    //   title: "Hành động",
    //   key: "actions",
    //   render: (_, record) => {
    //     // record trả về từng bản ghi
    //     return (
    //       <>
    //         {/* <EditSupplier
    //           key={`edit-${record.id}`}
    //           record={record}
    //           onReload={handleReload}
    //         />
    //         <DeleteSupplier
    //           key={`delete-${record.id}`}
    //           record={record}
    //           onReload={handleReload}
    //         /> */}
    //       </>
    //     );
    //   },
    // },
  ];
  return (
    <>
      <div style={{ color: "#00a139", fontSize: "22px", fontWeight: "500" }}>
       Nhật ký kiểm tra
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
        <Button onClick={showModal} className="button-create" >
          + Tạo mới nhật ký
        </Button>
      </div>
      <Table rowKey="id" dataSource={dataAuditlog} columns={columns}></Table>
      {/* Tạo nhà cung cấp */}
      <Modal
        title="Tạo nhật ký"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <CreateAuditlog onReload={handleReload} handleCancel={handleCancel} />
      </Modal>
    </>
  );
}
export default AuditlogManage;
