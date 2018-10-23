import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from "antd";


const PageTitle = ({ ...props }) => (
  <Row>
    <Col style={{ padding: "15px", paddingBottom: 0 }}>
      <h1>{props.pageTitle}</h1>
    </Col>
  </Row>
);

PageTitle.propTypes = {
};

export default PageTitle;