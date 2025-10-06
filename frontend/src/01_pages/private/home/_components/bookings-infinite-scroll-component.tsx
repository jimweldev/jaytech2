import { useEffect, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import type { ServiceBooking } from '@/04_types/service/service-booking';
import { Badge } from '@/components/ui/badge';
import { Card, CardBody } from '@/components/ui/card';
import useTanstackInfiniteQuery from '@/hooks/tanstack/use-tanstack-infinite-query';
import { getDateTimezone } from '@/lib/date/get-date-timezone';
import { formatName } from '@/lib/user/format-name';
import { cn } from '@/lib/utils';

interface BookingsInfiniteScrollComponentProps {
  status: string;
  sort: string;
}

const BookingsInfiniteScrollComponent = ({
  status,
  sort,
}: BookingsInfiniteScrollComponentProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [bookings, setBookings] = useState<ServiceBooking[]>([]);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    handlePullToRefresh,
  } = useTanstackInfiniteQuery<ServiceBooking>({
    endpoint: 'services/bookings',
    params: `status=${status}&sort=${sort}`,
  });

  // Sync TanStack data → local state
  useEffect(() => {
    if (data) {
      setBookings(data.pages.flatMap(page => page.records));
    }
  }, [data]);

  // Auto-load if container has no scrollbar
  useEffect(() => {
    if (
      containerRef.current &&
      hasNextPage &&
      !isFetchingNextPage &&
      containerRef.current.scrollHeight <= containerRef.current.clientHeight
    ) {
      fetchNextPage();
    }
  }, [bookings, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <Card className="basis-[300px]">
      <CardBody
        className="h-[calc(100vh-150px)] overflow-y-auto !p-2"
        id={`bookings-scrollable-${status.replace(/\s+/g, '-').toLowerCase()}`}
        ref={containerRef}
      >
        <InfiniteScroll
          className="select-none"
          dataLength={bookings.length}
          next={fetchNextPage}
          hasMore={!!hasNextPage}
          loader={<p className="p-2 text-center text-sm">Loading more...</p>}
          scrollableTarget={`bookings-scrollable-${status.replace(/\s+/g, '-').toLowerCase()}`}
          pullDownToRefresh
          pullDownToRefreshThreshold={80}
          refreshFunction={handlePullToRefresh}
          pullDownToRefreshContent={
            <h4 className="text-muted-foreground p-2 text-center text-sm">
              ↓ Pull down to refresh
            </h4>
          }
          releaseToRefreshContent={
            <h4 className="text-success p-2 text-center text-sm">
              ↑ Release to refresh
            </h4>
          }
          endMessage={
            <p
              className={cn(
                'text-muted-foreground p-2 text-center text-xs',
                (isLoading || bookings.length === 0) && 'hidden',
              )}
            >
              No more bookings
            </p>
          }
        >
          <div className="space-y-2">
            {bookings.map(booking => (
              <div
                key={booking.id}
                className="rounded-lg border border-gray-200 bg-white p-2 transition hover:shadow"
              >
                <div className="mb-1 flex items-center justify-between">
                  <h4 className="text-xs font-semibold text-gray-700">
                    JT-000000{booking.id}
                  </h4>
                </div>

                <p className="text-xs font-medium text-gray-900">
                  {
                    booking.service_brand_model?.service_brand_category
                      ?.service_brand?.label
                  }{' '}
                  <span className="text-gray-600">
                    • {booking.service_brand_model?.label}
                  </span>
                </p>

                <div className="mt-2 flex flex-wrap gap-1">
                  <Badge variant="secondary">Checkup</Badge>
                </div>

                <div className="mt-3 flex justify-between text-[11px] text-gray-500">
                  <span>
                    👨‍🔧{' '}
                    {formatName(
                      booking.service_booking_drop_point_technician?.technician,
                    )}
                  </span>
                  <span>📅 {getDateTimezone(booking.created_at, 'date')}</span>
                </div>
              </div>
            ))}

            {isLoading && (
              <p className="text-muted-foreground p-4 text-center text-sm">
                Loading bookings...
              </p>
            )}

            {!isLoading && bookings.length === 0 && (
              <p className="text-muted-foreground p-4 text-center text-sm">
                No bookings found
              </p>
            )}
          </div>
        </InfiniteScroll>
      </CardBody>
    </Card>
  );
};

export default BookingsInfiniteScrollComponent;
