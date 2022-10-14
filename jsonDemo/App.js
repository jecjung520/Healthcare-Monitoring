import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';

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

      var feeds = this.state.dataSource.map((val, key) => {
        return <View key={key} style={styles.item}>
          <Text>{val.field1}</Text>
        </View>
      });

      return (
        <View style={styles.container}>
          <Text>
            hello world
          </Text>
        </View>
      );
    }
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'cyan',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
