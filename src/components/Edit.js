import React, { Component } from "react";

class Edit extends Component {
  state = {
    name: "",
    color: this.props.color,
    selectedColorIndex: null,
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

  componentDidUpdate() {
    if (this.props.name !== this.state.name) {
      this.setState({ name: this.props.name });
    }
    if (this.props.color !== this.state.color) {
      this.setState({ color: this.props.color });
    }
  }

  render() {
    if (this.props.displayEdit === false) {
      return null;
    }
    return (
      <div className="flex justify-center">
        <section className="absolute top-0 z-50 m-16 animate-dropin rounded-xl bg-white p-10 drop-shadow-2xl">
          <div className="flex justify-between border-b-2 border-neutral-100 pb-8 align-middle">
            <h2 className="text-lg font-bold">Edit?</h2>
            <div
              onClick={this.props.handleCloseEdit}
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
          <label htmlFor="name" className="text-center font-bold">
            Name:
          </label>
          <input
            type="text"
            name="name"
            autoComplete="off"
            value={this.state.name}
            onChange={this.handleChange}
            className="mx-8 h-8 rounded-full border-none bg-neutral-100 p-4 text-center font-semibold caret-neutral-400 placeholder:italic placeholder:text-neutral-400 focus:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-300"
          />
          <div className="mt-2 flex w-full justify-evenly space-x-2">
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
          <div className="flex w-full justify-evenly space-x-2">
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
          <button
            onClick={() => {
              this.props.deleteHabit();
            }}
          >
            Delete???
          </button>
        </section>
        <div
          onClick={this.props.handleCloseEdit}
          className="absolute top-0 z-40 h-full w-full animate-fadein bg-black opacity-50"
        ></div>
      </div>
    );
  }
}

export default Edit;
