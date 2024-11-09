import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Select,
  notification,
} from "antd";
import { useEffect, useState } from "react";
import { createAuditlog, getAuditlogList } from "../../services/auditlogService";
import { getProductionStagesList } from "../../services/productionStagesService";
import { getTimeCurrent } from "../../components/GetTimeCurrent";
function CreateAuditlog(props) {
  const { onReload, handleCancel } = props;
  const [notifiapi, contextHolder] = notification.useNotification();
  const statusAuditlog = ["Đạt", "Không đạt"];
  const [dataProductionStages, setDataProductionStages] = useState();
    const [file, setFile] = useState(); 
  //Làm reset form
  const [form] = Form.useForm();
  const rules = [
    {
      required: true, // yêu cầu người dùng phải nhập vào
      message: "Không được bỏ trống", // ko nhập show ra message
    },
  ];

    useEffect(()=>{
        const fetchApi = async()=>{
            const response = await getProductionStagesList();
            if(response){
                setDataProductionStages(response);
            }
        }
        fetchApi();
    },[])
   const handleSubmit = async (values) => {
        values.createAt = getTimeCurrent();
      const newFormData = new FormData();
      newFormData.append("certificateImage", file); // Đúng key 'imageUrl'
      newFormData.append("productionStageID", values.productionStageID);
      newFormData.append("inspector", values.inspector);
      newFormData.append("inspectionDate", values.inspectionDate);
      newFormData.append("status", values.status);
      newFormData.append("notes", values.notes);
       for (let [key, value] of newFormData.entries()) {
         console.log(`${key}: ${value}`);
       }

     const response = await createAuditlog(newFormData);
     console.log("response"+response);
     if (response.status === "OKE") {
       handleCancel();
       onReload();
       notifiapi.success({
         message: "success",
         description: `Bạn đã tạo mới nhật ký kiểm tra thành công`,
         duration: 1, // hiển thị trong bao lâu thời gian
       });
       //  form.resetFields();
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
      <Form
        form={form}
        layout="vertical"
        name="create-supplier"
        onFinish={handleSubmit}
      >
        {dataProductionStages && (
          <Form.Item
            label="Tên giai đoạn sản xuất"
            name="productionStageID"
            rules={rules}
          >
            <Select
              style={{ width: "100%" }}
              placeholder="Chọn giai đoạn sản xuất"
              options={dataProductionStages.map((item) => ({
                key: item._id,
                value: item._id,
                label: item.stageName,
              }))}
            />
          </Form.Item>
        )}

        <Form.Item label="Ngày kiểm tra" name="inspectionDate" rules={rules}>
          <DatePicker placeholder="Chọn ngày kiểm tra" />
        </Form.Item>
        <Form.Item label="Tên người kiểm tra" name="inspector" rules={rules}>
          <Input />
        </Form.Item>
        <Form.Item label="Trạng thái" name="status" rules={rules}>
          <Select
            style={{ width: "100%" }}
            defaultValue="Đạt"
            options={statusAuditlog.map((item, index) => ({
              key: index,
              value: item,
              label: item,
            }))}
          />
        </Form.Item>
        <Form.Item label="Ảnh kiểm định" name="certificateImage" rules={rules}>
          <input
            type="file"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                setFile(e.target.files[0]); // Lấy đúng file từ input
              }
            }}
          />
        </Form.Item>
        <Form.Item label="Ghi chú" name="notes" rules={rules}>
          <Input />
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
export default CreateAuditlog;
