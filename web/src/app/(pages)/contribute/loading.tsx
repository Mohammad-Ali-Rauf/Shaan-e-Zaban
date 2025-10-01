export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="relative w-full max-w-4xl">
        {/* Background decorative elements */}
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-red-600 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-red-800 rounded-full blur-3xl opacity-20"></div>
        
        {/* Loading Card */}
        <div className="relative bg-gray-800/70 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 shadow-2xl shadow-red-900/10">
          {/* Header Skeleton */}
          <div className="text-center mb-8">
            <div className="h-8 w-64 bg-gray-700 rounded-lg mx-auto mb-4 animate-pulse"></div>
            <div className="h-4 w-96 bg-gray-700 rounded mx-auto mb-6 animate-pulse"></div>
            <div className="h-1 w-32 bg-gradient-to-r from-red-600 to-red-800 mx-auto rounded-full"></div>
          </div>

          {/* Form Skeleton */}
          <div className="space-y-8">
            {/* Story Info Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="h-4 w-24 bg-gray-700 rounded animate-pulse"></div>
                <div className="h-12 bg-gray-700/50 rounded-xl animate-pulse"></div>
              </div>
              <div className="space-y-3">
                <div className="h-4 w-24 bg-gray-700 rounded animate-pulse"></div>
                <div className="h-12 bg-gray-700/50 rounded-xl animate-pulse"></div>
              </div>
            </div>

            {/* Tags Skeleton */}
            <div className="space-y-3">
              <div className="h-4 w-32 bg-gray-700 rounded animate-pulse"></div>
              <div className="h-12 bg-gray-700/50 rounded-xl animate-pulse"></div>
              <div className="h-3 w-48 bg-gray-700 rounded animate-pulse"></div>
            </div>

            {/* Sentences Section Skeleton */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="h-6 w-32 bg-gray-700 rounded animate-pulse"></div>
                <div className="h-6 w-20 bg-gray-700 rounded-full animate-pulse"></div>
              </div>
              
              {/* Sentence Cards Skeleton */}
              {[1, 2].map((item) => (
                <div key={item} className="bg-gray-900/30 border border-gray-600 rounded-xl p-6 space-y-4 animate-pulse">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
                    <div className="h-4 w-24 bg-gray-700 rounded"></div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="h-3 w-16 bg-gray-700 rounded"></div>
                      <div className="h-12 bg-gray-700/50 rounded-lg"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-3 w-20 bg-gray-700 rounded"></div>
                      <div className="h-12 bg-gray-700/50 rounded-lg"></div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Add Sentence Button Skeleton */}
              <div className="h-16 border-2 border-dashed border-gray-600 rounded-xl animate-pulse"></div>
            </div>

            {/* Submit Button Skeleton */}
            <div className="h-14 bg-gray-700 rounded-xl animate-pulse"></div>
          </div>

          {/* Loading Spinner Overlay */}
          <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm rounded-2xl flex items-center justify-center">
            <div className="text-center">
              <div className="relative mb-4">
                <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                <div className="absolute inset-0 w-16 h-16 border-4 border-red-900 border-t-transparent rounded-full animate-spin opacity-20"></div>
              </div>
              <div className="space-y-2">
                <div className="h-4 w-48 bg-gray-700 rounded mx-auto animate-pulse"></div>
                <div className="h-3 w-32 bg-gray-700 rounded mx-auto animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}