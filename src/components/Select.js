import React, { Component } from 'react';

export default class Input extends Component {
  render() {
    const { title, value, handleChange } = this.props
    let currentValue = value || "DEFAULT";
    return (
      <div>
        <p>{title}</p>
        <form>
          <select value={currentValue} onChange={handleChange}>
            <option value="DEFAULT" disabled>Choose a fruit ...</option>
            <option value="mango">Mango</option>
            <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option value="coconut">Coconut</option>
          </select>
        </form>
      </div>
    );
  }
}

