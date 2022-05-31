import { type } from "@testing-library/user-event/dist/type";
import React, { Component } from "react";
import ColorSelect from "./ColorSelect";

type Props = {
  habitToEdit: Habit;
  displayEdit: boolean;
  editHabitColor: (color: string) => void;
  editHabitName: (name: string) => void;
  handleCloseEdit: () => void;
  deleteHabit: () => void;
};

type Habit = {
  habitId: string;
  name: string;
  color: string;
  completion: number;
  currentStreak: number;
  longestStreak: number;
};

type State = {
  name: string;
  confirmDelete: boolean;
  deleteButtonText: "Delete Habit" | "Are you sure? This cannot be undone.";
};
class Edit extends Component<Props> {
  state: State = {
    name: "",
    confirmDelete: false,
    deleteButtonText: "Delete Habit",
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ name: this.state.name });
    this.props.editHabitName(event.target.value);
  };

  handleColorChange = (color: string) => {
    this.props.editHabitColor(color);
  };

  handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      this.closeEdit();
    }
  };

  confirmDelete = () => {
    if (this.state.confirmDelete === false) {
      this.setState({
        confirmDelete: true,
        deleteButtonText: "Are you sure? This cannot be undone.",
      });
    } else {
      this.props.deleteHabit();
      this.setState({
        confirmDelete: false,
        deleteButtonText: "Delete Habit",
      });
    }
  };

  closeEdit = () => {
    this.props.handleCloseEdit();
    this.setState({
      confirmDelete: false,
      deleteButtonText: "Delete Habit",
      selectedColorIndex: null,
    });
  };

  componentDidUpdate() {
    if (this.props.habitToEdit.name !== this.state.name) {
      this.setState({ name: this.props.habitToEdit.name });
    }
  }

  render() {
    if (this.props.displayEdit === false) {
      return null;
    }
    return (
      <div className="fixed z-50 flex h-full w-full justify-center align-bottom">
        <section className="z-50 m-auto mb-auto max-h-min max-w-[28rem] animate-dropin rounded-2xl bg-white p-10 dark:bg-neutral-700">
          {/* ----------Header---------- */}
          <div className="flex select-none justify-between border-b-2 border-neutral-100 pb-4 align-middle dark:border-neutral-600 sm:pb-8">
            <h2 className="text-lg font-bold">Edit Habit</h2>
            <div
              onClick={() => this.closeEdit()}
              className="cursor-pointer hover:text-neutral-900"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          </div>
          {/* ----------Stats---------- */}
          <p className="select-none pt-4 text-base font-bold sm:pt-8">Stats:</p>
          <div className="flex select-none justify-between">
            <p className="mt-2">Completion:</p>
            {Math.floor(this.props.habitToEdit.completion * 100)}%
          </div>
          <div className="flex select-none justify-between">
            <p className="mt-2">Longest Streak:</p>
            {this.props.habitToEdit.longestStreak}
          </div>
          <div className="flex select-none justify-between border-b-2 border-neutral-100 pb-4 dark:border-neutral-600 sm:pb-6">
            <p className="mt-2">Current Streak:</p>
            {this.props.habitToEdit.currentStreak}
          </div>
          {/* ----------Name---------- */}
          <div className="flex justify-between border-b-2 border-neutral-100 py-1 align-middle dark:border-neutral-600 sm:py-4">
            <p className="h-8 select-none self-center text-base font-bold">
              Name:
            </p>
            <input
              type="text"
              name="name"
              autoComplete="off"
              value={this.state.name}
              onKeyDown={this.handleKeyDown}
              onChange={this.handleChange}
              className="my-4 h-8 w-3/4 rounded-full border-0 border-none bg-neutral-100 p-4 text-center font-semibold caret-neutral-400 placeholder:italic placeholder:text-neutral-400 focus:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-300 dark:bg-neutral-800 dark:focus:border-neutral-50 dark:focus:ring-neutral-500"
            />
          </div>
          {/* ----------Color---------- */}
          <ColorSelect
            color={this.props.habitToEdit.color}
            handleColorChange={this.handleColorChange}
          />
          {/* ----------Buttons---------- */}
          <button
            className="mt-4 w-full cursor-pointer select-none rounded-full border-0 bg-rose-400 p-3 font-bold text-white transition-all duration-300 hover:bg-rose-500 sm:mt-6"
            onClick={() => {
              this.confirmDelete();
            }}
          >
            {this.state.deleteButtonText}
          </button>
          <button
            className="mt-4 w-full cursor-pointer rounded-full border-0 bg-neutral-800 p-3 font-bold text-white transition-all hover:bg-black sm:mt-6"
            onClick={() => {
              this.closeEdit();
            }}
          >
            Close
          </button>
        </section>
        <div
          onClick={() => this.closeEdit()}
          className="fixed top-0 z-40 h-full w-full animate-fadein bg-black opacity-50"
        ></div>
      </div>
    );
  }
}

export default Edit;
