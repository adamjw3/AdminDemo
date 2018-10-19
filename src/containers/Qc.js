import React, { Component, Fragment } from 'react';
import axios from "axios";
import PropTypes from 'prop-types';
import { Table, Row, Col, Button, Tooltip } from "antd";
import SearchAndFilters from "../components/searchAndFilters/SearchAndFilters";
import Placeholder from "../components/placeholder/Placeholder";

class Qc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      pagination: {},
      loading: false,
      drawVisible: false,
      filters: [
      ],
      columns: [
        {
          title: "id",
          dataIndex: "id",
          sorter: () => { },
          render: id => {
            return (
              <span className={"table-link"} onClick={() => this.toggleDrawer(id)}>{id}</span>
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

    this.filters = {};
  }

  onRemoveFromList = (id) => {
    console.log("remove from list", id)
  }

  onLoadInQcTool = (id) => {
    console.log("load in qc tool", id)
  }

  onChange = (name, value) => {
    this.setState({
      [name]: value
    });

    value ? (this.filters[name] = value) : delete this.filters[name];

    this.fetch();
  };

  onReset = items => {
    items.forEach(name => {
      this.setState({
        [name]: ""
      });
    });
    this.filters = {};
    this.fetch();
  };

  onSearch = value => {
    this.fetch({
      q: value
    });
  };

  componentDidMount() {
    this.fetch();
  }

  fetch = (params = {}) => {
    this.setState({
      loading: true
    });

    axios
      .get("http://localhost:3000/qc", {
        params: {
          _limit: 10,
          ...this.filters,
          ...params
        }
      })
      .then(response => {
        const pagination = { ...this.state.pagination };

        pagination.total = parseInt(response.headers["x-total-count"]);

        this.setState({
          loading: false,
          data: response.data,
          pagination: pagination
        });
      });
  };

  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;

    this.setState(
      {
        pagination: pager,
        sortField: sorter.field,
        sortOrder: sorter.order === "descend" ? "desc" : "asc"
      },
      () => {
        this.fetch({
          _page: pagination.current,
          _sort: this.state.sortField,
          _order: this.state.sortOrder
        });
      }
    );
  };

  // Toggle the placeholder ant draw slide out
  toggleDrawer = mediaID => {
    this.setState({
      drawVisible: this.state.drawVisible ? false : true,
      placeHolderId: mediaID
    });
  };

  render() {
    return (
      <Fragment>
        <Row>
          <Col style={{ paddingLeft: '15px', paddingTop: '15px', paddingBottom: '15px' }}>
            <h1>QC WORK LIST</h1>
          </Col>
        </Row>
        <Row style={{ paddingTop: '15px', paddingBottom: '15px' }}>
          <Col style={{ paddingLeft: '15px', paddingRight: "15px" }}>
            <SearchAndFilters
              onChange={this.onChange}
              onSearch={this.onSearch}
              onReset={this.onReset}
              filters={this.state.filters}
              {...this.state}/>
          </Col>
        </Row>
        <Row>
          <Col style={{ paddingRight: '15px', paddingLeft: '15px' }}>
            <Table
              bordered
              columns={this.state.columns}
              rowKey={record => record.id}
              dataSource={this.state.data}
              pagination={this.state.pagination}
              loading={this.state.loading}
              onChange={this.handleTableChange}/>
          </Col>
        </Row>
        <Placeholder
          visible={this.state.drawVisible}
          toggleDrawer={this.toggleDrawer}
          placeHolderId={this.state.placeHolderId}
          placeholderType="Standard" />
      </Fragment>
    );
  }
}

Qc.propTypes = {

};

export default Qc;