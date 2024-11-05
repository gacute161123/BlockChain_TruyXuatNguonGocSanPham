import { Button, Modal,notification, Form, Spin, Input, Row, Col, Select, Switch } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { editSupplier } from "../../services/supplierService";
const { Option } = Select;

function EditSupplier(props) {
  const { record, onReload } = props;
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notifiapi, contextHolder] = notification.useNotification();

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
      const response = await editSupplier(record._id, e);
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
        title="Chỉnh sửa nhà cung cấp"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          name="create-supplier"
          onFinish={handleSubmit}
          initialValues={record}
        >
          <Form.Item label="Tên nhà cung cấp" name="name" rules={rules}>
            <Input />
          </Form.Item>
          <Form.Item label="Địa chỉ nhà cung cấp" name="address" rules={rules}>
            <Input />
          </Form.Item>
          <Form.Item
            label="Thông tin liên hệ nhà cung cấp"
            name="contactInfo"
            rules={rules}
          >
            <Input.TextArea />
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
export default EditSupplier;
