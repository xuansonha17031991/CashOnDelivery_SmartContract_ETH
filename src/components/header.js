import React, { Component } from 'react';
//import { Header, Icon } from 'semantic-ui-react';
import web3 from '../web3';
import config from '../config';

class HeaderTop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            seller: ''
        }
    }

    async componentDidMount() {
        const account = await web3.eth.getAccounts();
        console.log('accc:', account[0]);
        //call seller
        const seller = await config.methods.seller().call();
        this.setState({
            seller
        });
    }
    render() {
        return (
            <div className="header">
                <h2 className="ui header">
                
                    <i aria-hidden="true" className="settings icon" />
                    <div className="content">
                        Cash on delivery
                     <div className="sub header">Blockchain Ethereum</div>
                    </div>
                </h2>

            </div>
        );
    }
}

export default HeaderTop;