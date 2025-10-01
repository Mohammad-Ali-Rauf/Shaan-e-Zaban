import { NextRequest, NextResponse } from 'next/server';
import { createStory, getAllStories, Story } from '@/lib';

/**
 * GET /api/stories
 * Retrieves all stories with optional filtering
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url, process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000');
    const level = searchParams.get('level'); // Optional level filter
    
    console.log('📚 Fetching stories', level ? `for level: ${level}` : '');
    
    const stories = await getAllStories();

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
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    console.log('📝 Creating new story:', { 
      title: body.title,
      level: body.level 
    });

    // Validate required fields according to schema
    if (!body.title || !body.level || !body.sentences) {
      return NextResponse.json(
        { error: 'Missing required fields: title, level, sentences' },
        { status: 400 }
      );
    }

    if (!Array.isArray(body.sentences) || body.sentences.length === 0) {
      return NextResponse.json(
        { error: 'Sentences must be a non-empty array' },
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