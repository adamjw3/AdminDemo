import React, { Component, Fragment } from 'react';
import { Tabs } from 'antd';
import PageTitle from "../components/pageTitle/PageTitle"
import SearchableTable from "../components/searchableTable/SearchableTable";
import Placeholder from "../components/placeholder/Placeholder";

const TabPane = Tabs.TabPane;

class Archive extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: [
        {
          name: "process",
          defaultValue: "Filter by process",
          items: [
            "Video Arrived",
            "AQC",
            "QC",
            "Compliance",
            "TX Master",
            "X Archived"
          ]
        },
        {
          name: "status",
          defaultValue: "Filter by status",
          items: ["Active", "Complete", "Failed"]
        }
      ],
      columns: [
        {
          title: "U-ID",
          dataIndex: "mediaID",
          sorter: () => { },
          render: mediaID => {
            return (
              <span className={"table-link"} onClick={() => this.setState({ recordId: mediaID })}>{mediaID}</span>
            );
          }
        },
        {
          title: "Title",
          dataIndex: "description",
          sorter: () => { }
        },
        {
          title: "Status",
          dataIndex: "status",
          sorter: () => { }
        },
        {
          title: "Process",
          dataIndex: "process",
          sorter: () => { }
        }
      ]
    };
  }

  render() {
    return (
      <Fragment>
        <PageTitle pageTitle={"Spot Check and Archive"} />
        <Tabs style={{paddingLeft: "15px", paddingRight: "15px"}}>
          <TabPane tab="Spot Check" key="1">
            <SearchableTable
              columns={this.state.columns}
              filters={this.state.filters}
              apiUrl={"http://localhost:3000/data"}/>
          </TabPane>
          <TabPane tab="Archive" key="2">
            <SearchableTable
              columns={this.state.columns}
              filters={this.state.filters}
              apiUrl={"http://localhost:3000/data"}/>
          </TabPane>
        </Tabs>
        <Placeholder
          recordId={this.state.recordId}
          placeholderType="SpotCheck" />
      </Fragment>
    );
  }
}

export default Archive;