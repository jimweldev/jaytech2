import { useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, type Stripe } from '@stripe/stripe-js';
import { mainInstance } from '@/07_instances/main-instance';
import { Button } from '@/components/ui/button';
import PaymentForm from './_components/payment-form';

const stripePromise: Promise<Stripe | null> = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLIC_KEY as string,
);

type PaymentFormProps = {
  label?: string;
  endpoint: string;
  paymentDetails: {
    amount: number;
    details: string;
  };
};

const PaymentButton = ({
  label = 'Continue',
  endpoint,
  paymentDetails,
}: PaymentFormProps) => {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const startTransaction = async () => {
    try {
      setLoading(true);
      const { data } = await mainInstance.post(endpoint, {
        amount: paymentDetails.amount * 100,
        details: paymentDetails.details,
      });
      setClientSecret(data.clientSecret || data.client_secret);
      setOpen(true); // open dialog when new intent created
    } catch (error) {
      console.error('Error creating payment intent:', error);
      alert('Could not start transaction.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button onClick={startTransaction} disabled={loading}>
        {label}
      </Button>

      {clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <PaymentForm
            amount={paymentDetails.amount}
            open={open}
            onOpenChange={setOpen}
          />
        </Elements>
      )}
    </>
  );
};

export default PaymentButton;
