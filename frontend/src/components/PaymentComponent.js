import React, { useState, useEffect, useRef } from 'react';
import Cookie from "js-cookie"
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useSelector, useDispatch } from "react-redux"
import CardSection from './CardSection';
import { Spinner2 } from "./Shipping"
import { useHistory } from "react-router-dom";



export default function CheckoutForm(props) {

  const history = useHistory()

  const stripe = useStripe();
  const elements = useElements();


  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  const [totalSuccess, setTotalSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [toHall, setToHall] = useState(false)

  const { _id, name } = Cookie.getJSON("userInfo")
  const { currentOrder } = useSelector(state => state.currentOrder)



  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    setLoading(true)
    const payment = await fetch("https://mern-ecomerce.herokuapp.com/secret", {
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ idUser: _id, idOrder: currentOrder._id }),
      method: "POST"
    })

    const { client_secret } = await payment.json()

    const result = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: name,
        },
      }
    });
    setLoading(false)
    if (result.error) {
      // Show error to your customer (e.g., insufficient funds)

      setError(result.error.message)
    } else {
      // The payment has been processed!
 
      if (result.paymentIntent.status === 'succeeded') {

        setSuccess(true)


        // Show a success message to your customer
        // There's a risk of the customer closing the window before callback
        // execution. Set up a webhook or plugin to listen for the
        // payment_intent.succeeded event that handles any business critical
        // post-payment actions.
      }
    }
  };


  useEffect(() => {

    if (success) {
      fechar()

    }


  }, [success])

  const dispatch = useDispatch()

  const fechar = async () => {
    try {
      const rawData = await fetch("https://mern-ecomerce.herokuapp.com/secret/success", {
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id: currentOrder._id }),
        method: "post"
      })
      await rawData.json()
      setTotalSuccess(true)

      dispatch({ type: "CLEAR_CART" })
      dispatch({ type: "CLEAR_ORDER" })
      dispatch({ type: "SET_STEP", payload: 4 })
      Cookie.set("cartItems", JSON.stringify([]))
      Cookie.set("currentOrder", JSON.stringify({}))


    }
    catch (err) {
      console.log(err)
    }

  }

  useEffect(() => {
    let successDelay;
    if (document.getElementById('successAnimation')) {
      successDelay = setTimeout(() => {
        document.getElementById('successAnimation').classList.add("animated")

        setToHall(true)
      }, 500)

    }

    return () => {
      clearTimeout(successDelay)
    }
  }, [totalSuccess])


  useEffect(() => {
   
    let redirectDelay;
    if (toHall) {
      redirectDelay = setTimeout(() => {
        history.push("/")

      }, 2000)

    }

    return () => {
      clearTimeout(redirectDelay)
    }

  }, [toHall])

  return (
    <form onSubmit={handleSubmit}>
      <CardSection />
      <button disabled={!stripe}
        className={success ? "pay-btn closed" : "pay-btn"}
      >
        Confirm Payment
        </button>
      {!error && loading && <Spinner2 />}
      {error && <p className="error">{error}</p>}

      {totalSuccess &&
        <svg id="successAnimation" xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 70 70">
          <circle id="successAnimationCircle" cx="35" cy="35" r="24" stroke="#00ff00" strokeWidth="2" strokeLinecap="round" fill="transparent" />
          <polyline id="successAnimationCheck" stroke="#00ff00" strokeWidth="2" points="23 34 34 43 47 27" fill="transparent" />
        </svg>}

    </form>
  );
}

const SuccessSvg = () => <svg id="successAnimation" xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 70 70">
  <circle id="successAnimationCircle" cx="35" cy="35" r="24" stroke="#005596" strokeWidth="2" strokeLinecap="round" fill="transparent" />
  <polyline id="successAnimationCheck" stroke="#005596" strokeWidth="2" points="23 34 34 43 47 27" fill="transparent" />
</svg>
