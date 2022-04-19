import React, { Component } from 'react';

class Form extends Component {
  state = {
    name: '',
    color: '',
    selectedColor: null,
  };

  selectColor = (index) => {
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
      default:
        selectedColor = "rgb(34 211 238)";
        break;
    }
    this.setState({
      color: selectedColor,
      selectedColor: index,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.addHabit(this.state.name, this.state.color);
    this.setState({ name: '' }); //clear input field
  };

  handleChange = (event) => this.setState({ [event.target.name]: event.target.value });

  render() {
    if (this.props.displayForm === false) {
      return null
    }
    return (
      <div className='flex justify-center'>
        <section className='bg-white p-12 m-10 rounded-xl absolute z-50 top-0 drop-shadow-2xl animate-dropin'>
            <h2 className='text-lg font-bold'>What do you want to keep track of?</h2>
            <form onSubmit={this.handleSubmit} className="flex flex-col">
              <fieldset>
                <label htmlFor="name" className='my-4 h-8'>Name:</label>
                <input type="text" name="name" autoComplete="off" value={this.state.name} onChange={this.handleChange} placeholder="e.g. 'Stretch'" className="placeholder:italic font-semibold placeholder:text-neutral-400 caret-neutral-400 h-8 rounded-full border-none focus:outline-none focus:border-neutral-300 focus:ring-2 focus:ring-neutral-300 bg-neutral-100 p-4 m-4 w-3/4"/>
                <label htmlFor="color" className='my-4 h-8'>Color:</label>
                <div className='flex space-x-2 h-14 mt-2 w-full justify-evenly color-selector'>
                  <div onClick={()=>{this.selectColor(0)}} className="rounded-full hover:opacity-75 h-12 w-12 transition-all cursor-pointer bg-cyan-400" style={this.state.selectedColor === 0 ? {border:"6px solid rgb(34 211 238)" } : {border:"6px solid rgb(245 245 245)"}}></div>
                  <div onClick={()=>{this.selectColor(1)}} className="rounded-full hover:opacity-75 h-12 w-12 transition-all cursor-pointer bg-emerald-400" style={this.state.selectedColor === 1 ? {border:"6px solid rgb(52 211 153)"} : {border:"6px solid rgb(245 245 245)"}}></div>
                  <div onClick={()=>{this.selectColor(2)}} className="rounded-full hover:opacity-75 h-12 w-12 transition-all cursor-pointer bg-lime-400" style={this.state.selectedColor === 2 ? {border:"6px solid rgb(163 230 53)"} : {border:"6px solid rgb(245 245 245)"}}></div>
                  <div onClick={()=>{this.selectColor(3)}} className="rounded-full hover:opacity-75 h-12 w-12 transition-all cursor-pointer bg-yellow-400" style={this.state.selectedColor === 3 ? {border:"6px solid rgb(250 204 21)"} : {border:"6px solid rgb(245 245 245)"}}></div>
                  <div onClick={()=>{this.selectColor(4)}} className="rounded-full hover:opacity-75 h-12 w-12 transition-all cursor-pointer bg-orange-400" style={this.state.selectedColor === 4 ? {border:"6px solid rgb(251 146 60)"} : {border:"6px solid rgb(245 245 245)"}}></div>
                  <div onClick={()=>{this.selectColor(5)}} className="rounded-full hover:opacity-75 h-12 w-12 transition-all cursor-pointer bg-rose-400" style={this.state.selectedColor === 5 ? {border:"6px solid rgb(251 113 133)"} : {border:"6px solid rgb(245 245 245)"}}></div>
                </div>
              </fieldset>
            <input value="Create" type="submit" className="bg-black text-white font-bold rounded-full p-3 mt-4 hover:opacity-80 cursor-pointer transition-all" style={{color: this.state.color}}/>
          </form>
        </section>
        <div onClick={this.props.handleClose} className='w-full h-full bg-black opacity-50 absolute z-40 top-0 animate-fadein'></div>
      </div>
    );
  };
};
 
export default Form;