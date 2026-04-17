import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { supabase } from '@/lib/supabase';
import { Resend } from 'resend';

// Initialize external clients
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-04-10',
});

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const payload = await req.text();
  const sig = req.headers.get('stripe-signature') as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      payload,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  try {
    // Process webhook events
    switch (event.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        const customerId = paymentIntent.customer as string;
        
        if (customerId) {
          const customer = await stripe.customers.retrieve(customerId) as Stripe.Customer;
          const email = customer.email;
          const name = customer.name || 'Client';

          if (email) {
            // Send default confirmation email
            await resend.emails.send({
              from: 'operations@nexcellenceacademy.com',
              to: email,
              subject: 'Payment Confirmation - Nexcellence Academy',
              html: `<p>Hi ${name},</p><p>Thank you for your payment. We have received it and will follow up with next steps.</p>`,
            });
            
            // Log for audit
            await supabase.from('contact_submissions').insert({
              name,
              email,
              source: 'stripe_payment_success',
              message: `Payment successful for amount: ${paymentIntent.amount}`
            });
          }
        }
        break;
      }
      case 'customer.subscription.created': {
        const subscription = event.data.object as Stripe.Subscription;
        console.log("Subscription created:", subscription.id);
        break;
      }
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        console.log("Subscription deleted:", subscription.id);
        break;
      }
      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        const email = invoice.customer_email;
        if (email) {
           await resend.emails.send({
            from: 'operations@nexcellenceacademy.com',
            to: email,
            subject: 'Payment Failed - Nexcellence Academy',
            html: `<p>Your recent payment failed. Please update your billing information.</p>`,
          });
        }
        break;
      }
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return NextResponse.json({ received: true }, { status: 200 });

  } catch (error: any) {
    console.error("Error processing webhook:", error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
