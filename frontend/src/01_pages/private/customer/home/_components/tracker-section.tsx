import PageHeader from "@/components/typography/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardBody } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

const TrackerSection = () => {
    return (
        <>
            <Card className="rounded-2xl shadow-md border border-gray-100 bg-gradient-to-r from-white via-gray-50 to-white">
                <CardBody className="flex flex-col gap-6 p-6 sm:p-8">
                    {/* Header */}
                    <div className="text-center">
                        <PageHeader>Track Your Repairs</PageHeader>
                        <p className="mt-2 text-gray-600 text-sm sm:text-base">
                            Enter your tracking number below to see the latest status of your repair.
                        </p>
                    </div>

                    {/* Search row */}
                    <div className="flex flex-col sm:flex-row gap-3">
                        <Input
                            placeholder="e.g. JT-12345"
                            className="flex-1 rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500"
                        />
                        <Button className="rounded-lg px-6 text-base font-medium">
                            Track Now
                        </Button>
                    </div>
                </CardBody>
            </Card>
        </>
    )
}

export default TrackerSection