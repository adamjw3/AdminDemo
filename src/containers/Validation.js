import React, { Component, Fragment } from 'react';
import PageTitle from "../components/pageTitle/PageTitle"
import SearchableTable from "../components/searchableTable/SearchableTable";
import Placeholder from "../components/placeholder/Placeholder";

class Validation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: "id",
          dataIndex: "id",
        },
        {
          title: "Title",
          dataIndex: "Title",
          sorter: () => { },
          render: (id, record) => {
            return (
              <span className={"table-link"} onClick={() => this.setState({ recordId: record.id })}>{record.Title}</span>
            );
          }
        },
        {
          title: "File Type",
          dataIndex: "File Type",
          sorter: () => { }
        },
        {
          title: "Supplier",
          dataIndex: "Supplier",
          sorter: () => { }
        },
        {
          title: "Delivery Date",
          dataIndex: "Delivery Date",
          sorter: () => { }
        }
      ]
    };
  }

  render() {
    return (
      <Fragment>
        <PageTitle pageTitle={"Validation"} />
          <SearchableTable
            columns={this.state.columns}
            apiUrl={"http://localhost:3000/matchMedia"}
            style={{padding: "15px"}}/>
        <Placeholder
          recordId={this.state.recordId}
          placeholderType="Validation" />
      </Fragment>
    );
  }
}

export default Validation;