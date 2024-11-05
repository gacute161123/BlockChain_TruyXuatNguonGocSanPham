import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { checkLogin } from "../../action/login";

function Logout(){
      const navigate = useNavigate();
      const dispatch = useDispatch();
      localStorage.removeItem("access_token");
      useEffect(() => {
        dispatch(checkLogin(false));
        navigate("/login");
      }, []);
    return (
        <>
        </>
    )
}
export default Logout