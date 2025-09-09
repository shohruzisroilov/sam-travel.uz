"use client"

import { Star, Quote } from 'lucide-react';

interface ReviewCardProps {
  name: string;
  location: string;
  rating: number;
  review: string;
  image: string;
  tour: string;
}

export default function ReviewCard({ name, location, rating, review, image, tour }: ReviewCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center mb-4">
        <img
          src={image}
          alt={name}
          className="w-12 h-12 rounded-full object-cover mr-4"
        />
        <div>
          <h4 className="font-semibold text-gray-800">{name}</h4>
          <p className="text-sm text-gray-500">{location}</p>
        </div>
        <div className="ml-auto flex items-center space-x-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
      
      <div className="relative">
        <Quote className="absolute -top-2 -left-2 w-8 h-8 text-orange-200" />
        <p className="text-gray-600 leading-relaxed mb-4 pl-6">{review}</p>
      </div>
      
      <div className="text-sm text-orange-500 font-medium">
        Tour: {tour}
      </div>
    </div>
  );
}