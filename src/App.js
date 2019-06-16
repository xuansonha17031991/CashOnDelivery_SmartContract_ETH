import "./App.css";
import web3 from "./web3";
import React, { Component } from "react";
import HeaderTop from "./components/header";
import MenuHome from "./components/MenuHome";
import MenuReview from "./components/MenuReview";
import MenuShipper from "./components/MenuShipper";
import Menu from "./components/Menu";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MenuShipperDelivery from "./components/MenuShipperDelivery";
import Footer from "./components/footer";
import  Confirm  from "./components/Confirm";
import ConfirmErrByShip from "./components/ConfirmErrByShip";
import ConfirmErrByBuyer from "./components/ConfirmErrByBuyer";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  ondata=()=>{
    console.log("adddddddddddddd");
  }
  async componentDidMount() {
    const account = await web3.eth.getAccounts();
    console.log(account[0]);
  }
  render() {
    return (
      <Router>
        <Switch>
          <div>
            <HeaderTop />
            <Menu />
            <Route path="/home" exact component={MenuHome }  ondatata= {this.ondata}/>
            <Route path="/review" component={MenuReview} />
            <Route path="/shipper" component={MenuShipper} />
            <Route path="/shipperdilivery" component={MenuShipperDelivery} />
            <Route path="/confirm" component={Confirm} />
            <Route path="/confirmerrbyship" component={ConfirmErrByShip} />
            <Route path="/confirmerrbybuyer" component={ConfirmErrByBuyer} />
            <div>
              <Footer />
            </div>
          </div>
        </Switch>
      </Router>
    );
  }
}

export default App;
