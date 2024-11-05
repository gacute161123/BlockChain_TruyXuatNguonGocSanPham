import { Button, Form, Input, notification } from "antd";
import { taokhoachonguoidung } from "../../services/userService";
import { useSelector } from "react-redux";
import { useState } from "react";
import TextArea from "antd/es/input/TextArea";

function CreateChuKyDienTu(props) {
  const { onReload, handleCancel } = props;
  const [notifiapi, contextHolder] = notification.useNotification();
  const [form] = Form.useForm();
  const [dataCKDT, setDataCKDT] = useState(null);
  const currentData = useSelector((state) => state.currentDataReducer);

  const handleSubmit = async (values) => {
    const response = await taokhoachonguoidung(
      currentData.currentData.data._id
    );
    if (response.status === "OKE") {
      console.log(response);
      setDataCKDT(response.key.credentials);
      onReload();
      notifiapi.success({
        message: "Success",
        description: "Bạn đã tạo khóa thành công",
        duration: 1,
      });
      form.resetFields();
    } else {
      notifiapi.error({
        message: "Error",
        description: "Xin lỗi, vui lòng thử lại sau",
      });
    }
  };

  const handleCopyPrivateKey = () => {
    if (dataCKDT?.privateKey) {
      navigator.clipboard.writeText(dataCKDT.privateKey);
      notifiapi.success({
        message: "Copy Success",
        description: "Khóa bí mật đã được sao chép vào clipboard",
      });
    }
  };

  const handleDownloadPrivateKey = () => {
    if (dataCKDT?.privateKey) {
      const blob = new Blob([dataCKDT.privateKey], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "privateKey.txt";
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <>
      {contextHolder}
      <Form
        form={form}
        layout="vertical"
        name="create-chukydientu"
        onFinish={handleSubmit}
      >
        {dataCKDT && (
          <>
            <Form.Item label="Khóa công khai (Certificate)">
              <TextArea value={dataCKDT.certificate} readOnly />
            </Form.Item>
            <Form.Item label="Khóa bí mật (Private Key)">
              <TextArea value={dataCKDT.privateKey} readOnly />
              <Button
                type="primary"
                onClick={handleCopyPrivateKey}
                style={{ marginTop: "10px", marginRight: "10px" }}
                className="button-filter"
              >
                Sao chép khóa bí mật
              </Button>
              <Button
                type="primary"
                onClick={handleDownloadPrivateKey}
                style={{ marginTop: "10px" }}
                className="button-filter"
              >
                Tải xuống khóa bí mật
              </Button>
            </Form.Item>
          </>
        )}

        <Form.Item>
          <Button
            type="primary"
            style={{ float: "right" }}
            onClick={handleCancel}
            className="button-create"
          >
            Hủy bỏ
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            className="button-create"
            style={{ float: "right", marginRight: "10px" }}
          >
            Tạo chữ ký
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default CreateChuKyDienTu;
