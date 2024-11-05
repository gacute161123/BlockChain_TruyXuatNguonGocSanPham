import { Flex, Layout, Breadcrumb } from "antd";
import { Link, Outlet } from "react-router-dom";
const { Header, Footer, Content } = Layout;
function MainLayout() {
  return (
    <>
      <Content
        style={{
          backgroundColor: "white",
        }}
      >
        <Outlet />
      </Content>
    </>
  );
}
export default MainLayout;
