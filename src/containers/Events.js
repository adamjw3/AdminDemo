import React, { Component, Fragment } from 'react';
import axios from "axios";
import PropTypes from 'prop-types';
import { Steps, Table, Row, Col, Progress } from "antd";
import SearchAndFilters from "../components/searchAndFilters/SearchAndFilters";
import Placeholder from "../components/placeholder/Placeholder";

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      pagination: {},
      loading: false,
      drawVisible: false,
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
              <span className={"table-link"} onClick={() => this.toggleDrawer(mediaID)}>{mediaID}</span>
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
      .get("http://localhost:3000/data", {
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

  customDot = (dot, { status, index }) => (
    <Progress type="circle" percent={75}  width={80}/>
  );

  expandedRowRender = record => {
    return (
      <div>
        <Steps
          size="small"
          current={1}
          status="process"
          progressDot={this.customDot}
        >
          <Steps.Step title="In Process" description="Transcode" />
          <Steps.Step title="Waiting" description="Transfer" />
        </Steps>
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
            <h1>Events</h1>
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
              onChange={this.handleTableChange}
              expandedRowRender={record => this.expandedRowRender(record)}
              rowClassName={record => this.rowClassName(record)}/>
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

Events.propTypes = {

};

export default Events;