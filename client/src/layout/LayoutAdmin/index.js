import { Avatar, Badge, Breadcrumb, Button, Dropdown, Flex, Layout } from "antd";
import { useEffect, useState } from "react";
import logoFold from "../../assets/images/logo-fold.png";
import logo from "../../assets/images/logo.png";
import { UserOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  MenuUnfoldOutlined,
  SearchOutlined,
  SettingOutlined,
  CaretDownOutlined,
  BellOutlined,
} from "@ant-design/icons";
import { Link, Outlet } from "react-router-dom";
import MenuSider from "../../components/MenuSider/index";
import "./LayoutAdmin.scss"
import Notify from "../../components/Notify/index"
import { setCurrentData } from "../../action/currentData";
const { Header, Footer, Sider, Content } = Layout;
function LayoutAdmin() {
  //collapsed là cho thanh sider nhỏ lại đóng mở
  const [collapsed, setCollapsed] = useState(false);
   const currentData = useSelector((state) => state.currentDataReducer);
     const dispatch = useDispatch();
     useEffect(() => {
       // Lấy dữ liệu từ local storage khi component được load
       const savedUserData = localStorage.getItem("currentUser");
       if (savedUserData) {
         dispatch(setCurrentData(JSON.parse(savedUserData)));
       }
     }, [dispatch]);
  
    const items = [
      {
        key: "1",
        label: (
          <Link
            to="/"
            style={{ color: "black", textDecoration: "none" }}
            className="fontchu"
          >
            Trang chủ
          </Link>
        ),
      },
      {
        key: "2",
        label: (
          <Link
            to="/logout"
            style={{ color: "black", textDecoration: "none" }}
            className="fontchu"
          >
            Đăng xuất
          </Link>
        ),
      },
    ];
    const breadcrumbItems = [
      {
        title: <Link to="/admin">Home</Link>,
      },
    ];

  return (
    <>
      <Layout className="layout-admin">
        <header className="headerAdmin">
          <div
            className={
              "headerAdmin__logo " +
              (collapsed && "headerAdmin__logo--collapsed")
            }
          >
            {collapsed ? (
              <img src={logoFold} style={{ height: "65px" }} alt="logo" />
            ) : (
              <img src={logo} style={{ height: "65px" }} alt="logo" />
            )}
          </div>
          <div className="headerAdmin__nav">
            <div className="headerAdmin__nav-left">
              <div className="headerAdmin__collapse">
                <MenuUnfoldOutlined
                  onClick={() => setCollapsed(!collapsed)}
                  style={{ color: "#fff" }}
                />
              </div>
            </div>
            <div className="headerAdmin__nav-right">
              <Badge>
                <Avatar
                  shape="square"
                  size="middle"
                  icon={<SearchOutlined />}
                  style={{ marginRight: "10px" }}
                />
              </Badge>
              <Notify/>
              {/* <Badge>
                <Avatar
                  shape="square"
                  size="middle"
                  icon={<BellOutlined />}
                  style={{ marginRight: "10px" }}
                />
              </Badge> */}

              <Dropdown menu={{ items }} arrow placement="bottomRight">
                <div style={{ display: "flex" }}>
                  <Avatar
                    size={36}
                    src={currentData?.currentData?.data?.image}
                  ></Avatar>
                  <div style={{ color: "#f0f0f0", margin: "0px 5px" }}>
                    <div>{currentData?.currentData?.data?.name}</div>
                    <div>{currentData?.currentData?.data?.role}</div>
                  </div>
                </div>
              </Dropdown>
            </div>
          </div>
        </header>
        <Layout>
          <Sider
            className="siderAdmin"
            collapsed={collapsed}
            theme="light"
            width="250"
          >
            <MenuSider />
          </Sider>
          <Content className="contentAdmin">
            <Breadcrumb
              style={{
                margin: "16px 0",
              }}
              items={breadcrumbItems}
            />
            {/* nội dung cần hiển thị chỗ nào thì bỏ outlet vào */}
            <div style={{ backgroundColor: "#fff", padding: "10px 20px" }}>
              <Outlet />
            </div>
          </Content>
        </Layout>
        <Footer
          style={{
            display: "flex",
            backgroundColor: "#fff",
            justifyContent: "center",
            borderTop: "1px solid #edf2f9",
          }}
        >
          {" "}
          copyright @2024 by NgocTien
        </Footer>
      </Layout>
    </>
  );
}
export default LayoutAdmin;
