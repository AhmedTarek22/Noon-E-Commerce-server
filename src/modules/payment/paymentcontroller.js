import Stripe from "stripe";
import { config as configDotenv } from "dotenv";

configDotenv();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

export const handleStripe = async (req, res) => {
  try {
    const { products, currency } = req.body;

    const amount = products.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );

    const newOrder = new Order({
      userId: req.user.id,
      products,
      amount,
      currency,
    });

    await newOrder.save();

    const paymentIntent = await stripe.paymentIntents.create({
      amount: newOrder.amount,
      currency: newOrder.currency,
    });

    res.status(200).send({
      clientSecret: paymentIntent.client_secret,
      orderId: newOrder._id,
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
