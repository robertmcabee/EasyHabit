import React, { Component } from "react";
import ColorSelect from "./ColorSelect";

type Props = {
  displayWelcome: boolean;
  displayForm: boolean;
  formErrorMessage: string | null;
  addHabit: (name: string, color: string) => void;
  handleCloseForm: () => void;
  hideWelcome: () => void;
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
      <div className="fixed z-50 flex h-full w-full justify-center align-middle">
        <section className="fixed sm:top-[10%] z-50 sm:w-full m-auto mb-20 max-h-min max-w-fit animate-dropin rounded-2xl bg-white p-10 pb-2 drop-shadow-2xl dark:bg-neutral-700 dark:shadow-none sm:mb-auto sm:pb-10">
          {this.props.displayWelcome ? (
            // if welcome is displayed
            <div className="flex select-none justify-center align-middle sm:w-96">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">
                  Welcome to EasyHabit
                </h2>
                <p className="text-lg opacity-60">
                  EasyHabit is a habit tracker app built to help you build good
                  habits.
                </p>
                <div className="flex justify-center">
                  <ul className="list-disc text-left font-bold pl-5 w-fit">
                    <li className="mt-8">It's free</li>
                    <li className="py-1">Login across your devices</li>
                    <li className="mb-8">Customizable</li>
                  </ul>
                </div>
                <button
                  className="mt-6 w-full cursor-pointer rounded-full border-0 bg-neutral-800 p-3 font-bold text-white transition-all hover:bg-black"
                  onClick={() => {
                    this.props.hideWelcome();
                  }}
                >
                  Get Started
                </button>
              </div>
            </div>
          ) : (
            <div className="sm:w-96">
              <div className="flex select-none justify-between border-b-2 border-neutral-100 pb-4 mb-8 align-middle dark:border-neutral-600 sm:pb-8">
                <h2 className="text-lg font-bold">
                  What do you want to track?
                </h2>
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
                <p className="text-center italic pb-4 opacity-75">
                  {this.props.formErrorMessage}
                </p>
              ) : null}
              {/* Form */}
              <form onSubmit={this.handleSubmit}>
                <fieldset className="flex flex-col justify-center align-middle space-y-2 sm:space-y-4">
                  <label className="select-none text-base font-bold">
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
                    className=" h-8 rounded-full self-center w-full border-0 border-none bg-neutral-100 p-4 text-center font-semibold caret-neutral-400 placeholder:italic placeholder:text-neutral-400 focus:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-300 dark:bg-neutral-800 dark:focus:border-neutral-50 dark:focus:ring-neutral-500"
                  />

                  <label
                    htmlFor="color"
                    className="h-8 border-neutral-100 font-bold dark:border-neutral-600 sm:pt-2"
                  >
                    Color:
                  </label>
                  <div className="flex justify-center pb-6">
                    <ColorSelect
                      color={this.state.color}
                      handleColorChange={this.handleColorChange}
                    />
                  </div>
                </fieldset>
                <input
                  value="Create"
                  type="submit"
                  className="absolute bottom-[-1.5rem] left-0 w-1/2 translate-x-1/2 cursor-pointer rounded-full border-0 border-white bg-neutral-900 p-3 font-bold text-white transition-all hover:border-b-4 hover:bg-black dark:bg-neutral-800"
                  style={{
                    color: this.state.color,
                    borderColor: this.state.color,
                  }}
                />
              </form>
            </div>
          )}
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
