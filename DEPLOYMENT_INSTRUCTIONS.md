# Deployment Instructions

## Deploying to Vercel

This project is now configured for deployment to Vercel. Follow these steps:

1. Go to [Vercel](https://vercel.com/) and create an account or log in
2. Create a new project and import your GitHub repository
3. In the project settings, make sure the following configurations are set:
   - Framework Preset: Other
   - Root Directory: Leave empty (root of repository)
   - Build Command: `npm install`
   - Output Directory: Leave empty
4. Add the required environment variables:
   - `MONGODB_URI`: Your MongoDB connection string
   - `AI_SERVER_URL`: URL of your deployed AI server (Python Flask server)
   - `OPENWEATHER_API_KEY`: Your OpenWeatherMap API key (optional)
5. Deploy!

## Environment Variables Required

- `MONGODB_URI`: MongoDB Atlas connection string
- `AI_SERVER_URL`: URL of your deployed Python AI server
- `OPENWEATHER_API_KEY`: OpenWeatherMap API key (optional but recommended)

## Notes

- This is a Node.js Express application, not a Next.js application
- The Vercel configuration is handled by the `vercel.json` file
- The server is configured to work with Vercel's serverless environment