import React, { Component } from 'react';

class Dashboard extends Component {

    constructor(){
        super();
    }

    render() {
        let { deposit, withdrawal, transfer } = this.props.transactionCallbacks;
        let transactionInfo = this.props.userData.map((d,i)=>{
        return <tr key={i}>
                    <td className="action_name">{d.action}</td>
                    <td>{d.amount} Rs</td>
                    <td>{d.balance} Rs</td>
                </tr>
        })

        return (
        
            <div className="container-fluid">
                <h2 style={{textAlign:"center",backgroundColor:"gainsboro", padding:"10px"}}>Transaction Summary</h2>
                <div className="row">
                    <div className="col-lg-2">
                        <h4>Perform Actions</h4>
                        <ul className="list-group">
                            <li className="list-group-item"><a onClick={deposit.bind(this)}>Deposit</a></li>
                            <li className="list-group-item"><a onClick={withdrawal.bind(this)}>Withdrawal</a></li>
                            <li className="list-group-item"><a onClick={transfer.bind(this)}>Transfer</a></li>
                        </ul>
                    </div>
                    <div className="col-lg-10">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Transaction</th>
                                    <th>Amount</th>
                                    <th>Balance</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactionInfo}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default Dashboard;