import React, { Component } from 'react';

class HabitSquare extends Component {

  state = {
    filter: "grayscale(100%)"
  };

  handleClick = () => { 
    this.props.toggleCompletion(this.props.data.gridId)
    this.updateCSS();
  }
  
  updateCSS = () => {
    if (this.props.data.completed) {
      this.setState({
      filter: "grayscale(0%)"
      });
    } else {
      this.setState({
      filter: "grayscale(100%)"
      });
    };
  };

  componentDidMount() {
    this.updateCSS();
  };

  render() { 
    return (
      <div onClick={this.handleClick} className='h-20 w-20 mt-3 bg-lime-400 hover:bg-lime-300 transition-colors' style={{filter: this.state.filter}}>
      </div>
    );
  }
} 
 
export default HabitSquare;
