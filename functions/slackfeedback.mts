import type { Context } from '@netlify/functions';

export default async (req: Request, context: Context) => {
  const url = Netlify.env.get('SLACK_WEBHOOK_URL');
  if (!url) {
    return new Response('No Slack webhook URL found', { status: 500 });
  }

  const body = await req.json();
  const res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });

  if (!res.ok) {
    return new Response('Failed to post to Slack', { status: 500 });
  }

  return new Response('Posted to Slack', { status: 200 });
};
