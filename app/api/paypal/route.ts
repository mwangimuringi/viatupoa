import prisma from "@/app/lib/db";
import { redis } from "@/app/lib/redis";
import { headers } from "next/headers";
import { unstable_noStore as noStore } from "next/cache";
import { paypal } from "@/app/lib/paypal";

export async function POST(req: Request) {
  noStore();
  const body = await req.text();

  const signature = headers().get("PayPal-Signature") as string;

  let event;

  try {
    event = paypal.webhooks.constructEvent(
      body,
      signature,
      process.env.PAYPAL_SECRET_CLIENT as string
    );
  } catch (error: unknown) {
    return new Response("Webhook Error", { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;

      await prisma.order.create({
        data: {
          amount: session.amount_total as number,
          status: session.status as string,
          userId: session.metadata?.userId,
        },
      });

      await redis.del(`cart-${session.metadata?.userId}`);
      break;
    }
    default: {
      console.log("Unhandled event");
    }
  }

  return new Response(null, { status: 200 });
}