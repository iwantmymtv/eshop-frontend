import React from 'react'
import { Card, Row, Col } from 'antd';
import Register from './RegisterForm';
import { connect } from "react-redux";

const RegisterPage = () => {
  return (
    <Row>
      <Col lg={{ span: 12, offset: 6 }} xs={{ span: 22, offset: 1 }}>
        <Card title="Belépés" className="boxShadow1">
          <Register loginButton/>
        </Card>
      </Col>
    </Row>
  )
}


const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    authenticated: state.auth.token !== null,
  };
};


export default connect(
  mapStateToProps,
)(RegisterPage);