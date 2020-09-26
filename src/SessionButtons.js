import React, { Component } from 'react';

class SessionButtons extends Component {
	render() {
		return (
			<div>
                <button
                    onClick={this.props.onClickStart}
                    id="start_stop" type="button">
					▶
				</button>
                <button
                    onClick={this.props.onClickPause}
                    type="button">⏸</button>
				<button onClick={this.props.onClickReset} id="reset" type="button">
					<span role="img" aria-label="reload">
						🔃
					</span>
				</button>
			</div>
		);
	}
}

export default SessionButtons;
