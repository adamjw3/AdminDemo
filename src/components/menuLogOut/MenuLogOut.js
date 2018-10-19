import React, { Component } from 'react';
import { Menu, Dropdown, Icon, Avatar } from 'antd';

const menu = (
  <Menu>
    <Menu.Item key="0">
      <Icon type="user-delete" />LogOout
    </Menu.Item>
  </Menu>
);

class MenuLogOut extends Component {
  render() {
    return (
      <Dropdown overlay={menu} trigger={['click']}>
        <span className="ant-dropdown-link" style={{cursor: 'pointer'}}>
          <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" /> John Smith
        </span>
      </Dropdown>
    );
  }
}

export default MenuLogOut;