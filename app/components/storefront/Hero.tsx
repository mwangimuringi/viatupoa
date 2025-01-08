import prisma from "@/app/lib/db";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

    //fetching data
async function getData() {
  const data = await prisma.banner.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
}

export  async function Hero() {
  const data = await getData();

  return (
    <Carousel>
      <CarouselContent>
        {data.map((item) => (
          <CarouselItem key={item.id}>
            <div className="relative h-[60vh] lg:h-[80vh]">
              {/* <Image
                src={item.image}
                alt="Banner Image"
                className="object-cover w-full h-full rounded-xl"
                fill
              /> */}
              <div className="absolute top-6 left-6 backdrop-blur-sm text-gray-500 p-4 rounded-lg shadow-2xl transition-transform hover:scale-105">
                <h1 className="text-xl lg:text-2xl font-bold">{item.title}</h1>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="ml-16" />
      <CarouselNext className="mr-16" />
    </Carousel>
  );
}
