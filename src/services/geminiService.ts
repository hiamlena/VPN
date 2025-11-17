import { GoogleGenerativeAI } from '@google/generative-ai';
import { DEFAULT_PROMPT } from '@modules/ai/prompts';
import type { GenerationRequest, GenerationResult } from '@types/requests';
import { raise } from '@utils/errors';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const MODEL_NAME = import.meta.env.VITE_GEMINI_MODEL ?? 'gemini-2.0-flash';

export class GeminiService {
  private client: GoogleGenerativeAI;

  constructor() {
    if (!API_KEY) {
      raise('Отсутствует ключ Gemini API (VITE_GEMINI_API_KEY)');
    }
    this.client = new GoogleGenerativeAI(API_KEY);
  }

  async generateVpnPlan(request: GenerationRequest): Promise<GenerationResult> {
    const prompt = request.prompt || DEFAULT_PROMPT;
    const model = this.client.getGenerativeModel({ model: MODEL_NAME });

    const response = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: `${prompt}\nКомпания: ${request.company ?? 'не указано'}` }] }],
    });

    const responseText = response.response.text();

    if (!responseText) {
      raise('Пустой ответ от Gemini API');
    }

    return {
      responseText,
      model: MODEL_NAME,
    };
  }
}
