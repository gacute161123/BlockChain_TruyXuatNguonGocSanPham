import { useNavigate } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";
import {Button} from 'antd'
function GoBack(){
    const handleClick =()=>{
        navigate(-1);
    }
    const navigate = useNavigate();
    return (
      <>
        <Button onClick={handleClick} type="text" size="small">
          <LeftOutlined />
        </Button>
      </>
    );
}
export default GoBack;