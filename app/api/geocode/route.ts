import { NextRequest, NextResponse } from 'next/server';

// API endpoint to proxy Nominatim geocoding requests
export async function GET(request: NextRequest) {
  try {
    // Get search query from URL params
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q');
    
    // Validate input
    if (!query) {
      return NextResponse.json(
        { error: 'Query parameter is required' }, 
        { status: 400 }
      );
    }
    
    console.log(`Geocoding request for: ${query}`);
    
    // Encode the query and format the URL
    const encodedQuery = encodeURIComponent(query);
    const url = `https://nominatim.openstreetmap.org/search?q=${encodedQuery}&format=json&addressdetails=1&limit=5`;
    
    try {
      // Make the request to Nominatim
      const response = await fetch(url, {
        headers: {
          'Accept-Language': 'en',
          'User-Agent': 'OctagonOracle Gym Finder (Application)'
        },
        cache: 'no-store'
      });
      
      if (!response.ok) {
        console.error(`Nominatim API error: ${response.status} ${response.statusText}`);
        return NextResponse.json(
          { error: `Nominatim API error: ${response.status} ${response.statusText}` }, 
          { status: response.status }
        );
      }
      
      // Get the data
      const data = await response.json();
      console.log(`Geocoding results: ${data.length} items found`);
      
      // Return the results
      return NextResponse.json(data);
    } catch (fetchError) {
      console.error('Fetch error:', fetchError);
      return NextResponse.json(
        { error: 'Failed to connect to geocoding service' }, 
        { status: 503 }
      );
    }
  } catch (error) {
    console.error('Geocoding API error:', error);
    return NextResponse.json(
      { error: 'Internal server error processing geocoding request' }, 
      { status: 500 }
    );
  }
}

// API endpoint for reverse geocoding
export async function POST(request: NextRequest) {
  try {
    // Get coordinates from request body
    const body = await request.json().catch(() => ({}));
    const { lat, lon } = body;
    
    // Validate input
    if (!lat || !lon) {
      return NextResponse.json(
        { error: 'Latitude and longitude are required' }, 
        { status: 400 }
      );
    }
    
    console.log(`Reverse geocoding request for: ${lat}, ${lon}`);
    
    // Format the URL for reverse geocoding
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&addressdetails=1`;
    
    try {
      // Make the request to Nominatim
      const response = await fetch(url, {
        headers: {
          'Accept-Language': 'en',
          'User-Agent': 'OctagonOracle Gym Finder (Application)'
        },
        cache: 'no-store'
      });
      
      if (!response.ok) {
        console.error(`Nominatim API error: ${response.status} ${response.statusText}`);
        return NextResponse.json(
          { error: `Nominatim API error: ${response.status} ${response.statusText}` }, 
          { status: response.status }
        );
      }
      
      // Get the data
      const data = await response.json();
      console.log(`Reverse geocoding successful`);
      
      // Return the results
      return NextResponse.json(data);
    } catch (fetchError) {
      console.error('Fetch error:', fetchError);
      return NextResponse.json(
        { error: 'Failed to connect to geocoding service' }, 
        { status: 503 }
      );
    }
  } catch (error) {
    console.error('Reverse geocoding API error:', error);
    return NextResponse.json(
      { error: 'Internal server error processing reverse geocoding request' }, 
      { status: 500 }
    );
  }
} 