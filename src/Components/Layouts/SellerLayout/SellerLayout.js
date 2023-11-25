import React, { useEffect, useState } from "react";
import "./SellerLayout.scss"
import {
  DesktopOutlined,
  LogoutOutlined ,
  PieChartOutlined,
 CustomerServiceOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import GeneralFooter from "../../MenuComponents/GeneralFooter/GeneralFooter";
import { Auth, GetSellers } from "../../../api";
import ItemTable from "../../Tables/ItemsTable/ItemsTable";
import { useAuth } from "../../../hooks/useAuth";
const { Header, Content,Footer, Sider } = Layout;
const authController = new Auth();

function getItem(label, key, icon, children, onClick) {
    return {
        key,
        icon,
        children,
        label,
        onClick,
    };
}

const SellerLayout = (props) => {
    const {logout}= useAuth()
  const [token, setToken] = useState(null);
  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const accessToken = await authController.getAccessToken();
        setToken(accessToken);
      } catch (error) {
        console.error("Error al obtener la sesión del usuario", error);
      }
    };
    checkUserSession();
  }, []);

const handleLogOutClick = () => {
    console.log("di click");
    logout()
    window.location.href="/login"
  };

const items = [
    getItem("Option 1", "1", <PieChartOutlined />),
    getItem("Option 2", "2", <DesktopOutlined />),
    getItem("Products", "sub2", <CustomerServiceOutlined />, [
      getItem("instrumets", "6"),
      getItem("others", "8"),
    ]),
    getItem("Log Out", "9", <LogoutOutlined />, null, handleLogOutClick),
  ];

  const { children } = props;
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        className="customSider"
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          ></Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            {children}
          </div>
        </Content>
            <Footer style={{ textAlign: 'center' }}> Music Shop ©2023 Created by JEAN SAID ARIAS</Footer>
      </Layout>
    </Layout>
  );
};
export default SellerLayout;