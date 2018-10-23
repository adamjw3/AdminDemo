import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Steps, Progress } from "antd";
import PageTitle from "../components/pageTitle/PageTitle"
import SearchableTable from "../components/searchableTable/SearchableTable";
import Placeholder from "../components/placeholder/Placeholder";

class Events extends Component {
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
      <div className="process-list">
        <div className="process-list__item">
          <h3 className="process-list__item-title">Process Title</h3>
          <Progress type="circle" percent={100} width={80} className="process-list__item-progress"/>
        </div>
        <div className="process-list__item">
          <h3 className="process-list__item-title">Process Title</h3>
          <Progress type="circle" percent={100} width={80} className="process-list__item-progress"/>
        </div>
        <div className="process-list__item">
          <h3 className="process-list__item-title">Process Title</h3>
          <Progress type="circle" percent={80} width={80} className="process-list__item-progress"/>
        </div>
        <div className="process-list__item">
          <h3 className="process-list__item-title">Process Title</h3>
          <Progress type="circle" percent={60} width={80} className="process-list__item-progress"/>
        </div>
        <div className="process-list__item">
          <h3 className="process-list__item-title">Process Title</h3>
          <Progress type="circle" percent={30} width={80} className="process-list__item-progress"/>
        </div>
        <div className="process-list__item">
          <h3 className="process-list__item-title">Process Title</h3>
          <Progress type="circle" percent={0} width={80} className="process-list__item-progress"/>
        </div>
      </div>
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
        <PageTitle pageTitle={"Events"} />
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

Events.propTypes = {

};

export default Events;