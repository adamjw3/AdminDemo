import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Menu, Icon } from "antd";

const SubMenu = Menu.SubMenu;

class Navigation extends Component {
	render() {
		return (
			<Menu theme="dark" mode="inline">
				<Menu.Item key="1">
					<Link to="/">
						<Icon type="dashboard" />
						<span>Dashboard</span>
					</Link>
				</Menu.Item>
        <Menu.Item key="2">
					<Link to="/events">
						<Icon type="global" />
						<span>Events</span>
					</Link>
				</Menu.Item>
				<Menu.Item key="3">
					<Link to="/workflow">
						<Icon type="laptop" />
						<span>Workflow status</span>
					</Link>
				</Menu.Item>
				<Menu.Item key="4">
					<Link to="/achive">
						<Icon type="file-done" />
						<span>Archive</span>
					</Link>
				</Menu.Item>
				<SubMenu
					key="sub1"
					title={
						<span>
							<Icon type="right" />
							<span>Work List</span>
						</span>
					}
				>
					<Menu.Item key="5">
            <Link to="/matchMedia">
              Match Media
					  </Link>
          </Menu.Item>
					<Menu.Item key="6">
            <Link to="/validation">
              Validation
					  </Link>
          </Menu.Item>
          <Menu.Item key="7">
            <Link to="/qc">
              QC
					  </Link>
          </Menu.Item>
          <Menu.Item key="8">
            <Link to="/compliance">
            Compliance
					  </Link>
          </Menu.Item>
          <Menu.Item key="9">
            <Link to="/createtxmaster">
              Create TX Master
					  </Link>
          </Menu.Item>
          <Menu.Item key="10">
            <Link to="/inhouse">
              In House
					  </Link>
          </Menu.Item>
          <Menu.Item key="11">
            <Link to="/archiveworklist">
              Archive
					  </Link>
          </Menu.Item>
				</SubMenu>
			</Menu>
		);
	}
}

export default Navigation;
