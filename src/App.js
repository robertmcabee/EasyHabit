import React, { Component } from 'react'
import { format, parse, add, differenceInCalendarDays } from 'date-fns';
import { v4 as uuidv4 } from 'uuid'; //example: 273a442e-9882-4662-8a99-16be011bd3b6
import Grid from './components/Grid';
import Form from './components/Form';
import './style.css'

class App extends Component {

  state = {

    dates: [
      '2022-02-01',
      '2022-02-02',
      '2022-02-03',
      '2022-02-04',
    ],

    habits: [

      {
        habitId: '00680z',
        displayName: 'Anki',
        color: 'green',
        gridItems: [
          {
            gridId: '00680z-1',
            date: '2022-02-01',
            completed: false,
          },
          {
            gridId: '00680z-2',
            date: '2022-02-02',
            completed: true,
          },
          {
            gridId: '00680z-3',
            date: '2022-02-03',
            completed: false,
          },
          {
            gridId: '00680z-4',
            date: '2022-02-04',
            completed: false,
          },
        ],
      },

      {
        habitId: '7er11n',
        displayName: 'Stretch',
        color: 'blue',
        gridItems: [
          {
            gridId: '7er11n-1',
            date: '2022-02-01',
            completed: true,
          },
          {
            gridId: '7er11n-2',
            date: '2022-02-02',
            completed: false,
          },
          {
            gridId: '7er11n-3',
            date: '2022-02-03',
            completed: false,
          },
          {
            gridId: '7er11n-4',
            date: '2022-02-04',
            completed: true,
          },
        ],
      },

    ],

  };
  
  daysElapsed = (currentTime, mostRecentDay) => { //returns series of formatted days that have elapsed
    const numOfDays = differenceInCalendarDays(currentTime, mostRecentDay);
    if (numOfDays < 0) return null;
    const result = [];
    for (let i = 0; i < numOfDays + 1; i++) {
      result.push(format(add(mostRecentDay, {days: i}), 'yyyy-MM-dd')) //creates an ascending series of formatted days
    };
    console.log(result)
    return result;
  };

  consoleLists = () => {
    console.log("the current dates are:");
    console.log(this.state.dates);
    console.log("the current habits are");
    console.log(this.state.habits);
  };

  addDay = () => {
    const lastDate = this.state.dates[this.state.dates.length - 1]
    const parsedLastDate = parse(lastDate, 'yyyy-MM-dd', new Date()) //convert string into js date object
    const newDate = add(parsedLastDate, { days: 1 })
    const formattedNewDate = format(newDate, 'yyyy-MM-dd') //convert new date into string
    this.setState({
      dates: [...this.state.dates, formattedNewDate]
    })
  }

  addHabit = (name) => {
    name = name.replace(/([[{};:<>$])/g, ''); //sanitize user input
    let newHabit = {};
    newHabit['habitId'] = uuidv4().slice(0, 8);
    newHabit['displayName'] = name;
    newHabit['color'] = 'blue';
    newHabit['gridItems'] = this.state.dates.map(date => {
      return {
        gridId: newHabit.habitId + '-' + date,
        date: date,
        completed: false,
      };
    });
    this.setState({
      habits: [...this.state.habits, newHabit]
    });
  };

  render() { 
  return (
    <div>
      <button onClick={this.addDay} className="bg-black text-white rounded-md p-2">New Day</button>
      <Form addHabit={this.addHabit}/>
      <Grid habits={this.state.habits} dates={this.state.dates} />
    </div>
    );
  }
}
 
export default App;
