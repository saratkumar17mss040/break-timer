import React, { Component } from 'react';
import BreakLength from './BreakLength';
import SessionLength from './SessionLength';
import SessionTimer from './SessionTimer';
import SessionButtons from './SessionButtons';

import './App.css';

class App extends Component {
	constructor() {
		super();
		this.state = {
			sessionLength: 25,
			breakLength: 5,
			sessionTimer: '25 :00',
		};
		this.breakIncrement = this.breakIncrement.bind(this);
		this.breakDecrement = this.breakDecrement.bind(this);
		this.sessionIncrement = this.sessionIncrement.bind(this);
		this.sessionDecrement = this.sessionDecrement.bind(this);
		this.onClickStart = this.onClickStart.bind(this);
		this.updateCountDown = this.updateCountDown.bind(this);
	}

	breakIncrement() {
		if (this.state.breakLength >= 0 && this.state.breakLength < 60) {
			this.setState({
				breakLength: this.state.breakLength + 1,
			});
		}
	}

	breakDecrement() {
		if (this.state.breakLength > 0) {
			this.setState({
				breakLength: this.state.breakLength - 1,
			});
		}
	}

	sessionIncrement() {
		if (this.state.sessionLength >= 0 && this.state.sessionLength < 60) {
			this.setState({
				sessionLength: this.state.sessionLength + 1,
				sessionTimer: this.state.sessionTimer + 1,
			});
		}
	}

	sessionDecrement() {
		if (this.state.sessionLength > 0) {
			this.setState({
				sessionLength: this.state.sessionLength - 1,
				sessionTimer: this.state.sessionTimer - 1,
			});
		}
	}

	updateCountDown() {
		let time = parseInt(this.state.sessionTimer) * 60;
		let minutes = Math.floor(time / 60);
		let seconds = time % 60;
		seconds = seconds < 10 ? '0' + seconds : seconds;
		this.setState({
			sessionTimer: `${minutes} : ${seconds}`,
		});
		time--;
		time = time < 0 ? 0 : time;
	}

	onClickStart() {
		setInterval(this.updateCountDown, 1000);
	}

	render() {
		return (
			<div className="App">
				<h3 style={{ textAlign: 'center' }}>Break Timer</h3>
				<BreakLength
					breakLength={this.state.breakLength}
					breakIncrement={this.breakIncrement}
					breakDecrement={this.breakDecrement}
				/>
				<SessionLength
					sessionLength={this.state.sessionLength}
					sessionIncrement={this.sessionIncrement}
					sessionDecrement={this.sessionDecrement}
				/>
				<SessionTimer sessionTimer={this.state.sessionTimer} />
				<SessionButtons onClickStart={this.onClickStart} />
			</div>
		);
	}
}

export default App;
