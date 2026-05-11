"use client";

import { useState, useMemo } from "react";
import { Search, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import DestinationCard from "@/components/common/DestinationCard";
import Reveal from "@/components/common/Reveal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CATEGORIES } from "@/constants/categories";
import { DESTINATIONS } from "@/constants/destinations";

export default function Destinations() {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = useMemo(
    () =>
      CATEGORIES.map((c) => ({
        ...c,
        label: t(c.i18nKey) || c.fallback,
      })),
    [t],
  );

  // filterlangan destinatsiyalar
  const filteredDestinations = useMemo(
    () =>
      DESTINATIONS.filter((d) => {
        const matchesSearch =
          d.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          d.description.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCategory =
          selectedCategory === "all" || d.category === selectedCategory;

        return matchesSearch && matchesCategory;
      }),
    [searchTerm, selectedCategory],
  );

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <section
        className="relative min-h-[55vh] flex items-center justify-center bg-center bg-cover"
        style={{ backgroundImage: "url('/images/destinations-hero.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/55 to-black/80" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 text-center text-white">
          <Reveal direction="down" distance={16}>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-from mb-4">
              {t("destinations")}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="text-4xl md:text-6xl font-bold leading-[1.1] tracking-tight">
              {t("destinationsTitle")}
            </h1>
          </Reveal>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-20 z-20 bg-cream/85 backdrop-blur-md border-b border-ink/5 mt-6 md:mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            <div className="relative w-full lg:max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand" />
              <Input
                type="text"
                placeholder={t("searchPlaceholder") || "Search destinations..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12 rounded-full border-ink/10 bg-white focus-visible:ring-2 focus-visible:ring-brand/30 shadow-sm"
              />
            </div>

            <div className="flex-1 overflow-x-auto -mx-1">
              <div className="flex gap-2 px-1 lg:justify-end">
                {categories.map((cat) => {
                  const isActive = selectedCategory === cat.key;
                  return (
                    <Button
                      key={cat.key}
                      onClick={() => setSelectedCategory(cat.key)}
                      className={`shrink-0 capitalize px-5 h-10 rounded-full transition-all duration-200 ${
                        isActive
                          ? "bg-brand-gradient text-white shadow-brand"
                          : "bg-white border border-ink/10 text-ink-soft hover:border-brand/40 hover:text-brand"
                      }`}
                      variant="ghost"
                    >
                      {cat.label}
                    </Button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredDestinations.length > 0 ? (
            <>
              <p className="text-sm text-ink-soft mb-6">
                {filteredDestinations.length} {t("destinations")}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {filteredDestinations.map((destination, i) => (
                  <Reveal key={destination.key} delay={(i % 6) * 0.05}>
                    <DestinationCard
                      slug={destination.key}
                      title={destination.title}
                      description={destination.description}
                      image={destination.mainImage}
                      priority={i < 3}
                    />
                  </Reveal>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <MapPin className="w-16 h-16 text-ink/20 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-ink mb-2">
                {t("noResultsTitle") || "No destinations found"}
              </h3>
              <p className="text-ink-soft">
                {t("noResultsSubtitle") ||
                  "Try searching for a different destination"}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20 md:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-brand-gradient p-10 md:p-16 text-center text-white">
            <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-black/10 blur-3xl" />
            <h2 className="relative z-10 text-3xl md:text-4xl font-bold mb-4">
              {t("ctaTitle") || "Can't find your dream destination?"}
            </h2>
            <p className="relative z-10 text-base md:text-lg text-orange-50 mb-8 max-w-2xl mx-auto">
              {t("ctaSubtitle") ||
                "We'll create a custom itinerary just for you."}
            </p>
            <a
              href="/contact"
              className="relative z-10 inline-flex items-center gap-2 bg-white text-brand px-8 py-3.5 rounded-xl font-semibold hover:scale-[1.03] transition-transform"
            >
              <span>{t("contactUs") || "Contact Us"}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
