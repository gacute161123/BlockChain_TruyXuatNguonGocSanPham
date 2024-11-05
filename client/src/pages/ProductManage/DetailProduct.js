import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  notification,
  Row,
  Upload,
} from "antd";
import { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { getProductItem } from "../../services/productService";
import { useParams } from "react-router-dom";
import { getSupplierById } from "../../services/supplierService";
import { getProductionStagesFindByID } from "../../services/productionStagesService";
import GoBack from '../../components/GoBack'

function DetailProduct() {
  const params = useParams();
  const [dataProduct, setDataProduct] = useState("");
   const [dataProductionStages, setDataProductionStages] = useState([]);
   const [dataSupplier, setDataSupplier] = useState("");
  const [isEdit, setIsEdit] = useState(true);
  const [notifiapi, contextHolder] = notification.useNotification();
  //Làm reset form
  const [form] = Form.useForm();
  const rules = [
    {
      required: true, // yêu cầu người dùng phải nhập vào
      message: "Không được bỏ trống", // ko nhập show ra message
    },
  ];
  const handleEdit = () => {
    setIsEdit(!isEdit);
  };
    useEffect(() => {
      const fetchAPI = async () => {
        const result = await getProductItem(params.id);
        if (result) {
          setDataProduct(result);

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

  const handleSubmit = async (e) => {};
  return (
    <>
      <Divider
        style={{
          borderColor: "#088B3C",
          fontSize: "24px",
        }}
      >
        Thông tin sản phẩm
      </Divider>

      {dataProduct && (
        <Card
         title={<><GoBack /> Thông tin sản phẩm</>}
          extra={
            isEdit ? (
              <Button onClick={handleEdit} className="button-filter">
                Chỉnh sửa
              </Button>
            ) : (
              <Button onClick={handleEdit} className="button-create">
                Hủy
              </Button>
            )
          }
        >
          <Form
            form={form}
            layout="vertical"
            name="info-user"
            initialValues={dataProduct} // khởi tạo giá trị
            onFinish={handleSubmit}
            disabled={isEdit}
          >
            <Row>
              <Col span={8}>
                <Form.Item label="Tên sản phẩm" name="name" rules={rules}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="Ngày sản xuất"
                  name="manufactureDate"
                  rules={rules}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Ngày hết hạn" name="expiryDate" rules={rules}>
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item label="Mô tả" name="description" rules={rules}>
              <Input.TextArea />
            </Form.Item>
            <Form.Item label="Hình ảnh" name="imageUrl" rules={rules}>
              <Upload action="/upload.do" listType="picture-card">
                <button style={{ border: 0, background: "none" }} type="button">
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </button>
              </Upload>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="button-create"
              >
                Cập nhật
              </Button>
              &nbsp;
              <Button
                type="default"
                onClick={handleEdit}
                className="button-filter"
              >
                Hủy
              </Button>
            </Form.Item>
          </Form>
        </Card>
      )}
    </>
  );
}
export default DetailProduct;
