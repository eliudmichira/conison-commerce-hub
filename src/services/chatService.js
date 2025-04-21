import axios from 'axios';

// Updated API endpoint with the correct model name
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
// TODO: REMOVE THIS HARDCODED API KEY AFTER DEBUGGING - NOT SECURE FOR PRODUCTION
const API_KEY = process.env.REACT_APP_GEMINI_API_KEY || 'AIzaSyCsaYdKbd7Yj-d7wui6oXEVcydQJg4MJZM';

console.log('Environment check:', {
  hasApiKey: !!API_KEY,
  apiKeyLength: API_KEY ? API_KEY.length : 0,
  envApiKey: process.env.REACT_APP_GEMINI_API_KEY || 'not set'
});

if (!process.env.REACT_APP_GEMINI_API_KEY) {
  console.warn('Environment variable is not set; using fallback API key');
}

export const sendMessage = async (message) => {
  try {
    console.log('Sending message to Gemini:', message);

    if (!API_KEY) {
      throw new Error('API key is missing');
    }

    // Detailed System Instructions for Conison Technologies
    const systemInstruction = `
You are a helpful AI assistant representing Conison Technologies.
Your goal is to provide information about our services, answer general inquiries, and guide users towards requesting a quote or contacting us.
Keep responses professional, concise, and friendly.

Key Information about Conison Technologies:
- Core Business: We are a digital solutions provider specializing in web development, mobile apps, AI/Machine Learning, branding, and business consulting.
- Main Services: 
  - Web Development (Custom sites, E-commerce, CMS)
  - Mobile App Development (iOS, Android, Cross-platform)
  - AI & Machine Learning (Integration, Custom Models, Data Analytics, Automation)
  - Branding & Design (Logo design, Brand strategy, UI/UX Design)
  - Business Consulting (Digital strategy, Process optimization)
- Value Proposition: We help businesses succeed online with innovative, high-quality, tailored digital solutions.
- Call to Action: For specific project details or pricing, please encourage users to fill out the quote request form on our website or visit the contact page.
- Tone: Be professional, helpful, and approachable.

Answer the following user query based on this information:
User: ${message}
Assistant:
`;

    // Updated request format with structured context
    const payload = {
      contents: [
        {
          // Using a single turn with context prepended to the user message
          parts: [
            {
              text: systemInstruction 
            }
          ]
        }
      ],
      generation_config: {
        temperature: 0.7,
        max_output_tokens: 250, // Adjusted token limit for potentially longer context
        top_p: 0.95,
        top_k: 40
      }
    };

    console.log('Request payload:', JSON.stringify(payload, null, 2)); // Log the full payload

    const response = await axios({
      method: 'post',
      url: `${API_URL}?key=${API_KEY}`,
      data: payload,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log('API Response structure:', Object.keys(response.data));
    
    if (response.data && response.data.candidates && response.data.candidates.length > 0 && 
        response.data.candidates[0].content && response.data.candidates[0].content.parts && 
        response.data.candidates[0].content.parts.length > 0) {
      let assistantResponse = response.data.candidates[0].content.parts[0].text;
      // Clean up potential lingering instruction artifacts if necessary
      assistantResponse = assistantResponse.replace(/^Assistant:\s*/, '').trim();
      console.log('Cleaned Response:', assistantResponse);
      return assistantResponse;
    } else {
      console.error('Unexpected response structure:', response.data);
      return "I couldn't process that request. Please try again.";
    }
  } catch (error) {
    console.error('Detailed error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    throw error;
  }
}; 