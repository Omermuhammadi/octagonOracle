# Octagon Oracle

A martial arts training and gym finder web application.

## Google Maps API Setup

The Gym Finder feature requires a Google Maps API key with the following APIs enabled:
- Geocoding API
- Places API

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to "APIs & Services" > "Library"
4. Enable the required APIs
5. Go to "APIs & Services" > "Credentials"
6. Create an API key
7. Create a `.env.local` file in the project root with:
```
GOOGLE_MAPS_API_KEY=your_api_key_here
``` 