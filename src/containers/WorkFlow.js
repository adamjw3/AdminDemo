import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Steps } from "antd";
import PageTitle from "../components/pageTitle/PageTitle"
import SearchableTable from "../components/searchableTable/SearchableTable";
import Placeholder from "../components/placeholder/Placeholder";

class WorkFlow extends Component {
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

  expandedRowRender = record => {
    return (
      <Fragment>
        <Steps
          size="small"
          current={1}
          status="process"
          labelPlacement="vertical"
        >
          <Steps.Step title="Finished" description="Video Arrived" />
          <Steps.Step title="In Process" description="AQC" />
          <Steps.Step title="Error" status="error" description="QC" />
          <Steps.Step title="Waiting" description="Compliance" />
          <Steps.Step title="Waiting" description="TX Master" />
          <Steps.Step title="Waiting" description="TX Archived" />
          <Steps.Step title="Waiting" description="Src Archived" />
        </Steps>
        <br />
        <Steps
          size="small"
          current={1}
          status="process"
          labelPlacement="vertical"
          style={{ width: "85%", marginTop: "20px" }}
        >
          <Steps.Step title="In Process" description="Atmos Arrived" />
          <Steps.Step title="In Process" description="ec3 created" />
        </Steps>
      </Fragment>
    );
  };

  rowClassName = record => {
    if (record.status === "Active") {
      return "row-active";
    } else if (record.status === "Failed") {
      return "row-failed";
    } else {
      return "row-complete";
    }
  };

  render() {
    return (
      <Fragment>
        <PageTitle pageTitle={"WORKFLOW STATUS"} />
        <SearchableTable
          columns={this.state.columns}
          filters={this.state.filters}
          apiUrl={"http://localhost:3000/data"}
          style={{padding: "15px"}}
          expandedRowRender={record => this.expandedRowRender(record)}
          rowClassName={record => this.rowClassName(record)} />
        <Placeholder
          recordId={this.state.recordId}
          placeholderType="Standard" />
      </Fragment>
    );
  }
}

WorkFlow.propTypes = {

};

export default WorkFlow;
