import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useFirebase } from "react-redux-firebase";
import { Layout, Menu, Breadcrumb, Typography } from "antd";
import { createUseStyles } from "react-jss";
import "./App.css";
import appLayoutStyle from "./styles/appLayoutStyle";

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const useStyles = createUseStyles(appLayoutStyle);

function AppLayout({ children, match }) {
  const urlToArr = (url) => {
    return url
      .split(" ")
      .join("-")
      .split("/")
      .filter((el) => el !== "")
      .map((str) => str.charAt(0).toUpperCase() + str.slice(1));
  };

  const classes = useStyles();
  const urlArray = urlToArr(match.url);

  const firebase = useFirebase();
  const profile = useSelector((state) => state.firebase.profile);
  const kitchens = useSelector(({ firebase: { data } }) => data.kitchens);

  const kitchenId = profile.isEmpty ? "" : profile.kitchenId;
  const kitchenEdit =
    kitchens && kitchens[kitchenId]
      ? `/kitchen/edit/${kitchens[kitchenId].id}`
      : `/`;

  return (
    <Layout>
      <Header>
        <Title className={classes.title} level={3}>
          <Link to="/">MamaKitchen</Link>
        </Title>
        {profile.isEmpty ? (
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            className={classes.menu}
          >
            <Menu.Item key="1">
              <Link to="/login">Log In</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/signin">Sign In</Link>
            </Menu.Item>
          </Menu>
        ) : (
          <Menu theme="dark" mode="horizontal" className={classes.menu}>
            {kitchenId ? (
              <Menu.Item key="1">
                <Link to={kitchenEdit}>Edit kitchen</Link>
              </Menu.Item>
            ) : (
              <Menu.Item key="1">
                <Link to="/newKitchen">new kitchen</Link>
              </Menu.Item>
            )}
            <Menu.Item key="2">
              <Link to="/" onClick={firebase.logout}>
                Sign Out
              </Link>
            </Menu.Item>
          </Menu>
        )}
      </Header>
      <Content className={classes.content}>
        <Breadcrumb className={classes.breadcrumb}>
          {urlArray.map((urlItem) => (
            <Breadcrumb.Item key={urlItem}>{urlItem}</Breadcrumb.Item>
          ))}
        </Breadcrumb>
        <Layout className={classes.layout}>
          <Content className={classes.content}>{children}</Content>
        </Layout>
      </Content>
      <Footer className={classes.footer}>
        MamaKitchen © 2020 Created by Tomashco
      </Footer>
    </Layout>
  );
}

export default AppLayout;
