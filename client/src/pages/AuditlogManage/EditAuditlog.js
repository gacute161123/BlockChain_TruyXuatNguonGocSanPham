import {
  Button,
  Modal,
  notification,
  Form,
  Input,
  Select,
} from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useState } from "react";
import { editAuditlog } from "../../services/auditlogService";

const { Option } = Select;

function EditAuditlog(props) {
  const { record, onReload } = props;
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notifiapi, contextHolder] = notification.useNotification();
  const [file, setFile] = useState();
  const statusAuditlog = ["Đạt", "Không đạt"];

  const showModal = () => {
    setIsModalOpen(true);
  };

  const rules = [
    {
      required: true,
      message: "Không được bỏ trống",
    },
  ];

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields([
      "productionStageID",
      "inspectionDate",
      "inspector",
      "status",
      "notes",
    ]);
    setFile(null);
  };

  const handleSubmit = async (values) => {
    const newFormData = new FormData();
    newFormData.append("productionStageID", values.productionStageID);
    newFormData.append("inspectionDate", values.inspectionDate);
    newFormData.append("inspector", values.inspector);
    newFormData.append("status", values.status);
    newFormData.append("notes", values.notes);

    if (file) {
      newFormData.append("certificateImage", file);
    }

    const response = await editAuditlog(record._id, newFormData);
    if (response) {
      notifiapi.success({
        message: "success",
        description: `Bạn đã chỉnh sửa thành công ${record.name}`,
        duration: 5,
      });
      onReload();
      handleCancel();
    } else {
      notifiapi.error({
        message: "error",
        description: "Xin lỗi, vui lòng thử lại sau",
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
      />
      <Modal
        title="Chỉnh sửa nhật ký kiểm tra"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          name="edit-auditlog"
          onFinish={handleSubmit}
          initialValues={record}
        >
          <Form.Item
            label="Tên giai đoạn sản xuất"
            name="productionStageID"
            rules={rules}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Ngày kiểm tra" name="inspectionDate" rules={rules}>
            <Input />
          </Form.Item>
          <Form.Item label="Tên người kiểm tra" name="inspector" rules={rules}>
            <Input />
          </Form.Item>
          <Form.Item label="Trạng thái" name="status" rules={rules}>
            <Select
              style={{ width: "100%" }}
              options={statusAuditlog.map((item, index) => ({
                key: index,
                value: item,
                label: item,
              }))}
            />
          </Form.Item>
          <Form.Item label="Ảnh kiểm định" rules={rules}>
            <input
              type="file"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  setFile(e.target.files[0]);
                }
              }}
            />
          </Form.Item>
          <Form.Item label="Ghi chú" name="notes" rules={rules}>
            <Input />
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

export default EditAuditlog;
