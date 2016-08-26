import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

class IModal extends Component {

  render() {
    return (
        <div>
            <Modal show={this.props.show} onHide={this.props.close.bind(this)}>
                <Modal.Header closeButton>
                    <Modal.Title className="action_name" >{this.props.heading}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                     <form onSubmit={this.props.submit.bind(this)}>
                        <div className="form-group">
                        Amount: <input name="amount" className="form-control" type="number" />
                        </div>
                        <Button className="btn-primary" type="submit">Submit</Button>
                    </form>
                </Modal.Body>
                
            </Modal>
        </div>
    );
  }

}
 
export default IModal;