import { Layout } from "antd";
import { Content, Footer } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";

import { Outlet, useLocation } from "react-router-dom";
// import {Header} from "../header/Header";
import SideBar from "../Sidebar/Sidebar";

type MainLLayoutProps = {
  children?: React.ReactNode;
};

const MainLayout = ({ children }: MainLLayoutProps) => {
  const [isTwoColumnsLayout, setIsTwoColumnsLayout] = useState(true);
  const [siderCollapsed, setSiderCollapsed] = useState(true);

  const toggleSider = () => setSiderCollapsed(!siderCollapsed);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SideBar />
      <Layout className="site-layout">
        {/* <Header></Header> */}
        <Content style={{ margin: "0 16px" }}>{children}</Content>
        <Footer style={{ textAlign: "center" }}>
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
