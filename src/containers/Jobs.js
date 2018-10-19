import React, { Component } from 'react';
import axios from 'axios'
import { Row, Col, Steps, Button } from 'antd';
import Placeholder from "./Placeholder";
import Search from "../components/search/Search"
import DataTable from "../components/dataTable/DataTable"
import "./jobs.css";
import Filter from "../components/filter/Filter";
import { processList, statusList } from "../constants";

const Step = Steps.Step;

class Jobs extends Component {
  state = {
    columns: [{
      title: 'U-ID',
      dataIndex: 'mediaID',
      sorter: () => {}, 
      render: mediaID => {
        return (
          <span onClick={() => this.toggleDrawer(mediaID)}>{mediaID}</span>
        )
      },
    }, {
      title: 'Title',
      dataIndex: 'description',
      sorter: () => {}, 
    }, {
      title: 'Status',
      dataIndex: 'status',
      sorter: () => {}, 
    },
    {
      title: 'Process',
      dataIndex: 'process',
      sorter: () => {}, 
    }],
    drawVisible: false,
    data: [],
    pagination: {},
    searchTerm: null,
    sortField: null,
    sortOrder: null,
    StatusFilter: "",
    ProcessFilter: "",
    loading: false,
    placeHolderId: null,
  };

  componentDidMount() {
    this.fetchJobs()
  }

  handleTableChange = (pagination, sorter) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
      sortField: sorter.field,
      sortOrder: sorter.order === "descend" ? "desc" : "asc",
    }, () => {
      this.fetchJobs({
        results: pagination.pageSize,
        _page: pagination.current,
        _sort: this.state.sortField,
        _order: this.state.sortOrder
      });
    });
  }

  fetchJobs = (params = {}) => {
    const filters = {}
    
    if(this.state.StatusFilter !== "") {
      filters["status"] = this.state.StatusFilter;
    }

    if(this.state.ProcessFilter !== "") {
      filters["process"] = this.state.ProcessFilter;
    }

    console.log("filters", filters);
   
    this.setState({
      loading: true
    })

    axios
      .get("http://localhost:3000/data", {
        params: {
          _limit: 10,
          ...filters,
          ...params
        }
      })
    .then(response => {
      const pagination = { ...this.state.pagination };
      pagination.total = parseInt(response.headers["x-total-count"]);
      this.setState({
        loading: false,
        data: response.data,
        pagination,
      })
    });
  };

  Search = (value) => {
    if(value) {
      this.setState({
        searchTerm: value,
      }, function(){
        this.fetchJobs({
          q: this.state.searchTerm,
          _sort: this.state.sortField,
          _order: this.state.sortOrder
        });
      })
    }
  }

  ExpandedRowRender = (record) => {
    return (
      <div>
      <Steps size="small" current={1} status="process" labelPlacement="vertical">
        <Step title="Finished" description="Video Arrived" />
        <Step title="In Process" description="AQC" />
        <Step title="Error" status="error" description="QC" />
        <Step title="Waiting" description="Compliance" />
        <Step title="Waiting" description="TX Master" />
        <Step title="Waiting" description="TX Archived" />
        <Step title="Waiting" description="Src Archived" />
      </Steps>
      <br></br>
      <Steps size="small" current={1} status="process" labelPlacement="vertical" style={{ width: "85%", marginTop: "20px" }}>
        <Step title="In Process" description="Atmos Arrived" />
        <Step title="In Process" description="ec3 created" />
    </Steps>
    </div>
    )
  }

  rowClassName= (record) => {
    if (record.status === "Active") {
      return "row-active"
    } 
    else if (record.status === "Failed") {
      return "row-failed"
    } 
    else {
      return "row-complete"
    }
  }

  onChange = (item, value, key) => {
    console.log("item", item)
    console.log("value", value)
    console.log("key", key)
  }

  onFilterStateChange = (value) => {
    this.setState({
      StatusFilter: value
    }, () => {
      this.fetchJobs()
    })
  }

  onFilterProcessChange = (value) => {
    this.setState({
      ProcessFilter: value
    }, () => {
      this.fetchJobs()
    })
  }

  toggleDrawer = (mediaID) => {
    this.setState({
      drawVisible: this.state.drawVisible ? false : true,
      placeHolderId: mediaID
    })
  }

  onReset = () => {
    this.setState({
      searchTerm: null,
      sortField: null,
      sortOrder: null,
      StatusFilter: "",
      ProcessFilter: ""
    }, () => {
      this.fetchJobs()
    })
  }
  
  render() {
    return (
      <div>
        <Row>
          <Col span={12} style={{paddingLeft:'15px', paddingTop: '15px', paddingBottom: '15px'}}>
            <h1>WORKFLOW STATUS</h1>
          </Col>
        </Row>
        <Row style={{paddingTop: '15px', paddingBottom: '15px'}}>
          <Col span={12} style={{paddingLeft:'15px'}}>
            <Filter
              defaultValue="Filter by state" 
              onChange={this.onFilterStateChange}
              style={{ minWidth: 150 }}
              options={statusList}
              value={this.state.StatusFilter}
            >
            </Filter>
            <Filter
              defaultValue="Filter by Process" 
              onChange={this.onFilterProcessChange}
              style={{ marginLeft: 15, minWidth: 150 }}
              options={processList}
              value={this.state.ProcessFilter}
            >
            </Filter>
            <Button onClick={this.onReset} style={{ marginLeft: 15 }} >
              Reset Filters
            </Button>
          </Col>
          <Col span={12} style={{paddingRight:'15px'}}>
            <Search
              onSearch={this.Search}
            />
          </Col>
        </Row>
        <Row>
          <Col style={{paddingRight: '15px', paddingLeft: '15px'}}>
            <DataTable
              columns={this.state.columns}
              rowKey={record => record.id}
              data={this.state.data}
              pagination={this.state.pagination}
              loading={this.state.loading}
              onChange={this.handleTableChange}
              expandedRowRender={record => this.ExpandedRowRender(record)}
				      rowClassName={record => this.rowClassName(record)}
            >
            </DataTable>
          </Col>
        </Row>
        <Placeholder 
          visible={this.state.drawVisible} 
          toggleDrawer={this.toggleDrawer} 
          placeHolderId={this.state.placeHolderId}
          placeholderType="Standard">
        </Placeholder>
      </div>
    );
  }
}

export default Jobs;
