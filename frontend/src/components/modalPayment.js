import React from "react"
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentComponent from "./PaymentComponent";
import { MdClose } from "react-icons/md"
import PropTypes from 'prop-types';

const stripePromise = loadStripe("pk_test_51GycRPCpj3YNAXYJnko6HsITwdih6JeG6Poz4bpB6nWt5unWrwjjyL3CHFzwh86pENVn6uASTXNsr1GavWFgjsUB00fEmNxf3v");


const ModalPayment = (props) => {

    return (
        <div className={props.modalOpen ? "modal-payment" : "modal-payment closed"}
        >
            <div className="relative-wrapper">
                <span className="closebtn"
                    onClick={() => { props.setModal(false) }}
                ><MdClose /></span>
                <h1>Payment</h1>

                <Elements stripe={stripePromise}>
                  
                    <PaymentComponent />
                </Elements>


                
            </div>
        </div>
    )
}
export default ModalPayment


ModalPayment.prototype = {
    setModal: PropTypes.string
    
}