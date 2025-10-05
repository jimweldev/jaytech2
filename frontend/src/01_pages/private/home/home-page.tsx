import PageHeader from '@/components/typography/page-header';
import { Badge } from '@/components/ui/badge';
import { Card, CardBody, CardTitle } from '@/components/ui/card';

const HomePage = () => {
  return (
    <div>
      <PageHeader className="mb-3">Bookings</PageHeader>

      <div className="gap-layout grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))]">
        {/* Pending Section */}
        <Card>
          <CardBody className="!p-2">
            <CardTitle className="mb-2 text-sm font-bold text-yellow-600">
              Pending
            </CardTitle>

            <div className="space-y-2 overflow-y-auto">
              <div className="rounded-lg border border-gray-200 bg-white p-3 shadow-sm transition hover:shadow">
                {/* Tracking Number */}
                <div className="mb-1 flex items-center justify-between">
                  <h4 className="text-xs font-semibold text-gray-700">
                    JT-0000001
                  </h4>
                </div>

                {/* Brand + Model */}
                <p className="text-xs font-medium text-gray-900">
                  Apple <span className="text-gray-600">• Iphone</span>
                </p>

                {/* Services as badges */}
                <div className="mt-2 flex flex-wrap gap-1">
                  <Badge variant="secondary">Screen Replacement</Badge>
                </div>

                {/* Technician + Date */}
                <div className="mt-3 flex justify-between text-[11px] text-gray-500">
                  <span>👨‍🔧 JayTech Technician</span>
                  <span>📅 2025-10-05</span>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Completed Section */}
        <Card className="shadow-sm">
          <CardBody className="!p-3">
            <CardTitle className="mb-3 text-sm font-bold text-green-600">
              Completed
            </CardTitle>
            <p className="text-xs text-gray-400">No completed bookings yet</p>
          </CardBody>
        </Card>

        {/* Cancelled Section */}
        <Card className="shadow-sm">
          <CardBody className="!p-3">
            <CardTitle className="mb-3 text-sm font-bold text-red-600">
              Cancelled
            </CardTitle>
            <p className="text-xs text-gray-400">No cancelled bookings</p>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default HomePage;
