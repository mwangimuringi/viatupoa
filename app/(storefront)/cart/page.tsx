import { checkOut, deleteItem } from "@/app/actions";
import { CheckoutButton, DeleteButton } from "@/app/components/SubmitButton";
import { Cart } from "@/types/interfaces";
import { redis } from "@/app/lib/redis";
import { Button } from "@/components/ui/button";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";

export default async function CartRoute() {
  noStore();
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    redirect("/");
  }

  const cart: Cart | null = await redis.get(`cart-${user.id}`);

  let totalPrice = 0;
  cart?.items.forEach((item) => {
    totalPrice += item.price * item.quantity;
  });

  return (
    <div className="max-w-2xl mx-auto mt-10 min-h-[80vh]">
      {!cart || !cart.items ? (
        <div className="flex flex-col items-center justify-center min-h-[400px] rounded-lg border border-dashed p-8 text-center mt-20">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <ShoppingBag className="w-10 h-10 text-primary" />
          </div>
          <h2 className="mt-6 text-xl font-semibold">
            Shopping cart is empty!
          </h2>
          <p className="mb-8 mt-2 text-center text-sm leading-6 text-muted-foreground max-w-sm">
            You currently don not have any products in your cart. Please add
            some so that you can see them right here.
          </p>
          <Button asChild>
            <Link href="/">Shop Now</Link>
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-y-10">
          <h1 className="text-2xl font-semibold text-center">
            Your shopping cart
          </h1>
          {cart?.items.map((item) => (
            <div key={item.id} className="flex rounded-lg">
              <div className="w-16 h-16 sm:w-24 sm:h-24 relative">
                <Image
                  src={item.image}
                  alt="Product Image"
                  className="rounded-md object-cover"
                  fill
                />
              </div>

              <div className="px-2 py-1 flex justify-between w-full font-medium">
                <p>{item.name}</p>
                <div className="flex flex-col justify-between">
                  <div className="flex items-center gap-x-2">
                    <p>{item.quantity} x</p>
                    <p>${item.price}</p>
                  </div>
                  <form action={deleteItem} className="text-end">
                    <input type="hidden" name="productId" value={item.id} />
                    <DeleteButton />
                  </form>
                </div>
              </div>
            </div>
          ))}

          <div className="mt-8">
            <div className="flex items-center justify-between font-bold text-lg">
              <p>Subtotal:</p>
              <p>${new Intl.NumberFormat("en-US").format(totalPrice)}</p>
            </div>

            <form action={checkOut}>
              <CheckoutButton />
            </form>
          </div>
        </div>
      )}
    </div>
  );
}