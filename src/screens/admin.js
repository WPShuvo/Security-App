import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView,  SafeAreaView, TouchableOpacity, FlatList, } from 'react-native';
import firebase from 'firebase';
// import RNPickerSelect from 'react-native-picker-select';
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
            
            if(item.level === 1)
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
                {/* <RNPickerSelect
                        style={styles.pickerStyle}
                        placeholder={{label: 'Select level', value: '1'}}
                        onValueChange={(value) => this.updateLevel(value)}
                        items={[
                            { label: '1', value: '1' },
                            { label: '2', value: '2' },
                            { label: '3', value: '3' },
                            { label: '4', value: '4' },
                        ]}
                    /> */}
             </SafeAreaView>
        );
    }
;}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 20,
      marginHorizontal: 20,
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