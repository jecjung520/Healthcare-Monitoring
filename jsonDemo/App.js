import React from 'react';
import { render } from 'react-dom'
import Thermometer from 'react-thermometer-component'
import { StyleSheet, Button, Text, View, ActivityIndicator, Pressable, TextInput, TouchableHighlight } from 'react-native';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: null,
    }
  }

  componentDidMount() {
    //return fetch('https://api.thingspeak.com/channels/1874095/feeds.json?results=2')
    return fetch('https://api.thingspeak.com/channels/1887337/feeds.json?results=2')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson.feeds,
        })

      })
      .catch((error) => {
        console.log("error");
      });

  }

  render() {

    if (this.state.isLoading) {

      return (
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      )
    } else {

      var feeds = this.state.dataSource.map((val, key) => {
        return val.field1
      });
      var feeds1 = this.state.dataSource.map((val, key) => {
        return val.field2
      });

      const Pulse = require('react-native-pulse').default;

      const temp_rate = feeds[0];
      const pulse_rate = feeds1[0];

      return (
        <View style={styles.container}>
          <View style={styles.leftcontainer}>
            {temp_rate >= 39 &&
              <Text>Temperature too high</Text>
            }
            {temp_rate <= 35 &&
              <Text>Temperature too low</Text>
            }
            <Thermometer
              theme="light"
              value={temp_rate}
              max={100}
              steps="3"
              format="°C"
              size="large"
              height="300"
            />
          </View>
          <View style={styles.rightcontainer}>
            {pulse_rate < 80
              ? <Pulse color='blue' numPulses={3} diameter={400} speed={20} duration={2000} />
              : <Pulse color='orange' numPulses={3} diameter={400} speed={20} duration={2000} />
            }
            <Text>Pulse Rate: {pulse_rate}BPM
            </Text>
          </View >
          <View style={styles.container}>

          </View>
        </View >
      );

    }
  }

}

const styles = StyleSheet.create({
  container: {
    height: 800,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: '20%',
  },
  leftcontainer: {
    //flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    //alignContent: 'center',
  },
  rightcontainer: {
    //flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  tinylogo: {
    width: 100,
    height: 100,
  },
});

const pulsStyles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: "30%%",
    backgroundColor: 'white',
    alignItems: 'right',
    justifyContent: 'center',
  },
});