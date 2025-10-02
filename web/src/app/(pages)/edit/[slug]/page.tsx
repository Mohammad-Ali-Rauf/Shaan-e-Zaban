import { redirect } from "next/navigation"
import { getServerSession, getStoryBySlug } from "@/lib"

interface EditPageProps {
  params: {
    slug: string
  }
}

export default async function EditPage({ params }: EditPageProps) {
  const user = await getServerSession()
  const { slug } = await params
  
  if (!user) {
    redirect("/auth/signin")
  }

  try {
    console.log("🔍 Fetching story with slug:", slug)
    
    const story = await getStoryBySlug(slug)

    if (!story) {
      console.log("❌ Story not found")
      redirect("/dashboard")
    }

    // Better ownership check with debugging
    console.log("📖 Story author data:", story.author)
    console.log("👤 Current user:", user)

    const authorEmail = story.author?.email
    const userEmail = user.email

    // Check if author data exists and matches
    if (!authorEmail || authorEmail !== userEmail) {
      console.log("❌ Ownership failed - Author email:", authorEmail, "User email:", userEmail)
      redirect("/dashboard")
    }

    console.log("✅ Ownership verified - rendering Editor")
    
    const Editor = (await import("@/components/features/stories/Editor")).default
    return <Editor mode="edit" story={story} />
    
  } catch (error) {
    console.error('❌ Error loading story:', error)
    redirect("/dashboard")
  }
}