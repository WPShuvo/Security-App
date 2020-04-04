import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import firebase from 'firebase';

// const UID = firebase.auth().currentUser.uid;

class Home extends Component {
    constructor() {
        super();
        this.state = {
            level: '',
        }
    }

    componentDidMount() {
        this.getUserData(firebase.auth().currentUser.uid);
    }

    signOut = () => {
        firebase.auth().signOut()
            .then(() => {
                this.props.navigation.navigate('AuthLoading');
            })
            .catch(() => console.log('Error'));
    }

    snapshotToArray = (snapshot) => {
        var returnArr = [];
    
        snapshot.forEach((childSnapshot) => {
            var item = childSnapshot.val();
            item.key = childSnapshot.key;
            
            returnArr.push(item);
        });
    
        return returnArr;
    };

    getUserData = (uid) => {
        const userRef = firebase.database().ref('/users/' + uid);
        userRef.once("value", snapshot => {
            this.setState({ level: snapshot.val().level })
        })
    }

    render () {
        // console.log('Level --', this.state.level)
        return(
            <View style={styles.container}>
                 <TouchableOpacity 
                    style={{ alignItems: "flex-end" }}
                    onPress={() => this.signOut() }
                >
                    <Text>Sign Out</Text>
                </TouchableOpacity>
                <Text style={{ fontSize: 30, alignSelf: "center", paddingVertical: 50 }}>
                    Files
                </Text>
                <View>
                    <TouchableOpacity
                        style={styles.item}
                        onPress={() => this.props.navigation.navigate('TopSecret', { level: JSON.parse(this.state.level) })}
                    >
                        <Text style={styles.fileText}>Top Secret</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.item}
                        onPress={() => this.props.navigation.navigate('Secret', { level: JSON.parse(this.state.level) })}
                    >
                        <Text style={styles.fileText}>Secret</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.item}
                        onPress={() => this.props.navigation.navigate('Confidential', { level: JSON.parse(this.state.level) })}
                    >
                        <Text style={styles.fileText}>Confidential</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.item}
                        onPress={() => this.props.navigation.navigate('Unclassified', { level: JSON.parse(this.state.level) })}
                    >
                        <Text style={styles.fileText}>Unclassified</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        marginHorizontal: 20,
    },
    item: {
        borderColor: 'black',
        borderWidth: 2,
        padding: 10,
        marginVertical: 8,
        // marginHorizontal: 16,
    },
    fileText: {
        fontSize: 18,
    }
  });

export default Home;