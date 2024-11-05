import { BackTop, Badge, Button, Col, Dropdown, Input, Layout, Row } from "antd";
import { Link, NavLink } from "react-router-dom";
import "./Headerlayout.scss"
import MenuHeader from "../../components/MenuHeader";
import { useSelector } from "react-redux";
import { CaretDownOutlined, DownOutlined } from "@ant-design/icons";
const { Header, Footer, Content } = Layout;

function HeaderLayout(){
   const currentData = useSelector((state) => state.currentDataReducer);
   const token = localStorage.getItem("access_token");
   const role = currentData?.currentData?.data?.role;
    const items = [
  {
    key: '1',
    label: (
      <Link to="/admin" style={{ color: "black", textDecoration: "none" }} className="fontchu">
        Trang quản lý 
        </Link>
    ),
  },
  {
    key: '2',
    label: (
      <Link to="/logout" style={{ color: "black", textDecoration: "none" }}className="fontchu">
        Đăng xuất
      </Link>
    ),
  }
]
    return (
      <>
        <header className="header">
          <div className="header__light">
            <Link to="/">
              <img
                alt="img"
                src="https://truyxuat.gov.vn/templates/vnnews/images/logo.png"
                // style={{ width: "130px", height: "65px" }}
                // style={{ height: "95px" }}
                style={{ height: "50px" }}
              />
            </Link>
            <MenuHeader />
          </div>

          <div className="header__right">
            {token && token.length !== 0 ? (
              // <Dropdown menu={{ items }} arrow placement="bottomRight">
              //   <div className="fontchu" style={{ paddingTop: "10px" }}>
              //     TÀI KHOẢN: &nbsp;
              //     {currentData.currentData.data && (
              //       <>{currentData.currentData.data.name}</>
              //     )}{" "}
              //     <CaretDownOutlined />
              //   </div>
              // </Dropdown>
              <>
                <span>
                  <Link
                    to="/admin"
                    style={{
                      color: "white",
                      textDecoration: "none",
                      cursor: "pointer",
                    }}
                  >
                    {(role === "ADMIN" ||
                      role === "COMPANY" ||
                      role === "QUALITY_UNIT") && (
                      <>
                        <Button className="button-filter">Trang quản lý</Button>
                        &nbsp;
                      </>
                    )}
                  </Link>
                </span>
                <span>
                  <Link
                    to="/logout"
                    style={{
                      color: "white",
                      textDecoration: "none",
                      cursor: "pointer",
                    }}
                  >
                    <Button className="button-filter">Đăng xuất</Button>
                  </Link>
                </span>
              </>
            ) : (
              <>
                <span>
                  <Link
                    to="/login"
                    style={{
                      color: "white",
                      textDecoration: "none",
                      cursor: "pointer",
                    }}
                  >
                    <Button className="button-filter">Đăng nhập</Button> &nbsp;
                    {/* Đăng nhập */}
                  </Link>
                </span>
                <span>
                  <Link
                    to="/register"
                    style={{
                      color: "white",
                      textDecoration: "none",
                      cursor: "pointer",
                    }}
                  >
                    <Button className="button-filter">Đăng ký</Button>
                  </Link>
                </span>
              </>
            )}
          </div>
        </header>
      </>
    );
}
export default HeaderLayout