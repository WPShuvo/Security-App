import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import firebase from 'firebase';

class Item extends Component 
{
    constructor(props) {
        super(props);
        this.state = {
            level: 0,
        }
    }

    updateLevel = (level) => {
        const id = this.props.id;
        firebase.database().ref(`/users/`).child(`${id}`).update({ level: level })
            .then((val) => console.log(val));
    }

    render() {
        return (
            <View style={styles.item}>
              <View style={{ justifyContent: 'space-between' }}>
                    <Text style={styles.title}>{this.props.title}</Text>
                    <RNPickerSelect
                        style={styles.pickerStyle}
                        placeholder={{label: 'Select level', value: '1'}}
                        onValueChange={(value) => this.updateLevel(value)}
                        items={[
                            { label: '1', value: '1' },
                            { label: '2', value: '2' },
                            { label: '3', value: '3' },
                            { label: '4', value: '4' },
                        ]}
                    />
              </View>
              <View>
                    <Text>{this.props.email}</Text>
              </View>
            </View>
          );
    }
  }

  const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
    },
    item: {
    //   backgroundColor: '#7EDEFC',
        borderColor: 'black',
        borderWidth: 2,
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 18,
    },
    pickerStyle: {
        fontSize: 28,
        zIndex: 9,
    }
  });

export default Item;