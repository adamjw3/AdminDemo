import React, { Component } from 'react';
import { Drawer, Spin } from 'antd';
import StandardPlaceHolder from "../components/standardPlaceholder/StandardPlaceholder";

class Placeholder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  onClose = () => {
    this.props.toggleDrawer()
  };

  render() {
    let placeholder = null;

    if(this.props.placeholderType === "Standard") {
      placeholder = <StandardPlaceHolder placeHolderId={this.props.placeHolderId} />
    }
    
    return (
      <Drawer
        width={"80%"}
        placement="right"
        closable={true}
        onClose={this.onClose}
        visible={this.props.visible}>
          <Spin spinning={this.state.loading}></Spin>
          {!this.state.loading &&
            placeholder
          }
      </Drawer>
    );
  }
}

export default Placeholder;