import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import firebase from 'firebase';

const test = () => {
    const usersRef = firebase.database().ref("/users")

    usersRef.orderByKey().on('value', snapshot => {
        console.log(snapshot.val())
    });
    console.log(firebase.auth().currentUser.email)

    return(
        <View>
            <Text style={{ fontSize: 30, alignSelf: "center", paddingTop: 50 }}>
                TESTiNG
            </Text>
        </View>
    )
}

export default test;