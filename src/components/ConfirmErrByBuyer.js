import React, { Component } from "react";
import config2 from "../config2";
import { Form, Button, Input } from "semantic-ui-react";
import web3 from "../web3";
import config from "../config";
class ConfirmErrByBuyer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hashseller: 0,
      hashshipper: 0,
      errorMessage: ""
    };
  }
  onSubmit = async event => {
    event.preventDefault();
    console.time('sellercallmoney');
    const { hashseller } = this.state;
    if (hashseller === "") {
      this.setState({
        errorMessage: "Please enter hash!!"
      });
    } else {
      try {
        const accounts = await web3.eth.getAccounts();
        await config.methods.ConFirmOfSeller(this.state.hash).send({
          from: accounts[0]
        });
        this.setState({
          errorMessage: "success!!"
        });
        console.timeEnd('sellercallmoney');
      } catch (err) {
        this.setState({ errorMessage: err.message });
      }
      this.setState({ loading: false });
    }
    this.setState({
      hashseller: ""
    });
  };
  onSubmit2 = async event => {
    event.preventDefault();
    console.time('shippercallmoney');
    const { hashshipper } = this.state;
    if (hashshipper === "") {
      this.setState({
        errorMessage: "Please enter hash!!"
      });
    } else {
      try {
        const accounts = await web3.eth.getAccounts();
        await config2.methods.ConfirmOfShipper(this.state.hash).send({
          from: accounts[2]
        });

        this.setState({
          errorMessage: "success!!"
        });
        console.timeEnd('shippercallmoney');
      } catch (err) {
        this.setState({ errorMessage: err.message });
      }
      this.setState({ loading: false });
    }
    this.setState({
      hashshipper: ""
    });
  };
  resetHash = async () => {
    console.time('gethash');
    const accounts = await web3.eth.getAccounts();

    await config.methods
      .GetHash()
      .call({ from: accounts[0] }, (err, result) => {
        if (err) {
          console.log("err: ", err);
        } else {
          console.log("result: ", result);
          this.setState({
            hashseller: result
          });
        }
      });
    await config2.methods
      .GetHash()
      .call({ from: accounts[0] }, (err, result) => {
        if (err) {
          console.log("err: ", err);
        } else {
          console.log("result: ", result);
          this.setState({
            hashshipper: result
          });
        }
      });
      console.timeEnd('gethash');
    }
  render() {
    return (
      <div className="main">
        <div className="from-creat">
          <div className="form">
            <div class="ui segment">
              <h4>Hash off seller: {this.state.hashseller}</h4>
              <h4>Hash off shipper: {this.state.hashshipper}</h4>
              <Button onClick={this.resetHash}>Seller get hash</Button>
            </div>
            <div class="ui segment">
              <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                <Form.Field>
                  <label>Seller receives money:</label>
                  <Input
                    onChange={event =>
                      this.setState({ hash: event.target.value })
                    }
                  />
                </Form.Field>
                <Button negative loading={this.state.loading}>
                  confirm
                </Button>
              </Form>
            </div>
            <div class="ui segment">
              <Form onSubmit={this.onSubmit2} error={!!this.state.errorMessage}>
                <Form.Field>
                  <label>Shipper callbacks money:</label>
                  <Input
                    onChange={event =>
                      this.setState({ hash: event.target.value })
                    }
                  />
                </Form.Field>
                <Button negative loading={this.state.loading}>
                  confirm
                </Button>
              </Form>
            </div>
            <div className="ui positive message">
              <div className="header">Message</div>
              <p>{this.state.errorMessage}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ConfirmErrByBuyer;
