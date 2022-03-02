import React, { Component } from 'react';

class HabitColumn extends Component {
  state = {  } 
  render() { 
    return (
      <div>
        <button onClick={()=>{console.log(this.props.items)}}>...</button>
      </div>
    );
  }
}
 
export default HabitColumn;