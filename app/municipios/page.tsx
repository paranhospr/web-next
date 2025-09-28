
import { Suspense } from "react";
import { MunicipalitiesContent } from "@/components/municipalities-content";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function MunicipiosPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Municípios de Paranhos PR
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore os municípios, suas classificações e informações detalhadas
          </p>
        </div>

        {/* Content */}
        <Suspense fallback={<MunicipalitiesLoading />}>
          <MunicipalitiesContent />
        </Suspense>
      </div>
    </div>
  );
}

function MunicipalitiesLoading() {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex gap-4 mb-6">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-10 w-48" />
        </div>
      </Card>
      <div className="grid gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="p-6">
            <div className="flex justify-between items-center">
              <div className="space-y-2">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-32" />
              </div>
              <div className="flex gap-2">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-16" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
