import React, { Component } from 'react';
import { Drawer, Spin } from 'antd';
import WorkFlowAndEvents from "./workflowAndEvents/WorkFlowAndEvents"
import MatchMedia from "./matchMedia/MatchMedia";
import Qc from "./qc/Qc";
import Compliance from "./compliance/Compliance"
import SpotCheck from "./spotCheck/SpotCheck"

class Placeholder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      loading: false,
      recordId: null,
    };
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.recordId !== prevProps.recordId) {
      this.onToggleDrawer(this.props.recordId);
    }
  }
  // Toggle the placeholder ant draw slide out
  onToggleDrawer = id => {
    this.setState({
      isVisible: this.state.isVisible ? false : true,
      recordId: id
    });
  };

  render() {
    let placeholder = null;

    if (this.props.placeholderType === "Standard") {
      placeholder = <WorkFlowAndEvents recordId={this.props.recordId} />
    }

    if (this.props.placeholderType === "MatchMedia") {
      placeholder = <MatchMedia recordId={this.props.recordId} />
    }

    if (this.props.placeholderType === "Qc") {
      placeholder = <Qc recordId={this.props.recordId} />
    }

    if(this.props.placeholderType === "Compliance") {
      placeholder = <Compliance recordId={this.props.recordId} />
    }

    if(this.props.placeholderType === "SpotCheck") {
      placeholder = <SpotCheck recordId={this.props.recordId} />
    }

    return (
      <Drawer
        width={"80%"}
        placement="right"
        closable={true}
        onClose={() => this.onToggleDrawer()}
        visible={this.state.isVisible}>
        <Spin spinning={this.state.loading}></Spin>
        {!this.state.loading &&
          placeholder
        }
      </Drawer>
    );
  }
}

export default Placeholder;