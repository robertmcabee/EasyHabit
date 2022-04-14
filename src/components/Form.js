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
    return (
      <div id="overlay"> 
        <section className="form-container">
            <form onSubmit={this.handleSubmit}>
              <fieldset>
                <label htmlFor="name">Name:</label>
                <input type="text" name="name" value={this.state.name} onChange={this.handleChange} className="border-slate-300"/>
              </fieldset>
            <input value="Submit" type="submit" className="bg-black text-white rounded-md p-2"/>
          </form>
        </section>
        <div className="overlay-background"></div>
      </div>
    );
  };
};
 
export default Form;