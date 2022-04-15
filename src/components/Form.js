import React, { Component } from 'react';

class Form extends Component {
  state = {
    name: 'placeholder',
  };


  handleSubmit = (event) => {
    event.preventDefault();
    this.props.addHabit(this.state.name); //run addHabit() in app.js
    this.setState({ name: '' }); //clear input field
  };

  handleChange = (event) => this.setState({ [event.target.name]: event.target.value });

  render() {
    if (this.props.displayForm === false) {
      return null
    }
    return (
      <div>
        <section className='bg-white p-10 m-10 rounded-xl w-96 absolute z-50 top-0'>
            <form onSubmit={this.handleSubmit}>
              <fieldset>
                <label htmlFor="name" className='my-4 h-8'>Name:</label>
                <input type="text" name="name" autoComplete="off" value={this.state.name} onChange={this.handleChange} className="h-8 rounded-lg bg-neutral-200 p-4 m-4"/>
              </fieldset>
            <input value="Submit" type="submit" className="bg-black text-white rounded-md p-2 mt-4"/>
          </form>
        </section>
        <div onClick={this.props.handleClose} className='w-full h-full bg-black opacity-50 absolute z-40 top-0'></div>
      </div>
    );
  };
};
 
export default Form;