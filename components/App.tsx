import React, { Component } from "react";
import { format, parse, add, differenceInCalendarDays } from "date-fns";
import Grid from "./Grid";
import Form from "./Form";
import Edit from "./Edit";
import Options from "./Options";
import Login from "./Login";
import DevelopmentButtons from "./DevelopmentButtons";
import { HabitType } from "../types/types";
import { supabase } from "../utils/supabase";

type State = {
  user: any;
  displayForm: boolean;
  displayOptions: boolean;
  displayEdit: boolean;
  displayLogin: boolean;
  saveOnceEditClosed: boolean;
  habits: HabitType[];
  habitToEdit: HabitType;
};
class App extends Component {
  state: State = {
    user: null,
    displayForm: false,
    displayOptions: false,
    displayLogin: false,
    displayEdit: false,
    saveOnceEditClosed: false, //used to prevent excessive saving
    habitToEdit: {
      habitId: "",
      name: "",
      color: "",
      gridItems: [],
    },

    habits: [
      {
        habitId: "00680z",
        name: "Anki",
        color: "#ffffff",
        gridItems: [
          {
            gridId: "00680z-2022-06-01",
            date: "2022-06-01",
            completed: false,
          },
        ],
      },
    ],
  };

  toggleCompletion = (id: string) => {
    this.setState(
      {
        habits: this.state.habits.map((habit) => {
          habit.gridItems.map((item) => {
            if (item.gridId === id) {
              item.completed = !item.completed;
            }
            return item;
          });
          return habit;
        }),
      },
      () => {
        this.saveState();
      }
    );
  };

  checkForNewDays = () => {
    if (this.state.habits.length === 0) return;
    //creates new dates between most recent date and today & coresponding habit grid items
    const today = new Date();
    const lastDate = this.state.habits[0].gridItems[0].date;
    const parsedLastDate = parse(lastDate, "yyyy-MM-dd", new Date()); //convert string into js date object
    const numOfDays = differenceInCalendarDays(today, parsedLastDate);
    //if most recent date is in the future, do nothing
    if (numOfDays < 1) return null;
    //if most recent date is in the past, create new dates
    for (let i = 0; i < numOfDays; i++) {
      this.addDay();
    }
  };

  addDay = () => {
    const lastDate = this.state.habits[0].gridItems[0].date;
    const parsedLastDate = parse(lastDate, "yyyy-MM-dd", new Date()); //convert string into js date object
    const newDate = add(parsedLastDate, { days: 1 });
    const formattedNewDate = format(newDate, "yyyy-MM-dd"); //convert new date into string
    console.log("adding ", formattedNewDate);

    //add new grid items to each habit for the new day
    this.setState(
      {
        habits: this.state.habits.map((habit) => {
          let newGridItem = {
            gridId: habit.habitId + "-" + formattedNewDate,
            date: formattedNewDate,
            completed: false,
          };
          habit.gridItems = [newGridItem, ...habit.gridItems];
          return habit;
        }),
      },
      () => {
        //save once new grid items are added
        this.saveState();
      }
    );
  };

  addHabit = (name: string, color: string) => {
    name = name.replace(/([[{};:<>$])/g, ""); //sanitize user input
    let newHabit = {
      habitId: Math.random().toString(36).substring(2, 12),
      name: name,
      color: color,
      gridItems: {},
    };
    let dateArray: string[] = [];
    if (this.state.habits.length === 0) {
      // if no habits created yet, create habit with one day
      dateArray.push(format(new Date(), "yyyy-MM-dd"));
    } else {
      // else create habit with all days from from first habit
      for (const dates of this.state.habits[0].gridItems) {
        dateArray = [...dateArray, dates.date];
      }
    }
    newHabit["gridItems"] = dateArray.map((date) => {
      return {
        gridId: newHabit.habitId + "-" + date,
        date: date,
        completed: false,
      };
    });
    this.setState(
      {
        habits: [...this.state.habits, newHabit],
        displayForm: false,
      },
      () => {
        this.saveState();
      }
    );
  };

  deleteHabit = () => {
    if (this.state.habitToEdit === null) return; //guard
    const id = this.state.habitToEdit.habitId;
    this.setState(
      {
        habits: [...this.state.habits.filter((habit) => habit.habitId !== id)],
        displayEdit: false,
      },
      () => {
        this.saveState();
      }
    );
  };

  editHabitName = (name: string) => {
    if (this.state.habitToEdit === null) return; //guard
    const id = this.state.habitToEdit.habitId;
    name = name.replace(/([[{};:<>$])/g, ""); //sanitize user input
    this.setState({
      saveOnceEditClosed: true, //prevents excessive saving on every keystroke - will save on close
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
      saveOnceEditClosed: true, //prevents excessive saving on every click - will save on close
      habits: this.state.habits.map((habit) => {
        if (habit.habitId === id) {
          habit.color = color;
        }
        return habit;
      }),
    });
  };

  setUserState = () => {
    const user = supabase.auth.user();
    if (user === null) return;
    this.setState({
      user: user,
    });
  };

  handleCloseLogin = () => {
    this.setState({
      displayLogin: false,
    });
  };

  handleOpenLogin = () => {
    this.setState({
      displayLogin: true,
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
    if (this.state.saveOnceEditClosed) this.saveState(); //only save if changes were made.
    this.setState({
      displayEdit: false,
      saveOnceEditClosed: false,
    });
  };

  handleOpenEdit = (id: string) => {
    let habitToEdit = this.state.habits.find((habit) => habit.habitId === id);
    this.setState({
      displayEdit: true,
      habitToEdit: habitToEdit,
    });
  };

  setLocalStorage = () => {
    localStorage.setItem("habits", JSON.stringify(this.state.habits));
  };

  loadLocalStorage = () => {
    if (localStorage.getItem("habits")) {
      console.log("-----------loading state-----------");
      //@ts-ignore
      const storedHabits = JSON.parse(localStorage.getItem("habits"));
      console.log(storedHabits);
      this.setState(
        {
          habits: storedHabits,
        },
        () => {
          this.checkForNewDays();
        }
      );
    } else {
      console.log("-----------no state found-----------");
    }
  };

  clearLocalStorage = () => {
    console.log("clearing state");
    localStorage.setItem("habits", "");
  };

  fetchSupabaseData = () => {
    //TODO
  };

  componentDidMount() {
    this.setUserState();
    if (this.state.user) {
      this.fetchSupabaseData();
    } else {
      this.loadLocalStorage();
    }
  }

  saveState() {
    if (this.state.user) {
      // TODO
      console.log("saving to cloud storage");
    } else {
      console.log("saving to local storage");
      this.setLocalStorage();
    }
  }

  render() {
    return (
      <div className="h-screen bg-neutral-50 font-sans text-sm text-neutral-700 dark:bg-neutral-800 dark:text-neutral-50 md:text-base">
        {this.state.user ? (
          <button
            className="p-4 bg-black"
            onClick={() => this.handleOpenLogin()}
          >
            Signed in as {this.state.user["email"]}
          </button>
        ) : (
          <button
            className="p-4 bg-black"
            onClick={() => this.handleOpenLogin()}
          >
            Not Logged in
          </button>
        )}
        <DevelopmentButtons addDay={this.addDay} />
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
        <Login
          displayLogin={this.state.displayLogin}
          closeLogin={this.handleCloseLogin}
        />
        <Grid
          habits={this.state.habits}
          // dates={this.state.dates}
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
