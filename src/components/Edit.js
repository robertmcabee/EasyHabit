import React, { Component } from 'react';

class Edit extends Component {
  state = {
    name: this.props.displayName,
    color: this.props.color,
    selectedColorIndex: null,
  };

  selectColor = (index) => {
    const color = this.indexToColor(index);
    this.setState({
      color: color,
      selectedColorIndex: index,
    });
    this.props.editHabitColor(color)
  }

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
  }

  handleSubmit = (event) => {
    event.preventDefault();
    // this.props.editHabitName(this.state.name, newHabitColor);
    this.setState({ name: '' }); //clear input field
  };

  handleChange = (event) => this.setState({ [event.target.name]: event.target.value });

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
      return null
    }
    return (
      <div className='flex justify-center'>
        <section className='bg-white p-10 m-16 rounded-xl absolute z-50 top-0 drop-shadow-2xl animate-dropin'>
          <div className='flex justify-between align-middle border-b-2 pb-8 border-neutral-100'>
            <h2 className='text-lg font-bold'>Edit?</h2>
            <div onClick={this.props.handleCloseEdit} className='hover:text-neutral-900 cursor-pointer'>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          </div>
          <label htmlFor="name" className='font-bold text-center'>Name:</label>
          <input type="text" name="name" autoComplete="off" value={this.state.name} onChange={this.handleChange} className="placeholder:italic font-semibold placeholder:text-neutral-400 caret-neutral-400 h-8 rounded-full border-none text-center focus:outline-none focus:border-neutral-300 focus:ring-2 focus:ring-neutral-300 bg-neutral-100 p-4 mx-8"/>
          <div className='flex space-x-2 mt-2 w-full justify-evenly'>
                <div onClick={()=>{this.selectColor(0)}} className="rounded-full hover:opacity-75 h-12 w-12 transition-all cursor-pointer bg-[rgb(34,211,238)]" style={this.state.selectedColorIndex === 0 ? {border:"6px solid rgb(34,211,238)" } : {border:"6px solid hsl(0,0%,95%)"}}></div>
                <div onClick={()=>{this.selectColor(1)}} className="rounded-full hover:opacity-75 h-12 w-12 transition-all cursor-pointer bg-[rgb(52,211,153)]" style={this.state.selectedColorIndex === 1 ? {border:"6px solid rgb(52,211,153)"} : {border:"6px solid hsl(0,0%,95%)"}}></div>
                <div onClick={()=>{this.selectColor(2)}} className="rounded-full hover:opacity-75 h-12 w-12 transition-all cursor-pointer bg-[rgb(163,230,53)]" style={this.state.selectedColorIndex === 2 ? {border:"6px solid rgb(163,230,53)"} : {border:"6px solid hsl(0,0%,95%)"}}></div>
                <div onClick={()=>{this.selectColor(3)}} className="rounded-full hover:opacity-75 h-12 w-12 transition-all cursor-pointer bg-[rgb(250,204,21)]" style={this.state.selectedColorIndex === 3 ? {border:"6px solid rgb(250,204,21)"} : {border:"6px solid hsl(0,0%,95%)"}}></div>
                <div onClick={()=>{this.selectColor(4)}} className="rounded-full hover:opacity-75 h-12 w-12 transition-all cursor-pointer bg-[rgb(251,146,60)]" style={this.state.selectedColorIndex === 4 ? {border:"6px solid rgb(251,146,60)"} : {border:"6px solid hsl(0,0%,95%)"}}></div>
                <div onClick={()=>{this.selectColor(5)}} className="rounded-full hover:opacity-75 h-12 w-12 transition-all cursor-pointer bg-[rgb(251,113,133)]" style={this.state.selectedColorIndex === 5 ? {border:"6px solid rgb(251,113,133)"} : {border:"6px solid hsl(0,0%,95%)"}}></div>
              </div>
              <div className='flex space-x-2 w-full justify-evenly'>
                <div onClick={()=>{this.selectColor(6)}} className="rounded-full hover:opacity-75 h-12 w-12 transition-all cursor-pointer bg-[hsl(186,94%,82%)]" style={this.state.selectedColorIndex === 6 ? {border:"6px solid hsl(186,94%,82%)" } : {border:"6px solid hsl(0,0%,95%)"}}></div>
                <div onClick={()=>{this.selectColor(7)}} className="rounded-full hover:opacity-75 h-12 w-12 transition-all cursor-pointer bg-[hsl(152,76%,80%)]" style={this.state.selectedColorIndex === 7 ? {border:"6px solid hsl(152,76%,80%)"} : {border:"6px solid hsl(0,0%,95%)"}}></div>
                <div onClick={()=>{this.selectColor(8)}} className="rounded-full hover:opacity-75 h-12 w-12 transition-all cursor-pointer bg-[hsl(81,88%,80%)]" style={this.state.selectedColorIndex === 8 ? {border:"6px solid hsl(81,88%,80%)"} : {border:"6px solid hsl(0,0%,95%)"}}></div>
                <div onClick={()=>{this.selectColor(9)}} className="rounded-full hover:opacity-75 h-12 w-12 transition-all cursor-pointer bg-[hsl(53,98%,77%)]" style={this.state.selectedColorIndex === 9 ? {border:"6px solid hsl(53,98%,77%)"} : {border:"6px solid hsl(0,0%,95%)"}}></div>
                <div onClick={()=>{this.selectColor(10)}} className="rounded-full hover:opacity-75 h-12 w-12 transition-all cursor-pointer bg-[hsl(32,98%,83%)]" style={this.state.selectedColorIndex === 10 ? {border:"6px solid hsl(32,98%,83%)"} : {border:"6px solid hsl(0,0%,95%)"}}></div>
                <div onClick={()=>{this.selectColor(11)}} className="rounded-full hover:opacity-75 h-12 w-12 transition-all cursor-pointer bg-[hsl(353,96%,90%)]" style={this.state.selectedColorIndex === 11 ? {border:"6px solid hsl(353,96%,90%)"} : {border:"6px solid hsl(0,0%,95%)"}}></div>
              </div>
          <button onClick={()=>{this.props.deleteHabit()}}>Delete???</button>
        </section>
        <div onClick={this.props.handleCloseEdit} className='w-full h-full bg-black opacity-50 absolute z-40 top-0 animate-fadein'></div>
      </div>
    );
  };
};
 
export default Edit;