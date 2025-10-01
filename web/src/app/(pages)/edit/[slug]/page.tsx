import { redirect } from "next/navigation"
import { getServerSession, getStoryBySlug } from "@/lib"

interface EditPageProps {
  params: {
    slug: string
  }
}

export default async function EditPage({ params }: EditPageProps) {
  const user = await getServerSession()
  const {slug} = await params;
  
  if (!user) {
    redirect("/auth/signin")
  }

  try {
    console.log("Fetching story with Slug:", slug)
    
    // You'll need to create a getStoryById function
    const story = await getStoryBySlug(slug)

    if (!story || story.author?.email !== user.email) {
      redirect("/dashboard")
    }

    const Editor = (await import("@/components/features/stories/Editor")).default
    return <Editor mode="edit" story={story} />
  } catch (error) {
    console.error('Error loading story:', error)
  } finally {
        redirect("/dashboard")

  }
}