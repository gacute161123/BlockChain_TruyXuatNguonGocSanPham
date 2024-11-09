import { Button, Form, Upload, Input, notification, Spin } from "antd";
import {
  createProductToBlockChain,
  editProduct,
} from "../../services/productService";
import { useSelector } from "react-redux";
import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react"; // Import useState to track file upload status

function KyXacThuc(props) {
  const { onReload, handleCancel, dataProduct } = props;
  const [notifiapi, contextHolder] = notification.useNotification();
  const currentData = useSelector((state) => state.currentDataReducer);
  const [form] = Form.useForm();
  const [loadingApi, setLoadingApi] = useState(false);
  const [fileUploaded, setFileUploaded] = useState({
    certificate: false,
    privateKey: false,
  }); // State to track file upload status

  const rules = [
    {
      required: true,
      message: "Không được bỏ trống",
    },
  ];

  const handleSubmit = async (e) => {
    setLoadingApi(true);
    const newData = {
      idSignature: currentData.currentData.data._id,
      signature: {
        credentials: {
          certificate: e.certificate.replace(/\\n/g, "\n"),
          privateKey: e.privateKey.replace(/\\r\\n/g, "\r\n"),
        },
        mspId: "Org1MSP",
        type: "X.509",
      },
      name: dataProduct.name,
      description: dataProduct.description,
      imageUrl: dataProduct.imageUrl,
      manufactureDate: dataProduct.manufactureDate,
      expiryDate: dataProduct.expiryDate,
      supplierID: dataProduct.supplierID,
      productionStagesID: dataProduct.productionStagesID,
      productCode: dataProduct.productCode,
    };
    console.log(newData);

    const response = await createProductToBlockChain(newData);
    if (response) {
      onReload();
      handleCancel();
      notifiapi.success({
        message: "Success",
        description: "Dữ liệu đã được kiểm định thành công",
        duration: 1,
      });
      form.resetFields();

      const newDataProduct = {
        checkStatus: "TRUE",
      };
      await editProduct(dataProduct._id, newDataProduct);
    } else {
      notifiapi.error({
        message: "Error",
        description: "Xin lỗi, khóa công khai hoặc bí mật chưa chính xác",
      });
    }
  };

  return (
    <>
      {contextHolder}
      <Form
        form={form}
        layout="vertical"
        name="create-supplier"
        onFinish={handleSubmit}
      >
        <Form.Item label="Khóa Công khai" name="certificate" rules={rules}>
          <Input.TextArea
            rows={4}
            placeholder="Nhập khóa công khai tại đây"
            style={{ marginTop: 8 }}
          />
        </Form.Item>

        <Form.Item label="Khóa bí mật" name="privateKey" rules={rules}>
          <Input.TextArea
            rows={4}
            placeholder="Nhập khóa bí mật tại đây"
            style={{ marginTop: 8 }}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="button-create">
            {loadingApi === true ? (
              <>
                <Spin />
              </>
            ) : (
              <>Đẩy dữ liệu lên blockchain</>
            )}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default KyXacThuc;
