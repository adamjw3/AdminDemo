import React, { Component, Fragment } from 'react';
import axios from "axios";
import PropTypes from 'prop-types';
import { Table, Row, Col, Button, Tooltip } from "antd";
import SearchAndFilters from "../searchAndFilters/SearchAndFilters";

class MatchMediaPlaceholder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      pagination: {},
      loading: false,
      drawVisible: false,
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

    this.filters = {};
  }

  onMatchMedia = (emptyPlaceholder) => {
    console.log("matched", emptyPlaceholder)
    this.props.onClose()
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
      .get("http://localhost:3000/emptyPlaceholder", {
        params: {
          _limit: 10,
          ...this.filters,
          ...params
        }
      })
      .then(response => {
        console.log("response", response);
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

  render() {
    return (
      <Fragment>
        <Row>
          <Col style={{ paddingTop: '15px', paddingBottom: '15px' }}>
            <h1>Match Media Empty PlaceHolders</h1>
          </Col>
        </Row>
        <Row>
          <Col style={{ paddingTop: '15px', paddingBottom: '15px' }}>
            <SearchAndFilters 
              onChange={this.onChange}
              onSearch={this.onSearch}
              onReset={this.onReset}
              filters={this.state.filters}
              {...this.state}
            />
          </Col>
        </Row>
        <Row>
          <Col style={{ paddingTop: '15px', paddingBottom: '15px' }}>
        <Table
          bordered
          columns={this.state.columns}
          rowKey={record => record.index}
          dataSource={this.state.data}
          pagination={this.state.pagination}
          loading={this.state.loading}
          onChange={this.handleTableChange}
        />
        </Col>
        </Row>
      </Fragment>
    );
  }
}

MatchMediaPlaceholder.propTypes = {

};

export default MatchMediaPlaceholder;