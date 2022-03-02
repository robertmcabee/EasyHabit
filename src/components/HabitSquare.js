import React, { Component } from 'react';

class HabitSquare extends Component {
  render() { 
    return (
      <div>
        <p>Square {this.props.data.id}</p>
      </div>
    );
  }
}
 
export default HabitSquare;
