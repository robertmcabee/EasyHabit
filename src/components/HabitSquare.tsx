import React, { Component } from "react";

type Props = {
  data: {
    gridId: string;
    completed: boolean;
    displayBurst: boolean;
  };
  toggleCompletion: (id: string) => void;
  parentColor: string;
};

class HabitSquare extends Component<Props> {
  state = {};

  handleClick = () => {
    this.props.toggleCompletion(this.props.data.gridId);
  };

  getBubbleClasses = () => {
    let classes = "relative z-10 h-20 w-full rounded-full";
    if (this.props.data.completed) {
      classes += ` animate-grow bg-[${this.props.parentColor}] shadow-xl dark:shadow-none`;
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
