import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingProductRoute() {
  return (
    <div className="grid md:grid-cols-2 gap-6 items-start lg:gap-x-24 py-6">
      <div>
        <Skeleton className="w-full h-[650px]" />
        <div className="grid grid-cols-5 gap-4 mt-6">
          {[...Array(5)].map((_, index) => (
            <Skeleton key={index} className="w-[100px] h-[100px]" />
          ))}
        </div>
      </div>

      <div>
        <Skeleton className="w-56 h-12" />
        <Skeleton className="w-36 h-12 mt-4" />
        <Skeleton className="w-full h-60 mt-4" />
        <Skeleton className="w-full h-12 mt-5" />
      </div>
    </div>
  );
}