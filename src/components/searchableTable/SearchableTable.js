import React, { Component, Fragment } from 'react';
import axios from "axios";
import { Table, Card, Row, Col } from "antd";
import SearchBar from "./searchBar/SearchBar"

class SearchableTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: false,
      pagination: [],
    }
    this.filters = {};
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
      .get(this.props.apiUrl, {
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

  render() {
    return (
      <Fragment>
        <Row>
          <Col style={this.props.style}>
            <Card bordered={false}>
              <SearchBar
                onChange={this.onChange}
                onSearch={this.onSearch}
                onReset={this.onReset}
                filters={this.props.filters}
                {...this.state} />
             </Card>
             <Card  bordered={false}>
              <Table
                bordered
                columns={this.props.columns}
                rowKey={record => record.id}
                dataSource={this.state.data}
                pagination={this.state.pagination}
                loading={this.state.loading}
                onChange={this.handleTableChange}
                expandedRowRender={this.props.expandedRowRender}
                rowClassName={this.props.rowClassName} />
            </Card>
          </Col>
        </Row>
      </Fragment>
    );
  }
}

export default SearchableTable;
