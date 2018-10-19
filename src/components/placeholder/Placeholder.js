import React, { Component } from 'react';
import { Drawer, Spin } from 'antd';
import StandardPlaceHolder from "../standardPlaceholder/StandardPlaceholder";
import MatchMediaPlaceHolder from "../matchMediaPlaceholder/MatchMediaPlaceholder";

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
      placeholder = <StandardPlaceHolder placeHolderId={this.props.placeHolderId} onClose={this.onClose} />
    }

    if(this.props.placeholderType === "MatchMedia") {
      placeholder = <MatchMediaPlaceHolder placeHolderId={this.props.placeHolderId} onClose={this.onClose} />
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