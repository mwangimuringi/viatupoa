export type Cart = {
    userId: string;
    items: Array<{
      id: string;
      name: string;
      price: number;
      image: string;
      quantity: number;
    }>;
  };