import PageHeader from '@/components/typography/page-header';
import BookingsInfiniteScrollComponent from './_components/bookings-infinite-scroll-component';

const bookingConfigs = [
  { status: 'Pending', sort: 'created_at' },
  { status: 'In Progress', sort: 'created_at' },
] as const;

const HomePage = () => {
  return (
    <div>
      <PageHeader className="mb-3">Bookings</PageHeader>

      <div className="flex gap-2">
        {bookingConfigs.map(({ status, sort }) => (
          <BookingsInfiniteScrollComponent
            key={status}
            status={status}
            sort={sort}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
