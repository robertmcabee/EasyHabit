import React, { Component } from 'react'
import { format, parse, add, differenceInCalendarDays } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';
import Grid from './components/Grid';
import Form from './components/Form';
import './style.css'

class App extends Component {

  state = {

    habitProperties: [
      //habitID
      //color
      //name
      //childIds:
      {
        propertyId: '00680z',
        displayName: 'Anki',
        color: 'green',
        childIds: [
          '0sk279pp',
          '052279dc',
          '052224pf',
          '0724pfxb',
        ]
      },
      {
        propertyId: '1o3532',
        displayName: 'Anki',
        color: 'red',
        childIds: [
          '1i4sd282',
          '1i41s182',
          '104sd282',
          '134sd23p',
        ]
      },
    ],

    habitGrid: [

      { id: '0sk279pp', date: '2022-02-01', propertyId: '00680z', completion: 0 },
      { id: '052279dc', date: '2022-02-02', propertyId: '00680z', completion: 0 },
      { id: '052224pf', date: '2022-02-03', propertyId: '00680z', completion: 0 },
      { id: '0724pfxb', date: '2022-02-04', propertyId: '00680z', completion: 0 },

      { id: '1i4sd282', date: '2022-02-01', propertyId: '1o3532', completion: 0 },
      { id: '1i41s182', date: '2022-02-02', propertyId: '1o3532', completion: 0 },
      { id: '104sd282', date: '2022-02-03', propertyId: '1o3532', completion: 0 },
      { id: '134sd23p', date: '2022-02-04', propertyId: '1o3532', completion: 0 },
      
    ],

    dates: [
      '2022-02-01',
      '2022-02-02',
      '2022-02-03',
      '2022-02-04',
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
    console.log("the current habitData is:");
    console.log(this.state.habitData);
    console.log("the current habitProperties is");
    console.log(this.state.habitProperties);
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
    let newHabitProperty = {}
    newHabitProperty['displayName'] = name
    newHabitProperty['propertyName'] = uuidv4()
    this.setState({
      habitProperties: [...this.state.habitProperties, newHabitProperty]
    })
  }

  render() { 
  return (
    <div>
      <button onClick={this.addDay} className="bg-black text-white rounded-md p-2">New Day</button>
      <Form addHabit={this.addHabit}/>
      <Grid habitGrid={this.state.habitGrid} habitProperties={this.state.habitProperties} dates={this.state.dates} />
    </div>
    );
  }
}
 
export default App;
