import { NextRequest, NextResponse } from 'next/server';
import { getStoryBySlug, updateStory, deleteStory } from '@/lib';

/**
 * GET /api/stories/[id]
 * Retrieves a specific story by ID or slug
 * Replaces: /api/stories/getById
 * 
 * Note: This handles both ID-based and slug-based lookup for backward compatibility
 */
export async function GET(request: NextRequest) {
  try {
    const {pathname} = request.nextUrl
    const id = pathname.split('/').pop();
    
    console.log('🔍 Fetching story:', { identifier: id });
    
    if (!id) {
      return NextResponse.json(
        { error: 'Story identifier is required' },
        { status: 400 }
      );
    }
    
    // For backward compatibility, we use getStoryBySlug
    // If you have a separate getStoryById function, you could add logic here to detect
    // whether the identifier is a slug or ID and call the appropriate function
    const story = await getStoryBySlug(id);
    
    if (!story) {
      console.log('❌ Story not found:', id);
      return NextResponse.json(
        { error: 'Story not found' },
        { status: 404 }
      );
    }
    
    console.log('✅ Story found:', { title: story.title });
    
    return NextResponse.json(story);
    
  } catch (error) {
    console.error('❌ Error fetching story:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch story',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/stories/[id]
 * Updates an existing story
 * Replaces: /api/stories/update
 */
export async function PUT(request: NextRequest) {
  try {
    const {pathname} = request.nextUrl
    const id = pathname.split('/').pop();
    
    console.log('✏️ Updating story:', { id });
    
    if (!id) {
      return NextResponse.json(
        { error: 'Story ID is required' },
        { status: 400 }
      );
    }
    
    // Parse request body
    const updateData = await request.json();
    
    // Validate that we have data to update
    if (!updateData || Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: 'No update data provided' },
        { status: 400 }
      );
    }
    
    console.log('📋 Update data:', Object.keys(updateData));
    
    // Update story in Sanity
    const updatedStory = await updateStory(id, updateData);
    
    if (!updatedStory) {
      console.log('❌ Story not found for update:', id);
      return NextResponse.json(
        { error: 'Story not found' },
        { status: 404 }
      );
    }
    
    console.log('✅ Story updated successfully:', { id });
    
    return NextResponse.json(updatedStory);
    
  } catch (error) {
    console.error('❌ Error updating story:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to update story',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/stories/[id]
 * Deletes a story by ID
 * Replaces: /api/stories/delete
 * 
 * Note: Changed from query parameter to route parameter for RESTful design
 * Old: DELETE /api/stories/delete?id=123
 * New: DELETE /api/stories/123
 */
export async function DELETE(request: NextRequest) {
  try {
    const {pathname} = request.nextUrl
    const id = pathname.split('/').pop();
    
    console.log('🗑️ Deleting story:', { id });
    
    if (!id) {
      return NextResponse.json(
        { error: 'Story ID is required' },
        { status: 400 }
      );
    }
    
    // Delete story from Sanity
    await deleteStory(id);
    
    console.log('✅ Story deleted successfully:', { id });
    
    return NextResponse.json({ 
      success: true,
      message: 'Story deleted successfully',
      deletedId: id
    });
    
  } catch (error) {
    console.error('❌ Error deleting story:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to delete story',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}