import React, { Component } from "react";

class DevelopmentButtons extends Component {
  state = {};
  render() {
    if (true) return null;
    return (
      <div className="mb-8 flex w-full justify-center space-x-2">
        <button
          onClick={this.props.addDay}
          className="rounded-md bg-purple-300 p-2 text-white sm:bg-red-300 md:bg-orange-300 lg:bg-yellow-300 xl:bg-green-300"
        >
          New Day
        </button>
        <button
          onClick={this.props.addElapsedDays}
          className="rounded-md bg-purple-300 p-2 text-white sm:bg-red-300 md:bg-orange-300 lg:bg-yellow-300 xl:bg-green-300"
        >
          Add Elapsed Days
        </button>
        <button
          onClick={() => {
            this.props.loadTestStateA();
          }}
          className=" rounded-md bg-purple-300 p-2 text-white sm:bg-red-300 md:bg-orange-300 lg:bg-yellow-300 xl:bg-green-300"
        >
          Load Test A
        </button>
        <button
          onClick={() => {
            this.props.loadTestStateB();
          }}
          className=" rounded-md bg-purple-300 p-2 text-white sm:bg-red-300 md:bg-orange-300 lg:bg-yellow-300 xl:bg-green-300"
        >
          Load Test B
        </button>
        <button
          onClick={() => {
            this.props.loadTestStateC();
          }}
          className=" rounded-md bg-purple-300 p-2 text-white sm:bg-red-300 md:bg-orange-300 lg:bg-yellow-300 xl:bg-green-300"
        >
          Load Test C
        </button>
        <button
          onClick={() => {
            this.props.clearLocalStorage();
          }}
          className=" rounded-md bg-purple-300 p-2 text-white sm:bg-red-300 md:bg-orange-300 lg:bg-yellow-300 xl:bg-green-300"
        >
          Clear Local Storage
        </button>
      </div>
    );
  }
}

export default DevelopmentButtons;
