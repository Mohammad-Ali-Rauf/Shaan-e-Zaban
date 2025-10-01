import { NextRequest, NextResponse } from 'next/server';
import { createStory, getAllStories, Story } from '@/lib';

/**
 * GET /api/stories
 * Retrieves all stories with optional filtering
 * Replaces: /api/stories/getAll
 */
export async function GET(request: NextRequest) {
  try {
    // Extract query parameters for potential filtering
    const { searchParams } = new URL(request.url);
    const level = searchParams.get('level'); // Optional level filter
    
    console.log('📚 Fetching stories', level ? `for level: ${level}` : '');
    
    // Fetch stories from Sanity
    const stories = await getAllStories();
    
    // Optional: Filter by level if provided
    const filteredStories = level 
      ? stories.filter((story: Story) => story.level === level)
      : stories;
    
    console.log(`✅ Successfully fetched ${filteredStories.length} stories`);
    
    return NextResponse.json(filteredStories);
    
  } catch (error) {
    console.error('❌ Error fetching stories:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch stories',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/stories
 * Creates a new story
 * Replaces: /api/stories/create
 */
export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json();
    
    console.log('📝 Creating new story:', { 
      title: body.title,
      level: body.level 
    });
    
    // Validate required fields
    if (!body.title || !body.content || !body.level) {
      return NextResponse.json(
        { error: 'Missing required fields: title, content, level' },
        { status: 400 }
      );
    }
    
    // Create story in Sanity
    const story = await createStory(body);
    
    console.log('✅ Story created successfully:', { id: story._id });
    
    return NextResponse.json(story, { status: 201 });
    
  } catch (error) {
    console.error('❌ Error creating story:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to create story',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}