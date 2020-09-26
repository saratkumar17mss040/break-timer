import React, { Component } from 'react';

class SessionLength extends Component {
	render() {
		return (
			<div>
				<p id="session-label">Sesion Length</p>
				<button
					onClick={this.props.sessionIncrement}
					id="session-increment"
					type="button"
				>
					⬆
				</button>
				<p id="session-length">{this.props.sessionLength}</p>
				<button
					onClick={this.props.sessionDecrement}
					id="session-decrement"
					type="button"
				>
					⬇
				</button>
			</div>
		);
	}
}

export default SessionLength;
