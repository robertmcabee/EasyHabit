import React, { Component } from "react";
import { format, parse, add, differenceInCalendarDays } from "date-fns";
import Grid from "./components/Grid";
import Form from "./components/Form";
import Edit from "./components/Edit";
import Options from "./components/Options";
import DevelopmentButtons from "./components/DevelopmentButtons";
import "./style.css";

type State = {
  displayForm: boolean;
  displayOptions: boolean;
  displayEdit: boolean;
  habits: Habit[];
  habitToEdit: Habit;
  dates: string[];
};

type Habit = {
  habitId: string;
  name: string;
  color: string;
  completion: number;
  currentStreak: number;
  longestStreak: number;
  gridItems: GridItem[];
};

type GridItem = {
  date: string;
  gridId: string;
  displayBurst: boolean;
  completed: boolean;
};

class App extends Component {
  state: State = {
    displayForm: false,
    displayOptions: false,
    displayEdit: false,
    habitToEdit: {
      habitId: "",
      name: "",
      color: "",
      completion: 0,
      currentStreak: 0,
      longestStreak: 0,
      gridItems: [],
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
      //   name: 'Anki',
      //   color: '#ffffff',
      //   completion: 1,
      //   currentStreak: 1,
      //   longestStreak: 1,
      //   gridItems: [
      //     {
      //       gridId: '00680z-2022-02-01',
      //       date: '2022-02-01',
      //       completed: false,
      //       displayBurst: false,
      //     },
      //     ...
      //     ...
      //     ...
      //   ],
      // },
    ],
  };

  toggleCompletion = (id: string) => {
    const date = id.slice(-10);
    this.setState(
      {
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
      },
      () => {
        this.evaluateDayCompletion(date);
      }
    );
  };

  evaluateDayCompletion = (date: string) => {
    const index = this.state.dates.indexOf(date);
    //check if all habits are complete for that day
    let displayBurst = true;
    const idArray: string[] = [];
    this.state.habits.forEach((habit) => {
      habit.gridItems[index].completed
        ? idArray.push(habit.gridItems[index].gridId)
        : (displayBurst = false);
    });
    if (!displayBurst) return false;
    //apply class to completed days
    this.setState(
      {
        habits: this.state.habits.map((habit) => {
          habit.gridItems.map((item) => {
            if (idArray.includes(item.gridId)) {
              item.displayBurst = true;
            }
            return item;
          });
          return habit;
        }),
      },
      //then remove class after 1000ms
      () => {
        setTimeout(() => {
          this.setState({
            habits: this.state.habits.map((habit) => {
              habit.gridItems.map((item) => {
                if (idArray.includes(item.gridId)) {
                  item.displayBurst = false;
                }
                return item;
              });
              return habit;
            }),
          });
        }, 1000);
      }
    );
  };

  evaluateHabitCompletion = (habit: Habit) => {
    //returns the completion percentage of a habit
    const completed = habit.gridItems.filter((item) => item.completed === true);
    return completed.length / habit.gridItems.length;
  };

  evaluateHabitStreaks = (habit: Habit) => {
    let longestStreak = 0;
    let currentStreak = 0;
    let streakAtIndex = 0;
    habit.gridItems
      .slice() //to create a shallow copy of gridItems to reverse
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
          color: "rgb(34,211,238)",
          name: "Code",
          completion: 0.5,
          currentStreak: 0,
          longestStreak: 2,
          gridItems: [
            {
              gridId: "000-12022-02-04",
              date: "2022-02-04",
              completed: false,
              displayBurst: false,
            },
            {
              gridId: "000-22022-02-03",
              date: "2022-02-03",
              completed: false,
              displayBurst: false,
            },
            {
              gridId: "000-32022-02-02",
              date: "2022-02-02",
              completed: true,
              displayBurst: false,
            },
            {
              gridId: "000-42022-02-01",
              date: "2022-02-01",
              completed: true,
              displayBurst: false,
            },
          ],
        },

        {
          habitId: "001",
          color: "rgb(52,211,153)",
          name: "Stretch",
          completion: 0.75,
          currentStreak: 0,
          longestStreak: 3,
          gridItems: [
            {
              gridId: "001-12022-02-04",
              date: "2022-02-04",
              completed: false,
              displayBurst: false,
            },
            {
              gridId: "001-22022-02-03",
              date: "2022-02-03",
              completed: true,
              displayBurst: false,
            },
            {
              gridId: "001-32022-02-02",
              date: "2022-02-02",
              completed: true,
              displayBurst: false,
            },
            {
              gridId: "001-42022-02-01",
              date: "2022-02-01",
              completed: true,
              displayBurst: false,
            },
          ],
        },

        {
          habitId: "002",
          color: "rgb(163,230,53)",
          name: "Anki",
          completion: 1,
          currentStreak: 4,
          longestStreak: 4,
          gridItems: [
            {
              gridId: "002-12022-02-04",
              date: "2022-02-04",
              completed: true,
              displayBurst: false,
            },
            {
              gridId: "002-22022-02-03",
              date: "2022-02-03",
              completed: true,
              displayBurst: false,
            },
            {
              gridId: "002-32022-02-02",
              date: "2022-02-02",
              completed: true,
              displayBurst: false,
            },
            {
              gridId: "002-42022-02-01",
              date: "2022-02-01",
              completed: true,
              displayBurst: false,
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
          color: "rgb(34,211,238)",
          name: "Code",
          gridItems: [
            {
              gridId: "000-12022-02-04",
              date: "2022-02-04",
              completed: true,
              displayBurst: false,
            },
          ],
        },

        {
          habitId: "001",
          color: "rgb(52,211,153)",
          name: "Stretch",
          gridItems: [
            {
              gridId: "001-12022-02-04",
              date: "2022-02-04",
              completed: true,
              displayBurst: false,
            },
          ],
        },

        {
          habitId: "002",
          color: "rgb(163,230,53)",
          name: "Anki",
          gridItems: [
            {
              gridId: "002-12022-02-04",
              date: "2022-02-04",
              completed: true,
              displayBurst: false,
            },
          ],
        },

        {
          habitId: "003",
          color: "rgb(250,204,21)",
          name: "ExampleA",
          gridItems: [
            {
              gridId: "003-12022-02-04",
              date: "2022-02-04",
              completed: true,
              displayBurst: false,
            },
          ],
        },

        {
          habitId: "004",
          color: "rgb(251,146,60)",
          name: "ExampleB",
          gridItems: [
            {
              gridId: "004-12022-02-04",
              date: "2022-02-04",
              completed: true,
              displayBurst: false,
            },
          ],
        },

        {
          habitId: "005",
          color: "rgb(251,113,133)",
          name: "ExampleC",
          gridItems: [
            {
              gridId: "005-12022-02-04",
              date: "2022-02-04",
              completed: true,
              displayBurst: false,
            },
          ],
        },

        {
          habitId: "006",
          color: "rgb(34,211,238)",
          name: "ExampleD",
          gridItems: [
            {
              gridId: "006-12022-02-04",
              date: "2022-02-04",
              completed: true,
              displayBurst: false,
            },
          ],
        },

        {
          habitId: "007",
          color: "rgb(163,230,53)",
          name: "ExampleE",
          gridItems: [
            {
              gridId: "007-12022-02-04",
              date: "2022-02-04",
              completed: true,
              displayBurst: false,
            },
          ],
        },
      ],
    });
  };

  loadTestStateC = () => {
    this.setState({
      dates: ["2022-04-20"],
      habits: [
        {
          habitId: "000",
          color: "rgb(34,211,238)",
          name: "Code",
          gridItems: [
            {
              gridId: "000-12022-0420",
              date: "2022-04-20",
              completed: true,
              displayBurst: false,
            },
          ],
        },

        {
          habitId: "007",
          color: "rgb(163,230,53)",
          name: "Anki",
          gridItems: [
            {
              gridId: "007-12022-04-20",
              date: "2022-04-20",
              completed: true,
              displayBurst: false,
            },
          ],
        },
      ],
    });
  };

  addElapsedDays = () => {
    //creates new dates between most recent date and today & coresponding habit grid items
    const today = new Date();
    const mostRecentDay = parse(this.state.dates[0], "yyyy-MM-dd", new Date());
    const numOfDays = differenceInCalendarDays(today, mostRecentDay);
    //if most recent date is in the future, do nothing
    if (numOfDays < 0) return null;
    //creates array of formatted dates
    const daysToAdd = [];
    for (let i = 1; i < numOfDays + 1; i++) {
      const date = add(mostRecentDay, { days: i });
      daysToAdd.unshift(format(date, "yyyy-MM-dd"));
    }
    //sets state with new dates
    this.setState({
      dates: [...daysToAdd, ...this.state.dates],
    });
    //for each day, add a new grid item to each habit
    daysToAdd.forEach((day) => {
      this.state.habits.forEach((habit) => {
        habit.gridItems.unshift({
          gridId: habit.habitId + "-" + day,
          date: day,
          completed: false,
          displayBurst: false,
        });
      });
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
        displayBurst: false,
      });
    });
  };

  addHabit = (name: string, color: string) => {
    name = name.replace(/([[{};:<>$])/g, ""); //sanitize user input
    let newHabit = {
      habitId: Math.random().toString(36).substring(2, 12),
      name: name,
      color: color,
      completion: 0,
      currentStreak: 0,
      longestStreak: 0,
      gridItems: {},
    };
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
    if (this.state.habitToEdit === null) return; //guard
    const id = this.state.habitToEdit.habitId;
    this.setState({
      habits: [...this.state.habits.filter((habit) => habit.habitId !== id)],
      displayEdit: false,
    });
  };

  editHabitName = (name: string) => {
    if (this.state.habitToEdit === null) return; //guard
    const id = this.state.habitToEdit.habitId;
    name = name.replace(/([[{};:<>$])/g, ""); //sanitize user input
    this.setState({
      habits: this.state.habits.map((habit) => {
        if (habit.habitId === id) {
          habit.name = name;
        }
        return habit;
      }),
    });
  };

  editHabitColor = (color: string) => {
    if (this.state.habitToEdit === null) return; //guard
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

  handleCloseOptions = () => {
    this.setState({
      displayOptions: false,
    });
  };

  handleOpenOptions = () => {
    this.setState({
      displayOptions: true,
    });
  };

  handleCloseEdit = () => {
    this.setState({
      displayEdit: false,
    });
  };

  handleOpenEdit = (id: string) => {
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
    localStorage.setItem("habits", JSON.stringify(this.state.habits));
    localStorage.setItem("dates", JSON.stringify(this.state.dates));
  };

  loadLocalStorage = () => {
    if (localStorage.getItem("habits") && localStorage.getItem("dates")) {
      console.log("-----------loading state-----------");
      //@ts-ignore
      const storedHabits = JSON.parse(localStorage.getItem("habits"));
      //@ts-ignore
      const storedDates = JSON.parse(localStorage.getItem("dates"));
      console.log(storedHabits);
      console.log(storedDates);
      this.setState(
        {
          dates: storedDates,
          habits: storedHabits,
        },
        () => {
          this.addElapsedDays();
        }
      );
    } else {
      console.log("-----------no state found-----------");
      this.addStartDate();
    }
  };

  clearLocalStorage = () => {
    console.log("clearing state");
    localStorage.setItem("habits", "");
    localStorage.setItem("dates", "");
  };

  componentDidMount() {
    this.loadLocalStorage();
  }

  componentDidUpdate() {
    this.setLocalStorage();
  }

  render() {
    return (
      <div className="h-screen bg-neutral-50 font-sans text-sm text-neutral-700 dark:bg-neutral-800 dark:text-neutral-50 md:text-base">
        <DevelopmentButtons
          addDay={this.addDay}
          addElapsedDays={this.addElapsedDays}
          loadTestStateA={this.loadTestStateA}
          loadTestStateB={this.loadTestStateB}
          loadTestStateC={this.loadTestStateC}
        />
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
        <Options
          displayOptions={this.state.displayOptions}
          handleCloseOptions={this.handleCloseOptions}
          clearLocalStorage={this.clearLocalStorage}
        />
        <Grid
          habits={this.state.habits}
          dates={this.state.dates}
          toggleCompletion={this.toggleCompletion}
          handleOpenForm={this.handleOpenForm}
          handleOpenEdit={this.handleOpenEdit}
          handleOpenOptions={this.handleOpenOptions}
        />
      </div>
    );
  }
}

export default App;