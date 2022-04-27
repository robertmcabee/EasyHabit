import React, { Component } from "react";

class HabitSquare extends Component {
  state = {};

  handleClick = () => {
    this.props.toggleCompletion(this.props.data.gridId);
  };

  // getStyle = () => {
  //   if (this.props.data.dayCompleted && this.props.data.completed) {
  //     return {
  //       filter: "brightness(2)",
  //       display: "block",
  //       background: this.props.parentColor,
  //     };
  //   } else if (this.props.data.dayCompleted) {
  //     return {
  //       filter: "brightness(1)",
  //       display: "block",
  //       background: this.props.parentColor,
  //     };
  //   } else {
  //     return {
  //       filter: "brightness(1)",
  //       display: "none",
  //       background: this.props.parentColor,
  //     };
  //   }
  // };

  // getClasses = () => {
  //   if (this.props.data.dayCompleted && this.props.data.completed) {
  //     return "relative z-10 h-20 w-full animate-grow rounded-full shadow-xl dark:shadow-none";
  //   } else if (this.props.data.dayCompleted) {
  //     return "relative z-10 h-20 w-full animate-grow rounded-full shadow-xl dark:shadow-none";
  //   } else {
  //     return "relative z-10 h-20 w-full animate-grow rounded-full shadow-xl dark:shadow-none";
  //   }
  // };

  getBubbleClasses = () => {
    let classes =
      "relative z-10 h-20 w-full rounded-full shadow-xl dark:shadow-none";
    if (this.props.data.completed) {
      classes += ` animate-grow bg-[${this.props.parentColor}]`;
    }
    return classes;
  };

  getBurstClasses = () => {
    let classes = "z-20 h-20 top-[-5rem] w-full relative rounded-full";
    if (this.props.data.displayBurst) {
      classes += ` animate-burst bg-[${this.props.parentColor}]`;
    }
    return classes;
  };

  render() {
    return (
      <div
        onClick={this.handleClick}
        className="mt-6 h-20 cursor-pointer rounded-full bg-neutral-100 shadow-inner transition-all hover:bg-neutral-50 hover:opacity-80 dark:bg-[rgb(30,30,30)]  dark:shadow-none dark:hover:bg-neutral-900"
      >
        <div className={this.getBubbleClasses()}></div>
        <div className={this.getBurstClasses()}></div>
      </div>
    );
  }
}

export default HabitSquare;
