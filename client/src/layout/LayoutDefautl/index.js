import {  Layout } from "antd";
import HeaderLayout from "./HeaderLayout";
import MainLayout from "./MainLayout";
import { getCurrentData } from "../../services/userService";
import { setCurrentData } from "../../action/currentData";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const { Header, Footer, Content } = Layout;
function LayoutDefault() {
  const isLogin = useSelector((state) => state.loginReducer);
  const dispatch = useDispatch();
    useEffect(() => {
      const fetchData = async () => {
        const token = localStorage.getItem("access_token");
        const response = await getCurrentData(token);
        if (response) {
          console.log(response);
          dispatch(setCurrentData(response.message));
          localStorage.setItem("currentUser", JSON.stringify(response.message));
        }
      };
      fetchData();
    }, [isLogin]);
  
  return (
    <>
      <Layout>
        <div className="app-container">
          <HeaderLayout />
          <MainLayout />
          <Footer
            style={{
              backgroundColor: "#00a139",
              display: "flex",
              justifyContent: "center",
              color: "#fff",
            }}
          >
            Footer trantien@
          </Footer>
        </div>
      </Layout>
    </>
  );
}
export default LayoutDefault;
