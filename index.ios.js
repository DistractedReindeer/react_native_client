/*
var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} = React;

var FacebookLoginManager = require('NativeModules').FacebookLoginManager;

var voucheryMobile = React.createClass({
  getInitialState() {
    return {
      result: '...'
    }
  },

  componentDidMount() {
    var self = this;
  },

  login() {
    FacebookLoginManager.newSession((error, info) => {
      if (error) {
        this.setState({result: error});
      } else {
        this.setState({result: info});
      }
    });
  },

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={this.login}>
          <Text style={styles.welcome}>
            Facebook Login
          </Text>
        </TouchableHighlight>
        <Text style={styles.instructions}>
          {this.state.result}
        </Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('voucheryMobile', () => voucheryMobile);
*/

var Login = require('./app/screens/Login.js');
var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  NavigatorIOS
} = React;

var FacebookLoginManager = require('NativeModules').FacebookLoginManager;

class voucheryMobile extends React.Component{

  componentDidMount() {
    var self = this;
  }


  render() {
    return (
      <NavigatorIOS
        style={styles.container}
        barTintColor='white'
        initialRoute={{
          title: '',
          component: Login,
        }} />
    );
  }
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('voucheryMobile', () => voucheryMobile);































