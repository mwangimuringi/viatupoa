

export const paypal = new PayPal(process.env.PayPal_API_KEY as string, {
  apiVersion: "2024-06-20",
  typescript: true,
});