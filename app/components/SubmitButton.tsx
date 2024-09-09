"use client";

import { Button } from "@/components/ui/button";
import { buttonProps } from "@/types";
import { Loader2, ShoppingBag, Trash2 } from "lucide-react";
import { useFormStatus } from "react-dom";

export function SubmitButton({ text, variant }: buttonProps) {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button disabled variant={variant}>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please Wait
        </Button>
      ) : (
        <Button type="submit" variant={variant}>
          {text}
        </Button>
      )}
    </>
  );
}

export function ShoppingCartButton() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button disabled size="lg" className="w-full mt-5">
          <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Please Wait
        </Button>
      ) : (
        <Button type="submit" size="lg" className="w-full mt-5">
          <ShoppingBag className="mr-2 h-5 w-5" /> Add to Cart
        </Button>
      )}
    </>
  );
}

export function DeleteButton() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button disabled size="icon" variant="secondary">
          <Loader2 className="h-5 w-5 animate-spin" />
        </Button>
      ) : (
        <Button type="submit" size="icon" variant="secondary">
          <Trash2 size={20} />
        </Button>
      )}
    </>
  );
}

export function CheckoutButton() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button disabled size="lg" className="w-full mt-5">
          <Loader2 className="h-5 w-5 mr-2 animate-spin" />
          Please Wait
        </Button>
      ) : (
        <Button type="submit" size="lg" className="w-full mt-5">
          Checkout
        </Button>
      )}
    </>
  );
}