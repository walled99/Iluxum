import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  try {
    const shopifySignature = req.headers.get('x-shopify-hmac-sha256');
    const secret = process.env.SHOPIFY_API_SECRET;

    if (!shopifySignature || !secret) {
      console.error('Webhook signature or secret missing');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Shopify webhooks send raw body, we need to read it as text for HMAC verification
    const rawBody = await req.text();
    const hash = crypto
      .createHmac('sha256', secret)
      .update(rawBody, 'utf8')
      .digest('base64');

    const hmacBuffer = Buffer.from(hash);
    const signatureBuffer = Buffer.from(shopifySignature);

    // Use timingSafeEqual to prevent timing attacks, ensuring same length
    if (
      hmacBuffer.length !== signatureBuffer.length ||
      !crypto.timingSafeEqual(hmacBuffer, signatureBuffer)
    ) {
      console.error('Invalid webhook signature');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    // Trigger Next.js revalidation
    // In Next.js 16, revalidateTag requires a second argument (e.g., 'now' or 'max')
    revalidateTag('products', 'now');
    console.log('Revalidated products tag successfully.');

    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
