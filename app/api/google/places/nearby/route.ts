import { NextRequest, NextResponse } from 'next/server';

// Get API key from environment variables
const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY || 'YOUR_GOOGLE_API_KEY';

/**
 * Google Places Nearby Search API Proxy
 * 
 * Proxies requests to Google's Places Nearby Search API to avoid exposing the API key to clients
 */
export async function GET(request: NextRequest) {
  try {
    // Get parameters from query
    const searchParams = request.nextUrl.searchParams;
    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');
    const radius = searchParams.get('radius') || '5000'; // Default 5km
    const type = searchParams.get('type') || 'gym'; // Default to gym
    const keyword = searchParams.get('keyword') || '';
    
    // Validate input
    if (!lat || !lng) {
      return NextResponse.json(
        { error: 'Latitude and longitude parameters are required' }, 
        { status: 400 }
      );
    }
    
    console.log(`Google Places Nearby Search request for: ${lat},${lng} (${type})`);
    
    // Construct Google Places API URL
    let url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=${type}&key=${GOOGLE_MAPS_API_KEY}`;
    
    // Add keyword if provided
    if (keyword) {
      url += `&keyword=${encodeURIComponent(keyword)}`;
    }
    
    try {
      // Make the request to Google API
      const response = await fetch(url, {
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (!response.ok) {
        console.error(`Google API error: ${response.status} ${response.statusText}`);
        return NextResponse.json(
          { error: `Google API error: ${response.status} ${response.statusText}` }, 
          { status: response.status }
        );
      }
      
      // Parse and return the response
      const data = await response.json();
      
      if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
        console.error(`Google Places API error: ${data.status} - ${data.error_message || 'Unknown error'}`);
        return NextResponse.json(
          { 
            error: `Google Places API error: ${data.status}`, 
            error_message: data.error_message || 'Unknown error',
            status: data.status
          }, 
          { status: 400 }
        );
      }
      
      const resultsCount = data.results ? data.results.length : 0;
      console.log(`Places Nearby results: ${resultsCount} items found`);
      
      // Return the results
      return NextResponse.json(data);
    } catch (fetchError) {
      console.error('Fetch error:', fetchError);
      return NextResponse.json(
        { error: 'Failed to connect to Google Places API' }, 
        { status: 503 }
      );
    }
  } catch (error) {
    console.error('Places API error:', error);
    return NextResponse.json(
      { error: 'Internal server error processing places request' }, 
      { status: 500 }
    );
  }
} 