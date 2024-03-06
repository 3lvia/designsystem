import type { Context } from '@netlify/functions';

export default async (req: Request, context: Context) => {
  const url = Netlify.env.get('SLACK_WEBHOOK_URL');
  if (!url) {
    return new Response('No Slack webhook URL found', { status: 500 });
  }

  const request = await req.json();
  const message = request.body;

  await fetch(url, {
    method: 'POST',
    body: JSON.stringify({ text: message }),
    headers: { 'Content-Type': 'application/json' },
  });

  return new Response('OK');
};
