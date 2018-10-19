import React, { Component } from 'react';
import axios from 'axios'
import { Row, Col, Card, Button, message } from 'antd';
import ModalMediaID from "../modals/ModalMediaID"
import ModalSendToNewId from "../modals/ModalSendToNewID";
import Video from "../video/Video"
import PlaceholderInfo from "../placeholderInfo/PlaceholderInfo"
import 'react-html5video/dist/styles.css';

class StandardPlaceholder extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			data: [],
			isMediaIDModelVisible: false,
			isSendToNewIdModelVisible: false,
		};
	}

	componentDidUpdate(prevProps) {
		if (this.props.placeHolderId !== prevProps.placeHolderId) {
			this.fetch()
		}
	}

	fetch() {
		this.setState({
			loading: true
		})

		axios
			.get("http://localhost:3000/data", {
				params: {
					_limit: 1,
					mediaID: this.props.placeHolderId
				}
			})
			.then(response => {
				this.setState({
					loading: false,
					data: response.data,
				})
			});
	}

	SendToUhd = () => {
		// Here we will connect to an endpoint and send data matcing the placholder ID
		message.info('Sent to UHD Linear');
	}

	SendToMam = () => {
		this.setState({
			isMediaIDModelVisible: true,
		});
	}

	SendToNewID = () => {
		this.setState({
			isSendToNewIdModelVisible: true,
		});
	}

	handleMediaID = () => {
		// Here we will connect to an endpoint and send data matcing the ID and the Media ID entered
		const form = this.myForm1.props.form;
		console.log(form.getFieldsValue())
		form.validateFields((err, values) => {
			if (err) {
				return;
			}

			console.log('Received values of form: ', values);
			form.resetFields();
			this.setState({
				isMediaIDModelVisible: false
			}, () => {
				message.info('Sent to MAM');
			});
		});
	}

	handleSendToNewId = () => {
		const form = this.myForm2.props.form;
		console.log(form.getFieldsValue())

		form.resetFields();
		this.setState({
			isSendToNewIdModelVisible: false
		}, () => {
			message.info('Sent to New ID');
		});
	}

	handleCancel = () => {
		console.log('Clicked cancel button');
		this.setState({
			isMediaIDModelVisible: false,
			isSendToNewIdModelVisible: false,
		});
	}

	AddToWorkList = () => {
		message.info('Added to work list');
	}

	UnAttach = () => {
		message.info('UnAttached');
	}

	render() {
		return (
			<div>
				<Row>
					<Col style={{ marginBottom: "15px" }}>{this.props.placeHolderId} - Deadpool 2</Col>
				</Row>
				<Row gutter={16}>
					<Col span={16}>
						<Video
							poster="http://mderrick.github.io/react-html5video/f00f2b7d9c763a1ab433fae401a2e13d.png"
							src="http://download.blender.org/peach/bigbuckbunny_movies/big_buck_bunny_480p_h264.mov">
						</Video>
					</Col>
					<Col span={8}>
						<PlaceholderInfo></PlaceholderInfo>
					</Col>
					<Col span={16}>
						<Card title="Work Status" style={{ marginBottom: "15px" }}>
							<p>Card content</p>
							<p>Card content</p>
							<p>Card content</p>
						</Card>
					</Col>
					<Col span={8}>
						<Card title="File Status" style={{ marginBottom: "15px" }}>
							<p>Card content</p>
							<p>Card content</p>
							<p>Card content</p>
						</Card>
						<Card title="AV Media Info" style={{ marginBottom: "15px" }}>
							<p>Card content</p>
							<p>Card content</p>
							<p>Card content</p>
						</Card>
					</Col>
				</Row>
				<Row gutter={16}>
					<Col span={4}>
						<Card title="Validation" style={{ marginBottom: "15px" }}>
							<p>Card content</p>
							<p>Card content</p>
							<p>Card content</p>
						</Card>
					</Col>
					<Col span={4}>
						<Card title="QC" style={{ marginBottom: "15px" }}>
							<p>Card content</p>
							<p>Card content</p>
							<p>Card content</p>
						</Card>
					</Col>
					<Col span={4}>
						<Card title="Compliance" style={{ marginBottom: "15px" }}>
							<p>Card content</p>
							<p>Card content</p>
							<p>Card content</p>
						</Card>
					</Col>
					<Col span={4}>
						<Card title="Spot Check" style={{ marginBottom: "15px" }}>
							<p>Card content</p>
							<p>Card content</p>
							<p>Card content</p>
						</Card>
					</Col>
					<Col span={8}>
						<Card title="Actions" style={{ marginBottom: "15px" }}>
							<Button type="primary" block style={{ marginBottom: "15px" }} onClick={this.SendToUhd}>Send to UHD Linear</Button>
							<Button type="primary" block style={{ marginBottom: "15px" }} onClick={this.SendToMam}>Send to MAM</Button>
							<Button type="primary" block style={{ marginBottom: "15px" }}>Ad-Hoc Export</Button>
							<Button type="primary" block style={{ marginBottom: "15px" }}>Send to QC</Button>
							<Button type="primary" block style={{ marginBottom: "15px" }} onClick={this.SendToNewID}>Send to new ID</Button>
							<Button type="primary" block style={{ marginBottom: "15px" }} onClick={this.AddToWorkList}>Add to worklist</Button>
							<Button type="primary" block onClick={this.UnAttach}>Un-Attach</Button>
							<ModalMediaID
								wrappedComponentRef={(form) => this.myForm1 = form}
								visible={this.state.isMediaIDModelVisible}
								onOk={this.handleMediaID}
								onCancel={this.handleCancel}
							>
							</ModalMediaID>
							<ModalSendToNewId
								wrappedComponentRef={(form) => this.myForm2 = form}
								visible={this.state.isSendToNewIdModelVisible}
								onOk={this.handleSendToNewId}
								onCancel={this.handleCancel}
							>
							</ModalSendToNewId>
						</Card>
					</Col>
				</Row>
			</div>
		);
	}
}

export default StandardPlaceholder;
