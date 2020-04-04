import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

class Item extends Component 
{
    constructor(props) {
        super(props);
        this.state = {
            level: 0,
        }
    }

    render() {
        return (
            <View style={styles.item}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.title}>{this.props.title}</Text>
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
    }
  });

export default Item;