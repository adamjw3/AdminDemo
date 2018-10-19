import React, { Component } from 'react';
import { Modal, Form, Input } from 'antd';

const FormItem = Form.Item;

const ModalMediaID = Form.create()(
    class extends Component {
        render() {
            const { visible, onOk, onCancel, form } = this.props;
            const { getFieldDecorator } = form;

            return (
                <Modal title="Enter the destination Media ID "
                       visible={visible}
                       onOk={onOk}
                       onCancel={onCancel}>
                <Form layout="vertical">
                    <FormItem lable="Media ID e.g M1234567">
                        {getFieldDecorator('mediaId', {
                            rules: [
                                { 
                                    required: true, 
                                    message: 'Please input the media id' 
                                }],
                            })(
                            <Input placeholder="Media ID" />
                        )}
                    </FormItem>
                </Form>
            </Modal>
            );
        }
    }
)

export default ModalMediaID;