import React, { Component } from "react";
import config2 from "../config2";
import { Form, Button, Input } from "semantic-ui-react";
import web3 from "../web3";
class MenuShipperDelivery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seller: "",
      errorMessage: "",
      name: "",
      price: "",
      id: 0,
      shipper:''
    };
  }
  async componentDidMount() {
    const accounts = await web3.eth.getAccounts();
    const seller = await config2.methods.seller().call();
    const shipper = await config2.methods.shipper().call();
    const id = await config2.methods.id().call();
    await config2.methods
      .GetPackage(id)
      .call({ from: accounts[0] }, (err, result) => {
        if (err) {
          console.log("err: ", err);
        } else {
          console.log("result: ", result);
          //var data =  JSON.stringify(result);
          console.log("name: ", result[0]);
          console.log("price: ", result[1]);
          this.setState({
            name: result[0],
            price: result[1]
          });
        }
      });
    this.setState({
      seller,
      id,
      shipper
    });
  }
  onSubmit = async event => {
    event.preventDefault();
    console.time('shipdipo');
    try {
      const id = await config2.methods.id().call();
      const accounts = await web3.eth.getAccounts();
      await config2.methods.Ac3_ApplyBuy(id).send({
        from: accounts[2],
        value: web3.utils.toWei(this.state.price, "ether")
      });
      this.setState({ errorMessage: "Success!!" });
      console.timeEnd('shipdipo');
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
  };
  render() {
    return (
      <div className="main">
      <a class="ui yellow image label">Shipper
    <div class="detail">{this.state.shipper}</div>
    </a>
        <div className="info-package">
          <div className="ui card package">
            <div className="content">
              {/* ***** */}
              <div className="header">Package</div>
              <div className="description">
                {/* /***** */}
                <h3>
                  ID: <i>{this.state.id}</i>{" "}
                </h3>
              </div>
              <div className="description">
                <h3>
                  Name: <i>{this.state.name}</i>
                </h3>
              </div>
              <div className="description">
                <h3>
                  Price: <i>{this.state.price} Ether</i>
                </h3>
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
                    <h4>Shipper recieve to purchase:</h4>
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
            
                    <button className="ui blue inverted button">Deposit</button>
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
      </div>
    );
  }
}

export default MenuShipperDelivery;
