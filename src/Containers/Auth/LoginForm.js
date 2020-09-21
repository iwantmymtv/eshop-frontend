import React from "react";
import { Redirect, NavLink } from "react-router-dom";

import { connect } from "react-redux";
import { authLogin } from "../../store/auth/actions";
import { Form, Input, Button, Checkbox, Spin, Space } from 'antd';

import { UserOutlined, LockOutlined } from '@ant-design/icons';

const LoginForm = props => {

  const onFinish = (values) => {
    props.login(values.email, values.password);
  };

  const { error, loading, authenticated } = props;

  if (authenticated) {
    return <Redirect to="/" />
  } else {
    return (
      <React.Fragment>
        {loading &&
          <Space align="center" size="large">
            <Spin size="large" style={{ marginBottom: 20 }} />
          </Space>}
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Írd be az emailed', type: 'email', }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Írd be a jelszavad!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          {error && <p style={{ color: 'red' }}>{error.non_field_errors}</p>}

          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Emlékezz rám</Checkbox>
            </Form.Item>
            {props.registerButton && (
              <NavLink exact to="/register" >Regisztrálj</NavLink>
            )}
            

          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Belépés
                  </Button>

          </Form.Item>
        </Form>
      </React.Fragment>
    );
  }
}


const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    token: state.auth.token,
    authenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: (email, password) => dispatch(authLogin(email, password))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);