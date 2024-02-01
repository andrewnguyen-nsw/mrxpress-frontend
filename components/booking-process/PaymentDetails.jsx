import PaymentForm from '@components/booking-process/PaymentForm';
import { Spinner } from '@nextui-org/react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const PaymentDetails = ({ bookingData }) => {
  const amount = bookingData.finalTotal * 100;

  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    const fetchPaymentIntent = async () => {
      try {
        // Create PaymentIntent as soon as the page loads
        const res = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount: amount }),
        });
        const data = await res.json();
        setClientSecret(data.clientSecret);
      } catch (error) {
        console.error('Error: ', error);
      }
    };
    if (amount) {
      // Check if `amount` is not null or undefined
      fetchPaymentIntent();
    }
  }, [amount]);

  const appearance = {
    theme: 'stripe',
    variables: {
      colorPrimary: '#343a40',
    },
  };

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div>
      {!clientSecret ? (
        <Spinner className='pt-3 pl-6' />
      ) : (
        <Elements options={options} stripe={stripePromise}>
          <PaymentForm bookingData={bookingData}/>
        </Elements>
      )}
    </div>
  );
};

export default PaymentDetails;
