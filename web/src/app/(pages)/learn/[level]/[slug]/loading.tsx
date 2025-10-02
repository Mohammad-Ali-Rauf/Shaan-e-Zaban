export default function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="relative w-full max-w-4xl">
        {/* Background decorative elements */}
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-red-600 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-red-800 rounded-full blur-3xl opacity-20"></div>
        
        {/* Loading Content */}
        <div className="relative space-y-8">
          {/* Header Skeleton */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="h-6 w-24 bg-gray-700 rounded-full animate-pulse"></div>
            </div>
            <div className="h-12 w-96 bg-gradient-to-r from-gray-700 to-gray-600 rounded-lg mx-auto mb-6 animate-pulse"></div>
            <div className="h-1 w-32 bg-gradient-to-r from-red-600 to-red-800 mx-auto rounded-full"></div>
          </div>

          {/* Main Content Card Skeleton */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 shadow-2xl shadow-red-900/10 animate-pulse">
            {/* Urdu Text Skeleton */}
            <div className="text-center mb-8">
              <div className="h-16 bg-gray-700/50 rounded-xl mb-6"></div>
              
              {/* Audio Player Skeleton */}
              <div className="flex justify-center mb-6">
                <div className="bg-gray-900/50 rounded-2xl p-4 border border-gray-600 max-w-md w-full">
                  <div className="h-12 bg-gray-700 rounded-lg"></div>
                </div>
              </div>

              {/* English Translation Skeleton */}
              <div className="bg-gradient-to-r from-gray-700/30 to-transparent rounded-xl p-6 border-l-4 border-gray-600">
                <div className="h-6 bg-gray-700/50 rounded"></div>
              </div>
            </div>

            {/* Vocabulary Section Skeleton */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-6 w-6 bg-gray-700 rounded"></div>
                <div className="h-6 w-48 bg-gray-700 rounded"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((item) => (
                  <div 
                    key={item} 
                    className="bg-gray-900/30 border border-gray-600 rounded-xl p-4"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="h-8 w-24 bg-gray-700 rounded"></div>
                      <div className="w-6 h-6 bg-gray-700 rounded-full"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-4 w-32 bg-gray-700 rounded"></div>
                      <div className="h-3 w-40 bg-gray-700 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Skeleton */}
            <div className="pt-6 border-t border-gray-700">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
                {/* Previous Button Skeleton */}
                <div className="h-12 w-40 bg-gray-700 rounded-xl"></div>
                
                {/* Progress Indicator Skeleton */}
                <div className="flex items-center gap-4">
                  <div className="h-10 w-48 bg-gray-700 rounded-full"></div>
                  <div className="hidden sm:block w-32 bg-gray-600 rounded-full h-2">
                    <div className="h-2 bg-gray-700 rounded-full w-1/2"></div>
                  </div>
                </div>
                
                {/* Next Button Skeleton */}
                <div className="h-12 w-40 bg-gradient-to-r from-gray-700 to-gray-600 rounded-xl"></div>
              </div>
            </div>
          </div>

          {/* Back Link Skeleton */}
          <div className="text-center">
            <div className="h-5 w-32 bg-gray-700 rounded mx-auto"></div>
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