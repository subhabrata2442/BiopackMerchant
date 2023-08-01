import React, {Component} from 'react';
import {View, Text} from 'react-native';

class Student extends Component {
  render() {
    console.warn(this.props);
    return (
      <View>
        <Text style={{fontSize: 30, color: 'green'}}>Student Component</Text>
        <Text style={{fontSize: 25, color: 'black'}}>
          Name: {this.props.name}
        </Text>
      </View>
    );
  }
}

export default Student;
