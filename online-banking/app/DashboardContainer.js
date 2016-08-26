import React, { Component } from 'react';
import update from 'react-addons-update';

import IModal from './Modal';
class DashboardContainer extends Component {
    
    constructor(){
        super();
         this.state = {
                showModal:false,
                amount:"",
                modelAction:"",
                totalBalance:27000,
                userData : [{action:"Create account", amount:"0", balance:"0"},
                            {action:"Deposit", amount:"20000", balance:"30000"},
                            {action:"Withdrawal", amount:"3000", balance:"27000"}]
                        };
    }

    doDeposit(amount){
        this.open("deposit");
        console.log("deposit");
    }

    doWithdrawal(amount){
        this.open("withdraw");
        console.log("doWithdrawal");
    }

    doTransfer(amount){
        this.open("transfer");
        console.log("doTransfer");
    }

    close(){
        this.setState({ showModal: false });
    }

    open(action){
        this.setState({ showModal: true, modelAction:action });
    }

    submit(evt){
        evt.preventDefault();
        console.log("from submit: ",evt.target.amount.value);
        let newBalance;
        let newAmount = evt.target.amount.value;
        switch(this.state.modelAction){
            case "deposit":
                newBalance = Number(newAmount) + Number(this.state.totalBalance);
            break;
            case "withdraw":
                newBalance = this.state.totalBalance - newAmount ;
            break;
            case "transfer":
                newBalance = this.state.totalBalance - newAmount;
            break;
        }
        let nextState = update(this.state.userData,
            {$push: [{ action:this.state.modelAction, amount:newAmount, balance:newBalance }]}
        );
        this.setState({userData:nextState});
        this.close();
    }


    render() {
        let dashboard = this.props.children && React.cloneElement(this.props.children, {
            userData : this.state.userData,
            transactionCallbacks: {
                deposit: this.doDeposit.bind(this),
                withdrawal: this.doWithdrawal.bind(this),
                transfer: this.doTransfer.bind(this)
            }
        })
        
        return (
            <div>
                {dashboard}
                <IModal heading={this.state.modelAction} submit={this.submit.bind(this)} show={this.state.showModal} close={this.close.bind(this)} />
            </div>
            );
    }
}

export default DashboardContainer;
 
