import { streamText, convertToModelMessages, type UIMessage } from 'ai';
import { google } from '@ai-sdk/google';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: google('gemini-2.0-flash-exp'),
    messages: await convertToModelMessages(messages),
    system: 'You are a helpful assistant.',
  });

  return result.toUIMessageStreamResponse();
}