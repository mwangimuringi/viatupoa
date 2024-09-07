import { type $Enums } from "@prisma/client";

export interface buttonProps {
    text: string;
    variant?:
      | "default"
      | "destructive"
      | "outline"
      | "secondary"
      | "ghost"
      | "link"
      | null
      | undefined;
  }

  export interface iAppProps {
    data: {
      id: string;
      name: string;
      description: string;
      status: $Enums.ProductStatus;
      price: number;
      images: string[];
      category: $Enums.Category;
      isFeatured: boolean;
    };
  }