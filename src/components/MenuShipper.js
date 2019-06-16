import React, { Component } from "react";
import config2 from "../config2";
import config from "../config";
import { Form, Button, Input } from "semantic-ui-react";
import web3 from "../web3";
class MenuShipper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seller: "",
      errorMessage: "",
      name: "",
      price: "",
      id: 0,
      hash:'',
      pricepc1:0
    };
  }

  async componentDidMount() {
    const seller = await config2.methods.seller().call();
    const pricepc1 = await config.methods.price().call();
    this.setState({
      seller,
      pricepc1
    });
    console.log(pricepc1);
  }

  onSubmit = async event => {
    event.preventDefault();
    console.time('pcship');
    const { name, price,pricepc1  } = this.state;
    if (name === "") {
      this.setState({
        errorMessage: "Please enter a name!!"
      });
    } else if (price === "") {
      this.setState({
        errorMessage: "Please enter price equal price off package!!"
      });

    }
    else if (price !== pricepc1) {
      this.setState({
        errorMessage: "Please enter price equal price off package!!"
      });

    } else {
      try {
        const accounts = await web3.eth.getAccounts();
        await config2.methods.Ac1_CreatePackage(name, price).send({
          from: accounts[0],
          gas: "2000000"
        });
        await config2.methods.Ac2_CreateHash().send({
          from: accounts[0]
        });
        this.setState({
          errorMessage: "success!!"
        });
        console.timeEnd('pcship');
      } catch (err) {
        this.setState({ errorMessage: err.message });
      }
      this.setState({ loading: false });
    }
    this.setState({
      name: "",
      price: ""
    });
  };
  render() {
    return (
      <div className="main">
        <div>
          <a className="ui blue image label">
            Seller
            <div className="detail">{this.state.seller}</div>
          </a>
          <div className="from-creat">
            <h3>Seller fill out a package information</h3>
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
                // disabled
                  value={this.state.pricepc1}
                  onChange={event =>
                    this.setState({ price: event.target.value })
                  }
                />
              </Form.Field>
             

              <Button primary loading={this.state.loading}>
                Create!
              </Button>
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

export default MenuShipper;
