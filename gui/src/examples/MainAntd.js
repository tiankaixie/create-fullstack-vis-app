import { Layout, Menu, Breadcrumb, Space, Card, Row, Col } from "antd";
import React from "react";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import Histogram from "./Histogram";
import HistogramNivo from "./HistogramNivo";
import LinechartNivo from "./LinechartNivo";

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

export default class MainAntd extends React.Component {
  render() {
    const { globalHeight } = this.props;
    // console.log(globalHeight);
    return (
      <Layout>
        <Header className="header">
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
            <Menu.Item key="1">nav 1</Menu.Item>
            <Menu.Item key="2">nav 2</Menu.Item>
            <Menu.Item key="3">nav 3</Menu.Item>
          </Menu>
        </Header>
        <Layout>
          <Sider width={200} className="site-layout-background">
            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              style={{ height: "100%", borderRight: 0 }}
            >
              <SubMenu key="sub1" icon={<UserOutlined />} title="subnav 1">
                <Menu.Item key="1">option1</Menu.Item>
                <Menu.Item key="2">option2</Menu.Item>
                <Menu.Item key="3">option3</Menu.Item>
                <Menu.Item key="4">option4</Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" icon={<LaptopOutlined />} title="subnav 2">
                <Menu.Item key="5">option5</Menu.Item>
                <Menu.Item key="6">option6</Menu.Item>
                <Menu.Item key="7">option7</Menu.Item>
                <Menu.Item key="8">option8</Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub3"
                icon={<NotificationOutlined />}
                title="subnav 3"
              >
                <Menu.Item key="9">option9</Menu.Item>
                <Menu.Item key="10">option10</Menu.Item>
                <Menu.Item key="11">option11</Menu.Item>
                <Menu.Item key="12">option12</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout style={{ padding: "0 24px 24px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Content
              className="site-layout-background"
              style={{
                margin: 0,
                minHeight: globalHeight * 0.8,
              }}
            >
              <Row>
                <Col span={"10"}>
                  <Card title={"Histogram"}>
                    {/* <Histogram
                                            svgID={"histogram"}
                                            canvasHeight={globalHeight * 0.3}
                                        /> */}

                    {/* <HistogramNivo
                                            canvasHeight={globalHeight * 0.3}
                                        /> */}
                    <LinechartNivo canvasHeight={globalHeight * 0.3} />
                  </Card>
                </Col>
              </Row>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}
