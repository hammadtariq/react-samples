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
                userData : [{action:"Account created", amount:"0", balance:"0"},
                            {action:"Deposit", amount:"20000", balance:"30000"},
                            {action:"Withdrawal", amount:"3000", balance:"27000"}]
                        };
    }

    doDeposit(amount){
        this.open("Deposit");
        console.log("deposit");
    }

    doWithdrawal(amount){
        this.open("Withdraw");
        console.log("doWithdrawal");
    }

    doTransfer(amount){
        this.open("Transfer");
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
        let newBalance,nextState;
        let newAmount = evt.target.amount.value;
        let last_index = this.state.userData.length-1;
        let last_row = this.state.userData[last_index];
        this.close();
        
        switch(this.state.modelAction){
            case "Deposit":
                newBalance = Number(newAmount) + Number(last_row.balance);
            break;
            case "Withdraw":
                last_row.balance >= newAmount ? (newBalance = last_row.balance - newAmount) : (alert("you do not have enough money to withdraw!"),newBalance = last_row.balance);
                
            break;
            case "Transfer":
                last_row.balance >= newAmount ? (newBalance = last_row.balance - newAmount) : (alert("you do not have enough money to transfer!"),newBalance = last_row.balance);
                
            break;
        }

        if( Number(newBalance) !== Number(last_row.balance) ){
            nextState = update(this.state.userData,
                {
                    [last_index]: {
                            balance: { $set: newBalance }
                    }
                }
            );

            nextState = update(this.state.userData,
                {$push: [{ action:this.state.modelAction, amount:newAmount, balance:newBalance }]}
            );
            this.setState({userData:nextState});
        }
        
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
 
