import { NextRequest, NextResponse } from 'next/server';

// Get API key from environment variables
const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY || 'YOUR_GOOGLE_API_KEY';

/**
 * Google Geocoding API Proxy
 * 
 * Proxies requests to Google's Geocoding API to avoid exposing the API key to clients
 */
export async function GET(request: NextRequest) {
  try {
    // Get address from query parameters
    const searchParams = request.nextUrl.searchParams;
    const address = searchParams.get('address');
    
    // Validate input
    if (!address) {
      return NextResponse.json(
        { error: 'Address parameter is required' }, 
        { status: 400 }
      );
    }
    
    console.log(`Google Geocoding request for: ${address}`);
    
    // Construct Google Geocoding API URL
    const encodedAddress = encodeURIComponent(address);
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${GOOGLE_MAPS_API_KEY}`;
    
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
      
      if (data.status !== 'OK') {
        console.error(`Google Geocoding API error: ${data.status} - ${data.error_message || 'Unknown error'}`);
        return NextResponse.json(
          { 
            error: `Google Geocoding API error: ${data.status}`, 
            error_message: data.error_message || 'Unknown error',
            status: data.status
          }, 
          { status: 400 }
        );
      }
      
      console.log(`Geocoding results: ${data.results.length} items found`);
      
      // Return the results
      return NextResponse.json(data);
    } catch (fetchError) {
      console.error('Fetch error:', fetchError);
      return NextResponse.json(
        { error: 'Failed to connect to Google Geocoding API' }, 
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