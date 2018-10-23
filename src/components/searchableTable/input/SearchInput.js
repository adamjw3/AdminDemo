import React from 'react';
import { Input } from 'antd';

const SearchBox = Input.Search;

const SearchInput = ({...props}) => (
 <SearchBox
  placeholder="Type Search"
  style={{ float: 'right', width: '40%' }}
  onSearch={props.onSearch}
  value={props.value}
  onChange={props.onChange}
  enterButton
 />
);

export default SearchInput;
