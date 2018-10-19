import React from 'react';
import { Card } from 'antd';
import "./placeholderinfo.css"

const PlaceholderInfo = ({ ...props }) => (
	<Card title="Placeholder info" style={{ marginBottom: "15px" }}>
		<dl className="inline-flex">
			<dt>Title</dt>
			<dd>Deadpool 2</dd>
			<dt>ID</dt>
			<dd>U1234567</dd>
			<dt>Platform</dt>
			<dd>Vod</dd>
			<dt>Audio</dt>
			<dd>Atmos</dd>
			<dt>FPS</dt>
			<dd>25</dd>
			<dt>Colour Space</dt>
			<dd>HDR</dd>
			<dt>License</dt>
			<dd>Acquired</dd>
			<dt>Type</dt>
			<dd>Movie</dd>
		</dl>
	</Card>
);

export default PlaceholderInfo;
