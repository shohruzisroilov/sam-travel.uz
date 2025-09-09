"use client"

import { useState } from 'react';
import { Star, MapPin, Wifi, Car, Coffee, Utensils } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface HotelCardProps {
  name: string;
  location: string;
  image: string;
  rating: number;
  price: string;
  amenities: string[];
}

export default function HotelCard({ name, location, image, rating, price, amenities }: HotelCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { t } = useLanguage();

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'wifi':
        return <Wifi className="w-4 h-4" />;
      case 'parking':
        return <Car className="w-4 h-4" />;
      case 'breakfast':
        return <Coffee className="w-4 h-4" />;
      case 'restaurant':
        return <Utensils className="w-4 h-4" />;
      default:
        return <Star className="w-4 h-4" />;
    }
  };

  return (
    <div
      className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden h-48">
        <img
          src={image}
          alt={name}
          className={`w-full h-full object-cover transition-transform duration-300 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <span className="text-sm font-medium">{rating}</span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">{name}</h3>
        <div className="flex items-center space-x-1 text-orange-500 mb-4">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{location}</span>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {amenities.map((amenity, index) => (
            <div key={index} className="flex items-center space-x-1 bg-gray-100 px-2 py-1 rounded-full text-xs text-gray-600">
              {getAmenityIcon(amenity)}
              <span>{amenity}</span>
            </div>
          ))}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-orange-500">
            {price} <span className="text-sm font-normal text-gray-500">/{t('perNight')}</span>
          </div>
          <button className="bg-gradient-to-r from-orange-400 to-orange-500 text-white px-6 py-2 rounded-lg font-medium hover:from-orange-500 hover:to-orange-600 transition-all duration-200 transform hover:scale-105">
            {t('bookNow')}
          </button>
        </div>
      </div>
    </div>
  );
}