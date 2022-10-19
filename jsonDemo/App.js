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
    return fetch('https://api.thingspeak.com/channels/1874095/fields/1.json?results=2')
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
      /*
            var obj = JSON.parse(this.state.dataSource);
            var fields = obj.field1[0];
      
      var feeds = this.state.dataSource.map((val, key) => {
        return <View key={key} style={styles.item}>
          <Text>{val.field1}</Text>
        </View>
      });
      */

      var feeds = this.state.dataSource.map((val, key) => {
        return val.field1
      });

      const Pulse = require('react-native-pulse').default;


      return (
        <View style={styles.container}>
          <Thermometer
            theme="light"
            value={feeds[1]}
            max={100}
            steps="3"
            format="°C"
            size="large"
            height="300"
          />
          <Pulse color='orange' numPulses={3} diameter={400} speed={20} duration={2000} />
        </View>
      );

    }
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: "30%",
    backgroundColor: 'white',
    alignItems: 'left',
    justifyContent: 'center',
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