'use strict';

var React = require('react-native');
var moment = require('moment');

var {
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  View,
} = React;
//#3498db
var styles = StyleSheet.create({
    container: {
    	flex : 1,
    	padding : 10,
        flexDirection: 'row',
        borderBottomColor : '#eeeeee',
        borderBottomWidth : 1,
        backgroundColor: '#ffffff',
    },
    messageMain : {
    	flex : 1,
    	flexDirection : 'column'
    },
    msgText : {
    	fontSize : 16,
    	height : 40,
    	fontWeight : '700',
    	color : '#000000',
        textAlign: 'left',
        marginTop: 10,
        marginRight: 10,
    },
    timeStamp : {
    	flexDirection : 'row',
    	alignItems: 'center',
    	marginTop : 5,
    	marginBottom : 10,
        color : '#000000'
    },
    logo: { 
        marginLeft: 35,
        height: 200,
        width: 340, 
        marginRight: 10 
  },
});

module.exports = React.createClass({
	render() {
		var item = this.props.item;
        console.log("------------------------------------------");
        console.log("------------------------------------------------");
        var imageURL = 'http://localhost:4568' + item.linkThumbnail;
        console.dir(imageURL);


        //var time = moment(item.createdAt).fromNow();
		return (
            
			<TouchableOpacity onPress={this.props.onSelect}>
				<View style={styles.container}>		
                    <Image
                      source={{uri: imageURL}}
                      style={styles.logo}
                    />		

					<View style={styles.messageMain}>
						<Text style={styles.msgText} numberOfLines={2}>{item}</Text>
						
					</View>					
				</View>
			</TouchableOpacity>
		);
	}


})