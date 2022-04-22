import React, { Component } from "react";
import { format, parse, add, differenceInCalendarDays } from "date-fns";
import { v4 as uuidv4 } from "uuid"; //example: 273a442e-9882-4662-8a99-16be011bd3b6
import Grid from "./components/Grid";
import Form from "./components/Form";
import Edit from "./components/Edit";
import "./style.css";

class App extends Component {
  state = {
    displayForm: false,
    displayEdit: false,
    habitToEdit: {
      habitId: "",
      displayName: "",
      color: "",
      completion: null,
      currentStreak: null,
      longestStreak: null,
    },
    dates: [
      // '2022-02-01',
      // '2022-02-02',
      // '2022-02-03',
      // '2022-02-04',
    ],
    habits: [
      // {
      //   habitId: '00680z',
      //   displayName: 'Anki',
      //   color: '#ffffff',
      //   completion: 1,
      //   currentStreak: 1,
      //   longestStreak: 1,
      //   gridItems: [
      //     {
      //       gridId: '00680z-2022-02-01',
      //       date: '2022-02-01',
      //       completed: false,
      //     },
      //     ...
      //     ...
      //     ...
      //   ],
      // },
    ],
  };

  daysElapsed = (currentTime, mostRecentDay) => {
    //returns series of formatted days that have elapsed
    const numOfDays = differenceInCalendarDays(currentTime, mostRecentDay);
    if (numOfDays < 0) return null;
    const result = [];
    for (let i = 0; i < numOfDays + 1; i++) {
      result.push(format(add(mostRecentDay, { days: i }), "yyyy-MM-dd")); //creates an ascending series of formatted days
    }
    return result;
  };

  toggleCompletion = (id) => {
    this.setState({
      habits: this.state.habits.map((habit) => {
        habit.gridItems.map((item) => {
          if (item.gridId === id) {
            item.completed = !item.completed;
          }
          return item;
        });
        let streaks = this.evaluateHabitStreaks(habit);
        habit.currentStreak = streaks.currentStreak;
        habit.longestStreak = streaks.longestStreak;
        habit.completion = this.evaluateHabitCompletion(habit);
        return habit;
      }),
    });
  };

  evaluateHabitCompletion = (habit) => {
    //returns the completion percentage of a habit
    const completed = habit.gridItems.filter((item) => item.completed === true);
    return completed.length / habit.gridItems.length;
  };

  evaluateHabitStreaks = (habit) => {
    let longestStreak = 0;
    let currentStreak = 0;
    let streakAtIndex = 0;
    habit.gridItems
      .slice() //to create a shalow copy of gridItems to reverse
      .reverse()
      .forEach((item) => {
        if (item.completed) {
          streakAtIndex++;
        } else {
          streakAtIndex = 0;
        }
        if (streakAtIndex > longestStreak) {
          longestStreak = streakAtIndex;
        }
      });
    currentStreak = streakAtIndex;
    return { longestStreak: longestStreak, currentStreak: currentStreak };
  };

  loadTestStateA = () => {
    this.setState({
      dates: ["2022-02-04", "2022-02-03", "2022-02-02", "2022-02-01"],
      habits: [
        {
          habitId: "000",
          color: "rgb(34 211 238)",
          displayName: "Code",
          completion: 0.5,
          currentStreak: 0,
          longestStreak: 2,
          gridItems: [
            {
              gridId: "000-1",
              date: "2022-02-04",
              completed: false,
            },
            {
              gridId: "000-2",
              date: "2022-02-03",
              completed: false,
            },
            {
              gridId: "000-3",
              date: "2022-02-02",
              completed: true,
            },
            {
              gridId: "000-4",
              date: "2022-02-01",
              completed: true,
            },
          ],
        },

        {
          habitId: "001",
          color: "rgb(52 211 153)",
          displayName: "Stretch",
          completion: 0.75,
          currentStreak: 0,
          longestStreak: 3,
          gridItems: [
            {
              gridId: "001-1",
              date: "2022-02-04",
              completed: false,
            },
            {
              gridId: "001-2",
              date: "2022-02-03",
              completed: true,
            },
            {
              gridId: "001-3",
              date: "2022-02-02",
              completed: true,
            },
            {
              gridId: "001-4",
              date: "2022-02-01",
              completed: true,
            },
          ],
        },

        {
          habitId: "002",
          color: "rgb(163 230 53)",
          displayName: "Anki",
          completion: 1,
          currentStreak: 4,
          longestStreak: 4,
          gridItems: [
            {
              gridId: "002-1",
              date: "2022-02-04",
              completed: true,
            },
            {
              gridId: "002-2",
              date: "2022-02-03",
              completed: true,
            },
            {
              gridId: "002-3",
              date: "2022-02-02",
              completed: true,
            },
            {
              gridId: "002-4",
              date: "2022-02-01",
              completed: true,
            },
          ],
        },
      ],
    });
  };

  loadTestStateB = () => {
    this.setState({
      dates: ["2022-02-04"],
      habits: [
        {
          habitId: "000",
          color: "rgb(34 211 238)",
          displayName: "Code",
          gridItems: [
            {
              gridId: "000-1",
              date: "2022-02-04",
              completed: true,
            },
          ],
        },

        {
          habitId: "001",
          color: "rgb(52 211 153)",
          displayName: "Stretch",
          gridItems: [
            {
              gridId: "001-1",
              date: "2022-02-04",
              completed: true,
            },
          ],
        },

        {
          habitId: "002",
          color: "rgb(163 230 53)",
          displayName: "Anki",
          gridItems: [
            {
              gridId: "002-1",
              date: "2022-02-04",
              completed: true,
            },
          ],
        },

        {
          habitId: "003",
          color: "rgb(250 204 21)",
          displayName: "ExampleA",
          gridItems: [
            {
              gridId: "003-1",
              date: "2022-02-04",
              completed: true,
            },
          ],
        },

        {
          habitId: "004",
          color: "rgb(251 146 60)",
          displayName: "ExampleB",
          gridItems: [
            {
              gridId: "004-1",
              date: "2022-02-04",
              completed: true,
            },
          ],
        },

        {
          habitId: "005",
          color: "rgb(251 113 133)",
          displayName: "ExampleC",
          gridItems: [
            {
              gridId: "005-1",
              date: "2022-02-04",
              completed: true,
            },
          ],
        },

        {
          habitId: "006",
          color: "rgb(34 211 238)",
          displayName: "ExampleD",
          gridItems: [
            {
              gridId: "006-1",
              date: "2022-02-04",
              completed: true,
            },
          ],
        },

        {
          habitId: "007",
          color: "rgb(163 230 53)",
          displayName: "ExampleE",
          gridItems: [
            {
              gridId: "007-1",
              date: "2022-02-04",
              completed: true,
            },
          ],
        },
      ],
    });
  };

  addDay = () => {
    const lastDate = this.state.dates[0];
    const parsedLastDate = parse(lastDate, "yyyy-MM-dd", new Date()); //convert string into js date object
    const newDate = add(parsedLastDate, { days: 1 });
    const formattedNewDate = format(newDate, "yyyy-MM-dd"); //convert new date into string
    this.setState({
      dates: [formattedNewDate, ...this.state.dates],
    });
    this.state.habits.forEach((habit) => {
      //add new grid items to each habit for the new day
      habit.gridItems.unshift({
        gridId: habit.habitId + "-" + formattedNewDate,
        date: formattedNewDate,
        completed: false,
      });
    });
  };

  addHabit = (name, color) => {
    name = name.replace(/([[{};:<>$])/g, ""); //sanitize user input
    let newHabit = {};
    newHabit["habitId"] = uuidv4().slice(0, 8);
    newHabit["displayName"] = name;
    newHabit["color"] = color;
    newHabit["completion"] = 0;
    newHabit["currentStreak"] = 0;
    newHabit["longestStreak"] = 0;
    newHabit["gridItems"] = this.state.dates.map((date) => {
      return {
        gridId: newHabit.habitId + "-" + date,
        date: date,
        completed: false,
      };
    });
    this.setState({
      habits: [...this.state.habits, newHabit],
      displayForm: false,
    });
  };

  deleteHabit = () => {
    const id = this.state.habitToEdit.habitId;
    this.setState({
      habits: [...this.state.habits.filter((habit) => habit.habitId !== id)],
      displayEdit: false,
    });
  };

  editHabitName = (name) => {
    const id = this.state.habitToEdit.habitId;
    name = name.replace(/([[{};:<>$])/g, ""); //sanitize user input
    this.setState({
      habits: this.state.habits.map((habit) => {
        if (habit.habitId === id) {
          habit.displayName = name;
        }
        return habit;
      }),
    });
  };

  editHabitColor = (color) => {
    const id = this.state.habitToEdit.habitId;
    this.setState({
      habits: this.state.habits.map((habit) => {
        if (habit.habitId === id) {
          habit.color = color;
        }
        return habit;
      }),
    });
  };

  handleCloseForm = () => {
    this.setState({
      displayForm: false,
    });
  };

  handleOpenForm = () => {
    this.setState({
      displayForm: true,
    });
  };

  handleCloseEdit = () => {
    this.setState({
      displayEdit: false,
    });
  };

  handleOpenEdit = (id) => {
    let habitToEdit = this.state.habits.find((habit) => habit.habitId === id);
    this.setState({
      displayEdit: true,
      habitToEdit: habitToEdit,
    });
  };

  addStartDate = () => {
    this.setState({
      dates: [...this.state.dates, format(new Date(), "yyyy-MM-dd")],
    });
  };

  setLocalStorage = () => {
    console.log("-----------storing state-----------");
    console.log("--------------habits:");
    console.log(this.state.habits);
    console.log("--------------dates:");
    console.log(this.state.dates);

    localStorage.setItem("habits", JSON.stringify(this.state.habits));
    localStorage.setItem("dates", JSON.stringify(this.state.dates));
  };

  clearLocalStorage = () => {
    console.log("clearing state");
    localStorage.setItem("habits", "");
    localStorage.setItem("dates", "");
  };

  componentDidMount() {
    //check local storage for previous state
    if (localStorage.getItem("habits") && localStorage.getItem("dates")) {
      console.log("-----------loading state-----------");
      const storedHabits = JSON.parse(localStorage.getItem("habits"));
      const storedDates = JSON.parse(localStorage.getItem("dates"));
      console.log(storedHabits);
      console.log(storedDates);
      this.setState({
        dates: storedDates,
        habits: storedHabits,
      });
    } else {
      console.log("-----------no state found-----------");
      this.addStartDate();
    }
  }

  componentDidUpdate() {
    this.setLocalStorage();
  }

  render() {
    return (
      <div className="bg-neutral-50 font-sans text-neutral-700">
        <div className="mb-8 flex w-full justify-center space-x-2 opacity-50 hover:opacity-100">
          <button
            onClick={this.addDay}
            className="rounded-md bg-purple-300 p-2 text-white sm:bg-red-300 md:bg-orange-300 lg:bg-yellow-300 xl:bg-green-300"
          >
            New Day
          </button>
          <button
            onClick={() => {
              this.loadTestStateA();
            }}
            className=" rounded-md bg-purple-300 p-2 text-white sm:bg-red-300 md:bg-orange-300 lg:bg-yellow-300 xl:bg-green-300"
          >
            Load Test A
          </button>
          <button
            onClick={() => {
              this.loadTestStateB();
            }}
            className=" rounded-md bg-purple-300 p-2 text-white sm:bg-red-300 md:bg-orange-300 lg:bg-yellow-300 xl:bg-green-300"
          >
            Load Test B
          </button>
          <button
            onClick={() => {
              this.clearLocalStorage();
            }}
            className=" rounded-md bg-purple-300 p-2 text-white sm:bg-red-300 md:bg-orange-300 lg:bg-yellow-300 xl:bg-green-300"
          >
            Clear Local Storage
          </button>
        </div>
        <Edit
          deleteHabit={this.deleteHabit}
          editHabitColor={this.editHabitColor}
          editHabitName={this.editHabitName}
          displayEdit={this.state.displayEdit}
          handleCloseEdit={this.handleCloseEdit}
          habitToEdit={this.state.habitToEdit}
        />
        <Form
          addHabit={this.addHabit}
          displayForm={this.state.displayForm}
          handleCloseForm={this.handleCloseForm}
        />
        <Grid
          habits={this.state.habits}
          dates={this.state.dates}
          toggleCompletion={this.toggleCompletion}
          handleOpenForm={this.handleOpenForm}
          handleOpenEdit={this.handleOpenEdit}
        />
      </div>
    );
  }
}

export default App;
