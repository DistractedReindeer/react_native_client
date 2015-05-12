var React = require('react-native');
var Dashboard = require('./Dashboard.js');

var {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  ActivityIndicatorIOS,
  AsyncStorage,
  Image
} = React;

//------ this bring in the Objective C facebook SDK --------
var FacebookLoginManager = require('NativeModules').FacebookLoginManager;
//----------------------------------------------------------
var Video = require('react-native-video');


var styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 30,
    marginTop: 0,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center',
    color: '#fff'
  },
  searchInput: {
    height: 50,
    padding: 4,
    marginRight: 5,
    fontSize: 23,
    borderWidth: 100,
    borderColor: 'white',
    borderRadius: 8,
    color: 'white'
  },
  buttonText: {
    fontSize: 18,
    color: '#ffffff',
    alignSelf: 'center'
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 220,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  logo: { 
    marginLeft: 35,

    height: 80,
    width: 240, 
    marginRight: 10 
  },

});

var Login = React.createClass({
  // this is kinda like get initialState in react
  getInitialState() {
    return {
      fbToken: ''
    }
  },

  saveToken(token){
    return new Promise(function(resolve, reject) {
      AsyncStorage.setItem('token', token, (error) => {
          if (error) {
            console.log('Error setting user in local storage! ' + error.message);
          } else {
            resolve();
          }
      });
    });
  },

  login() {

    var self = this;
    console.log("---- inside of log in ----");
    FacebookLoginManager.newSession((error, info) => {
      if (error) {
        this.setState({fbToken: error});
      } else {
        this.setState({
          fbToken: info.token
        }, function(){
          this.saveToken(this.state.fbToken).then(function(){
          console.log("token SAVED ------>>> route change");
            self.props.navigator.push({
              component: Dashboard,
              title: "Home",
            });
          });
        });

      }
    });
  },
  render() {
    console.log("inside of render");
    return(

       <View style={styles.mainContainer}>

        <Video source={{uri: "ffcspace"}}
               style={styles.backgroundVideo}
               rate={1} volume={1} muted={true}
               resizeMode="cover" repeat={true} key="video1" />

        <Image
          source={{uri: 'http://distractedreindeer.herokuapp.com/images/logo4.png'}}
          style={styles.logo}
        />

        <TouchableHighlight
          style={styles.button}
          onPress={this.login}          
          underlayColor="white">
          <Text style={styles.buttonText}> SIGN IN WITH FACEBOOK </Text>
        </TouchableHighlight>
               
      </View>
      );
  }
});

module.exports = Login;