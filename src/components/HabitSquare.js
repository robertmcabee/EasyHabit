import React, { Component } from 'react';

class HabitSquare extends Component {
  render() { 
    return (
      <div className='h-20 bg-neutral-100'>
        <p>Square {this.props.data.id}</p>
      </div>
    );
  }
}
 
export default HabitSquare;
