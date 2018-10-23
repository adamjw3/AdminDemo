import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import PageTitle from "../components/pageTitle/PageTitle"
import SearchableTable from "../components/searchableTable/SearchableTable";
import Placeholder from "../components/placeholder/Placeholder";

class Compliance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: "U-ID",
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
          dataIndex: "Title",
          sorter: () => { }
        },
        {
          title: "Type",
          dataIndex: "Type",
          sorter: () => { }
        },
        {
          title: "License",
          dataIndex: "License",
          sorter: () => { }
        },
        {
          title: "Update Date",
          dataIndex: "Update DateÍ",
          sorter: () => { }
        }
      ]
    };
  }

  render() {
    return (
      <Fragment>
        <PageTitle pageTitle={"COMPLIANCE LIST"} />
        <SearchableTable
          columns={this.state.columns}
          apiUrl={"http://localhost:3000/compliance"} 
          style={{padding: "15px"}}/>
        <Placeholder
          recordId={this.state.recordId}
          placeholderType="Compliance" />
      </Fragment>
    );
  }
}

Compliance.propTypes = {

};

export default Compliance;