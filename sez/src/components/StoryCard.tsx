'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function StoryCard({ story, showActions = false }: any) {
  const router = useRouter()

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this story?')) return

    const res = await fetch(`/api/stories/delete`, {
      method: 'POST',
      body: JSON.stringify({ id: story._id }),
    })

    if (res.ok) router.refresh()
    else alert('Failed to delete')
  }

  return (
    <div className="border p-4 rounded shadow-sm flex justify-between items-center">
      <div>
        <h2 className="text-xl font-semibold">{story.title}</h2>
        <p className="text-sm text-gray-500 capitalize">{story.level}</p>
      </div>

      {showActions && (
        <div className="flex gap-3">
          <Link href={`/dashboard/edit/${story._id}`} className="text-blue-600 hover:underline">
            Edit
          </Link>
          <button onClick={handleDelete} className="text-red-600 hover:underline">
            Delete
          </button>
        </div>
      )}
    </div>
  )
}
