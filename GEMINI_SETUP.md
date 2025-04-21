# Google Gemini AI Setup

This project uses Google's Gemini AI for the chat assistant functionality. Follow these steps to set up Gemini in your local environment.

## Getting a Google Gemini API Key

1. Visit the [Google AI Studio](https://makersuite.google.com/app/apikey) and sign in with your Google account
2. Click on "Get API key" in the left menu
3. Click on "Create API key"
4. Copy the generated API key

## Setting Up Your Environment

1. Create a `.env.local` file in the root directory of your project (if it doesn't exist)
2. Add the following line to the file:
   ```
   REACT_APP_GEMINI_API_KEY=your_gemini_api_key
   ```
3. Replace `your_gemini_api_key` with the API key you copied from Google AI Studio
4. Save the file and restart your development server

## Troubleshooting

If you encounter any issues:

1. Make sure your API key is correct and active
2. Check the browser console for specific error messages
3. Ensure you've restarted your development server after making changes to the `.env.local` file
4. Verify that you have proper internet connectivity to access Google's API

## Usage Limits

Google Gemini API has usage limits, especially for free tier accounts. If you encounter "Rate limit exceeded" errors, you may need to wait before making more requests or upgrade your API plan.

## Security Note

Never commit your `.env.local` file to version control or share your API key publicly. 