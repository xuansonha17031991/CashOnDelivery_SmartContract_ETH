import React, { Component } from "react";
import config from "../config";
import web3 from "../web3";
import { Form, Button, Input, Message } from "semantic-ui-react";

class MenuHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seller: "",
      name: "",
      price: "",
      details: "",
      loading: false,
      errorMessage: "",
      id: "",
      hash: "",
      status: "",
      isInputValid: true
    };
  }

  async componentDidMount() {
    const seller = await config.methods.seller().call();
    this.setState({
      seller
    });
  }
  onSubmit = async event => {
    event.preventDefault();

    console.time('home');
    const { name, price, details } = this.state;
    if (name === "") {
      this.setState({
        errorMessage: "Please enter a name!!"
      });
    } else if (price === "") {
      this.setState({
        errorMessage: "Please enter price!!"
      });
    } else if (details === "") {
      this.setState({
        errorMessage: "Please enter detail a package!!"
      });
    } else {
      try {
        const accounts = await web3.eth.getAccounts();
        await config.methods.Ac1_CreatePackage(name, price, details).send({
          from: accounts[0],
          gas: "2000000"
        });
        await config.methods.Ac2_CreateHash().send({
          from: accounts[0]
        });
        this.setState({
          errorMessage: "success!!"
        });
        console.timeEnd('home');
      } catch (err) {
        this.setState({ errorMessage: err.message });
      }
      this.setState({ loading: false });
    }
    this.setState({
      name: "",
      price: "",
      details: ""
    });
  };
  // setThur = () => {
  //   // this.props.ondata();
  // };
  render() {
    return (
      <div className="main">
        <div>
          <a className="ui blue image label">
            Seller
            <div className="detail">{this.state.seller}</div>
          </a>
          <div className="from-creat">
            <h3>Create a Package</h3>
            <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
              <Form.Field>
                <label>Name</label>
                <Input
                  value={this.state.name}
                  onChange={event =>
                    this.setState({ name: event.target.value })
                  }
                />
              </Form.Field>
              <Form.Field>
                <label>Price in Ether</label>
                <Input
                  value={this.state.price}
                  onChange={event =>
                    this.setState({ price: event.target.value })
                  }
                />
              </Form.Field>
              <Form.Field>
                <label>Details</label>
                <Input
                  value={this.state.details}
                  onChange={event =>
                    this.setState({ details: event.target.value })
                  }
                />
              </Form.Field>
              <div className="status">
                <h2>
                  <strong>
                    <i>{this.state.status}</i>
                  </strong>
                </h2>
              </div>
              <div className="status-input">
                <h2>
                  <strong>
                    <i>{this.state.errorInput}</i>
                  </strong>
                </h2>
              </div>
              <div className="btn-btn-button">
                <Button
                  onClick={this.setThur}
                  primary
                  loading={this.state.loading}
                >
                  Create!
                </Button>
              </div>
            </Form>
            <div className="messagetext ui positive message">
              <div className="header">Message</div>
              <p>{this.state.errorMessage}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MenuHome;
