import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import firebase from 'firebase';
import Item from './Messages';

class TopSecret extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: '',
            text: '',
        }
    }

    componentDidMount() {
        this.getMessages();
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

    getMessages = () => {
        firebase.database().ref('/topSecrets/').once('value')
        .then((snapshot) =>  { 
            this.setState({ data: this.snapshotToArray(snapshot)})
         })
    }

    writeMessage = ( message ) => {
        const userID = firebase.auth().currentUser.uid;
        const email = firebase.auth().currentUser.email;

        firebase.database().ref('/topSecrets/' + userID)
            .set({ message, email })
            .then((res) => console.log('Success',res))
            .catch((err) => console.log(err));
    }

    getNavigationParams() {
        return this.props.navigation.state.params || {};
    }

    render () {
        const level = this.getNavigationParams();
        console.log('LEVEL', level)
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Home')}
                >
                    <Text>Back</Text>
                </TouchableOpacity>
                {level.level === 4 ?
                    <FlatList
                    data={this.state.data}
                    renderItem={({ item }) => <Item title={item.message} email={item.email} id={item.key} />}
                    keyExtractor={item => item.key}
                    />
                    :
                    null
                }
                {level.level <= 4 ?
                    <View style={styles.bottom}>
                        <TextInput
                                value={this.state.text}
                                onChangeText={(text) => this.setState({ text })}
                                multiline={true}
                                placeholder="Write here"
                                returnKeyType="next"
                                autoCapitalize="none"
                                style={styles.input}
                        />
                        <TouchableOpacity 
                            style={styles.button}
                            onPress={() => this.writeMessage(this.state.text)}
                        >
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                    :
                    null
                }
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
    },
    bottom: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 36
    },
    input: {
        margin: 15,
        height: 100,
        borderColor: '#000000',
        borderWidth: 2,
        textAlign: "center",
        fontSize: 16
      },
      button: {
            backgroundColor: '#27bcf2',
            height: 50,
            marginHorizontal: 15,
            justifyContent: 'center',
            alignItems: 'center',
      },
  });

export default TopSecret;