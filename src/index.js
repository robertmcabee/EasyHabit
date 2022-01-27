'use strict';

import { format, differenceInCalendarDays } from 'date-fns';

const form = document.querySelector('form');
const formName = document.getElementById('form-name');
const submitButton = document.getElementById('submit-button');

const overlay = document.getElementById('overlay');
overlay.addEventListener('mousedown', (e) => {
  if (e.target.tagName === "DIV") {
    overlay.style.display = "none"
  }
});

const showOverlayBtn = document.getElementById('show-overlay');
showOverlayBtn.addEventListener('click', (e) => {
 overlay.style.display = "block"
});


const habitArray = [] //stores habit objects in array i.e. 
// [{name: "anki", id: "0d7611i"}, {name: "stretch", id: "l7pky86"}]

const dayList = { //stores day objects in object
  // '011722': {
  //   'fz680z': 100,
  //   '98sh8a': 0
  // },
  // '011822': {
  //   'fz680z': 0,
  //   '98sh8a': 0
  // }
} //stores day objects

submitButton.addEventListener("click", (event) => {
  event.preventDefault() //prevent reload
  createHabit(form)
  form.reset() //reset fields
});

function createHabit(HTMLFormData) {
  let formData = new FormData(HTMLFormData) //using formdata to support any number of form inputs without re-writng code
  formData.append('id', idGen()) //create id
  const habit = {}
  for (let key of formData.keys()) { //assign formdata key values to habit object
    habit[key] = formData.get(key)
  }
  habitArray.push(habit)
  console.log("the current habitArray is:")
  console.log(habitArray)
  createDayObj(now)
};
    
let dateFNS = require('date-fns');

let testTimeA = new Date(2022, 0, 17); //for debugging purposes
let testTimeB = new Date(2021, 4, 10); //for debugging purposes
let testTimeC = new Date(2022, 0, 20); //for debugging purposes




function createDayObj(date) {
  let name = formatDateForObj(date)
  dayList[name] = {}
  habitArray.forEach(habit => { // puts all habits in with a value of 0
    dayList[name][habit.id] = 0 
  });
  console.log("the current daylist is")
  console.log(dayList)
};

function loadDays(listOfHabits, listOfDays) {
  listOfHabits.forEach(element => {
    
  });
}
    
let now = new Date();
    
const StartDate = now;
  
  function hasDayChanged(mostRecentDay, currentTime) { //returns true if 1+ days have elapsed
  if (dateFNS.differenceInCalendarDays(mostRecentDay, currentTime) > 0) { 
    return true //new day will need to be displayed
  } else {
    return false //no new day needed
  }
};

function update(params) { //TODO 
  // check if new days needed
    // hasDayChanged(mostRecentDay, currentTime)
  // create new days
    // createDayObj(date)
  // load habits into all days
  // display habit grid
}      

const idGen = () => {
  return Math.random().toString(36).substr(2, 7); //creates a string like "fz680z"
};
    
function createDateHTMLTemplate(day) {
  let month = dateFNS.format(day, 'MMM') //i.e. 'Jan'
  let dayOfMonth = dateFNS.format(day, 'd') //i.e. 'Monday'
  let dayOfWeek = dateFNS.format(day, 'iiii') //i.e. '18'
  let templateString =
  `<span class="day-of-week">${dayOfWeek},</span>
  <span class="date">${month} ${dayOfMonth}</span>`
  return templateString
};

function formatDateForObj(date) {
  return dateFNS.format(date,'MMddyy') //returns string in MMDDYY format, i.e. '120520'
};
    
// const tasks = {
//   011822: {
//     habit_123aax: true,
//     habit_653zdz: false,
//   }
//   011922: {
//     habit_123aax: 0,
//     habit_653zdz: 100,
//   }
// };
    

  



    

    
    
    
    
    
    