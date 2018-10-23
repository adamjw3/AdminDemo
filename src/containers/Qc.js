import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Button, Tooltip } from "antd";
import PageTitle from "../components/pageTitle/PageTitle"
import SearchableTable from "../components/searchableTable/SearchableTable";
import Placeholder from "../components/placeholder/Placeholder";

class Qc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: "id",
          dataIndex: "id",
          sorter: () => { },
          render: id => {
            return (
              <span className={"table-link"} onClick={() => this.setState({ recordId: id })}>{id}</span>
            );
          }
        },
        {
          title: "Title",
          dataIndex: "title",
          sorter: () => { }
        },
        {
          title: "license",
          dataIndex: "license",
          sorter: () => { }
        },
        {
          title: "Update Date/Time",
          dataIndex: "update-date",
          sorter: () => { }
        },
        {
          title: "Action",
          dataIndex: "id",
          render: id => {
            return (
              <Fragment>
                <Tooltip placement="topLeft" title="Load in QC">
                  <Button type="primary" size={"default"} icon="upload" shape="circle" onClick={() => this.onLoadInQcTool(id)} />
                </Tooltip>
              </Fragment>
            );
          }
        }
      ]
    };
  }

  onLoadInQcTool = (id) => {
    console.log("load in qc tool", id)
  }

  render() {
    return (
      <Fragment>
        <PageTitle pageTitle={"QUALITY CONTROL"} />
        <SearchableTable
          columns={this.state.columns}
          apiUrl={"http://localhost:3000/qc"} 
          style={{padding: "15px"}} />
        <Placeholder
          recordId={this.state.recordId}
          placeholderType="Qc" />
      </Fragment>
    );
  }
}

Qc.propTypes = {

};

export default Qc;