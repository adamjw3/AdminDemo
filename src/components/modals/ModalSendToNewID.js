import React, { Component } from 'react';
import { Modal, Select, Form } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

const ModalSendToNewID = Form.create()(
    class extends Component {
        render() {
            const { visible, onOk, onCancel, form } = this.props;
            const { getFieldDecorator } = form;

            return (
                <Modal title="Select New ID"
                    visible={visible}
                    onOk={onOk}
                    onCancel={onCancel}>
                <Form layout="vertical">
                        <FormItem lable="Select ID">
                            {getFieldDecorator('newID', 
                            {
                                initialValue: "",
                            },
                             {
                                rules: [
                                    { 
                                        required: true, 
                                        message: 'Please Select ID' 
                                    }],
                                })(
                                <Select>
                                    <Option value="">Select ID</Option>
                                    <Option value="1">1</Option>
                                    <Option value="2">2</Option>
                                    <Option value="3">3</Option>
                                    <Option value="4">4</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Form>
                </Modal>
            );
        }
    }
)

export default ModalSendToNewID;