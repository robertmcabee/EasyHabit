import React, { Component } from 'react';

class Form extends Component {

  render() { 
    return (
      <div id="overlay"> 
      <section className="form-container">
        <form>
          <label htmlFor="name">Name:</label>
          <input type="email" name="name" id="form-name"/>
          <input className="btn background-accent medium" type="submit" id="submit-button"/>
          <div className="error-msg-container">
            <p id="form-error-msg" className="medium"></p> 
          </div>
        </form>
      </section>
      <div className="overlay-background"></div>
    </div>
    );
  }
}
 
export default Form;