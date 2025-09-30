import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardBody } from '@/components/ui/card';

const SuccessPage = () => {
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const paymentIntent = queryParams.get('payment_intent');

  return (
    <div className="bg-background p-layout flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-md text-center shadow-lg">
        <CardBody className="space-y-4 p-6">
          <h1 className="text-2xl font-bold text-green-600">
            🎉 Payment Successful!
          </h1>
          <p className="font-medium">
            Thank you for your payment. Your transaction has been completed.
          </p>

          {paymentIntent && (
            <p className="text-muted-foreground text-sm">
              Payment Intent ID:{' '}
              <span className="font-mono">{paymentIntent}</span>
            </p>
          )}

          <Button asChild className="mt-4">
            <Link to="/">Go back to Home</Link>
          </Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default SuccessPage;
