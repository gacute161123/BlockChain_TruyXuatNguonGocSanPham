import { useEffect, useState } from "react";
import { getProductList } from "../../services/productService";
import { Button, Image, Modal, Row, Table, Tag, Tooltip } from "antd";
import { Link } from "react-router-dom";
import {
  EyeOutlined,
  DownOutlined,
  SyncOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { getSupplierById } from "../../services/supplierService";
import CreateProduct from "./CreateProduct";
import EditProduct from "./EditProduct";
import DeleteProduct from "./DeleteProduct";

function ProductManage() {
  const [dataProduct, setDataProduct] = useState("");
  const [supplierNames, setSupplierNames] = useState({});
  const [productionStagesStatus, setProductionStagesStatus] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fetchApi = async () => {
    const response = await getProductList();
    if (response) {
      setDataProduct(response);
      // Tạo một đối tượng để lưu tên nhà cung cấp
      const supplierNameMap = {};
      // Lặp qua các sản phẩm và gọi API để lấy tên nhà cung cấp theo từng sản phẩm
      for (const product of response) {
        if (product.supplierID) {
          const supplier = await getSupplierById(product.supplierID);
          if (supplier) {
            supplierNameMap[product.supplierID] = supplier.name; // Giả sử trường 'name' là tên nhà cung cấp
          }
        }
      }
      // Cập nhật state với tên nhà cung cấp
      setSupplierNames(supplierNameMap);

      // giai đoạn sản xuất
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

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 3, 
  });

  const handleTableChange = (pagination) => {
    setPagination(pagination);
  };

  const columns = [
    {
      title: "STT",
      key: "index",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Hình Ảnh",
      dataIndex: "imageUrl",
      key: "imageUrl",
      render: (imageUrl) => (
        <Image
          src={imageUrl} // Giữ nguyên như cũ
          alt="product"
          style={{ width: "100px", height: "100px", objectFit: "cover" }}
        />
      ),
    },
    {
      title: "Tên nhà cung cấp",
      dataIndex: "supplierID",
      key: "supplierID",
      render: (supplierID) => supplierNames[supplierID] || "Đang tải...",
    },
    {
      title: "Mã giai đoạn sản xuất",
      dataIndex: "productionStagesID",
      key: "productionStagesID",
      render: (productionStagesID) =>
        productionStagesID.map((item) => (
          <Tag color="success" key={item}>
            {item}
          </Tag>
        )),
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_, record) => {
        // record trả về từng bản ghi
        return (
          <>
            <Row style={{ display: "flex", justifyContent: "center" }}>
              <Link to={`/product-detail-manage/${record._id}`}>
                <Tooltip title="Xem chi tiết">
                  <Button size="small" icon={<EyeOutlined />}></Button>
                </Tooltip>
              </Link>
            </Row>
            <Row style={{ display: "flex", justifyContent: "center" }}>
              <EditProduct
                key={`edit-${record._id}`}
                record={record}
                onReload={handleReload}
              />
              <DeleteProduct
                key={`delete-${record._id}`}
                record={record}
                onReload={handleReload}
              />
            </Row>
          </>
        );
      },
    },
  ];
  return (
    <>
      <div style={{ color: "#00a139", fontSize: "22px", fontWeight: "500" }}>
        Danh sách sản phẩm
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
          + Tạo sản phẩm
        </Button>
      </div>
      <div style={{ marginBottom: "30px" }}>
        <Tag color="success" icon={<CheckCircleOutlined />}></Tag>Hoàn thành
        &nbsp;
        <Tag color="error" icon={<SyncOutlined spin />}></Tag>Chưa hoàn thành
      </div>
      <Table
        rowKey="id"
        dataSource={dataProduct}
        columns={columns}
        pagination={pagination} // Thiết lập phân trang
        onChange={handleTableChange} // Bắt sự kiện khi người dùng chuyển trang
      ></Table>
      {/* Tạo nhà cung cấp */}
      <Modal
        title="Tạo sản phẩm"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <CreateProduct onReload={handleReload} handleCancel={handleCancel} />
      </Modal>
    </>
  );
}
export default ProductManage;
