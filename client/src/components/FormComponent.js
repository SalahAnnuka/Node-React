import React, { Component } from 'react';

class FormComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: ''
    };
  }

  handleSubmit = async (event) => {

    try {
      const response = await fetch('http://localhost:5000/api/saveUserData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: this.state.formData }),
      });

      if (response.ok) {
        console.log('Data saved successfully');
        this.setState({ formData: '' });
      } else {
        console.error('Failed to save data:', response.statusText);
      }
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  handleChange = (event) => {
    this.setState({ formData: event.target.value });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={this.state.formData}
          onChange={this.handleChange}
          placeholder="Enter your data"
        />
        <button type="submit">Save</button>
      </form>
    );
  }
}

export default FormComponent;
