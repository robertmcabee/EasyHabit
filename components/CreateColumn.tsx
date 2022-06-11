import React, { Component } from "react";

type Props = {
  handleOpenForm: () => void;
};

class CreateColumn extends Component<Props> {
  state = {};
  render() {
    return (
      <div
        onClick={() => {
          this.props.handleOpenForm();
        }}
        className="group h-min text-neutral-400 hover:text-neutral-500 dark:hover:text-neutral-200 "
      >
        <h3 className="mt-10 h-10 cursor-pointer text-center font-bold duration-200">
          Add New Habit
        </h3>
        <div className="mt-12 h-20 w-full cursor-pointer rounded-full transition-all duration-200 group-hover:bg-neutral-100  group-hover:shadow-inner dark:shadow-none dark:group-hover:bg-[rgb(30,30,30)]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-20 w-full"
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
      </div>
    );
  }
}

export default CreateColumn;
