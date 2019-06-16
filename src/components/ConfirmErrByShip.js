import React, { Component } from "react";
import config2 from "../config2";
import { Form, Button, Input } from "semantic-ui-react";
import web3 from "../web3";
import config from "../config";
class ConfirmErrByShip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hashbuyer: 0,
      hashseller: 0,
      errorMessage: ""
    };
  }
  onSubmit = async event => {
    event.preventDefault();
    console.time('buyercallmoney');
    const { hashbuyer } = this.state;
    if (hashbuyer === "") {
      this.setState({
        errorMessage: "Please enter hash!!"
      });
    } else {
      try {
        const accounts = await web3.eth.getAccounts();
        await config.methods.ConfirmOfBuyer(this.state.hash).send({
          from: accounts[1]
        });
        this.setState({
          errorMessage: "success!!"
        });
        console.timeEnd('buyercallmoney');
      } catch (err) {
        this.setState({ errorMessage: err.message });
      }
      this.setState({ loading: false });
    }
    this.setState({
      hashbuyer: 0
    });
  };
  onSubmit2 = async event => {
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
        await config2.methods.ConFirmOfSeller(this.state.hash).send({
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
      hashseller: 0
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
            hashbuyer: result
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
            hashseller: result
          });
        }
      });
      console.timeEnd('gethash');
  };
  render() {
    return (
      <div className="main">
        <div className="from-creat">
          <div className="form">
            <div className="ui segment">
              <h4>Hash off seller: {this.state.hashseller}</h4>
              <h4>Hash off buyer: {this.state.hashbuyer}</h4>
              <Button onClick={this.resetHash}>Seller get hash</Button>
            </div>

            <div className="ui segment">
              <Form onSubmit={this.onSubmit2} error={!!this.state.errorMessage}>
                <Form.Field>
                  <label>Seller recieves money:</label>
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
            <div className="ui segment">
              <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                <Form.Field>
                  <label>Buyer callback money:</label>
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
export default ConfirmErrByShip;
