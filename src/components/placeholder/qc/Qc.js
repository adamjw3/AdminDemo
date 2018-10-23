import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card, Button } from 'antd';
import Video from "../../video/Video"
import PlaceholderInfo from "../info/Info"

class Qc extends Component {
  render() {
    return (
      <Fragment>
        <Row>
          <Col style={{ marginBottom: "15px" }}>{this.props.recordId} - Deadpool 2</Col>
        </Row>
        <Row gutter={16}>
          <Col span={16}>
            <Video
              poster="http://mderrick.github.io/react-html5video/f00f2b7d9c763a1ab433fae401a2e13d.png"
              src="http://download.blender.org/peach/bigbuckbunny_movies/big_buck_bunny_480p_h264.mov">
            </Video>
          </Col>
          <Col span={8}>
            <PlaceholderInfo></PlaceholderInfo>
          </Col>
          <Col span={16}>
          </Col>
          <Col span={8}>
            <Card title="Actions" style={{ marginBottom: "15px" }}>
              <Button type="primary" block style={{ marginBottom: "15px" }}>Pass</Button>
              <Button type="primary" block style={{ marginBottom: "15px" }}>Fail</Button>
              <Button type="primary" block style={{ marginBottom: "15px" }}>Refer</Button>
              <Button type="primary" block style={{ marginBottom: "15px" }}>Re-set Status</Button>
            </Card>
          </Col>
        </Row>
      </Fragment>
    );
  }
}

Qc.propTypes = {

};

export default Qc;