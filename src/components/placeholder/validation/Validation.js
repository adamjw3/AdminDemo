import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card, Button } from 'antd';
import PlaceholderInfo from "../info/Info"

class Validation extends Component {
  render() {
    return (
      <Fragment>
        <Row>
          <Col style={{ marginBottom: "15px" }}>{this.props.recordId} - Deadpool 2</Col>
        </Row>
        <Row gutter={16}>
          <Col span={16}>
          </Col>
          <Col span={8}>
            <PlaceholderInfo></PlaceholderInfo>
          </Col>
          <Col span={16}>
          </Col>
          <Col span={8}>
            <Card title="Actions" style={{ marginBottom: "15px" }}>
              <Button type="primary" block style={{ marginBottom: "15px" }}>Fix in House</Button>
              <Button type="primary" block style={{ marginBottom: "15px" }}>Pass</Button>
              <Button type="primary" block style={{ marginBottom: "15px" }}>Reject</Button>
            </Card>
          </Col>
        </Row>
      </Fragment>
    );
  }
}

Validation.propTypes = {

};

export default Validation;