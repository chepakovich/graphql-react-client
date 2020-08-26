import React, { Component } from 'react';

export default class Input extends Component {
  render() {
    const { title, value, handleChange } = this.props
    return (
      <div className="input">
        <p>{title}</p>
        <input
          type="number"
          min="0.00"
          step="any"
          value={value}
          onChange={handleChange}
        />
      </div>
    );
  }
}
