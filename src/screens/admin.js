import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView,  SafeAreaView, TouchableOpacity, FlatList, } from 'react-native';
import firebase from 'firebase';
import Item from './Item';

class admin extends Component {
    state = {
        data: '',
    }

    componentDidMount() {
        this.getUsers();
    } 

    snapshotToArray = (snapshot) => {
        var returnArr = [];
    
        snapshot.forEach((childSnapshot) => {
            var item = childSnapshot.val();
            item.key = childSnapshot.key;
            
            if(item.level === 0)
                returnArr.push(item);
        });
    
        return returnArr;
    };

    getUsers = () => {
        firebase.database().ref('/users/').once('value')
        .then((snapshot) =>  this.setState({ data: this.snapshotToArray(snapshot)}) )
    }

    signOut = () => {
        firebase.auth().signOut()
            .then(() => {
                this.props.navigation.navigate('AuthLoading');
            })
            .catch(() => console.log('Error'));
    }

    render() {
        console.log('Data', this.state.data);

        return (
            <SafeAreaView style={styles.container}>
                <TouchableOpacity 
                    style={{ alignItems: "flex-end" }}
                    onPress={() => this.signOut() }
                >
                    <Text>Sign Out</Text>
                </TouchableOpacity>
                <Text style={{ fontSize: 30, fontWeight: 'bold', alignSelf: 'center', paddingBottom: 20 }}>Admin Panel</Text>
                <FlatList
                    data={this.state.data}
                    renderItem={({ item }) => <Item title={item.name} email={item.email} id={item.key} level={item.level} />}
                    keyExtractor={item => item.key}
                />
             </SafeAreaView>
        );
    }
;}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 20,
    },
    item: {
      backgroundColor: '#7EDEFC',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 32,
    },
  });
  

export default admin;