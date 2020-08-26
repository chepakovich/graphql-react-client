import React, { Component } from 'react';
import './App.css';
import Input from './components/Input';
import Select from './components/Select';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commodity: '',
      price: '',
      tons: '',
      data: [],
      submitDisabled: true,
    };
  }

  validate = (commodity, price, tons) => {
    if (commodity !== '' && price !== '' && price > 0 && tons !== '' && tons > 0) {
      return false;
    } else {
      return true;
    }
  }

  handleChangeCommodity = (event) => {
    const commodity = event.target.value
    const submitDisabled = this.validate(commodity, this.state.price, this.state.tons);
    this.setState({ commodity: event.target.value, submitDisabled, data: [] });
  }

  handleChangePrice = (event) => {
    const price = event.target.value
    const submitDisabled = this.validate(this.state.commodity, price, this.state.tons);
    this.setState({ price: event.target.value, submitDisabled });
  }

  handleChangeTons = (event) => {
    const tons = event.target.value
    const submitDisabled = this.validate(this.state.commodity, this.state.price, tons);
    this.setState({ tons: event.target.value, submitDisabled });
  }

  fetchData = () => {
    const query = `
      {
        calculateCost(commodity: "${this.state.commodity}", price: ${this.state.price}, tons: ${this.state.tons}) {
          COUNTRY
          TOTAL_COST
          FIXED_COST
          VARIABLE_COST
        }
      }
    `;
    fetch('http://localhost:4000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query,
      })
    })
      .then(r => r.json())
      .then(res => this.setState({ data: res.data.calculateCost }));
  }

  render() {
    return (
      <div className="main">
        <h1>Fruit Costs</h1>
        <Select title="Commodity" value={this.state.commodity} handleChange={this.handleChangeCommodity} />
        <Input title="Price" value={this.state.price} handleChange={this.handleChangePrice} />
        <Input title="Tonnage" value={this.state.tons} handleChange={this.handleChangeTons} />
        <div className="center">
          <button type="button" onClick={this.fetchData} disabled={this.state.submitDisabled}>Calculate</button>
        </div>
        {this.state.data.length > 0 ? (
          <>
            <h2>Results</h2>
            <table>
              <thead>
                <tr>
                  <th>Country</th>
                  <th>Fixed<br />overhead</th>
                  <th>Variable<br />cost</th>
                  <th>Total<br />cost</th>
                </tr>
              </thead>
              <tbody>
                {this.state.data.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.COUNTRY}</td>
                      <td>{item.FIXED_COST.toFixed(2)}</td>
                      <td>{item.VARIABLE_COST.toFixed(2)}</td>
                      <td>{item.TOTAL_COST.toFixed(2)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        ) : null}
      </div>
    );
  }
}

export default App;
