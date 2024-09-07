import { ProductCard } from "@/app/components/storefront/ProductCard";
import prisma from "@/app/lib/db";
import { notFound } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";

async function getData(productCategory: string) {
  switch (productCategory) {
    case "all": {
      const data = await prisma.product.findMany({
        select: {
          id: true,
          name: true,
          description: true,
          price: true,
          images: true,
        },
        where: {
          status: "published",
        },
      });
      return {
        title: "All Products",
        data: data,
      };
    }
    case "men": {
      const data = await prisma.product.findMany({
        select: {
          id: true,
          name: true,
          description: true,
          price: true,
          images: true,
        },
        where: {
          status: "published",
          category: "men",
        },
      });
      return {
        title: "Men's Products",
        data: data,
      };
    }
    case "women": {
      const data = await prisma.product.findMany({
        select: {
          id: true,
          name: true,
          description: true,
          price: true,
          images: true,
        },
        where: {
          status: "published",
          category: "women",
        },
      });
      return {
        title: "Women's Products",
        data: data,
      };
    }
    case "kids": {
      const data = await prisma.product.findMany({
        select: {
          id: true,
          name: true,
          description: true,
          price: true,
          images: true,
        },
        where: {
          status: "published",
          category: "kids",
        },
      });
      return {
        title: "Kids Products",
        data: data,
      };
    }
    default: {
      return notFound();
    }
  }
}

export default async function CategoriesPage({
  params,
}: {
  params: { name: string };
}) {
  noStore();
  const { data, title } = await getData(params.name);

  return (
    <section className="min-h-[80vh]">
      <h1 className="font-semibold text-3xl my-5">{title}</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {data.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
