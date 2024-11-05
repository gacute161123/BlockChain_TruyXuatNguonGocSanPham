import { Anchor, Breadcrumb, Col, Divider, Image, Row, Steps, Tag } from "antd";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ProductDetail.scss";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductItem } from "../../services/productService";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { getProductionStagesFindByID } from "../../services/productionStagesService";
import {  getSupplierById } from "../../services/supplierService";

function ProductDetail() {
  const params = useParams();
  const [dataProducts, setDataProducts] = useState("");
  const [dataProductionStages, setDataProductionStages] = useState([]);
  const [dataSupplier,setDataSupplier] = useState("");

  useEffect(() => {
    const fetchAPI = async () => {
      const result = await getProductItem(params.id);
      if (result) {
        setDataProducts(result);

        // Kiểm tra và lấy nhà cung cấp
        if (result.supplierID) {
          const response = await getSupplierById(result.supplierID);
          if (response) {
            setDataSupplier(response);
          }
        }

        const productionStagesPromises = result.productionStagesID.map(
          async (id) => {
            return await getProductionStagesFindByID(id);
          }
        );
        // Chờ tất cả các lời gọi API hoàn thành
        const productionStages = await Promise.all(productionStagesPromises);
        // Cập nhật state với dữ liệu từ tất cả các stages
        setDataProductionStages(productionStages);
      }
    };
    fetchAPI();
  }, [params.id]);

  return (
    <>
      {dataProducts && (
        <div className="container" style={{ paddingTop: "10px" }}>
          <Row>
            <Col span={12}>
              <Row>
                <Image src={`/${dataProducts.imageUrl}`}/>
              </Row>
              <Row>
                <Col span={4}>
                  <img
                    style={{
                      marginTop: "5px",
                      height: "90px",
                      border: "4px solid #088B3C",
                    }}
                    alt="example"
                    src={`/${dataProducts.imageUrl}`}
                  />
                </Col>
              </Row>
            </Col>
            <Col span={12}>
              <div className="product-detail">
                <div className="product-detail__name">{dataProducts.name}</div>
                <div className="product-detail__tags">
                  <Tag color="#088B3C">Bữa sáng</Tag>
                  <Tag color="#088B3C">Bổ sung năng lượng</Tag>
                  <Tag color="#088B3C">Dạng hũ nhựa 400g</Tag>
                </div>
                <div className="product-detail__description">
                  {dataProducts.description}
                </div>
                <span className="product-detail__note">
                  * Thực phẩm bổ sung Thức uống lúa mạch
                </span>
              </div>
            </Col>
          </Row>
        </div>
      )}

      <Divider
        style={{
          borderColor: "#088B3C",
          fontSize: "24px",
          marginTop: "25px",
        }}
      >
        Thông tin sản phẩm
      </Divider>
      <Tabs
        defaultActiveKey="profile"
        id="uncontrolled-tab-example"
        className="mb-3"
        fill
      >
        <Tab
          eventKey="home"
          title="Thông tin sản phẩm"
          style={{ paddingLeft: "30px" }}
        >
          <Row>
            <Col span={12}>
              <div>
                <strong>*Mã truy xuất sản phẩm: </strong>
                <div> {dataProducts.productCode}</div>
              </div>
              <div>
                <strong>*Tên sản phẩm: </strong>
                <div> {dataProducts.name}</div>
              </div>
              <div>
                <strong>*Tên nhà cung cấp: </strong>
                <div> {dataProducts.supplierID}</div>
              </div>
            </Col>
            <Col span={12}>
              <div>
                <strong>*Ngày sản xuất: </strong>
                <div> {dataProducts.manufactureDate}</div>
              </div>
              <div>
                <strong>*Ngày hết hạn: </strong>
                <div> {dataProducts.expiryDate}</div>
              </div>
            </Col>
          </Row>
        </Tab>
        <Tab eventKey="profile" title="Quy trình sản xuất">
          <Divider />
          <Steps
            style={{ padding: "0px 30px" }}
            progressDot
            current={3}
            // direction="vertical"
            items={dataProductionStages.map((stage, index) => ({
              title: (
                <>
                  <strong>Bước: {index + 1}</strong> {stage.stageName}
                </>
              ),
              description: (
                <>
                  <strong>Địa chỉ: </strong> {stage.stageAddress} <br />
                  <strong>Trạng thái: </strong> {stage.stageStatus}
                </>
              ),
            }))}
          />
        </Tab>
        <Tab eventKey="contact" title="Thông tin nhà cung cấp">
          <div style={{ margin: "0px 30px" }}>
            <div>
              <strong>*Name: </strong>
              {dataSupplier.name}
            </div>
            <div>
              <strong>*Địa chỉ: </strong>
              {dataSupplier.address}
            </div>
            <div>
              <strong>*ContacInfo: </strong>
              {dataSupplier.contactInfo}
            </div>
          </div>
        </Tab>
        <Tab eventKey="comment" title="Bình luận">
          Tab content for comment
        </Tab>
      </Tabs>
    </>
  );
}

export default ProductDetail;
