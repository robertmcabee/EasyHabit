import React, { Component } from 'react';

class HabitSquare extends Component {

  state = {
    color: 'lightgrey',
  };

  handleClick = () => { 
    this.props.toggleCompletion(this.props.data.gridId)
    this.updateCSS();
  }
  
  updateCSS = () => {
    if (this.props.data.completed) {
      this.setState({
        color: 'lightgreen'
      });
    } else {
      this.setState({
        color: 'lightgrey'
      });
    };
  };

  componentDidMount() {
    this.updateCSS();
  };

  render() { 
    return (
      <div onClick={this.handleClick} className='h-20 w-20 mt-3' style={{backgroundColor: this.state.color}}>
        {/* <p>{this.props.data.gridId}</p> */}
      </div>
    );
  }
} 
 
export default HabitSquare;
