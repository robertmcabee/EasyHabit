import React, { Component } from "react";

type Props = {
  deleteAllData: () => void;
  handleCloseOptions: () => void;
  displayOptions: boolean;
};

class Options extends Component<Props> {
  state = {
    confirmDelete: false,
    deleteButtonText: "Reset app and delete all data",
  };

  closeOptions = () => {
    this.props.handleCloseOptions();
    this.setState({
      confirmDelete: false,
      deleteButtonText: "Reset app and delete all data",
    });
  };

  confirmDelete = () => {
    if (this.state.confirmDelete === false) {
      this.setState({
        confirmDelete: true,
        deleteButtonText:
          "Are you sure you would like to delete everything? This cannot be undone.",
      });
    } else {
      this.setState(
        {
          confirmDelete: false,
          deleteButtonText: "Reset app and delete all data",
        },
        () => {
          this.props.deleteAllData();
          this.closeOptions();
        }
      );
    }
  };

  render() {
    if (this.props.displayOptions === false) {
      return null;
    }
    return (
      <div className="fixed z-50 flex h-full w-full select-none justify-center align-bottom">
        <section className="z-50 m-auto mb-0 max-h-min max-w-[28rem] animate-dropin rounded-xl bg-white p-10 shadow-2xl dark:bg-neutral-700 dark:shadow-none sm:mb-auto">
          {/* ----------Header---------- */}
          <div className="flex select-none justify-between border-b-2 border-neutral-100 pb-8 align-middle dark:border-neutral-600">
            <h2 className="text-lg font-bold">Options</h2>
            <div
              onClick={() => {
                this.closeOptions();
              }}
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
          {/* ----------Info---------- */}
          <div className="border-b-2 border-neutral-100 py-8 pb-8 text-neutral-500 dark:border-neutral-600 dark:text-neutral-300">
            <p className="mb-2 font-bold">
              Created with &lt;3 by{" "}
              <a
                className="underline underline-offset-2 transition-colors hover:text-black dark:hover:text-white"
                href="https://robertmcabee.netlify.app/"
              >
                Robert McAbee
              </a>{" "}
            </p>
            <p className="mb-2 italic">Thanks for using Easyhabit!</p>
            <p className="mb-2 italic">
              I didn't like any habit trackers availble, so I built my own. I
              hope you find it helpful and enjoyable! I plan to add more
              features in time.
            </p>
            <p className="italic">
              If you encounter any bugs or would like any features added,
              please&nbsp;
              <a
                className="underline underline-offset-2 transition-colors hover:text-black dark:hover:text-white"
                href="https://robertmcabee.netlify.app/#contact"
              >
                let me know!
              </a>
            </p>
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
              this.closeOptions();
            }}
          >
            Close
          </button>
        </section>
        <div
          onClick={() => this.closeOptions()}
          className="fixed top-0 z-40 h-full w-full animate-fadein bg-black opacity-50"
        ></div>
      </div>
    );
  }
}

export default Options;
