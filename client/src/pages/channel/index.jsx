import React from "react";
import * as Cookies from "js-cookie";
import InputChannel from "../../components/InputChannel";
import "./channel.css";
import "../../assets/fonts/css/icons.css";
import { RESOLUTION_ARR } from "../../utils/Settings";

class Channel extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			joinBtn: false,
			channel: "",
			baseMode: "avc",
			transcode: "interop",
			attendeeMode: "video",
			videoProfile: "480p_4",
			email: "",
		};
	}

	componentDidMount() {
		window.addEventListener("keypress", (e) => {
			e.keyCode === 13 && this.handleJoin();
		});
	}

	/**
	 *
	 * @param {String} val 0-9 a-z A-Z _ only
	 * @param {Boolean} state
	 */
	handleChannel = (val, state) => {
		this.setState({
			channel: val,
			joinBtn: state,
		});
	};

	handleJoin = () => {
		if (!this.state.joinBtn) {
			return;
		}
		Cookies.set("channel", this.state.channel);
		Cookies.set("baseMode", this.state.baseMode);
		Cookies.set("transcode", this.state.transcode);
		Cookies.set("attendeeMode", this.state.attendeeMode);
		Cookies.set("videoProfile", this.state.videoProfile);
		if (this.state.baseMode === "avc") {
			window.location.hash = `tutoring/${this.state.channel}`;
		} else {
			window.location.hash = `tutoring/${this.state.channel}`;
		}
	};

	handleGenerateChannel = () => {
		let newChannel =
			Math.random().toString(15).substring(2, 15) +
			Math.random().toString(36).substring(2, 15);
		let channeInput = document.getElementById("channel");

		this.setState({
			channel: newChannel,
			joinBtn: true,
		});

		channeInput.value = newChannel;
	};

	render() {
		return (
			<div className='wrapper index'>
				<div className='p p-1'></div>
				<div className='p p-2'></div>
				<div className='p p-3'></div>
				<div className='p p-4'></div>
				<div className='p p-5'></div>
				<div className='p p-6'></div>
				<div className='ag-header'></div>
				<div className='ag-main'>
					<section className='login-wrapper'>
						<div className='login-header'>
							<p className='login-title'>
								Merry Christmas! {this.state.email}
							</p>
							<p className='login-subtitle'>
								Let's Chat!
							</p>
						</div>
						<div className='login-body'>
							<div className='columns'>
								<div className='column is-12'>
									<InputChannel
										onChange={this.handleChannel}
										placeholder='Enter Irland (with a capital I)'
									></InputChannel>
									<div className='login-footer'>
										
									</div>
								</div>
							</div>
							
							<div className='columns'>
								<div className='column'>
									
								</div>
							</div>
						</div>
						<div className='login-footer'>
							<a
								id='joinBtn'
								onClick={this.handleJoin}
								disabled={!this.state.joinBtn}
								className='ag-rounded button is-info'
							>
								Click Here After You Enter Irland
							</a>
						</div>
					</section>
				</div>
				<div className='ag-footer'>
					<a className='ag-href' href='https://www.agora.io'></a>
					<div>
						<span> </span>
						<span className='ag-contact'></span>
					</div>
				</div>
			</div>
		);
	}
}

class BaseOptions extends React.Component {
	constructor(props) {
		super(props);
		this._options = [
			{
				label: "Classroom",
				value: "avc",
				content: "Classroom setting with teacher and student-specific features",
			},
			{
				label: "Tutoring Session",
				value: "al",
				content: "One to one and group calls",
			},
		];
		this.state = {
			active: false,
			message: "Type of Session",
		};
	}

	handleSelect = (item) => {
		let msg = item.label;
		let val = item.value;
		this.setState({
			message: msg,
			active: false,
		});
		this.props.onChange(val);
	};

	render() {
		const options = this._options.map((item, index) => {
			return (
				<div
					className='dropdown-item'
					key={index}
					onClick={(e) => this.handleSelect(item, e)}
				>
					<p>{item.label}</p>
					<hr />
					<p>{item.content}</p>
				</div>
			);
		});

		return (
			<div className={this.state.active ? "dropdown is-active" : "dropdown"}>
				<div
					className='dropdown-trigger'
					onClick={() => this.setState({ active: !this.state.active })}
				>
					<a
						id='baseMode'
						className='ag-rounded button'
						aria-haspopup='true'
						aria-controls='baseModeOptions'
					>
						<span id='baseOptionLabel'>{this.state.message}</span>
						<span className='icon is-small'>
							<i className='ag-icon ag-icon-arrow-down' aria-hidden='true'></i>
						</span>
					</a>
				</div>
				<div className='dropdown-menu' id='baseModeOptions' role='menu'>
					<div className='dropdown-content'>{options}</div>
				</div>
			</div>
		);
	}
}

class AdvancedOptions extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			active: false,
		};
	}

	handleRadio = (e) => {
		this.props.onRadioChange(e.target.value);
	};

	handleSelect = (e) => {
		this.props.onSelectChange(e.target.value);
	};

	render() {
		const options = Object.entries(RESOLUTION_ARR).map((item, index) => {
			return (
				<option key={index} value={item[0].split(",")[0]}>
					{item[1][0]}x {item[1][1]}, {item[1][2]}fps, {item[1][3]}kbps
				</option>
			);
		});
		return (
			<div className={this.state.active ? "dropdown is-active" : "dropdown"}>
				<div
					className='dropdown-trigger'
					onClick={() => this.setState({ active: !this.state.active })}
				>
					<a
						id='advancedProfile'
						className='ag-rounded button'
						aria-haspopup='true'
						aria-controls='advancedOptions'
					>

					</a>
				</div>
				<div className='dropdown-menu' id='advancedOptions' role='menu'>
					<div className='dropdown-content'>
						<div className='dropdown-item'>
							<div className='control'>
								<label className='radio'>
									<input
										value=''
										type='radio'
										name='transcode'
										onChange={this.handleRadio}
									/>
									<span>VP8-only</span>
								</label>
								<label className='radio'>
									<input
										value='interop'
										type='radio'
										defaultChecked
										onChange={this.handleRadio}
										name='transcode'
									/>
									<span>VP8 &amp; H264</span>
								</label>
								<label className='radio'>
									<input
										value='h264_interop'
										type='radio'
										onChange={this.handleRadio}
										name='transcode'
									/>
									<span>H264-only</span>
								</label>
							</div>
						</div>
						
					</div>
				</div>
			</div>
		);
	}
}

export default Channel;
