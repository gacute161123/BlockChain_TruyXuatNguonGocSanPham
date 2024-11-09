import { Badge, Button, Image, Modal, Table, Tag, Tooltip } from "antd";
import { Link } from "react-router-dom";
import { EyeOutlined, DownOutlined, SendOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { getAuditlogList } from "../../services/auditlogService";
import { getProductionStagesFindByID } from "../../services/productionStagesService";
import CreateAuditlog from "./CreateAuditlog";
import DeleteAuditlog from "./DeleteAuditlog";
import { useSelector } from "react-redux";
import EditAuditlog from "./EditAuditlog";
import { getProductItem } from "../../services/productService";
import KyXacThuc from "../../components/KyXacThuc";
import KyXacThucLan1 from "./KyXacThucLan1";
import ButtonGroup from "antd/es/button/button-group";
function AuditlogManage() {
  const [dataAuditlog, setDataAuditlog] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
    const currentData = useSelector((state) => state.currentDataReducer);
  const fetchApi = async () => {
    const response = await getAuditlogList();
    if (response) {
      const auditLogs = response || []; // Bảo đảm là mảng
      const newData = await Promise.all(
        auditLogs.map(async (item) => {
          const resultProductionStage = await getProductionStagesFindByID(
            item.productionStageID
          );

          const resultProduct = await getProductItem(item.productID);
          console.log(resultProduct)

          const productionStageName = resultProductionStage.stageName
          const productName = resultProduct.name;
          return {
            ...item,
            productionStageName,
            productName,
          };
        })
      );
      setDataAuditlog(newData);
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
      title: "Tên sản phẩm",
      dataIndex: "productName",
      key: "productName",
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
      render: (status) =>
        status === "Đạt" ? (
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
  ];

    if (currentData?.currentData?.data?.role === "QUALITY_UNIT") {
  columns.push({
    title: "Hành động",
    key: "actions",
    render: (_, record) => {
      // record trả về từng bản ghi
      return (
        <>
          <Button
            disabled={record.status === "Đạt" ? false : true}
            className="button-create"
            onClick={showModal}
          >
            Xác thực kiểm định
            <SendOutlined style={{ marginLeft: 8 }} />
          </Button>

          <Modal
            title="Xác thực ký 1"
            open={isModalOpen}
            onCancel={handleCancel}
            footer={null}
          >
            <KyXacThucLan1
              onReload={handleReload}
              handleCancel={handleCancel}
              key={`xacthuclan1-${record.id}`}
              record={record}
            />
          </Modal>

          <EditAuditlog
            key={`edit-${record.id}`}
            record={record}
            onReload={handleReload}
          />
          <DeleteAuditlog
            key={`delete-${record.id}`}
            record={record}
            onReload={handleReload}
          />
        </>
      );
    },
  });
}
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
        {/* {currentData?.currentData?.data?.role === "QUALITY_UNIT" ? (
        <Button onClick={showModal} className="button-create">
          + Tạo mới nhật ký
        </Button>
        ) : (
          <></>
        )} */}
      </div>
      <Table rowKey="id" dataSource={dataAuditlog} columns={columns}></Table>
      {/* Tạo nhà cung cấp */}
      {/* <Modal
        title="Xác thực ký"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <CreateAuditlog onReload={handleReload} handleCancel={handleCancel} />
      </Modal> */}
    </>
  );
}
export default AuditlogManage;
