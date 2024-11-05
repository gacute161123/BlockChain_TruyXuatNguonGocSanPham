import {
  Button,
  Modal,
  notification,
  Form,
  Input,
  Select,
  DatePicker,
} from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { editProductionStages } from "../../services/productionStagesService";
import dayjs from "dayjs";

function EditProductionStage(props) {
  const { record, onReload } = props;
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notifiapi, contextHolder] = notification.useNotification();
  const StageStatus = ["Hoàn thành", "Chưa hoàn thành"];

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const rules = [
    {
      required: true,
      message: "Không được bỏ trống",
    },
  ];

  const handleSubmit = async (e) => {
    // Chuyển đổi giá trị stageTimestamp sang chuỗi định dạng YYYY-MM-DD để đảm bảo không có giờ
    const stageTimestamp = e.stageTimestamp
      ? dayjs(e.stageTimestamp).format("YYYY-MM-DD") // Chỉ lấy ngày, không lấy giờ
      : null;

    const formData = {
      ...e,
      stageTimestamp, // Sử dụng giá trị chuỗi ngày
    };

    const response = await editProductionStages(record._id, formData);
    if (response) {
      notifiapi.success({
        message: "success",
        description: `Bạn đã chỉnh sửa thành công ${record.name}`,
        duration: 0.5,
      });
      onReload();
      handleCancel();
      form.resetFields();
    } else {
      notifiapi.error({
        message: "error",
        description: "Xin lỗi, vui lòng thử lại sau",
      });
    }
  };

  useEffect(() => {
    if (record) {
      form.setFieldsValue({
        ...record,
        // Chuyển đổi giá trị stageTimestamp của record sang đối tượng dayjs
        stageTimestamp: record.stageTimestamp
          ? dayjs(record.stageTimestamp)
          : null,
      });
    }
  }, [record, form]);

  return (
    <>
      {contextHolder}
      <Button
        type="primary"
        size="small"
        icon={<EditOutlined />}
        onClick={showModal}
      ></Button>
      <Modal
        title="Chỉnh sửa giai đoạn sản xuất"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          name="edit-production-stage"
          onFinish={handleSubmit}
        >
          <Form.Item label="Tên giai đoạn" name="stageName" rules={rules}>
            <Input />
          </Form.Item>
          <Form.Item
            label="Địa điểm giai đoạn"
            name="stageAddress"
            rules={rules}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Trạng thái" name="stageStatus" rules={rules}>
            <Select
              style={{ width: "100%" }}
              placeholder="Chọn trạng thái"
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
            <Button type="primary" htmlType="submit">
              Cập nhật
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default EditProductionStage;
