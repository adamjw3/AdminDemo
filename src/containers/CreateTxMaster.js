import React, { Component, Fragment } from 'react';
import { Progress, Tooltip, Button } from "antd";
import PageTitle from "../components/pageTitle/PageTitle"
import SearchableTable from "../components/searchableTable/SearchableTable";
import Placeholder from "../components/placeholder/Placeholder";

class CreateTxMaster extends Component {
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
          items: ["In Progress", "Failed", "Complete"]
        }
      ],
      columns: [
        {
          title: "U-ID",
          dataIndex: "id",
          sorter: () => { },
        },
        {
          title: "Title",
          dataIndex: "title",
          sorter: () => { }
        },
        {
          title: "hdr/sdr",
          dataIndex: "hdr/sdr",
          sorter: () => { }
        },
        {
          title: "Audio",
          dataIndex: "audio",
          sorter: () => { }
        },
        {
          title: "Framerate",
          dataIndex: "framerate",
          sorter: () => { }
        },
        {
          title: "Update Date time",
          dataIndex: "updatedatetime",
          sorter: () => { }
        },
        {
          title: "Status",
          dataIndex: "status",
          sorter: () => { }
        },
        {
          title: "Action",
          dataIndex: "id",
          render: id => {
            return (
              <Fragment>
                <Tooltip placement="topLeft" title="Create TX Master">
                  <Button type="primary" size={"default"} style={{marginRight: "10px"}} icon="upload" shape="circle" onClick={() => this.onCreateTxMaster(id)} />
                </Tooltip>
                <Tooltip placement="topLeft" title="Reset">
                  <Button type="primary" size={"default"} icon="undo" shape="circle" onClick={() => this.onRest(id)} />
                </Tooltip>
              </Fragment>
            );
          }
        }
      ]
    };
  }

  onCreateTxMaster = (id) => {
    console.log("tx master created", id)
  }

  onRest = (id) => {
    console.log("Reset", id)
  }

  expandedRowRender = record => {
    return (
      <div className="process-list">
        <div className="process-list__item">
          <h3 className="process-list__item-title">CML</h3>
          <Progress type="circle" percent={100} width={80} className="process-list__item-progress"/>
        </div>
        <div className="process-list__item">
          <h3 className="process-list__item-title">CONFORM</h3>
          <Progress type="circle" percent={100} width={80} className="process-list__item-progress"/>
        </div>
        <div className="process-list__item">
          <h3 className="process-list__item-title">Transcode</h3>
          <Progress type="circle" percent={80} width={80} className="process-list__item-progress"/>
        </div>
        <div className="process-list__item">
          <h3 className="process-list__item-title">Audio</h3>
          <Progress type="circle" percent={60} width={80} className="process-list__item-progress"/>
        </div>
        <div className="process-list__item">
          <h3 className="process-list__item-title">Media Info</h3>
          <Progress type="circle" percent={30} width={80} className="process-list__item-progress"/>
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
        <PageTitle pageTitle={"TX MASTER"} />
        <SearchableTable
          columns={this.state.columns}
          filters={this.state.filters}
          apiUrl={"http://localhost:3000/txmaster"}
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


export default CreateTxMaster;