import React, { Component } from "react";

class UpperButtons extends Component {
  state = {};
  render() {
    return (
      <div className="flex h-40 w-fit flex-col justify-center space-y-2 align-middle sm:h-24">
        <div
          onClick={() => {
            this.props.handleOpenOptions();
          }}
          className="flex h-10 w-10 cursor-pointer justify-center rounded-full bg-neutral-100 align-middle shadow-inner transition-all duration-300 hover:rotate-90 hover:bg-neutral-200 dark:bg-neutral-700 dark:shadow-none dark:hover:bg-neutral-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mt-1 h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>
        <div
          onClick={() => {
            this.props.handleOpenForm();
          }}
          className="flex h-10 w-10 cursor-pointer justify-center rounded-full bg-neutral-100 align-middle shadow-inner transition-all duration-300 hover:rotate-90 hover:bg-neutral-200 dark:bg-neutral-700 dark:shadow-none dark:hover:bg-neutral-600 md:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mt-1 h-8 w-8"
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

export default UpperButtons;
