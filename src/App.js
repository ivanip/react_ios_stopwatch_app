import React, {Component} from 'react';
import './App.css';

class App extends Component {
    state = {
        timer: null,
        startTime: null,
        currentTime: null,
        stopTime: null,
        stoppedTimeOffset: 0,
        stoppedTimeOffsetForLap: 0,
        lastLapTime: null,
        displayTime: '00:00.00',
        isStarted: false,
        isStopped: false,
        laps: [],
    }

    startAndStopHandler = () => {
        if (!this.state.isStarted) {
            this.setState({
                startTime: Date.now(),
                lastLapTime: Date.now(),
                currentTime: Date.now(),
                timer: setInterval(() => {
                    let elapsedTime = this.state.currentTime - this.state.startTime

                    this.setState({
                        currentTime: Date.now(),
                        displayTime: this.formatTime((elapsedTime / 1000).toFixed(2)),
                    })
                }, 10),
                laps: [{
                    time: 0,
                    display: this.state.displayTime,
                    isFastest: false,
                    isSlowest: false,
                }],
                isStarted: true,
                isStopped: false,
            })
        }
    }

    resetAndLapHandler = () => {

    }

    formatTime = (seconds) => {
        let date = new Date(null);
        date.setSeconds(seconds);
        let result = date.toISOString().substr(14, 5);
        return `${result}.${(seconds + '').split('.')[1]}`
    }


    render() {
        return (
            <div id="App">
                <div id="stopwatch">
                    {this.state.displayTime}
                </div>
                <div id="stopwatch-controls">
                    <button id="reset-and-lap">Reset</button>
                    <button id="start-and-stop"
                            onClick={this.startAndStopHandler}>{(this.state.isStarted && !this.state.isStopped) ? 'Stop' : 'Start'}</button>
                    <span id="brand">Stopwatch</span>
                </div>
                <ul id="stopwatch-records">
                    <li>
                        <span>Lap 1</span>
                        <span>12:00.00</span>
                    </li>
                </ul>
            </div>
        );
    }
}

export default App;