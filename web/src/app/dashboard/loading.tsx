export default function LoadingScreen() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-gray-600 animate-fade-in">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4" />
      <p className="text-lg font-medium">Warming up your dashboard...</p>
    </div>
  )
}