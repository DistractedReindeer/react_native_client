'use strict';

var React = require('react-native');
var ItemCell = require('./linkItem.js');

var {
  StyleSheet,
  ListView,
  Text,
  Image,
  View,
  AsyncStorage
} = React;

var styles = StyleSheet.create({
    listView : {
    }
});
module.exports = React.createClass({
    getInitialState() {
        return {
            dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),
            loaded: false
        };
    },
    componentDidMount() {
        this.fetchMyLinks();
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



  fetchMyLinks: function(){
    var self = this;
    var baseURL = 'http://localhost:4568';
    console.log("FETCHING from server -----------------");
    this.getToken().then(function(token){

        var url = `http://localhost:4568/api/links/myLinks?access_token=${token}`;
        fetch(url).then((response)  => response.json())
                    .then((jsonData) => {
                        console.log('**********************************');
                        console.dir(jsonData.Response);
                        self.setState({
                        dataSource: self.state.dataSource.cloneWithRows(jsonData),
                        loaded: true,   
                        });                 
                    }).done();
        });
    },


    renderListView : function(){
        return(
          <ListView contentInset={{top: -64}}
            dataSource={this.state.dataSource}
            renderRow={this.renderRow}
            style={styles.listView}/>
        );
    },

    renderRow(item) {
        return (
            <ItemCell item={item} onSelect={ () =>  item} />
        );
    },

	render() {
		return (
            this.renderListView()
        );
	},



})