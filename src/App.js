import React, { Component } from 'react';
import SetTimer from './SetTimer';
import './App.css';

const audio = document.getElementById('beep');

class App extends Component {
	state = {
		breakCount: 5,
		sessionCount: 25,
		clockCount: 25 * 60,
		currentTimer: 'Session',
		isPlaying: false,
	};

	constructor(props) {
		super(props);
		this.loop = undefined;
	}

	componentWillUnmount() {
		clearInterval(this.loop);
	}

	handlePlayPause = () => {
		const { isPlaying } = this.state;
		if (isPlaying) {
			clearInterval(this.loop);
			this.setState({
				isPlaying: false,
			});
		} else {
			this.setState({
				isPlaying: true,
			});
			this.loop = setInterval(() => {
				const {
					clockCount,
					currentTimer,
					sessionCount,
					breakCount,
				} = this.state;
				if (clockCount === 0) {
					this.setState({
						currentTimer: currentTimer === 'Session' ? 'Break' : 'Session',
						clockCount:
							currentTimer === 'Session' ? breakCount * 60 : sessionCount * 60,
					});
					audio.play();
				} else {
					this.setState({
						clockCount: clockCount - 1,
					});
				}
			}, 1000);
		}
	};

	handlePlayReset = () => {
		this.setState({
			breakCount: 5,
			sessionCount: 25,
			clockCount: 25 * 60,
			currentTimer: 'Session',
			isPlaying: false,
		});
		clearInterval(this.loop);
		audio.pause();
		audio.currentTime = 0;
	};

	convertToTime = (count) => {
		let minutes = Math.floor(count / 60);
		let seconds = count % 60;
		minutes = minutes < 10 ? '0' + minutes : minutes;
		seconds = seconds < 10 ? '0' + seconds : seconds;
		return `${minutes}:${seconds}`;
	};

	handleBreakDecrease = () => {
		const { breakCount, isPlaying, currentTimer } = this.state;
		if (breakCount > 1) {
			if (!isPlaying && currentTimer === 'Break') {
				this.setState({
					breakCount: breakCount - 1,
					clockCount: (breakCount - 1) * 60,
				});
			} else {
				this.setState({
					breakCount: breakCount - 1,
				});
			}
		}
	};

	handleBreakIncrease = () => {
		const { breakCount, isPlaying, currentTimer } = this.state;
		if (breakCount < 60) {
			if (!isPlaying && currentTimer === 'Break') {
				this.setState({
					breakCount: breakCount + 1,
					clockCount: (breakCount + 1) * 60,
				});
			} else {
				this.setState({
					breakCount: breakCount + 1,
				});
			}
		}
	};

	handleSessionIncrease = () => {
		const { sessionCount, isPlaying, currentTimer } = this.state;
		if (sessionCount < 60) {
			if (!isPlaying && currentTimer === 'Session') {
				this.setState({
					sessionCount: sessionCount + 1,
					clockCount: (sessionCount + 1) * 60,
				});
			} else {
				this.setState({
					sessionCount: sessionCount + 1,
				});
			}
		}
	};

	handleSessionDecrease = () => {
		const { sessionCount, currentTimer, isPlaying } = this.state;
		if (sessionCount > 1) {
			if (!isPlaying && currentTimer === 'Session') {
				this.setState({
					sessionCount: sessionCount - 1,
					clockCount: (sessionCount - 1) * 60,
				});
			} else {
				this.setState({
					sessionCount: sessionCount - 1,
				});
			}
		}
	};

	render() {
		const {
			breakCount,
			sessionCount,
			clockCount,
			currentTimer,
			isPlaying,
		} = this.state;

		const breakProps = {
			title: 'Break',
			count: breakCount,
			handleDecrease: this.handleBreakDecrease,
			handleIncrease: this.handleBreakIncrease,
		};

		const sessionProps = {
			title: 'Session',
			count: sessionCount,
			handleDecrease: this.handleSessionDecrease,
			handleIncrease: this.handleSessionIncrease,
		};

		return (
			<div className="main-container">
				<h1>Break Timer</h1>
				<div className="flex">
					<SetTimer {...breakProps} />
					<SetTimer {...sessionProps} />
				</div>
				<div className="clock-container">
					<h1 id="timer-label">{currentTimer}</h1>
					<span id="time-left">{this.convertToTime(clockCount)}</span>
					<div className="flex">
						<button id="start_stop" onClick={this.handlePlayPause}>
							<i className={`fa fa-${isPlaying ? 'pause' : 'play'}`}></i>
						</button>
						<button id="reset" onClick={this.handlePlayReset}>
							<i className="fa fa-refresh"></i>
						</button>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
