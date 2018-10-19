import React, { Component, Fragment } from 'react';
import Filter from "../filter/Filter";
import Search from "../search/Search";

class SearchFilterBar extends Component {
  
  onChange = (value, key) => {
    console.log(this)
    this.props.onChange(value, key);
  }

  render() {
    let filters = null;

    const f = this.props.filters;
    const t = this;
    Object.entries(f).forEach(function (filter){

      filters = <Filter
              style={{ minWidth: 150 }}
              defaultValue={filter[0]} 
              onChange={t.onChange}
              options={filter[1]}
            >
            </Filter>
  });
  
    return (
      <Fragment>
        {filters}
        <Search
          onSearch={this.Search}/>
      </Fragment>
    );
  }
}

export default SearchFilterBar;