import { GoogleGenerativeAI } from '@google/generative-ai';
import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

const API_KEY = env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

export async function POST({ request }: { request: Request }) {
	try {
		const { prompt } = await request.json();

		if (!prompt) {
			return json({ error: 'Prompt is required' }, { status: 400 });
		}

		const result = await model.generateContent(prompt);
		const response = await result.response;
		const text = response.text();

		return json({ text });
	} catch (error) {
		console.error('Error in chat API:', error);
		return json({ error: 'Internal Server Error' }, { status: 500 });
	}
}
