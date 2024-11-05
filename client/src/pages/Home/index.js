import { Button, Card, Col, Divider, Form, Input, Row, Space,h1 } from "antd";
import "./Home.scss";
import {useNavigate} from "react-router-dom"
import {QrcodeOutlined } from "@ant-design/icons"
const { Search } = Input;
const onSearch = (value, _e, info) => console.log(info?.source, value);


function Home() {
     const [form] = Form.useForm();
      const navigate = useNavigate();
      const rules = [
        {
          required: true, // yêu cầu người dùng phải nhập vào
          message: "Không được bỏ trống", // ko nhập show ra message
        },
      ];
      const handleSubmit = async (e) => {
        navigate(`product/search?keyword=${e.keyword || ""}`);
      };

  return (
    <>
      <div className="containerHome">
        <div className="container-header">
          <div className="container-header__content">
            <h1>TRUY XUẤT NGUỒN GỐC SẢN PHẨM</h1>
            <p>Nhập mã sản xuất và kiểm tra</p>
            <Form
              form={form}
              layout="vertical"
              name="search-jobs"
              onFinish={handleSubmit}
            >
              <Row>
                <Col span={18}>
                  <Form.Item name="keyword">
                    <Input
                      // addonAfter={<QrcodeOutlined  />}
                      placeholder="Tìm kiếm theo mã productCode"
                      // style={{backgroundColor:"#ffffff",borderRadius:"6px"}}
                    />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ backgroundColor: "#00a139" }}
                  >
                    Tìm kiếm
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>
        </div>
        <div className="container">
          {/* hướng dẫn */}
          <div id="huongdan">
            <Divider
              style={{
                borderColor: "#088B3C",
                fontSize: "24px",
                marginTop: "50px",
              }}
            >
              HƯỚNG DẪN TRUY XUẤT SẢN PHẨM
            </Divider>
            <Row>
              <Col span={12}>
                <img
                  src="https://truyxuat.gov.vn/wp-content/uploads/2022/04/hdsd.png"
                  alt="example"
                />
              </Col>
              <Col span={12}>
                <div className="Instructions-forUse">
                  <div
                    style={{
                      fontSize: "32px",
                      fontWeight: "500",
                      textAlign: "center",
                    }}
                  >
                    HƯỚNG DẪN SỬ DỤNG
                  </div>
                  <ul className="Instructions-forUse__item">
                    <li>
                      1. QUÉT QRCODE BẰNG TEM TRUY XUẤT, CHỐNG HÀNG GIẢ TRÊN SẢN
                      PHẨM.
                    </li>
                    <li>2. TRUY CẬP LIÊN KẾT HIỆN RA TRÊN MÀN HÌNH.</li>
                    <li>
                      3. KIỂM TRA THÔNG TIN TRÊN HỆ THỐNG KHỚP VỚI SẢN PHẨM.{" "}
                    </li>
                    <li>
                      4. LIÊN HỆ NHÀ SẢN XUẤT NẾU SẢN PHẨM KHÔNG CHÍNH HÃNG.
                    </li>
                  </ul>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </>
  );
}
export default Home;
