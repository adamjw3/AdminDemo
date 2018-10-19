import React, { Component } from 'react';
import { Button, Icon } from 'antd'

class MenuToggle extends Component {
  render() {
    return (
      <Button type="primary" onClick={this.props.toggleMenuCollapsed} style={{ height: '100%', borderRadius: 0 }}>
        <Icon type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'} />
      </Button>
    );
  }
}

export default MenuToggle;