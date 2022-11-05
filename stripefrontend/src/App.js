import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import StripeCheckout from "react-stripe-checkout"

function App() {

  const [product, setProduct] = useState({
    name : "React from FB",
    price : 1,
    productBy : "Facebook"
  });

  const makePayment = token => {
    const body = {
      token,
      product
    }
    const headers = {
      "Content-type" : "application/json"
    }

    return fetch(`https://localhost:8282/payment`, {
      method : "POST",
      body,
      headers : JSON.stringify(body)
    }).then(response => {
      console.log("RESPONSE ", response)
      const {status} = response;
      console.log("STATUS ", status)
    })
    .catch(error => console.log(error));
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a
          className="App-link"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <StripeCheckout 
        // stripeKey={process.env.REACT_APP_KEY} 
        // stripeKey="type secret key here" 
        token={makePayment}
        name='Buy React'
        amount={product.price * 100}
        >
          <button className='btn-large pink'>
            Buy React is just {product.price} $
          </button>
        </StripeCheckout>
      </header>
    </div>
  );
}

export default App;
