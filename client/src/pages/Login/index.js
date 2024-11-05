import { Button, Card,notification, Checkbox, Col, Form, Input, Row, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./login.scss"
import { useState } from "react";
import { login } from "../../services/userService";
import { checkLogin } from "../../action/login";
function Login() {
      const [form] = Form.useForm();
      const [notifiapi, contextHolder] = notification.useNotification();
      const dispatch = useDispatch();
      const [loadingApi, setLoadingApi] = useState(false);
      const handleSubmit = async (e) => {
        setLoadingApi(true);
        const response = await login(e);
        if (response.status === "OKE") {
          notifiapi.success({
            message: "success",
            description: `Bạn đã đăng nhập thành công`,
            duration: 3, // hiển thị trong bao lâu thời gian
          });
          localStorage.setItem("access_token", response?.access_token); //?. nếu đối tượng ko tồn tại ko xảy ra lỗi
          dispatch(checkLogin(true));
          navigate("/");
          form.resetFields();
          // fetchData();
        } else if (response.status === "ERRTK") {
          notifiapi.error({
            message: "error",
            description: `Email bạn nhập chưa tồn tại trong hệ thống`,
            duration: 3, // hiển thị trong bao lâu thời gian
          });
        } else {
          notifiapi.error({
            message: "error",
            description: `Mật khẩu không chính xác`,
            duration: 3, // hiển thị trong bao lâu thời gian
          });
        }
        setLoadingApi(false);
      }
       const rules = [
         {
           required: true, // yêu cầu người dùng phải nhập vào
           message: "Không được bỏ trống", // ko nhập show ra message
         },
       ];
       const navigate = useNavigate();
       const handleNavigateRegiter = () => {
         navigate("/register");
       };
  return (
    <>
      {contextHolder}
      <div className="container">
        <div className="login-content">
          <div className="login-content__title">
           TÀI KHOẢN
          </div>
          <div className="login-content__description">
            Đăng nhập để <br /> trải nghiệm nhiều tính năng thú vị hơn nhé
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Form
              form={form}
              layout="vertical"
              name="form_login"
              onFinish={handleSubmit}
            >
              <Form.Item name="email" label="Email" rules={rules}>
                <Input size="large" style={{ width: "600px" }} />
              </Form.Item>
              <Form.Item name="password" label="Password" rules={rules}>
                <Input.Password size="large" style={{ width: "600px" }} />
              </Form.Item>
              <Form.Item name="remember" valuePropName="checked">
                <Checkbox>Lưu đăng nhập</Checkbox>
              </Form.Item>
              <Form.Item style={{ display: "flex", justifyContent: "center" }}>
                <Button type="primary" htmlType="submit" className="ButtonLogin">
                  {loadingApi === true ? (
                    <>
                      <Spin />
                    </>
                  ) : (
                    <>Đăng Nhập</>
                  )}
                </Button>
              </Form.Item>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  color: "#00a139",
                }}
              >
                Quên mật khẩu
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  color: "#000",
                  paddingBottom:"30px"
                }}
              >
                BẠN CHƯA CÓ TÀI KHOẢN. ĐĂNG KÝ
                <span
                  onClick={handleNavigateRegiter}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    color: "#00a139",
                    cursor: "pointer",
                  }}
                >
                  &nbsp;TẠI ĐÂY.
                </span>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
export default Login;
