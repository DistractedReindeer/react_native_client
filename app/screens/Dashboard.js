var React = require('react-native');

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
var myLinksPage = require('./myLinks.js'); 


var styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 30,
    marginTop: 65,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#DB4B3E'
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
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    color: 'white'
  },
  buttonText: {
    fontSize: 18,
    color: '#111',
    alignSelf: 'center',
    color: 'white'
  },
  LrgbuttonText: {
    fontSize: 18,
    color: '#111',
    alignSelf: 'center',
    color: '#DB4B3E'
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
    color: 'white'
  },
  Lrg_button: {
    height: 45,
    flexDirection: 'row',
    borderColor: 'white',
    color: 'white',
    borderWidth: 1,
    borderRadius: 0,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  logo: { 
    marginLeft: 35,

    height: 80,
    width: 240, 
    marginRight: 10, 
    marginBottom: 70
  },
  name: {
    alignSelf: 'center',
    fontSize: 21,
    marginTop: 10,
    marginBottom: 5,
    color: 'white'
  },
  handle: {
    alignSelf: 'center',
    fontSize: 16,
    color: 'white'
  },
  image: {
    height: 125,
    width: 125,
    borderRadius: 65,
    marginTop: 10,
    alignSelf: 'center'
  }
  
});

var Dashboard = React.createClass({
  // this is kinda like get initialState in react
  getInitialState() {
    return {
      userToken: '',
      userDisplayName: '',
      myLinks: [],
      friendsLinks: [],
      uploadUrl: ''
    }
  },
  getToken(){
    return new Promise(function(resolve, reject) {
      AsyncStorage.getItem('token', (error, token) => {
        if (error) {
          console.log('Error getting user from local storage! ' + error.message);
        } else {
          console.log("********* TOKEN found******* ")
          resolve(token);
        }
      });
    });
  },

  componentDidMount() {
    var self = this;
    console.log("*************** DID MOUNT");
    this.getToken().then(function(token){
      console.log("-------- resolved -------");
      self.setState({userToken:token}, function(){
        console.log("********* STATE SETTTTTT******* " + this.state.userToken);
        this.fetchMyLinks();
        this.fetchMyDisplayName();
      });
    });
  },

  fetchMyLinks(){
    var self = this;
    var baseURL = 'http://localhost:4568';
    console.log("FETCHING from server -----------------");
    var token = this.state.userToken;
    var url = `http://localhost:4568/api/links/myLinks?access_token=${token}`;
    fetch(url).then((response)  => {
      console.log('jsonData ---> ',response);
      self.setState({myLinks:response._bodyInit});
    }).done();
  },
  fetchMyDisplayName(){
    var self = this;
    var baseURL = 'http://localhost:4568';
    console.log("FETCHING NAME server -----------------");
    var token = this.state.userToken;
    var url = `http://localhost:4568/api/links/userDisplayName?access_token=${token}`;
    fetch(url).then((response)  => {
      console.log('jsonData for NAME---> ',response);
      self.setState({userDisplayName:JSON.parse(response._bodyInit).userDisplayName});
    }).done();
  },


  goToMyLinks(){
      this.props.navigator.push({
              component: myLinksPage,
              title: "my links page",
      });
  },
  goToPostLink(){
    console.log("token SAVED ------");

    self.props.navigator.push({
      component: Dashboard,
      title: "Home",
    });
  },
  goToFriendsLinks(){
    self.props.navigator.push({
      component: Dashboard,
      title: "user signed in",
    });
  },
  postLink(){

    // $.ajax({
    //   type: 'POST',
    //   url: baseURL + '/api/links/newLink'+'?access_token=' + token ,
    //   dataType: 'JSON',
    //   data: {
    //     link: link
    //   }
    // }).done(function(){
    //   console.log("CALLBACK---------------");
    //   callback();
    // });

    var uploadUrl = 'http://' + this.state.uploadUrl;
    var ulrObject = {link: uploadUrl};
    var url = 'http://localhost:4568/api/links/newLink?access_token=' + this.state.userToken;
    var jsonObj = JSON.stringify(ulrObject);
    console.log("---------------- posting link to server with this link > " + url);
    fetch(url, { method: 'post',     
              headers: {  
              "Content-type": "application/json"  
              }, 
              body: jsonObj }).then().then(function(data){
      console.log("~~~~~~~~~~~~~~~~~~~~ POST request works ~~~~~~~~~~~~~~");
    }) 

              this.goToMyLinks();


  },
  updateURL(event){
    this.setState({
      uploadUrl: event.nativeEvent.text
    }, function(){
      console.log("----------------------------------------------- updated url -------");
      console.log(this.state.uploadUrl);
    })
  },





  render() {
    console.log("inside of render");
    return(
       <View style={styles.mainContainer}>

        <Image
          source={{uri: 'http://distractedreindeer.herokuapp.com/images/logo4.png'}}
          style={styles.logo}
        />

      <TextInput ref = "inputBox"
        placeholder = "Your link here"
        style={styles.searchInput}
        value={this.state.username}
        onChange={this.updateURL.bind(this)} 
        />
        <TouchableHighlight
          style={styles.button}
          onPress={this.postLink}
          underlayColor="white">
          <Text style={styles.LrgbuttonText}> Share </Text>
        </TouchableHighlight>

        <TouchableHighlight
            style={styles.Lrg_button}
            onPress={this.goToMyLinks}
            underlayColor="#88D4F5">
              <Text style={styles.buttonText}>My Deals</Text>
        </TouchableHighlight>
        <TouchableHighlight
            style={styles.Lrg_button}
            underlayColor="#E39EBF">
              <Text style={styles.buttonText}>Shared with me</Text>
        </TouchableHighlight>



      </View>
      );
  }
});

module.exports = Dashboard;