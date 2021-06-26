import { Component } from 'react';
import QrReader from 'react-qr-reader';

class QRreader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      delay: 500,
      result: null,
      error: 'No error',
    };

    this.handleScan = this.handleScan.bind(this);
    this.handleError = this.handleError.bind(this);
  }
  handleScan(result) {
    this.setState({ result });
  }

  handleError(err) {
    this.setState({ err });
  }
  render() {
    const previewStyle = {
      height: 240,
      width: 320,
    };

    return (
      <>
        <div>
          {!this.result && (
            <QrReader
              delay={this.state.delay}
              style={previewStyle}
              onError={this.handleError}
              onScan={this.handleScan}
            />
          )}
        </div>
        <p>{this.state.result}</p>
        <p>{this.state.error}</p>
      </>
    );
  }
}

export default QRreader;
