import React, { Component } from 'react';

class HabitSquare extends Component {

  state = {
  };

  handleClick = () => { 
    this.props.toggleCompletion(this.props.data.gridId)
  }


  render() { 
    return (
      <div onClick={this.handleClick} className='h-20 w-20 mt-6 bg-neutral-100 hover:opacity-80 hover:bg-neutral-50 transition-all shadow-inner rounded-full cursor-pointer'>
        <div className='relative h-20 w-20 z-10 rounded-full animate-grow shadow-xl' style={ this.props.data.completed ? {display:"block", background:this.props.parentColor} : {display:"none", background:this.props.parentColor}}></div>
      </div>
    );
  }
} 
 
export default HabitSquare;
