import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Filter from "../filter/Filter"
import Search from "../search/Search";
import { Button } from "antd";

let filters = [];
let inputNames = [];

class SearchAndFilters extends Component {

  onChange = (name, value) => {
    if (!inputNames.includes(name)) {
      inputNames.push(name);
    }
    this.props.onChange(name, value);
  };

  onReset = () => {
    this.props.onReset(inputNames);
  };

  setVale = propValue => {
    if (typeof propValue === "undefined") {
      return "";
    } else {
      return propValue;
    }
  };

  render() {
    
    if(this.props.filters) {
      filters = [];
      
      Object.entries(this.props.filters).forEach(filter => {
        filters.push(
          <Filter
            key={filter[1].name}
            style={{ minWidth: 150 }}
            defaultValue={filter[1].defaultValue}
            onChange={value => this.onChange(filter[1].name, value)}
            options={filter[1].items}
            value={this.setVale(this.props[filter[1].name])}
          />
        );
      });
    }

    return (
      <Fragment>
        {filters}
        <Button onClick={this.onReset} style={{ marginRight: "15px" }}>Reset Filters</Button>
        <Search
          onSearch={value => this.props.onSearch(value)}
          value={this.setVale(this.props.searchValue)}
          onChange={e => this.onChange("searchValue", e.target.value)}
        />
      </Fragment>
    );
  }
}


SearchAndFilters.propTypes = {

};

export default SearchAndFilters;