import React, { Component } from 'react';

class BreakLength extends Component {
	render() {
		return (
			<div>
				<p id="break-label">Break Length</p>
				<button
					onClick={this.props.breakIncrement}
					id="break-increment"
					type="button"
				>
					⬆
				</button>
				<p id="break-length">{this.props.breakLength}</p>
				<button
					onClick={this.props.breakDecrement}
					id="break-decrement"
					type="button"
				>
					⬇
				</button>
			</div>
		);
	}
}

export default BreakLength;
