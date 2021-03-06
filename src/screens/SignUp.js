import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import firebase from 'firebase';
import { TextInput } from 'react-native-gesture-handler';

class SignUp extends Component {
    state = {
        name: '',
        age: '',
        gender: '',
        email: '',
        level: 1,
        password: '',
        error: '',
        emailError: null,
    }

    checkEmail = () => {
		const { email } = this.state;
		const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		const isValid = re.test(String(email).toLowerCase());

		if (!isValid) {
			this.setState({
				emailError: 'Invalid Email',
			});
		}
	};
   
    
    SignUpUser = () => {
        const { name, age, gender, level, email, password } = this.state;

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((user) => {
                // const userID = user.user.uid;
                const userID = firebase.auth().currentUser.uid;
                firebase.database().ref('/users/'+ userID)
                    .set({ name, email, age, gender, level })
                    .then(() => this.props.navigation.navigate('Home'));
            })
    }

    render() {
        return (
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
                <View style={styles.container}>
                    <Text style={{ fontSize: 30, fontWeight: 'bold', textAlign: 'center', paddingBottom: 50 }}>Security App</Text>
                    <TextInput
                        value={this.state.name}
                        onChangeText={name => this.setState({ name })}
                        placeholder="Name"
                        returnKeyType="next"
                        autoCapitalize="none"
                        style={styles.input}
                    />
                    <TextInput
                        value={this.state.age}
                        onChangeText={age => this.setState({ age })}
                        placeholder="Age"
                        returnKeyType="next"
                        autoCapitalize="none"
                        style={styles.input}
                    />
                    <TextInput
                        value={this.state.gender}
                        onChangeText={gender => this.setState({ gender })}
                        placeholder="Gender"
                        returnKeyType="next"
                        autoCapitalize="characters"
                        style={styles.input}
                    />
                    <TextInput
                        value={this.state.email}
                        onChangeText={email => this.setState({ email })}
                        placeholder="Email"
                        onBlur={this.checkEmail}
                        returnKeyType="next"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        style={styles.input}
                    />
                     <Text style={styles.errorText}>
                        {this.state.emailError}
                    </Text>
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
                        onPress={this.SignUpUser}
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
    paddingTop: 50,
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

export default SignUp;