import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from "react-redux";
import * as actions from "./store/auth/actions";
import './App.css'
import LoginPage from './Containers/Auth/LoginPage';
import RegisterPage from './Containers/Auth/RegisterPage';

import { NavLink } from "react-router-dom";

import { Layout } from 'antd';
const { Header, Footer, Content } = Layout;

const App = (props) => {

  useEffect(() => {
    props.onTryAutoSignup();
  }, []);

  return (
    <Switch>

      <Layout className="mainLayout">
        <Header style={{ backgroundColor: 'transparent' }}>
        <NavLink   exact to='/' onClick={props.logout}>
          logout
        </NavLink>
        </Header>
        <Content>
          <Switch>
            <Route path="/register" component={RegisterPage} />

            <Route path="/" component={LoginPage} />

          </Switch>
        </Content>
        <Footer>Footer</Footer>
      </Layout>

    </Switch>
  );
}


const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
    logout: () =>dispatch(actions.logout()),

  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

