import { Button, Col, DatePicker, Form, Input, Select, notification } from "antd";
import { useEffect, useState } from "react";
import { getTimeCurrent } from "../../components/GetTimeCurrent";
import { createProductionStages } from "../../services/productionStagesService";
const { Option } = Select;
function CreateProductionStage(props) {
  const { onReload, handleCancel } = props;
  const [notifiapi, contextHolder] = notification.useNotification();
  const StageStatus=["Hoàn thành","Chưa hoàn thành"];

  const handleSubmit = async (e) => {
    e.createAt = getTimeCurrent();
    const response = await createProductionStages(e);
    if (response) {
      handleCancel();
      onReload();
      notifiapi.success({
        message: "success",
        description: `Bạn đã tạo mới giai đoạn sản xuất thành công`,
        duration: 1, // hiển thị trong bao lâu thời gian
      });
      form.resetFields();
    } else {
      notifiapi.error({
        message: "error",
        description: "Xin lỗi, vui lòng thử lại sau",
      });
    }
  };

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
        <Form.Item label="Tên giai đoạn" name="stageName" rules={rules}>
          <Input />
        </Form.Item>
        <Form.Item label="Địa điểm giai đoạn" name="stageAddress" rules={rules}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Trạng thái giai đoạn"
          name="stageStatus"
          rules={rules}
        >
          <Select
            style={{ width: "100%" }}
            placeholder="Chọn giai đoạn sản xuất"
            options={StageStatus.map((item, index) => ({
              key: index,
              value: item,
              label: item,
            }))}
          />
        </Form.Item>
        <Form.Item
          label="Thời gian giai đoạn"
          name="stageTimestamp"
          rules={rules}
        >
          <DatePicker />
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
export default CreateProductionStage;
