import PaymentButton from '@/components/button/payment/payment-button';
import DropPointTechnicianSelect from '@/components/react-select/drop-point-technician-select';
import PageHeader from '@/components/typography/page-header';

const HomePage = () => {
  return (
    <div>
      <PageHeader className="mb-3">Home</PageHeader>

      <PaymentButton
        label="Checkout"
        endpoint="/tasks/create-payment-intent"
        paymentDetails={{
          amount: 50.99,
          details: 'iPhone 16 | Screen Replacement',
        }}
      />

      <DropPointTechnicianSelect serviceId="2" />
    </div>
  );
};

export default HomePage;
