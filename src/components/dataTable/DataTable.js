import React, { Component } from 'react';
import { Table } from 'antd';

class DataTable extends Component {
	handleTableChange = (pagination, filters, sorter) => {
		const { onChange } = this.props;
    if (onChange) {
      onChange(pagination, sorter);
    }
	}
	
	render() {
		const { 
			data, 
			pagination,
      loading,
			columns,
			expandedRowRender,
			rowClassName,
		} = this.props;
		
		return (
			<Table
				bordered
				columns={columns}
				rowKey={record => record.id}
				dataSource={data}
				pagination={pagination}
				loading={loading}
				onChange={this.handleTableChange}
				expandedRowRender={expandedRowRender}
				rowClassName={rowClassName}
			>
			</Table>
		);
	}
}

export default DataTable;
