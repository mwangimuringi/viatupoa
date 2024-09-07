"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { parseWithZod } from "@conform-to/zod";
import prisma from "./lib/db";
// import { redis } from "./lib/redis";
// import { Cart } from "./lib/interfaces";
import { revalidatePath } from "next/cache";
import { productSchema } from "./lib/zodSchema";
// import { stripe } from "./lib/stripe";
// import Stripe from "stripe";

/* ------ Product Actions ------ */
export async function createProduct(prevState: unknown, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user.email !== "mwangimuringi13@gmail.com") {
    return redirect("/");
  }

  const submission = parseWithZod(formData, {
    schema: productSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const flattenUrls = submission.value.images.flatMap((urlString) =>
    urlString.split(",").map((url) => url.trim())
  );

  await prisma.product.create({
    data: {
      name: submission.value.name,
      description: submission.value.description,
      status: submission.value.status,
      price: submission.value.price,
      category: submission.value.category,
      isFeatured: submission.value.isFeatured === true ? true : false,
      images: flattenUrls,
    },
  });

  redirect("/dashboard/products");
}

export async function editProduct(prevState: any, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user.email !== "heshmati74@gmail.com") {
    return redirect("/");
  }

  const submission = parseWithZod(formData, {
    schema: productSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const productId = formData.get("productId") as string;

  const flattenUrls = submission.value.images.flatMap((urlString) =>
    urlString.split(",").map((url) => url.trim())
  );

  await prisma.product.update({
    where: {
      id: productId,
    },
    data: {
      name: submission.value.name,
      description: submission.value.description,
      status: submission.value.status,
      price: submission.value.price,
      category: submission.value.category,
      isFeatured: submission.value.isFeatured === true ? true : false,
      images: flattenUrls,
    },
  });

  redirect("/dashboard/products");
}

export async function deleteProduct(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user.email !== "heshmati74@gmail.com") {
    return redirect("/");
  }

  await prisma.product.delete({
    where: {
      id: formData.get("productId") as string,
    },
  });

  redirect("/dashboard/products");
}

/* ------ Banner Actions ------ */
// export async function createBanner(prevState: any, formData: FormData) {
//   const { getUser } = getKindeServerSession();
//   const user = await getUser();

//   if (!user || user.email !== "heshmati74@gmail.com") {
//     return redirect("/");
//   }

//   const submission = parseWithZod(formData, {
//     schema: bannerSchema,
//   });

//   if (submission.status !== "success") {
//     return submission.reply();
//   }

//   await prisma.banner.create({
//     data: {
//       title: submission.value.title,
//       image: submission.value.image,
//     },
//   });

//   redirect("/dashboard/banner");
// }

// export async function deleteBanner(formData: FormData) {
//   const { getUser } = getKindeServerSession();
//   const user = await getUser();

//   if (!user || user.email !== "heshmati74@gmail.com") {
//     return redirect("/");
//   }

//   await prisma.banner.delete({
//     where: {
//       id: formData.get("bannerId") as string,
//     },
//   });

//   redirect("/dashboard/banner");
// }

/* ------ Shopping Cart Actions ------ */
// export async function addItem(productId: string) {
//   const { getUser } = getKindeServerSession();
//   const user = await getUser();

//   if (!user) {
//     return redirect("/");
//   }

//   let cart: Cart | null = await redis.get(`cart-${user.id}`);

//   const selectedProduct = await prisma.product.findUnique({
//     select: {
//       id: true,
//       name: true,
//       price: true,
//       images: true,
//     },
//     where: {
//       id: productId,
//     },
//   });

//   if (!selectedProduct) {
//     throw new Error("No product with this id");
//   }

//   let myCart = {} as Cart;

//   if (!cart || !cart.items) {
//     myCart = {
//       userId: user.id,
//       items: [
//         {
//           id: selectedProduct.id,
//           name: selectedProduct.name,
//           price: selectedProduct.price,
//           image: selectedProduct.images[0],
//           quantity: 1,
//         },
//       ],
//     };
//   } else {
//     let itemFound = false;

//     myCart.items = cart.items.map((item) => {
//       if (item.id === productId) {
//         itemFound = true;
//         item.quantity += 1;
//       }

//       return item;
//     });

//     if (!itemFound) {
//       myCart.items.push({
//         id: selectedProduct.id,
//         name: selectedProduct.name,
//         price: selectedProduct.price,
//         image: selectedProduct.images[0],
//         quantity: 1,
//       });
//     }
//   }

//   await redis.set(`cart-${user.id}`, myCart);

//   revalidatePath("/", "layout");
// }

// export async function deleteItem(formData: FormData) {
//   const { getUser } = getKindeServerSession();
//   const user = await getUser();

//   if (!user) {
//     return redirect("/");
//   }

//   const productId = formData.get("productId");

//   let cart: Cart | null = await redis.get(`cart-${user.id}`);

//   if (cart && cart.items) {
//     const updateCart: Cart = {
//       userId: user.id,
//       items: cart.items.filter((item) => item.id !== productId),
//     };

//     await redis.set(`cart-${user.id}`, updateCart);
//   }

//   revalidatePath("/cart");
// }

/* ------ Payment Actions ------ */
// export async function checkOut() {
//   const { getUser } = getKindeServerSession();
//   const user = await getUser();

//   if (!user) {
//     return redirect("/");
//   }

//   let cart: Cart | null = await redis.get(`cart-${user.id}`);

//   if (cart && cart.items) {
//     const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] =
//       cart.items.map((item) => ({
//         price_data: {
//           currency: "usd",
//           unit_amount: item.price * 100,
//           product_data: {
//             name: item.name,
//             images: [item.image],
//           },
//         },
//         quantity: item.quantity,
//       }));

//     const session = await stripe.checkout.sessions.create({
//       mode: "payment",
//       line_items: lineItems,
//       success_url:
//         process.env.NODE_ENV === "development"
//           ? "http://localhost:3000/payment/success"
//           : "https://myshoe.vercel.app/payment/success",
//       cancel_url:
//         process.env.NODE_ENV === "development"
//           ? "http://localhost:3000/payment/cancel"
//           : "https://myshoe.vercel.app/payment/cancel",
//       metadata: {
//         userId: user.id,
//       },
//     });

//     return redirect(session.url as string);
//   }
// }