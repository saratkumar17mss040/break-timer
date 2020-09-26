import React, { Component } from 'react';

class SessionTimer extends Component {
    render() {
        return (
            <div>
                <p id="timer-label">Session</p>
                <p id="time-left">{this.props.sessionTimer}</p>
            </div>
        );
    }
}

export default SessionTimer;