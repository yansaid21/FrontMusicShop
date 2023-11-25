import React, { useEffect, useState } from "react";
import "./AdminLayout.scss";
import {
  DesktopOutlined,
  LogoutOutlined,
  PieChartOutlined,
  ShoppingCartOutlined,
  AppstoreAddOutlined,
  GoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import ItemsSection from "../../Pages/Admin/AdminItems/ItemsSection";
import GeneralFooter from "../../MenuComponents/GeneralFooter/GeneralFooter";
import { Auth } from "../../../api";
import UserTable from "../../Tables/UserTable/UserTable";
import { useAuth } from "../../../hooks/useAuth";
const { Header, Content, Sider } = Layout;
const authController = new Auth();

function getItem(label, key, icon, children, onClick, component) {
  return {
    key,
    icon,
    children,
    label,
    onClick,
    component,
  };
}

const AdminLayout = (props) => {
  const { logout } = useAuth();
  const [selectedItem, setSelectedItem] = useState(null);
  const [showTable, setShowTable] = useState(false);
  const [showItemSection, setShowItemSection] = useState(false);

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

  const handleLogoutClick = () => {
    logout();
    window.location.href = "/login";
  };

  const items = [
    getItem("Option 1", "1", <PieChartOutlined />),
    getItem("Option 2", "2", <DesktopOutlined />),
    getItem(
      "Users",
      "3",
      <UserOutlined />,
      null,
      () => setSelectedItem("3"),
      <UserTable token={token} />
    ),
    getItem("Items", "sub1", <ShoppingCartOutlined />, [
      getItem("Slide", "6", <AppstoreAddOutlined />),
      getItem(
        "All",
        "8",
        <GoldOutlined />,
        null,
        () => {setSelectedItem("8")
      console.log("selected item dentro del all",selectedItem);},
        <ItemsSection token={token} />
      ),
    ]),
    getItem("Log Out", "9", <LogoutOutlined />, null, handleLogoutClick),
  ];
  console.log("items", items);

  const { children } = props;
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  console.log("selected item antes del return",selectedItem);
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
            justifyContent: "center",
            alignItems: "center",
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <p style={{ marginLeft: "50%" }}>Admin</p>
        </Header>
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
            {
            selectedItem != undefined
              ? items.find((myItem) => myItem.key === selectedItem).component
              : children}
          </div>
        </Content>

        <GeneralFooter classname="adminFooter" />
      </Layout>
    </Layout>
  );
};
export default AdminLayout;
