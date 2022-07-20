import React, { Component } from "react";
import ColorSelect from "./ColorSelect";

type Props = {
  displayForm: boolean;
  formErrorMessage: string | null;
  addHabit: (name: string, color: string) => void;
  handleCloseForm: () => void;
};

type State = {
  name: string;
  color: string;
};

class Form extends Component<Props> {
  state: State = {
    name: "",
    color: "",
  };

  handleColorChange = (color: string) => {
    this.setState({
      color: color,
    });
  };

  handleSubmit = (event: any) => {
    event.preventDefault();
    let newHabitColor = this.state.color;
    if (newHabitColor === "") {
      newHabitColor = "rgb(34,211,238)";
    }
    this.props.addHabit(this.state.name, newHabitColor);
    this.setState({ name: "" }); //clear input field
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    this.setState({ [event.target.name]: event.target.value });

  handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      this.handleSubmit(event);
    }
  };

  render() {
    if (this.props.displayForm === false) {
      return null;
    }
    return (
      <div className="fixed z-50 flex h-full w-full justify-center">
        <section className="fixed top-1/4 z-50 m-auto mb-20 max-h-min animate-dropin rounded-2xl bg-white p-10 pb-2 drop-shadow-2xl dark:bg-neutral-700 dark:shadow-none sm:mb-auto sm:pb-10">
          <div className="flex select-none justify-between border-b-2 border-neutral-100 pb-4 align-middle dark:border-neutral-600 sm:pb-8">
            {/* Header */}
            <h2 className="text-lg font-bold">What do you want to track?</h2>
            <div
              onClick={this.props.handleCloseForm}
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
          {/* Error Messgae */}
          {this.props.formErrorMessage ? (
            <p className="text-center italic pt-4">
              {this.props.formErrorMessage}
            </p>
          ) : null}
          {/* Form */}
          <form onSubmit={this.handleSubmit}>
            <fieldset className="flex flex-col justify-center space-y-2 py-6 sm:space-y-4">
              <label htmlFor="name" className="text-center font-bold">
                Name:
              </label>
              <input
                type="text"
                name="name"
                autoComplete="off"
                value={this.state.name}
                onKeyDown={this.handleKeyDown}
                onChange={this.handleChange}
                placeholder="e.g. Stretch"
                className="h-8 rounded-full border-none bg-neutral-100 p-4 text-center font-semibold caret-neutral-400 placeholder:italic placeholder:text-neutral-400 focus:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-300 dark:bg-neutral-800 dark:placeholder:text-neutral-500 dark:focus:border-neutral-500 dark:focus:ring-neutral-500 sm:mx-8"
              />
              <label
                htmlFor="color"
                className="h-8 border-neutral-100 pt-6 pb-6 text-center font-bold dark:border-neutral-600 sm:pt-2"
              >
                Color:
              </label>
              <ColorSelect
                color={this.state.color}
                handleColorChange={this.handleColorChange}
              />
            </fieldset>
            <input
              value="Create"
              type="submit"
              className="absolute bottom-[-1.5rem] left-0 w-1/2 translate-x-1/2 cursor-pointer rounded-full border-0 border-white bg-neutral-900 p-3 font-bold text-white transition-all hover:border-b-4 hover:bg-black dark:bg-neutral-800"
              style={{ color: this.state.color, borderColor: this.state.color }}
            />
          </form>
        </section>
        <div
          onClick={this.props.handleCloseForm}
          className="fixed top-0 z-40 h-full w-full animate-fadein bg-black opacity-50"
        ></div>
      </div>
    );
  }
}

export default Form;
