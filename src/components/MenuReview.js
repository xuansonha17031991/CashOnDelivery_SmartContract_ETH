import React, { Component } from "react";
import config from "../config";
import web3 from "../web3";
import { Form } from "semantic-ui-react";
class MenuReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      price: 0,
      details: "",
      details: "",
      balanceBuyer: 0,
      price2: 0,
      buyer: ""
    };
  }

  async componentDidMount() {
    const buyer = await config.methods.buyer().call();
    const accounts = await web3.eth.getAccounts();
    const id = await config.methods.id().call();
    const price = await config.methods.price().call();
    await config.methods
      .GetPackage(id)
      .call({ from: accounts[0] }, (err, result) => {
        if (err) {
          console.log("err: ", err);
        } else {
          // console.log("result: ", result);
          // console.log("name: ", result[0]);
          // console.log("details: ", result[2]);
          this.setState({
            name: result[0],
            details: result[2]
          });
        }
      });
    this.setState({
      id,
      price,
      buyer
    });
  }
  onSubmit = async event => {
    event.preventDefault();
    console.time('buy');
    try {
      const id = await config.methods.id().call();
      const accounts = await web3.eth.getAccounts();
      await config.methods.Ac3_ApplyBuy(id).send({
        from: accounts[1],
        value: web3.utils.toWei(this.state.price, "ether")
      });
      this.setState({ errorMessage: "Success!!" });
      console.timeEnd('buy');
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
  };
  render() {
    return (
      <div className="main">
        <a className="ui teal image label">
          Buyer
          <div className="detail">{this.state.buyer}</div>
        </a>
        <div className="ui card package">
          <div className="content">
            {/* ***** */}
            <div className="header">Package</div>
            <div className="description">
              {/* /***** */}
              <h4>
                ID: <i>{this.state.id}</i>{" "}
              </h4>
            </div>
            <div className="description">
              <h4>
                Name: <i>{this.state.name}</i>
              </h4>
            </div>
            <div className="description">
              <h4>
                Price: <i>{this.state.price} Ether</i>
              </h4>
            </div>
            <div className="description">
              <h4>
                Details: <i>{this.state.details} </i>
              </h4>
            </div>
          </div>
          <div className="extra content" />
          <div className="front-deposit">
            <Form
              onSubmit={this.onSubmit}
              error={!!this.state.errorMessage}
              className="input input-buy"
            >
              <div>
                <div>
                  <h4>Buyer recieve to purchase:</h4>
                </div>
                <div className="ui action input">
                  <input
                    value={this.state.id}
                    onChange={event =>
                      this.setState({ id: event.target.value })
                    }
                    type="text"
                    placeholder="Price"
                  />
                  <button className="ui violet inverted button">Deposit</button>
                </div>
              </div>
            </Form>
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

export default MenuReview;
