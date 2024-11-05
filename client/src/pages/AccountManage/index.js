import {
  Button,
  Card,
  Checkbox,
  Col,
  Form,
  notification,
  Input,
  InputNumber,
  Row,
  Select,
  Switch,
  message,
  Upload,
} from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { editUser, getUserById } from "../../services/userService";
import { PlusOutlined } from "@ant-design/icons";
function AccountManage() {
  const [dataUser, setDataUser] = useState("");
  const [isEdit, setIsEdit] = useState(true);
  const [notifiapi, contextHolder] = notification.useNotification();
  const currentData = useSelector((state) => state.currentDataReducer);
  const arrRole = ["ADMIN", "COMPANY", "QUALITY_UNIT", "CONSUMER"];
  //Làm reset form
  const [form] = Form.useForm();
  const rules = [
    {
      required: true, // yêu cầu người dùng phải nhập vào
      message: "Không được bỏ trống", // ko nhập show ra message
    },
  ];
   const fetchApi = async () => {
     const response = await getUserById(currentData.currentData.data._id);
     if (response) {
       setDataUser(response);
     }
   };
   const handleReload = () => {
     fetchApi();
   };
  useEffect(() => {
    fetchApi();
  }, []);
  const handleEdit = () => {
    setIsEdit(!isEdit);
  };
  const handleSubmit = async (e) => {
    const response = await editUser(currentData.currentData.data._id, e);
    if (response) {
      notifiapi.success({
        message: "success",
        description: `Bạn đã Chỉnh sửa thành công `,
        duration: 6, // hiển thị trong bao lâu thời gian
      });
      handleReload();
      form.resetFields();
      setIsEdit(true);
    } else {
      notifiapi.error({
        message: "error",
        description: "Xin lỗi, vui lòng đặt lại sau",
      });
    }
  };


  return (
    <>
      {contextHolder}
      {dataUser && (
          <Card
            title="Thông tin user "
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
            style={{ marginTop: "20px" }}
          >
            <Form
              form={form}
              layout="vertical"
              name="info-user"
              initialValues={dataUser} // khởi tạo giá trị
              onFinish={handleSubmit}
              disabled={isEdit}
            >
              <Form.Item label="Tên tài khoản" name="name" rules={rules}>
                <Input />
              </Form.Item>
              <Row gutter={[15, 15]}>
                <Col span={8}>
                  <Form.Item label="email" name="email" rules={rules}>
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Quyền" name="role">
                    <Select
                      defaultValue={currentData.currentData.data.role}
                      style={{ width: "100%" }}
                      placeholder="Quyền của tài khoản"
                      disabled="true"
                      options={arrRole.map((item, index) => ({
                        key: index,
                        value: item,
                        label: item,
                      }))}
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Số điện thoại" name="phone">
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[15, 15]}>
                <Col span={8}>
                  <Form.Item label="Hình ảnh" name="image">
                    <Upload action="/upload.do" listType="picture-card">
                      <button
                        style={{
                          border: 0,
                          background: "none",
                        }}
                        type="button"
                      >
                        <PlusOutlined />
                        <div
                          style={{
                            marginTop: 8,
                          }}
                        >
                          Upload
                        </div>
                      </button>
                    </Upload>
                  </Form.Item>
                </Col>
              </Row>
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
export default AccountManage;
