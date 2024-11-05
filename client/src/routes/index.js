import { Children } from "react";
import LayoutDefault from "../layout/LayoutDefautl";
import Home from "../pages/Home/index";
import Product from "../pages/Products";
import ProductDetail from "../pages/Products/ProductDetail";
import Login from "../pages/Login";
import Logout from "../pages/Logout";
import Register from "../pages/Register";
import LayoutAdmin from "../layout/LayoutAdmin";
import PrivateRoutes from "../components/PrivateRoutes";
import Dashboard from "../pages/Dashboard";
import SupplierManage from "../pages/SupplierManage"
import ProductManage from "../pages/ProductManage";
import AccountManage from "../pages/AccountManage";
import Role from "../pages/Role";
import DetailProduct from "../pages/ProductManage/DetailProduct";
import SearchProduct from "../pages/SearchProduct";
import ProductionStageManage from "../pages/ProductionStageManage";
import AuditAuditlogManage from "../pages/AuditlogManage";
import ChuKyDienTu from "../pages/ChuKyDienTu";

export const routes = [
  {
    path: "/",
    element: <LayoutDefault />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "product",
        element: <Product />,
      },
      {
        path: "product/product-detail/:id",
        element: <ProductDetail />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "logout",
        element: <Logout />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "product/search",
        element: <SearchProduct />,
      },
    ],
  },

  {
    element: <PrivateRoutes />,
    children: [
      {
        element: <LayoutAdmin />,
        children: [
          {
            path: "admin",
            element: <Dashboard />,
          },
          {
            path: "supplier-manage",
            element: <SupplierManage />,
          },
          {
            path: "product-manage",
            element: <ProductManage />,
          },
          {
            path: "account-manage",
            element: <AccountManage />,
          },
          {
            path: "role",
            element: <Role />,
          },
          {
            path: "product-detail-manage/:id",
            element: <DetailProduct />,
          },
          {
            path: "productionStage-manage",
            element: <ProductionStageManage />,
          },
          {
            path: "auditlog-manage",
            element: <AuditAuditlogManage />,
          },
          {
            path: "chukyso-manage",
            element: <ChuKyDienTu />,
          },
        ],
      },
    ],
  },
];