import React from 'react';
import {Link} from 'react-router-dom';
import { Layout, Menu, Breadcrumb, Typography } from 'antd';
import './MamaApp.css';
import {createUseStyles} from 'react-jss'

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const useStyles = createUseStyles({
  menu: {
    display: "flex",
    justifyContent: "flex-end"
  },
  title: {
    width: "130px",
    height: "31px",
    margin: "16px 28px 16px 0",
    float: "left"
  },
  content: {
    padding: '0 24px'
  },
  breadcrumb: {
    margin: '16px 0'
  },
  layout: {
    background: "#fff",
    padding: '24px 0'
  },
  footer: {
    textAlign: 'center'
  }
});

function AppLayout({children, match}) {

  const urlToArr = (url) => {
    return url.replaceAll("-", " ").split("/").filter(el => el !== "").map(str => str.charAt(0).toUpperCase() + str.slice(1))
  }

  const classes = useStyles()
  const urlArray = urlToArr(match.url)
  return (
    <Layout>
    <Header>
      <Title
        className={classes.title}
        level={3}
        >
          <Link to="/">MamaKitchen</Link></Title>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} className={classes.menu}>
        <Menu.Item key="1">Log In</Menu.Item>
        <Menu.Item key="2">Sign In</Menu.Item>
      </Menu>
    </Header>
    <Content className={classes.content}>
      <Breadcrumb className={classes.breadcrumb}>
        {urlArray.map(urlItem => <Breadcrumb.Item>{urlItem}</Breadcrumb.Item>)}
        {/* TODO: da cambiare in maniera dinamica rispetto alla pagina */}
        {/* <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>kitchen list</Breadcrumb.Item> */}
      </Breadcrumb>
      <Layout className={classes.layout}>
        <Content className={classes.content}>
          {children}
        </Content>
      </Layout>
    </Content>
    <Footer className={classes.footer}>MamaKitchen © 2020 Created by Tomashco</Footer>
  </Layout>
  );
}

export default AppLayout;
