export default function LoadingScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-600 rounded-full blur-3xl opacity-10"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-red-800 rounded-full blur-3xl opacity-10"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-900 rounded-full blur-3xl opacity-5"></div>
      </div>
      
      {/* Navbar Skeleton */}
      <nav className="flex justify-between items-center p-4 border-b border-gray-800 bg-gradient-to-r from-gray-900 to-black backdrop-blur-sm">
        <div className="h-8 w-48 bg-gradient-to-r from-gray-700 to-gray-600 rounded-lg animate-pulse"></div>
        <div className="flex gap-6 items-center">
          <div className="h-5 w-16 bg-gray-700 rounded animate-pulse"></div>
          <div className="h-5 w-16 bg-gray-700 rounded animate-pulse"></div>
          <div className="h-10 w-24 bg-gray-700 rounded-xl animate-pulse"></div>
        </div>
      </nav>

      {/* Main Content Loading */}
      <div className="relative z-10 px-4 py-8">
        {/* Hero Section Skeleton */}
        <div className="relative flex flex-col items-center px-4 py-16 text-center">
          <div className="h-16 w-80 bg-gradient-to-r from-gray-700 to-gray-600 rounded-lg mb-6 animate-pulse"></div>
          <div className="h-8 w-96 bg-gray-700 rounded mx-auto mb-8 animate-pulse"></div>
          
          {/* CTA Buttons Skeleton */}
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="h-12 w-40 bg-gradient-to-r from-gray-700 to-gray-600 rounded-xl animate-pulse"></div>
            <div className="h-12 w-40 bg-gray-700 rounded-xl animate-pulse"></div>
          </div>
          
          {/* Stats Skeleton */}
          <div className="flex items-center gap-6 text-gray-400 mt-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
              <div className="h-4 w-24 bg-gray-700 rounded animate-pulse"></div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
              <div className="h-4 w-24 bg-gray-700 rounded animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Stories Section Skeleton */}
        <div className="px-4 pb-20 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="h-10 w-64 bg-gradient-to-r from-gray-700 to-gray-600 rounded-lg mx-auto mb-4 animate-pulse"></div>
            <div className="h-5 w-96 bg-gray-700 rounded mx-auto animate-pulse"></div>
          </div>

          {/* Level Filters Skeleton */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="h-10 w-28 bg-gray-700 rounded-lg animate-pulse"></div>
            ))}
          </div>

          {/* Stories Grid Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div 
                key={item} 
                className="group bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 animate-pulse"
              >
                {/* Level and Icon */}
                <div className="flex justify-between items-start mb-4">
                  <div className="h-6 w-20 bg-gray-700 rounded-full"></div>
                  <div className="w-8 h-8 bg-gray-700 rounded-lg"></div>
                </div>

                {/* Title and Description */}
                <div className="space-y-3 mb-4">
                  <div className="h-6 w-40 bg-gray-700 rounded"></div>
                  <div className="h-4 w-56 bg-gray-700 rounded"></div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  <div className="h-6 w-16 bg-gray-700 rounded-md"></div>
                  <div className="h-6 w-12 bg-gray-700 rounded-md"></div>
                  <div className="h-6 w-10 bg-gray-700 rounded-md"></div>
                </div>

                {/* Progress/CTA */}
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-700/50">
                  <div className="h-4 w-24 bg-gray-700 rounded"></div>
                  <div className="h-4 w-16 bg-gray-700 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer CTA Skeleton */}
        <div className="border-t border-gray-800 bg-gradient-to-r from-gray-800/10 to-black">
          <div className="max-w-4xl mx-auto px-4 py-12 text-center">
            <div className="h-8 w-80 bg-gray-700 rounded-lg mx-auto mb-4 animate-pulse"></div>
            <div className="h-5 w-96 bg-gray-700 rounded mx-auto mb-8 animate-pulse"></div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="h-12 w-40 bg-gray-700 rounded-xl animate-pulse"></div>
              <div className="h-12 w-40 bg-gray-700 rounded-xl animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Loading Spinner Overlay */}
      <div className="fixed inset-0 bg-gray-900/90 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="text-center">
          <div className="relative mb-6">
            <div className="w-24 h-24 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-24 h-24 border-4 border-red-900 border-t-transparent rounded-full animate-spin opacity-20"></div>
          </div>
          <div className="space-y-3">
            <div className="h-6 w-72 bg-gray-700 rounded mx-auto animate-pulse"></div>
            <div className="h-4 w-56 bg-gray-700 rounded mx-auto animate-pulse"></div>
          </div>
          <div className="mt-8 flex justify-center gap-2">
            <div className="h-2 w-2 bg-red-600 rounded-full animate-bounce"></div>
            <div className="h-2 w-2 bg-red-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="h-2 w-2 bg-red-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}