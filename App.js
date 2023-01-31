import React from 'react';
import { render } from 'react-dom'
import Thermometer from 'react-thermometer-component'
import { StyleSheet, Button, Text, View, ActivityIndicator, Pressable, TextInput, TouchableHighlight, TouchableOpacity  } from 'react-native';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: null,
    }
  }

  componentDidMount() {
    document.title = "Temperature and Pulse Monitoring"

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

  handleClick() {
    window.location.reload();
  }


  render() {

    if (this.state.isLoading) {

      return (
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      )
    } else {

      var feeds1 = this.state.dataSource.map((val, key) => {
        return val.field1
      });
      var feeds2 = this.state.dataSource.map((val, key) => {
        return val.field2
      });

      const Pulse = require('react-native-pulse').default;

      const temp_rate = (feeds1[1]) ? feeds1[1] : feeds1[0];
      const pulse_rate = (feeds2[1]) ? feeds2[1] : feeds2[0];

      return (
        <View style={styles.header}>
          <Text style={styles.titleScreen}>Temperature and Pulse Rate</Text>
          <View style={styles.container}>
            <View style={styles.leftcontainer}>
              {temp_rate >= 39 &&
                <View style={styles.alertIcon}>
                  <Text>Temperature too high</Text>
                  <img src={require('pics/alert-icon-red.png')}/>
                </View>
              }
              {temp_rate <= 35 &&
                <View style={styles.alertIcon}>
                  <Text>Temperature too low</Text>
                  <img src={require('pics/alert-icon-red.png')}/>
                </View>
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
              {pulse_rate < 70
                ? <Pulse color='blue' numPulses={3} diameter={400} speed={20} duration={2000} />
                : <Pulse color='orange' numPulses={3} diameter={400} speed={20} duration={2000} />
              }
              <Text style={{fontWeight: "bold"}}>Pulse Rate: {pulse_rate}BPM
              </Text>
            </View >
            <View style={styles.tinylogo}>
              <img src={require('pics/avg-heart-rate.jpeg')}/>
              <img src={require('pics/normal-body-temp.jpg')}/>
            </View>
          </View >
          <TouchableOpacity 
            onPress={this.handleClick}>
            <Text style={styles.pulseButton}>RELOAD</Text>
          </TouchableOpacity>
        </View>
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
    marginHorizontal: '15%',
  },
  leftcontainer: {
    //flex: 1,
    
    flexDirection: 'row',
    justifyContent: 'flex-start',
    //alignContent: 'center',
  },
  rightcontainer: {
    //flex: 1,
    height: 0,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  tinylogo: {
    width: 450,
    height: 650,
  },
  titleScreen: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 40,
    fontWeight: "bold",
  },
  alertIcon: {
    width:100,
    height:100,
  },
  header: {
    marginTop: 16,
    paddingVertical: 8,
    backgroundColor: "#61dafb",
    color: "#20232a",
    textAlign: "center",
    fontSize: 40,
    fontWeight: "bold"
  },
  tempButton: {
    flexDirection: 'row', 
    height: 50, 
    alignItems: 'center',
    justifyContent: 'center',

  },
  pulseButton: {
    height: 50,
    fonrtSize: 15,
    fontWeight: "bold",
    justifyContent: 'center',
    alignItems: 'center',
  }
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