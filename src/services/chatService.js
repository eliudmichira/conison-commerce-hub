import axios from 'axios';

const API_URL = process.env.REACT_APP_CHAT_API_URL || 'https://api.openai.com/v1/chat/completions';
const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

if (!API_KEY) {
  console.error('OpenAI API key is missing. Please check your .env.local file.');
}

export const sendMessage = async (message) => {
  try {
    console.log('Environment check:', {
      hasApiKey: !!API_KEY,
      apiKeyLength: API_KEY ? API_KEY.length : 0,
      apiUrl: API_URL
    });

    if (!API_KEY) {
      throw new Error('API key is missing');
    }

    const response = await axios.post(API_URL, {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful AI assistant for Conison Technologies. You help users with information about services, pricing, and general inquiries. Keep responses professional and concise."
        },
        {
          role: "user",
          content: message
        }
      ],
      temperature: 0.7,
      max_tokens: 150
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      }
    });

    console.log('API Response:', response.data);
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Detailed error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      headers: error.response?.headers
    });
    throw error;
  }
}; 