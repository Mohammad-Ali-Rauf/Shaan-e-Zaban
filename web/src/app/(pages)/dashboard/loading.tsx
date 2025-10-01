export default function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="relative w-full max-w-6xl">
        {/* Background decorative elements */}
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-red-600 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-red-800 rounded-full blur-3xl opacity-20"></div>
        
        {/* Loading Content */}
        <div className="relative space-y-8">
          {/* Header Skeleton */}
          <div className="text-center mb-12">
            <div className="h-12 w-80 bg-gradient-to-r from-gray-700 to-gray-600 rounded-lg mx-auto mb-6 animate-pulse"></div>
            <div className="h-4 w-96 bg-gray-700 rounded mx-auto mb-6 animate-pulse"></div>
            <div className="h-1 w-24 bg-gradient-to-r from-red-600 to-red-800 mx-auto rounded-full"></div>
          </div>

          {/* Stats Grid Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[1, 2, 3, 4].map((item) => (
              <div 
                key={item} 
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 text-center animate-pulse"
              >
                <div className="h-8 w-16 bg-gray-700 rounded-lg mx-auto mb-3"></div>
                <div className="h-4 w-20 bg-gray-700 rounded mx-auto"></div>
              </div>
            ))}
          </div>

          {/* Content Area Skeleton */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
            {/* Section Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <div className="space-y-3">
                <div className="h-7 w-48 bg-gray-700 rounded animate-pulse"></div>
                <div className="h-4 w-32 bg-gray-700 rounded animate-pulse"></div>
              </div>
              <div className="h-12 w-40 bg-gray-700 rounded-xl animate-pulse"></div>
            </div>

            {/* Stories Grid Skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((item) => (
                <div 
                  key={item} 
                  className="bg-gray-900/30 border border-gray-600 rounded-2xl p-6 animate-pulse group"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    {/* Left Content */}
                    <div className="flex-1 min-w-0 space-y-4">
                      {/* Level and Tags */}
                      <div className="flex items-center gap-3">
                        <div className="h-6 w-20 bg-gray-700 rounded-full"></div>
                        <div className="h-4 w-24 bg-gray-700 rounded"></div>
                      </div>
                      
                      {/* Title */}
                      <div className="h-6 w-48 bg-gray-700 rounded"></div>
                      
                      {/* Metadata */}
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <div className="h-4 w-4 bg-gray-700 rounded"></div>
                          <div className="h-3 w-16 bg-gray-700 rounded"></div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-4 w-4 bg-gray-700 rounded"></div>
                          <div className="h-3 w-20 bg-gray-700 rounded"></div>
                        </div>
                      </div>
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-20 bg-gray-700 rounded-lg"></div>
                      <div className="flex gap-2">
                        <div className="h-8 w-8 bg-gray-700 rounded-lg"></div>
                        <div className="h-8 w-8 bg-gray-700 rounded-lg"></div>
                      </div>
                    </div>
                  </div>

                  {/* Tags Skeleton */}
                  <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-700/50">
                    <div className="h-6 w-12 bg-gray-700 rounded-md"></div>
                    <div className="h-6 w-16 bg-gray-700 rounded-md"></div>
                    <div className="h-6 w-10 bg-gray-700 rounded-md"></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Achievement Section Skeleton */}
            <div className="mt-12 bg-gradient-to-r from-gray-700/30 to-gray-600/20 border border-gray-600 rounded-2xl p-6 animate-pulse">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-3 flex-1">
                  <div className="h-6 w-32 bg-gray-700 rounded"></div>
                  <div className="h-4 w-64 bg-gray-700 rounded"></div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-center space-y-2">
                    <div className="h-7 w-12 bg-gray-700 rounded"></div>
                    <div className="h-3 w-16 bg-gray-700 rounded"></div>
                  </div>
                  <div className="w-12 h-12 bg-gray-700 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Loading Spinner Overlay */}
        <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm rounded-2xl flex items-center justify-center">
          <div className="text-center">
            <div className="relative mb-6">
              <div className="w-20 h-20 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
              <div className="absolute inset-0 w-20 h-20 border-4 border-red-900 border-t-transparent rounded-full animate-spin opacity-20"></div>
            </div>
            <div className="space-y-3">
              <div className="h-5 w-64 bg-gray-700 rounded mx-auto animate-pulse"></div>
              <div className="h-4 w-48 bg-gray-700 rounded mx-auto animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}