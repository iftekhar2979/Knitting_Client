import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

const OrderSkeleton = () => {
    return (
        <div className="w-full space-y-8 animate-pulse">
            {/* Header Skeleton */}
            <div className="flex justify-between items-center py-4">
                <div className="space-y-4">
                    <Skeleton className="h-10 w-64 bg-gray-200" />
                    <Skeleton className="h-6 w-40 bg-gray-100" />
                </div>
                <div className="flex gap-4">
                    <Skeleton className="h-9 w-24 bg-gray-200" />
                    <Skeleton className="h-9 w-24 bg-gray-200" />
                </div>
            </div>

            {/* Content Skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Commercial Card Skeleton */}
                <Card className="border-none shadow-sm bg-white overflow-hidden lg:col-span-1">
                    <CardContent className="p-6 space-y-6">
                        <div className="flex items-center gap-4">
                            <Skeleton className="h-12 w-12 rounded-full bg-gray-100" />
                            <Skeleton className="h-8 w-48 bg-gray-200" />
                        </div>
                        <div className="space-y-4 pt-4 border-t border-gray-50">
                            <Skeleton className="h-5 w-full bg-gray-100" />
                            <Skeleton className="h-5 w-3/4 bg-gray-100" />
                        </div>
                    </CardContent>
                </Card>

                {/* Grid Skeletons */}
                <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[1, 2, 3, 4].map((i) => (
                        <Card key={i} className="border-none shadow-sm bg-white p-6">
                            <Skeleton className="h-4 w-24 mb-4 bg-gray-100" />
                            <Skeleton className="h-6 w-full bg-gray-200" />
                            <div className="mt-6 pt-4 border-t border-gray-50">
                                <Skeleton className="h-4 w-20 mb-4 bg-gray-100" />
                                <Skeleton className="h-6 w-3/4 bg-gray-200" />
                            </div>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Quantity Info Skeleton */}
            <Skeleton className="h-96 w-full bg-gray-50 rounded-2xl" />
        </div>
    )
}

export default OrderSkeleton;
