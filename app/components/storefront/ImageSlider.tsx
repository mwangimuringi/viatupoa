"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface iAppProps {
  images: string[];
}

export function ImageSlider({ images }: iAppProps) {
  const [mainImageIndex, setMainImageIndex] = useState(0);

  const handlePrevClick = () => {
    setMainImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setMainImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleImageClick = (index: number) => {
    setMainImageIndex(index);
  };

  return (
    <div className="grid gap-6 md:gap-3 items-start">
      <div className="relative rounded-lg">
        <Image
          src={images[mainImageIndex]}
          alt="Product Image"
          width={650}
          height={650}
          className="object-cover w-[650px] h-[650px]"
        />

        <div className="absolute inset-0 flex items-center justify-between px-2">
          <Button variant="ghost" size="icon" onClick={handlePrevClick}>
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <Button variant="ghost" size="icon" onClick={handleNextClick}>
            <ChevronRight className="w-6 h-6" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            onClick={() => handleImageClick(index)}
            className={cn(
              index === mainImageIndex
                ? "border-2 border-primary"
                : "border border-gray-200",
              "relative rounded-lg cursor-pointer"
            )}
          >
            <Image
              src={image}
              alt="Product Image"
              width={150}
              height={100}
              className="object-cover w-[150px] h-[100px] rounded-md"
            />
          </div>
        ))}
      </div>
    </div>
  );
}