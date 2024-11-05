import { NavLink } from "react-router-dom"
import "./MenuHeader.scss"
function MenuHeader(){
      const navLinkActive = (e) => {
        return e.isActive ? "menu__link menu__link--active" : "menu__link";
      };
        const handleScrollToFormApply = (e) => {
          e.preventDefault(); 
          const elementHuongDan = document.getElementById("huongdan");
          if (elementHuongDan) {
            elementHuongDan.scrollIntoView({ behavior: "smooth" });
          }

        };
    return (
      <>
        <div className="menu">
          <ul>
            <li>
              <NavLink to="/" className={navLinkActive}>
                Trang chủ
              </NavLink>
            </li>
            <li>
              <NavLink to="/product" className={navLinkActive}>
                Sản phẩm
              </NavLink>
            </li>
           
            <li>
              <NavLink
                to="#huongdan"
                className={navLinkActive}
                onClick={handleScrollToFormApply}
                style={{
                  color: "#ffffff",
                  textDecoration: "none",
                }}
              >
                Hướng dẫn
              </NavLink>
            </li>
            <li>
              <NavLink to="/combouudai" className={navLinkActive}>
                Liên hệ
              </NavLink>
            </li>
          </ul>
        </div>
      </>
    );
}
export default MenuHeader