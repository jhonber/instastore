import { Component } from 'react';
import QrReader from 'react-qr-reader';

class Menu extends Component {
  // @ts-ignore
  constructor(props) {
    super(props);
    this.state = {
      delay: 500,
      result: 'No result',
    };

    this.handleScan = this.handleScan.bind(this);
  }
  // @ts-ignore
  handleScan(result) {
    if (result) {
      this.setState({ result });
    }
  }
  // @ts-ignore
  handleError(err) {
    console.error(err);
  }
  render() {
    const previewStyle = {
      height: 240,
      width: 320,
    };

    return (
      <div>
        <QrReader
          // @ts-ignore
          delay={this.state.delay}
          style={previewStyle}
          onError={this.handleError}
          onScan={this.handleScan}
        />
        {/* @ts-ignore*/}
        <p>{this.state.result}</p>
      </div>
    );
  }
}

export default Menu;