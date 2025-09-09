"use client"

import Link from 'next/link';
import { ArrowRight, Users, DollarSign, Shield, Star, Calendar, MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import DestinationCard from '@/components/DestinationCard';
import TourCard from '@/components/TourCard';
import HotelCard from '@/components/HotelCard';

export default function Home() {
  const { t } = useLanguage();

  const features = [
    {
      icon: Users,
      title: t('expertGuides'),
      description: t('expertGuidesDesc'),
    },
    {
      icon: DollarSign,
      title: t('bestPrices'),
      description: t('bestPricesDesc'),
    },
    {
      icon: Shield,
      title: t('safeTravel'),
      description: t('safeTravelDesc'),
    },
  ];

  const previousTours = [
    {
      title: t('samarkand') + ' Heritage Tour',
      description: 'Explore the ancient Silk Road city with expert guides',
      image: 'https://images.pexels.com/photos/16894590/pexels-photo-16894590.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop',
      duration: '3 days',
      price: '$299',
      includes: ['Guide', 'Transport', 'Meals'],
      participants: 15,
    },
    {
      title: t('bukhara') + ' Cultural Experience',
      description: 'Immerse yourself in traditional Uzbek culture',
      image: 'https://images.pexels.com/photos/3889742/pexels-photo-3889742.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop',
      duration: '2 days',
      price: '$199',
      includes: ['Guide', 'Accommodation'],
      participants: 12,
    },
  ];

  const featuredHotels = [
    {
      name: 'Grand Samarkand Hotel',
      location: 'Samarkand, Uzbekistan',
      image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop',
      rating: 4.8,
      price: '$120',
      amenities: ['WiFi', 'Parking', 'Breakfast', 'Restaurant'],
    },
    {
      name: 'Bukhara Palace',
      location: 'Bukhara, Uzbekistan',
      image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop',
      rating: 4.9,
      price: '$95',
      amenities: ['WiFi', 'Breakfast', 'Restaurant'],
    },
  ];

  const featuredDestinations = [
    {
      title: t('samarkand'),
      description: t('samarkandDesc'),
      image: 'https://images.pexels.com/photos/16894590/pexels-photo-16894590.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop',
      rating: 4.8,
    },
    {
      title: t('bukhara'),
      description: t('bukharaDesc'),
      image: 'https://images.pexels.com/photos/3889742/pexels-photo-3889742.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop',
      rating: 4.9,
    },
    {
      title: t('khiva'),
      description: t('khivaDesc'),
      image: 'https://images.pexels.com/photos/2884842/pexels-photo-2884842.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop',
      rating: 4.7,
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
        </div>
        
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            {t('heroTitle')}
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
            {t('heroSubtitle')}
          </p>
          <Link
            href="/destinations"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-400 to-orange-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-orange-500 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            <span>{t('exploreButton')}</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">{t('whyChooseUs')}</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-orange-500 mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">{t('popularDestinations')}</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-orange-500 mx-auto mb-6" />
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('destinationsSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredDestinations.map((destination, index) => (
              <DestinationCard
                key={index}
                title={destination.title}
                description={destination.description}
                image={destination.image}
                rating={destination.rating}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/destinations"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-400 to-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-orange-500 hover:to-orange-600 transition-all duration-200"
            >
              <span>{t('viewAll')} {t('destinations')}</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Previous Tours */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">{t('previousTours')}</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-orange-500 mx-auto mb-6" />
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Successful tours we've organized for our satisfied clients
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {previousTours.map((tour, index) => (
              <TourCard
                key={index}
                title={tour.title}
                description={tour.description}
                image={tour.image}
                duration={tour.duration}
                price={tour.price}
                includes={tour.includes}
                participants={tour.participants}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/tours"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-400 to-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-orange-500 hover:to-orange-600 transition-all duration-200"
            >
              <span>{t('viewAll')} {t('tours')}</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Hotels */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">{t('featuredHotels')}</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-orange-500 mx-auto mb-6" />
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Carefully selected accommodations for your comfort
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredHotels.map((hotel, index) => (
              <HotelCard
                key={index}
                name={hotel.name}
                location={hotel.location}
                image={hotel.image}
                rating={hotel.rating}
                price={hotel.price}
                amenities={hotel.amenities}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/hotels"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-400 to-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-orange-500 hover:to-orange-600 transition-all duration-200"
            >
              <span>{t('viewAll')} {t('hotels')}</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-orange-400 to-orange-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">{t('travelReports')}</h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Read detailed reports from our previous tours and adventures
          </p>
          <Link
            href="/reports"
            className="inline-flex items-center space-x-2 bg-white text-orange-500 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200"
          >
            <span>{t('readMore')}</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  );
}