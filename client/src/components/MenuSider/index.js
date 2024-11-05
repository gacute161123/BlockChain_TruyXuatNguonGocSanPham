import {
  DashboardOutlined,
  UserOutlined,
  AlignLeftOutlined,
  KeyOutlined,
  UserSwitchOutlined,
  SnippetsOutlined,
  ScheduleOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import "./MenuSider.scss";
import { useSelector } from "react-redux";

function MenuSider() {
  const currentData = useSelector((state) => state.currentDataReducer);
  const userRole = currentData?.currentData?.data?.role;

  const items = [
    {
      key: "/admin",
      label: <Link to="/admin">Tổng quan</Link>,
      icon: <DashboardOutlined />,
      className: "menu-link",
    },
    ...(userRole === "COMPANY" || userRole === "ADMIN"
      ? [
          {
            key: "/product-manage",
            label: <Link to="/product-manage">Quản lý sản phẩm</Link>,
            icon: <SnippetsOutlined />,
            className: "menu-link",
          },
        ]
      : []),
    ...(userRole === "ADMIN"
      ? [
          {
            key: "/supplier-manage",
            label: <Link to="/supplier-manage">Quản lý nhà cung cấp</Link>,
            icon: <SnippetsOutlined />,
            className: "menu-link",
          },
        ]
      : []),

    ...(userRole === "COMPANY" || userRole === "ADMIN"
      ? [
          {
            key: "/productionStage-manage",
            label: (
              <Link to="/productionStage-manage">QLý giai đoạn sản xuất</Link>
            ),
            icon: <ProfileOutlined />,
            className: "menu-link",
          },
        ]
      : []),

    ...(userRole === "QUALITY_UNIT" || userRole === "ADMIN"
      ? [
          {
            key: "/auditlog-manage",
            label: <Link to="/auditlog-manage">Nhật ký kiểm tra</Link>,
            icon: <ScheduleOutlined />,
            className: "menu-link",
          },
        ]
      : []),

    // Hiển thị "Phân quyền người dùng nếu vai trò là ADMIN
    ...(userRole === "ADMIN"
      ? [
          {
            key: "/role",
            label: <Link to="/role">Phân quyền người dùng</Link>,
            icon: <UserSwitchOutlined />,
            className: "menu-link",
          },
        ]
      : []),
    {
      key: "/account-manage",
      label: <Link to="/account-manage">Quản lý tài khoản</Link>,
      icon: <UserOutlined />,
      className: "menu-link",
    },
    {
      key: "/chukyso-manage",
      label: <Link to="/chukyso-manage">Chữ ký số</Link>,
      icon: <KeyOutlined />,
      className: "menu-link",
    },
  ];

  return (
    <Menu
      mode="inline"
      items={items}
      defaultSelectedKeys={["/admin"]}
      defaultOpenKeys={["/admin"]}
    />
  );
}

export default MenuSider;
