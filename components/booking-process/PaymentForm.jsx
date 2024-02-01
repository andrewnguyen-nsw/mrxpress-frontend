import { useAuth } from '@context/useAuth';
import { Button, Spinner } from '@nextui-org/react';
import { placeOrder } from '@services/bookingService';
import {
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';

export default function PaymentForm({ bookingData }) {
  const stripe = useStripe();
  const elements = useElements();
  const { userToken } = useAuth();
  console.log('🚀 ~ PaymentForm ~ userToken:', userToken);

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const paymentElementOptions = {
    layout: 'tabs',
  };

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case 'succeeded':
          setMessage('Payment succeeded!');
          break;
        case 'processing':
          setMessage('Your payment is processing.');
          break;
        case 'requires_payment_method':
          setMessage('Your payment was not successful, please try again.');
          break;
        default:
          setMessage('Something went wrong.');
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    // e.preventDefault();

    handlePlaceOrder();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: 'http://localhost:3000/book/status',
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`.
    if (error.type === 'card_error' || error.type === 'validation_error') {
      setMessage(error.message);
    } else {
      setMessage('An unexpected error occurred.');
    }

    setIsLoading(false);
  };

  const handlePlaceOrder = async () => {
    const newBookingData = {
      ...bookingData,
      user: {
        firstName: bookingData.firstName,
        lastName: bookingData.lastName,
        mobile: bookingData.mobile,
        address: bookingData.address,
        email: 'placeholder@gmail.com',
      },
    };
    try {
      const response = placeOrder(newBookingData, userToken);
      console.log(response);
    } catch (error) {
      console.log('Error placing order:', error);
    }
  };

  return (
    // <form
    //   id='payment-form'
    //   onSubmit={handleSubmit}
    //   className='mx-auto justify-center w-full md:w-2/3'
    // >
    <>
      <PaymentElement id='payment-element' options={paymentElementOptions} />
      <Button
        isDisabled={isLoading || !stripe || !elements}
        id='submit'
        className='mt-3'
        color='primary'
        onPress={handleSubmit}
      >
        <span id='button-text'>{isLoading ? 'Loading...' : 'Place Order'}</span>
      </Button>
      {/* Show any error or success messages */}
      {message && (
        <div id='payment-message' className='text-sm text-red-800 mt-2'>
          {message}
        </div>
      )}
    </>
    // </form>
  );
}
