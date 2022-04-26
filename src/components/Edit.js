import React, { Component } from "react";

class Edit extends Component {
  state = {
    name: "",
    color: this.props.habitToEdit.color,
    selectedColorIndex: null,
    confirmDelete: false,
    deleteButtonText: "Delete Habit",
  };

  indexToColor = (index) => {
    let selectedColor;
    switch (index) {
      case 0:
        selectedColor = "rgb(34 211 238)";
        break;
      case 1:
        selectedColor = "rgb(52 211 153)";
        break;
      case 2:
        selectedColor = "rgb(163 230 53)";
        break;
      case 3:
        selectedColor = "rgb(250 204 21)";
        break;
      case 4:
        selectedColor = "rgb(251 146 60)";
        break;
      case 5:
        selectedColor = "rgb(251 113 133)";
        break;
      case 6:
        selectedColor = "hsl(186,94%,82%)";
        break;
      case 7:
        selectedColor = "hsl(152,76%,80%)";
        break;
      case 8:
        selectedColor = "hsl(81,88%,80%)";
        break;
      case 9:
        selectedColor = "hsl(53,98%,77%)";
        break;
      case 10:
        selectedColor = "hsl(32,98%,83%)";
        break;
      case 11:
        selectedColor = "hsl(353,96%,90%)";
        break;

      default:
        selectedColor = "hsl(53,98%,77%)";
        break;
    }
    return selectedColor;
  };

  colorToIndex = (color) => {
    let index;
    switch (color) {
      case "rgb(34 211 238)":
        index = 0;
        break;
      case "rgb(52 211 153)":
        index = 1;
        break;
      case "rgb(163 230 53)":
        index = 2;
        break;
      case "rgb(250 204 21)":
        index = 3;
        break;
      case "rgb(251 146 60)":
        index = 4;
        break;
      case "rgb(251 113 133)":
        index = 5;
        break;
      case "hsl(186,94%,82%)":
        index = 6;
        break;
      case "hsl(152,76%,80%)":
        index = 7;
        break;
      case "hsl(81,88%,80%)":
        index = 8;
        break;
      case "hsl(53,98%,77%)":
        index = 9;
        break;
      case "hsl(32,98%,83%)":
        index = 10;
        break;
      case "hsl(353,96%,90%)":
        index = 11;
        break;

      default:
        index = 0;
        break;
    }
    return index;
  };

  selectColor = (index) => {
    const color = this.indexToColor(index);
    this.setState({
      color: color,
      selectedColorIndex: index,
    });
    this.props.editHabitColor(color);
  };

  handleChange = (event) => {
    this.setState({ name: this.state.name });
    this.props.editHabitName(event.target.value);
  };

  handleKeyDown = (event) => {
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
    if (this.props.habitToEdit.displayName !== this.state.name) {
      this.setState({ name: this.props.habitToEdit.displayName });
    }
    if (this.props.habitToEdit.color !== this.state.color) {
      let newIndex = this.indexToColor(this.props.habitToEdit.color);
      this.setState({
        color: this.props.habitToEdit.color,
        selectedColorIndex: newIndex,
      });
    }
  }

  render() {
    if (this.props.displayEdit === false) {
      return null;
    }
    return (
      <div className="fixed z-50 flex h-full w-full justify-center align-bottom">
        <section className="z-50 m-auto mb-0 max-h-min max-w-[28rem] animate-dropin rounded-xl bg-white p-10 sm:mb-auto">
          {/* ----------Header---------- */}
          <div className="flex select-none justify-between border-b-2 border-neutral-100 pb-8 align-middle">
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
          <p className="select-none pt-8 text-base font-bold">Stats:</p>
          <div className="flex select-none justify-between">
            <p className="mt-2">Completion:</p>
            {Math.floor(this.props.habitToEdit.completion * 100)}%
          </div>
          <div className="flex select-none justify-between">
            <p className="mt-2">Longest Streak:</p>
            {this.props.habitToEdit.longestStreak}
          </div>
          <div className="flex select-none justify-between border-b-2 border-neutral-100 pb-6">
            <p className="mt-2">Current Streak:</p>
            {this.props.habitToEdit.currentStreak}
          </div>
          {/* ----------Name---------- */}
          <div className="flex justify-between border-b-2 border-neutral-100 py-4 align-middle">
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
              className="my-4 h-8 w-3/4 rounded-full border-none bg-neutral-100 p-4 text-center font-semibold caret-neutral-400 placeholder:italic placeholder:text-neutral-400 focus:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-300"
            />
          </div>
          {/* ----------Color---------- */}
          <p className="mt-4 select-none text-base font-bold">Color:</p>
          <div className="my-4 mt-2 flex w-full justify-evenly space-x-1 sm:space-x-4">
            <div
              onClick={() => {
                this.selectColor(0);
              }}
              className="h-12 w-12 cursor-pointer rounded-full bg-[rgb(34,211,238)] transition-all hover:opacity-75"
              style={
                this.state.selectedColorIndex === 0
                  ? { border: "6px solid rgb(34,211,238)" }
                  : { border: "6px solid hsl(0,0%,95%)" }
              }
            ></div>
            <div
              onClick={() => {
                this.selectColor(1);
              }}
              className="h-12 w-12 cursor-pointer rounded-full bg-[rgb(52,211,153)] transition-all hover:opacity-75"
              style={
                this.state.selectedColorIndex === 1
                  ? { border: "6px solid rgb(52,211,153)" }
                  : { border: "6px solid hsl(0,0%,95%)" }
              }
            ></div>
            <div
              onClick={() => {
                this.selectColor(2);
              }}
              className="h-12 w-12 cursor-pointer rounded-full bg-[rgb(163,230,53)] transition-all hover:opacity-75"
              style={
                this.state.selectedColorIndex === 2
                  ? { border: "6px solid rgb(163,230,53)" }
                  : { border: "6px solid hsl(0,0%,95%)" }
              }
            ></div>
            <div
              onClick={() => {
                this.selectColor(3);
              }}
              className="h-12 w-12 cursor-pointer rounded-full bg-[rgb(250,204,21)] transition-all hover:opacity-75"
              style={
                this.state.selectedColorIndex === 3
                  ? { border: "6px solid rgb(250,204,21)" }
                  : { border: "6px solid hsl(0,0%,95%)" }
              }
            ></div>
            <div
              onClick={() => {
                this.selectColor(4);
              }}
              className="h-12 w-12 cursor-pointer rounded-full bg-[rgb(251,146,60)] transition-all hover:opacity-75"
              style={
                this.state.selectedColorIndex === 4
                  ? { border: "6px solid rgb(251,146,60)" }
                  : { border: "6px solid hsl(0,0%,95%)" }
              }
            ></div>
            <div
              onClick={() => {
                this.selectColor(5);
              }}
              className="h-12 w-12 cursor-pointer rounded-full bg-[rgb(251,113,133)] transition-all hover:opacity-75"
              style={
                this.state.selectedColorIndex === 5
                  ? { border: "6px solid rgb(251,113,133)" }
                  : { border: "6px solid hsl(0,0%,95%)" }
              }
            ></div>
          </div>
          <div className="flex w-full justify-evenly space-x-1 sm:space-x-4">
            <div
              onClick={() => {
                this.selectColor(6);
              }}
              className="h-12 w-12 cursor-pointer rounded-full bg-[hsl(186,94%,82%)] transition-all hover:opacity-75"
              style={
                this.state.selectedColorIndex === 6
                  ? { border: "6px solid hsl(186,94%,82%)" }
                  : { border: "6px solid hsl(0,0%,95%)" }
              }
            ></div>
            <div
              onClick={() => {
                this.selectColor(7);
              }}
              className="h-12 w-12 cursor-pointer rounded-full bg-[hsl(152,76%,80%)] transition-all hover:opacity-75"
              style={
                this.state.selectedColorIndex === 7
                  ? { border: "6px solid hsl(152,76%,80%)" }
                  : { border: "6px solid hsl(0,0%,95%)" }
              }
            ></div>
            <div
              onClick={() => {
                this.selectColor(8);
              }}
              className="h-12 w-12 cursor-pointer rounded-full bg-[hsl(81,88%,80%)] transition-all hover:opacity-75"
              style={
                this.state.selectedColorIndex === 8
                  ? { border: "6px solid hsl(81,88%,80%)" }
                  : { border: "6px solid hsl(0,0%,95%)" }
              }
            ></div>
            <div
              onClick={() => {
                this.selectColor(9);
              }}
              className="h-12 w-12 cursor-pointer rounded-full bg-[hsl(53,98%,77%)] transition-all hover:opacity-75"
              style={
                this.state.selectedColorIndex === 9
                  ? { border: "6px solid hsl(53,98%,77%)" }
                  : { border: "6px solid hsl(0,0%,95%)" }
              }
            ></div>
            <div
              onClick={() => {
                this.selectColor(10);
              }}
              className="h-12 w-12 cursor-pointer rounded-full bg-[hsl(32,98%,83%)] transition-all hover:opacity-75"
              style={
                this.state.selectedColorIndex === 10
                  ? { border: "6px solid hsl(32,98%,83%)" }
                  : { border: "6px solid hsl(0,0%,95%)" }
              }
            ></div>
            <div
              onClick={() => {
                this.selectColor(11);
              }}
              className="h-12 w-12 cursor-pointer rounded-full bg-[hsl(353,96%,90%)] transition-all hover:opacity-75"
              style={
                this.state.selectedColorIndex === 11
                  ? { border: "6px solid hsl(353,96%,90%)" }
                  : { border: "6px solid hsl(0,0%,95%)" }
              }
            ></div>
          </div>
          {/* ----------Buttons---------- */}
          <button
            className="mt-6 w-full cursor-pointer select-none rounded-full border-0 bg-rose-400 p-3 font-bold text-white transition-all duration-300 hover:bg-rose-500"
            onClick={() => {
              this.confirmDelete();
            }}
          >
            {this.state.deleteButtonText}
          </button>
          <button
            className="mt-6 w-full cursor-pointer rounded-full border-0 bg-neutral-800 p-3 font-bold text-white transition-all hover:bg-black"
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
