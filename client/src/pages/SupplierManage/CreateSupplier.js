import { Button, Col, Form, Input, Select, notification } from "antd";
import { useEffect, useState } from "react";
import { createSupplier } from "../../services/supplierService";
import { getTimeCurrent } from "../../components/GetTimeCurrent";
import "./SupplierManage.scss"
const { Option } = Select;
function CreateSupplier(props) {
  const { onReload, handleCancel } = props;
  const [notifiapi, contextHolder] = notification.useNotification();

  const handleSubmit= async(e)=>{
     e.createAt = getTimeCurrent();
      const response = await createSupplier(e);
      if (response) {
        handleCancel();
        onReload();
        notifiapi.success({
          message: "success",
          description: `Bạn đã tạo mới nhà cung cấp thành công `,
          duration: 1, // hiển thị trong bao lâu thời gian
        });
         form.resetFields();
      } else {
        notifiapi.error({
          message: "error",
          description: "Xin lỗi, vui lòng thử lại sau",
        });
      }
  }

  //Làm reset form
  const [form] = Form.useForm();
  const rules = [
    {
      required: true, // yêu cầu người dùng phải nhập vào
      message: "Không được bỏ trống", // ko nhập show ra message
    },
  ];
  return (
    <>
      {contextHolder}
      <Form
        form={form}
        layout="vertical"
        name="create-supplier"
        onFinish={handleSubmit}
      >
        <Form.Item label="Tên nhà cung cấp" name="name" rules={rules}>
          <Input />
        </Form.Item>
        <Form.Item label="Địa chỉ nhà cung cấp" name="address" rules={rules}>
          <Input />
        </Form.Item>
        <Form.Item label="Thông tin nhà cung cấp" name="contactInfo" rules={rules}>
          <Input.TextArea />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="button-create">
            Tạo mới
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
export default CreateSupplier;
