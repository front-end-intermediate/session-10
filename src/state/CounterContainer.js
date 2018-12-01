import React from 'react';
import CounterPresenter from './CounterPresenter'

const incrementUpdate = prevState => ({
  counter: prevState.counter + 1
});

const decrementUpdate = prevState => ({
  counter: prevState.counter - 1
});

class CounterContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0
    };

    this.onIncrement = this.onIncrement.bind(this);
    this.onDecrement = this.onDecrement.bind(this);
  }

  onIncrement() {
    this.setState(incrementUpdate);
  }

  onDecrement() {
    this.setState(decrementUpdate);
  }

  render() {
    return <CounterPresenter
      counter={this.state.counter}
      onIncrement={this.onIncrement}
      onDecrement={this.onDecrement}
    />
  }
}

export default CounterContainer;