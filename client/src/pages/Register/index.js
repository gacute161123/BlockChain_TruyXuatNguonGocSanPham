import { Button, Checkbox, Col, Form, Input, notification, Row } from "antd";
import { useNavigate } from "react-router-dom";
import { checkUser, register } from "../../services/userService";
import { useState } from "react";
import "./Register.scss"
function Register() {
  const [form] = Form.useForm();
  const [notifiapi, contextHolder] = notification.useNotification();
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  // kiểm tra nhập đủ dữ liệu chưa
  const handleValuesChange = (changedValues, allValues) => {
    const { email, password, phone, name, comfirmpassword } = allValues;
    setIsSubmitDisabled(
      !(email && password && phone && name && comfirmpassword)
    );
  };
  const rules = [
    {
      required: true, // yêu cầu người dùng phải nhập vào
      message: "Không được bỏ trống", // ko nhập show ra message
    },
  ];
  const navigate = useNavigate();
  const handleNavigateLogin = () => {
    navigate("/login");
  };
  const handleSubmit = async (values) => {
    const checkEmailUser = await checkUser("email", values.email);
    //  console.log(checkEmailUser);
    const checkPhoneUser = await checkUser("phone", values.phone);
    //  if (checkEmailUser.data === true) {
    //    notifiapi.error({
    //      message: "error",
    //      description: `Email đã tồn tại trong hệ thống, vui lòng thử lại!`,
    //      duration: 6, // hiển thị trong bao lâu thời gian
    //    });
    //    return;
    //  } else
    if (checkPhoneUser.data === true) {
      notifiapi.error({
        message: "error",
        description: `Số điện thoại đã tồn tại trong hệ thống, vui lòng thử lại!`,
        duration: 6, // hiển thị trong bao lâu thời gian
      });
      return;
    }

    if (values.password !== values.comfirmpassword) {
      notifiapi.error({
        message: "Lỗi",
        description: "Mật khẩu và xác nhận mật khẩu không khớp",
        duration: 6,
      });
      return;
    }
    const response = await register(values);
    if (response) {
      console.log("response",response);
      notifiapi.success({
        message: "success",
        description: `Bạn đã tạo tài khoản thành công`,
        duration: 6, // hiển thị trong bao lâu thời gian
      });
      form.resetFields();
      navigate("/login");
    } else {
      notifiapi.error({
        message: "error",
        description: `Lỗi đăng ký vui lòng thử lại sau`,
        duration: 6, // hiển thị trong bao lâu thời gian
      });
    }
  };
  return (
    <>
      {contextHolder}
      <div className="container">
        <div className="register-content">
          <div className="register-content__title">ĐĂNG KÝ</div>
        </div>
        <div className="register-content__description">
          Để nhận thông tin mới nhất của chúng tôi
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Form
            form={form}
            layout="vertical"
            name="form_register"
            onFinish={handleSubmit}
            onValuesChange={handleValuesChange}
          >
            <Row>
              <Form.Item name="name" label="Họ tên" rules={rules}>
                <Input
                  size="large"
                  style={{ width: "295px", marginRight: "10px" }}
                />
              </Form.Item>
              <Form.Item name="phone" label="Số điện thoại" rules={rules}>
                <Input size="large" style={{ width: "295px" }} />
              </Form.Item>
            </Row>
            <Form.Item name="email" label="Email" rules={rules}>
              <Input size="large" style={{ width: "600px" }} />
            </Form.Item>
            <Form.Item name="password" label="Password" rules={rules}>
              <Input.Password
                size="large"
                style={{ width: "600px", marginRight: "10px" }}
              />
            </Form.Item>
            <Form.Item
              name="comfirmpassword"
              label="Nhập lại password"
              rules={rules}
            >
              <Input.Password size="large" style={{ width: "600px" }} />
            </Form.Item>

            <Form.Item style={{ display: "flex", justifyContent: "center" }}>
              <Button
                type="primary"
                htmlType="submit"
                className="viewmore"
                disabled={isSubmitDisabled}
              >
                TẠO TÀI KHOẢN
              </Button>
            </Form.Item>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                color: "#00a139",
                cursor: "pointer",
              }}
              onClick={handleNavigateLogin}
            >
              Đăng nhập
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}
export default Register;
