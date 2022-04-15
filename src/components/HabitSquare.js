import React, { Component } from 'react';

class HabitSquare extends Component {

  state = {
    displayColor: this.props.parentColor,
  };

  handleClick = () => { 
    this.props.toggleCompletion(this.props.data.gridId)
    this.updateCSS();
  }
  
  updateCSS = () => {
    if (this.props.data.completed) {
      this.setState({
        displayColor: this.props.parentColor,
      });
    } else {
      this.setState({
        displayColor: "lightgrey",
      });
    };
  };

  componentDidMount() {
    this.updateCSS();
  };

  render() { 
    return (
      <div onClick={this.handleClick} className='h-20 w-20 mt-3 hover:opacity-70 transition-all' style={{ background: this.state.displayColor }}>
      </div>
    );
  }
} 
 
export default HabitSquare;
