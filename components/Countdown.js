import React, { Component } from "react";
import { View, Text, Button, Icon, StyleSheet } from "react-native";

import formatDuration from "format-duration";
import humanizeDuration from "humanize-duration";

const CountdownControls = props => {
  const label = props.running ? "Pause" : "Start";
  return (
    <View>
      <Button title={label} onPress={props.handlePressStart} />
      <Button title={"Restart"} onPress={props.handlePressRestart} />
    </View>
  );
};

export default class Countdown extends Component {
  constructor(props) {
    // whats the point of this vs componentDidMount? does it happen before or something?
    super(props);
    this.state = {
      running: false,
      msRemaining: this.props.msRemaining
    };
    this.poll = setInterval(this._tick, 1000); // TODO(ben): do i need to clean this up?
  }

  render() {
    const { running, msRemaining } = this.state;
    return (
      <View style={styles.countdown}>
        <Text>{formatDuration(msRemaining)}</Text>
        <Text>{humanizeDuration(msRemaining)}</Text>
        <CountdownControls
          running={running}
          handlePressStart={this._handlePressStart}
          handlePressRestart={this._handlePressRestart}
        />
      </View>
    );
  }

  _handlePressStart = e => {
    this.setState({ running: !this.state.running });
  };

  _handlePressRestart = e => {
    this.setState({ msRemaining: this.props.msRemaining });
  };

  _tick = () => {
    if (this.state.running) {
      this.setState(prevState => ({
        msRemaining: prevState.msRemaining - 1000
      }));
    }
  };
}

const styles = StyleSheet.create({
  countdown: {
    fontSize: 60
  }
});

// QA research:
// do i need to clear the interval ID somehow? cleanup?
