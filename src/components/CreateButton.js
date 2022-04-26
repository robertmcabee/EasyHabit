import React, { Component } from "react";

class CreateButton extends Component {
  state = {};
  render() {
    return (
      <div
        onClick={() => {
          this.props.handleOpenForm();
        }}
        className="align-center fixed top-7 left-0 flex h-24 w-20 cursor-pointer flex-col justify-center rounded-r-full bg-neutral-200 text-center font-bold shadow-inner transition-colors hover:bg-neutral-300"
      >
        <p>New</p>
        <p>Habit</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-full"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    );
  }
}

export default CreateButton;
