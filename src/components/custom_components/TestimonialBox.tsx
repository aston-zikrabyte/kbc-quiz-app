import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface TestimonialBoxProps {
  imgUrl: string;
  testimonial: string;
  name: string;
  place: string;
}

const TestimonialBox = ({
  imgUrl,
  testimonial,
  name,
  place,
}: TestimonialBoxProps) => {
  return (
    <div className="bg-background/5 border-background/4 flex flex-col gap-4 rounded-sm border-1 p-5">
      <p>⭐⭐⭐⭐⭐</p>
      <p className="text-gray-400 italic">&apos;{testimonial}&apos;</p>
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage className="object-cover" src={`/img/${imgUrl}`} />
          <AvatarFallback>avatar</AvatarFallback>
        </Avatar>
        <div>
          <p>{name}</p>
          <p className="text-sm text-gray-400">{place}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialBox;
