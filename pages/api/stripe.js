
import Stripe from "stripe";
const stripe = new Stripe("sk_test_51McN7VEQc6TYnPrSLlam18XwKnXtCFnMG12UUK0QKFgxtVa4foX4CQa6CT4Wmcqum2zq9N40fIL35ucdiW9xY3Gk00mz9XDp53");

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const params = {
        submit_type: 'pay',
        mode: 'payment',
        payment_method_types: ['card'],
        billing_address_collection: 'auto',
        shipping_options: [
          { shipping_rate: 'shr_1OM6CsEQc6TYnPrSKUfZ3QuM' }
        ],
        line_items: req.body.cartItems.map((item) => {
          return {
            price_data: {
              currency: 'eur',
              product_data: {
                name: item.name,
              },
              unit_amount: item.price * 100
            },
            quantity: item.quantity
          };
        }),
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/canceled`,
      };

      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params);
      res.status(200).json(session);
    } catch (err) {
      res.status(err.statusCode || 500).json({ error: { message: err.message } });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}