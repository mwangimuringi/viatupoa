import { LoadingProductCard } from "@/app/components/storefront/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingFile() {
  return (
    <div className="min-h-[80vh]">
      <Skeleton className="h-10 w-56 my-5" />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        <LoadingProductCard />
        <LoadingProductCard />
        <LoadingProductCard />
      </div>
    </div>
  );
}