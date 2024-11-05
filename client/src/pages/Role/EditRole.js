import {
  Button,
  Modal,
  notification,
  Form,
  Spin,
  Input,
  Row,
  Col,
  Select,
  Switch,
} from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { editSupplier } from "../../services/supplierService";
import { editUser } from "../../services/userService";
const { Option } = Select;

function EditRole(props) {
  const { record, onReload } = props;
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notifiapi, contextHolder] = notification.useNotification();
   const arrRole = ["ADMIN", "COMPANY", "QUALITY_UNIT", "CONSUMER"];

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };
  const rules = [
    {
      required: true, // yêu cầu người dùng phải nhập vào
      message: "Không được bỏ trống", // ko nhập show ra message
    },
  ];

  const handleSubmit = async (e) => {
    const response = await editUser(record._id, e);
    if (response) {
      notifiapi.success({
        message: "success",
        description: `Bạn đã Chỉnh sửa thành công ${record.name}`,
        duration: 0.5, // hiển thị trong bao lâu thời gian
      });
      onReload();
      handleCancel();
      form.resetFields();
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
      &nbsp;
      <Button
        type="primary"
        size="small"
        icon={<EditOutlined />}
        onClick={showModal}
      ></Button>
      <Modal
        title="Chỉnh sửa tài khoản"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          name="edit-role"
          onFinish={handleSubmit}
          initialValues={record}
        >
          <Form.Item label="Tên tài khoản" name="name" rules={rules}>
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={rules}>
            <Input />
          </Form.Item>
          <Form.Item label="Số điện thoại" name="phone" rules={rules}>
            <Input />
          </Form.Item>
          <Form.Item label="Quyền" name="role" rules={rules}>
            <Select
              defaultValue={record.role}
              style={{ width: "100%" }}
              placeholder="Quyền của tài khoản"
              options={arrRole.map((item, index) => ({
                key: index,
                value: item,
                label: item,
              }))}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Cập nhập
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
export default EditRole;
