import React, { Component } from 'react';

class HabitSquare extends Component {
  render() { 
    return (
      <div className='h-20 bg-neutral-100 hover:bg-white'>
        <p>{this.props.data.gridId}</p>
      </div>
    );
  }
}
 
export default HabitSquare;
