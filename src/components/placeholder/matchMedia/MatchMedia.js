import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Button, Tooltip } from "antd";
import PageTitle from "../../pageTitle/PageTitle"
import SearchableTable from "../../searchableTable/SearchableTable";


class MatchMedia extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: "UID",
          dataIndex: "UID",
          sorter: () => { },
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
          title: "Version",
          dataIndex: "Version",
          sorter: () => { }
        },
        {
          title: "Color Space",
          dataIndex: "Color Space",
          sorter: () => { }
        },
        {
          title: "Creation Date",
          dataIndex: "Creation Date",
          sorter: () => { }
        },
        {
          title: "Action",
          dataIndex: "UID",
          render: (UID) => {
            return (
              <Tooltip placement="topLeft" title="Match">
                <Button type="primary" size={"default"} icon="sync" shape="circle" onClick={() => this.onMatchMedia(UID)} />
              </Tooltip>

            );
          }
        }
      ]
    };
  }

  onMatchMedia = (emptyPlaceholder) => {
    console.log("matched", emptyPlaceholder)
    this.props.onClose()
  }

  render() {
    return (
      <Fragment>
        <PageTitle pageTitle={"Match Media Empty PlaceHolders -" + this.props.recordId} />
        <SearchableTable
          columns={this.state.columns}
          apiUrl={"http://localhost:3000/emptyPlaceholder"} />
      </Fragment>
    );
  }
}

MatchMedia.propTypes = {

};

export default MatchMedia;