import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import firebase from 'firebase';
import { TextInput } from 'react-native-gesture-handler';
import SignUp from './SignUp';

class LogIn extends Component {
    state = {
        name: '',
        email: '',
        password: '',
        error: '',
    }

   
    
    LoginUser = () => {
        const { name, email, password } = this.state;

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                console.log(firebase.auth().currentUser.uid)
                firebase.auth().currentUser.uid === '3zwvARvxfwWGr4XHi3ETqLwl3qB3' ? this.props.navigation.navigate('Admin') : this.props.navigation.navigate('Home');
            }) 
            .catch(() => {
                this.setState({ error: 'Access Denied'});
            });
    }

    NavigateToSignUp = () => {
        this.props.navigation.navigate('SignUp')
    }

    render() {
        return (
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
                <View style={styles.container}>
                    <Text style={{ fontSize: 30, fontWeight: 'bold', textAlign: 'center', paddingBottom: 50 }}>Security App</Text>
                    <TextInput
                        value={this.state.email}
                        onChangeText={email => this.setState({ email })}
                        placeholder="Email"
                        returnKeyType="next"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        style={styles.input}
                    />
                    <TextInput
                        value={this.state.password}
                        onChangeText={password => this.setState({ password })}
                        placeholder="Password"
                        secureTextEntry
                        style={styles.input}
                    />
                    <Text style={styles.errorText}>
                        {this.state.error}
                    </Text>
                    <TouchableOpacity 
                        onPress={this.LoginUser}
                        style={styles.button}
                    >
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Log In</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={this.NavigateToSignUp}
                        style={styles.button}
                    >
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Sign Up</Text>
                    </TouchableOpacity>
             </View>
            </ScrollView>
      );
    }
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 200,
    paddingHorizontal: 20,
  },
  input: {
    margin: 15,
    height: 50,
    borderColor: '#000000',
    borderWidth: 2,
    textAlign: "center",
    fontSize: 16
  },
  button: {
      backgroundColor: '#27bcf2',
      height: 50,
      margin: 15,
      justifyContent: 'center',
      alignItems: 'center',
  },
  errorText: {
      fontSize: 20,
      alignSelf: 'center',
      color: 'red',
  }
});

export default LogIn;