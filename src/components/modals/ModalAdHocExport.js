import React, { Component } from 'react';
import { Modal, Radio, Input, Row, Col } from 'antd';

const RadioGroup = Radio.Group;

class ModalAdHocExport extends Component {
  render() {
    const { visible, onOk, onCancel } = this.props;

    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };

    return (
      <Modal title="AdHoc Export "
        visible={visible}
        onOk={onOk}
        onCancel={onCancel}>
        <Row>
          <Col span={12}>
            <RadioGroup>
              <Radio style={radioStyle} value={1}>Option A</Radio>
              <Radio style={radioStyle} value={2}>Option B</Radio>
              <Radio style={radioStyle} value={3}>Option C</Radio>
            </RadioGroup>
          </Col>
          <Col span={12}>
            <RadioGroup>
              <Radio style={radioStyle} value={1}>Option A</Radio>
              <Radio style={radioStyle} value={2}>Option B</Radio>
              <Radio style={radioStyle} value={3}>Option C</Radio>
            </RadioGroup>
          </Col>
          <Col span={24}>
            <Input></Input>
          </Col>
        </Row>
      </Modal>
    );
  }
}


export default ModalAdHocExport;