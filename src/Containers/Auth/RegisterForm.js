import React from "react";
import { Redirect, NavLink } from "react-router-dom";

import { connect } from "react-redux";
import { authSignup } from "../../store/auth/actions";
import { Form, Input, Button, Checkbox, Space, Spin } from 'antd';

import { UserOutlined, LockOutlined } from '@ant-design/icons';

const Login = props => {

  const onFinish = (values) => {
    console.log('Succes:', values);

    props.signup(values);
  };

  const { error, loading, authenticated } = props;

  if (authenticated) {
    return <Redirect to="/" />
  } else {
    return (
      < React.Fragment>
        {loading &&
          <Space align="center" size="large">
            <Spin size="large" style={{ marginBottom: 20 }} />
          </Space>}
        <Form
          name="normal_signup"
          className="signup-form"
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Írd be az emailed', type: 'email', }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
              type="email" />
          </Form.Item>
          {error && <p style={{ color: 'red' }}>{error.email}</p>}
          
           
        
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Írd be a jelszavad!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Jelszó"
            />
          </Form.Item>
          {error && <p style={{ color: 'red' }}>{error.password1}</p>}
          <Form.Item
            name="password2"
            rules={[{ required: true, message: 'Írd be a jelszavad!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Jelszó mégegyszer"
            />
          </Form.Item>
          {error && <p style={{ color: 'red' }}>{error.password2}</p>}
          {error && <p style={{ color: 'red' }}>{error.non_field_errors}</p>}

          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Elfogadom a szarsagot</Checkbox>
            </Form.Item>
            {props.loginButton && (
              <NavLink exact to="/login" >Belépés</NavLink>
            )}
            
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Regisztráció
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
    signup: (values) => dispatch(authSignup(values))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);