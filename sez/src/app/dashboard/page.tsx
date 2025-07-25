import { redirect } from "next/navigation"
import { getServerSession } from "@/lib/getServerSession"
import { getUserStories, Story } from "@/lib/sanity"
import StoryCard from "@/components/StoryCard"

export default async function DashboardPage() {
  const user = await getServerSession()

  if (!user) redirect("/auth/signin")

  const stories = await getUserStories(user.email)

  return (
    <main className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">📚 Your Stories</h1>

      {stories.length === 0 ? (
        <p className="text-gray-500">
          You haven’t added any stories yet. Start contributing!
        </p>
      ) : (
        <div className="space-y-4">
          {stories.map((story: Story) => (
            <StoryCard key={story._id} story={story} showActions />
          ))}
        </div>
      )}
    </main>
  )
}
