import { Component } from 'react';
import Button from '../Button/Button';
class ErrorBtn extends Component {
  state = {
    throwError: false,
  };

  handleClick = () => {
    this.setState({ throwError: true });
  };

  render() {
    if (this.state.throwError) {
      throw new Error('Error happens!!!');
    }
    return <Button onClick={this.handleClick}>Throw Error</Button>;
  }
}

export default ErrorBtn;
