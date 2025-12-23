/**
 * Stripe SetupIntent API Route
 *
 * POST /api/stripe/create-setup-intent
 *
 * Creates a SetupIntent to collect card details for future billing.
 * Used for free trial signups where card is saved but not charged.
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

interface CreateSetupIntentRequest {
  customerEmail?: string
}

export async function POST(request: NextRequest) {
  try {
    const body: CreateSetupIntentRequest = await request.json()
    const stripe = getStripe()

    // Create or retrieve customer
    let customer: Stripe.Customer | undefined

    if (body.customerEmail) {
      // Check if customer exists
      const existingCustomers = await stripe.customers.list({
        email: body.customerEmail,
        limit: 1,
      })

      if (existingCustomers.data.length > 0) {
        customer = existingCustomers.data[0]
      } else {
        // Create new customer
        customer = await stripe.customers.create({
          email: body.customerEmail,
        })
      }
    }

    // Create SetupIntent
    const setupIntent = await stripe.setupIntents.create({
      customer: customer?.id,
      payment_method_types: ['card'],
      usage: 'off_session', // Allow charging later without customer present
    })

    return NextResponse.json({
      clientSecret: setupIntent.client_secret,
      customerId: customer?.id,
    })
  } catch (error) {
    console.error('[Stripe] Error creating setup intent:', error)

    return NextResponse.json(
      {
        error: 'Failed to create setup intent',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
