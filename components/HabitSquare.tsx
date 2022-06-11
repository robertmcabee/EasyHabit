import React, { Component } from "react";

type Props = {
  data: {
    gridId: string;
    completed: boolean;
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
    let classes =
      "relative z-10 h-20 w-full rounded-full animate-grow shadow-xl dark:shadow-none";
    if (!this.props.data.completed) {
      classes += " hidden";
    }
    return classes;
  };

  render() {
    return (
      <div
        onClick={this.handleClick}
        className="mt-6 h-20 cursor-pointer rounded-full bg-neutral-100 shadow-inner transition-all hover:bg-neutral-50 hover:opacity-80 dark:bg-[rgb(30,30,30)]  dark:shadow-none dark:hover:bg-neutral-900"
      >
        <div
          style={{ background: this.props.parentColor }}
          className={this.getBubbleClasses()}
        ></div>
      </div>
    );
  }
}

export default HabitSquare;
