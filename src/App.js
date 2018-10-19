import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Layout, Row, Col } from "antd";
import Navigation from "./components/navigation/Navigation";
import Dashboard from "./containers/Dashboard";
import Events from "./containers/Events";
import Archive from "./containers/Archive";
import MatchMedia from "./containers/MatchMedia";
import Validation from "./containers/Validation";
import Qc from "./containers/Qc";
import CreateTxMaster from "./containers/CreateTxMaster";
import Compliance from "./containers/Compliance"
import InhouseTasks from "./containers/InhouseTasks";
import MenuToggle from "./components/menuToggle/MenuToggle";
import MenuLogOut from "./components/menuLogOut/MenuLogOut";
import WorkFlow from "./containers/WorkFlow";
import SkyLogo from "./sky-logo.png";
import Placeholder from './containers/Placeholder';
import "./app.css"

const { Header, Sider, Content } = Layout;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuCollapsed: false,
    };
  }

  toggleMenuCollapsed = () => {
    this.setState({
      menuCollapsed: !this.state.menuCollapsed
    });
  };

  render() {
    return (
      <Router>
        <Layout>
          <Sider
            trigger={null}
            collapsible
            collapsed={this.state.menuCollapsed}
            style={{ minHeight: "100vh" }}
          >
            <div style={{ height: "64px", position: "relative", lineHeight: "64px", paddingLeft: "24px", background: "#002140", overflow: "hidden" }}>
              <img src={SkyLogo} alt="sky" style={{ width: "34px", display: "inline-block" }} />
              <h1 style={{ color: "#ffffff", display: "inline-block", verticalAlign: "sub", marginLeft: "15px", fontSize: "20px" }}>UHD VOD</h1>
            </div>
            <Navigation />
          </Sider>
          <Layout>
            <Header style={{ background: '#fff', padding: 0 }}>
              <Row type="flex">
                <Col span={12}>
                  <MenuToggle
                    collapsed={this.state.menuCollapsed}
                    toggleMenuCollapsed={this.toggleMenuCollapsed}
                  />
                </Col>
                <Col span={12} style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '20px' }}>
                  <MenuLogOut></MenuLogOut>
                </Col>
              </Row>
            </Header>
            <Content>
              <Route exact path='/' component={Dashboard} />
              <Route exact path='/workflow' component={WorkFlow} />
              <Route exact path='/events' component={Events} />
              <Route exact path='/archive' component={Archive} />
              <Route exact path='/matchMedia' component={MatchMedia} />
              <Route exact path='/validation' component={Validation} />
              <Route exact path='/qc' component={Qc} />
              <Route exact path="/compliance" component={Compliance} />
              <Route exact path="/createTxMaster" component={CreateTxMaster} />
              <Route exact path="/inhouseTasks" component={InhouseTasks} />
              <Route exact path="/placeholder/:id" component={Placeholder} />
            </Content>
          </Layout>
        </Layout>
      </Router>
    );
  }
}

export default App;
