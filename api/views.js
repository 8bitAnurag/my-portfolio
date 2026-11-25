/**
 * Vercel Serverless Function: /api/views
 * Stores and increments global portfolio view count in Upstash Redis.
 * Automatically picks up UPSTASH_REDIS_REST_* or KV_REST_API_* env vars from Vercel Storage.
 */
export default async function handler(req, res) {
  const redisUrl = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  const key = process.env.VIEWS_REDIS_KEY || 'portfolio:views';
  const offset = Number(process.env.VIEWS_OFFSET || 0);

  if (!redisUrl || !redisToken) {
    return res.status(200).json({ views: null, live: false });
  }

  const base = redisUrl.replace(/\/+$/, '');
  const action = req.method === 'POST' ? 'incr' : 'get';

  try {
    const response = await fetch(`${base}/${action}/${encodeURIComponent(key)}`, {
      method: action === 'incr' ? 'POST' : 'GET',
      headers: {
        Authorization: `Bearer ${redisToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Upstash returned HTTP ${response.status}`);
    }

    const data = await response.json();
    const rawCount = Number(data?.result ?? 0);
    return res.status(200).json({
      views: Math.max(0, rawCount + offset),
      live: true,
    });
  } catch (error) {
    return res.status(500).json({
      views: null,
      live: false,
      error: error?.message || 'Failed to update views',
    });
  }
}
