import React, { Component } from "react";

class HabitSquare extends Component {
  state = {};

  handleClick = () => {
    this.props.toggleCompletion(this.props.data.gridId);
  };

  render() {
    return (
      <div
        onClick={this.handleClick}
        className="mt-6 h-20 cursor-pointer rounded-full bg-neutral-100 shadow-inner transition-all hover:bg-neutral-50 hover:opacity-80 dark:bg-[rgb(30,30,30)] dark:shadow-none dark:hover:bg-neutral-900"
      >
        <div
          className="relative z-10 h-20 w-full animate-grow rounded-full shadow-xl dark:shadow-none"
          style={
            this.props.data.completed
              ? { display: "block", background: this.props.parentColor }
              : { display: "none", background: this.props.parentColor }
          }
        ></div>
      </div>
    );
  }
}

export default HabitSquare;
