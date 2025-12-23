/**
 * Stripe Checkout Session API Route
 *
 * POST /api/stripe/create-checkout-session
 *
 * Creates a Stripe Checkout Session for subscription payments.
 */

import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) {
    throw new Error('STRIPE_SECRET_KEY is not configured')
  }
  return new Stripe(key)
}

interface CreateSessionRequest {
  planId: string
  planName: string
  price: number // in dollars
  customerEmail?: string
}

export async function POST(request: NextRequest) {
  try {
    const body: CreateSessionRequest = await request.json()

    if (!body.planId || !body.price) {
      return NextResponse.json(
        { error: 'planId and price are required' },
        { status: 400 }
      )
    }

    const origin = request.headers.get('origin') || 'http://localhost:3000'

    // Create checkout session with embedded UI mode
    const stripe = getStripe()
    const session = await stripe.checkout.sessions.create({
      ui_mode: 'embedded',
      customer_email: body.customerEmail,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `${body.planName} Plan`,
              description: `Audial ${body.planName} subscription`,
            },
            unit_amount: body.price * 100, // Convert to cents
            recurring: {
              interval: 'month',
            },
          },
          quantity: 1,
        },
      ],
      mode: 'subscription',
      return_url: `${origin}/onboarding/complete?session_id={CHECKOUT_SESSION_ID}`,
    })

    return NextResponse.json({
      clientSecret: session.client_secret,
      sessionId: session.id,
    })
  } catch (error) {
    console.error('[Stripe] Error creating checkout session:', error)

    return NextResponse.json(
      {
        error: 'Failed to create checkout session',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
