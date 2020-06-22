import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import { withFirebase } from './Firebase';
import { AuthUserContext, withAuthentication } from './Session';
import { Layout, Menu, Breadcrumb, Typography } from 'antd';
import './App.css';
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
// {children, match, firebase, authUser}
function AppLayout({children, firebase, history, location, match, findKitchen}) {

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
        <AuthUserContext.Consumer>
          {authUser =>
          authUser ?
            <Menu theme="dark" mode="horizontal" className={classes.menu}>
              {/* <Menu.Item key="1">
                <Link to={`/kitchen/edit/${authUser => findKitchen(authUser)}`}>My kitchen</Link>
              </Menu.Item> */}
              <Menu.Item key="2">
                <Link to="/" onClick={firebase.doSignOut}>Sign Out</Link>
              </Menu.Item>
            </Menu>
            : <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} className={classes.menu}>
                <Menu.Item key="1">
                  <Link to="/login">Log In</Link>
                </Menu.Item>
                <Menu.Item key="2">
                  <Link to="/signin">Sign In</Link>
                </Menu.Item>
            </Menu>
          }
        </AuthUserContext.Consumer>
    </Header>
    <Content className={classes.content}>
      <Breadcrumb className={classes.breadcrumb}>
        {urlArray.map(urlItem =>
          <Breadcrumb.Item key={urlItem}>{urlItem}</Breadcrumb.Item>)}
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

export default withFirebase(AppLayout); //aggiunge firebase context consumer
