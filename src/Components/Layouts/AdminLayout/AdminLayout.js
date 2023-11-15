import React, { useEffect, useState } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import GeneralFooter from "../../MenuComponents/GeneralFooter/GeneralFooter";
import { Auth, GetSellers } from "../../../api";
import GeneralTable from "../../GeneralTable/GeneralTable";
const { Header, Content, Sider } = Layout;
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

const AdminLayout = (props) => {
  const [showTable, setShowTable] = useState(false);
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
  const { data, fetchData } = GetSellers(token);

  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [token]);

  console.log("sellers ", data);

  const items = [
    getItem("Option 1", "1", <PieChartOutlined />),
    getItem("Option 2", "2", <DesktopOutlined />),
    getItem("Users", "3", <UserOutlined />, null, () => setShowTable(true)),
    getItem("Team", "sub2", <TeamOutlined />, [
      getItem("Team 1", "6"),
      getItem("Team 2", "8"),
    ]),
    getItem("Files", "9", <FileOutlined />),
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
            {showTable ? <GeneralTable data={data} token={token} /> : children}
          </div>
        </Content>

        <GeneralFooter />
      </Layout>
    </Layout>
  );
};
export default AdminLayout;
