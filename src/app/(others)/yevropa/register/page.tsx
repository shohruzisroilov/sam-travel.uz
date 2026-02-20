"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  MapPin,
  User,
  Phone,
  CheckCircle,
  ArrowLeft,
  Loader2,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";

interface FormData {
  full_name: string;
  phone: string;
}

const RegistrationPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    full_name: "",
    phone: "+998 ",
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^\+998 \d{2} \d{3} \d{2} \d{2}$/;
    return phoneRegex.test(phone);
  };

  const validateName = (name: string): boolean => {
    return name.trim().length >= 2;
  };

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let value = e.target.value;

    // Remove any non-digit characters except +
    const digits = value.replace(/[^\d+]/g, "");

    if (!digits.startsWith("+998")) {
      value = "+998 " + digits.replace(/^\+998/, "");
    } else {
      // Format: +998 XX XXX XX XX
      const cleaned = digits.slice(4); // Remove +998
      const match = cleaned.match(/^(\d{0,2})(\d{0,3})(\d{0,2})(\d{0,2})$/);

      if (match) {
        const parts = [match[1], match[2], match[3], match[4]].filter(Boolean);
        value = "+998 " + parts.join(" ");
      } else {
        value = "+998 " + cleaned;
      }
    }

    setFormData({ ...formData, phone: value });
  };

  const handleBlur = (field: string): void => {
    setTouched({ ...touched, [field]: true });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setError(null);

    // Validate form
    if (!validateName(formData.full_name)) {
      setError("Исм майдони камида 2 та белгидан иборат бўлиши керак");
      return;
    }

    if (!validatePhone(formData.phone)) {
      setError("Телефон рақами тўғри форматда киритилмаган");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call - replace with your actual base44 call
      // const response: RegistrationResponse = await base44.entities.TourRegistration.create({
      //   full_name: formData.full_name,
      //   phone: formData.phone,
      //   status: "new",
      // });

      // Simulated success
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setIsSubmitting(false);
      setIsSuccess(true);
    } catch {
      setIsSubmitting(false);
      setError("Хатолик юз берди. Қайтадан уриниб кўринг.");
    }
  };

  const getPhoneInputClass = (): string => {
    if (!touched.phone) return "";
    return validatePhone(formData.phone)
      ? "border-green-500 focus:border-green-500"
      : "border-red-500 focus:border-red-500";
  };

  const getNameInputClass = (): string => {
    if (!touched.full_name) return "";
    return validateName(formData.full_name)
      ? "border-green-500 focus:border-green-500"
      : "border-red-500 focus:border-red-500";
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 via-amber-50 to-white flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-lg w-full text-center animate-in fade-in zoom-in duration-500">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle
              className="w-14 h-14 text-green-500"
              aria-hidden="true"
            />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Раҳмат!
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Маълумотларингиз қабул қилинди. Менежерларимиз тез орада сиз билан
            алоқага чиқади.
          </p>
          <Link href="/yevropa" passHref>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-6 rounded-xl border-2 border-orange-300 text-orange-600 hover:bg-orange-50 focus:ring-4 focus:ring-orange-200"
            >
              <ArrowLeft className="w-5 h-5 mr-2" aria-hidden="true" />
              Бош саҳифага қайтиш
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-amber-50 to-white">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-orange-100 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/yevropa"
            className="flex items-center gap-2 text-gray-600 hover:text-orange-600 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-lg px-2 py-1"
            aria-label="Орқага қайтиш"
          >
            <ArrowLeft className="w-6 h-6" aria-hidden="true" />
            <span className="text-lg font-medium">Орқага</span>
          </Link>
          <div className="flex items-center gap-3">
            <MapPin className="w-7 h-7 text-orange-500" aria-hidden="true" />
            <span className="text-xl font-bold text-gray-800">
              Европа саёҳати
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-xl mx-auto px-4 py-8 md:py-16">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center leading-relaxed">
            Туримизга ёзилиш учун маълумотларингизни қолдиринг
          </h1>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-sm p-6 md:p-10 border border-orange-100">
          <form onSubmit={handleSubmit} className="space-y-8" noValidate>
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
                <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
                <p className="text-red-700">{error}</p>
              </div>
            )}

            {/* Name Field */}
            <div className="space-y-3">
              <Label
                htmlFor="full_name"
                className="text-xl font-semibold text-gray-700 flex items-center gap-2"
              >
                <User className="w-6 h-6 text-orange-500" aria-hidden="true" />
                Исмингиз
              </Label>
              <Input
                id="full_name"
                type="text"
                placeholder="Исломбек"
                value={formData.full_name}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setFormData({ ...formData, full_name: e.target.value })
                }
                onBlur={() => handleBlur("full_name")}
                required
                className={`text-xl py-7 px-5 rounded-xl border-2 transition-colors ${
                  getNameInputClass() || "border-gray-200"
                } focus:border-orange-400 focus:ring-orange-400 placeholder:text-gray-400`}
                aria-required="true"
                aria-invalid={
                  touched.full_name && !validateName(formData.full_name)
                }
              />
              {touched.full_name && !validateName(formData.full_name) && (
                <p className="text-sm text-red-500 mt-1">
                  Исм камида 2 та белгидан иборат бўлиши керак
                </p>
              )}
            </div>

            {/* Phone Field */}
            <div className="space-y-3">
              <Label
                htmlFor="phone"
                className="text-xl font-semibold text-gray-700 flex items-center gap-2"
              >
                <Phone className="w-6 h-6 text-orange-500" aria-hidden="true" />
                Телефон рақамингиз
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+998 90 123 45 67"
                value={formData.phone}
                onChange={handlePhoneChange}
                onBlur={() => handleBlur("phone")}
                required
                className={`text-xl py-7 px-5 rounded-xl border-2 transition-colors ${
                  getPhoneInputClass() || "border-gray-200"
                } focus:border-orange-400 focus:ring-orange-400 placeholder:text-gray-400`}
                aria-required="true"
                aria-invalid={touched.phone && !validatePhone(formData.phone)}
              />
              {touched.phone && !validatePhone(formData.phone) && (
                <p className="text-base text-red-500 mt-2 font-medium">
                  Телефон рақами тўғри форматда киритилиши керак: +998 90 123 45
                  67
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={
                isSubmitting ||
                !validateName(formData.full_name) ||
                !validatePhone(formData.phone)
              }
              className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-2xl py-8 rounded-2xl shadow-lg font-bold transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 focus:ring-4 focus:ring-orange-300"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <Loader2
                    className="w-6 h-6 mr-3 animate-spin"
                    aria-hidden="true"
                  />
                  Юборилмоқда...
                </span>
              ) : (
                "Турга ёзилиш"
              )}
            </Button>
          </form>

          {/* Help Text */}
          <div className="mt-8 p-6 bg-orange-50 rounded-2xl border-2 border-orange-200">
            <p className="text-xl text-gray-700 text-center leading-relaxed">
              Маълумотларингизни тўлдириб,{" "}
              <span className="font-bold text-orange-600 text-2xl">
                “Турга ёзилиш”
              </span>{" "}
              тугмасини босинг. Менежерларимиз тез орада алоқага чиқади.
            </p>
          </div>
        </div>

        {/* Footer spacing */}
        <div className="h-20" aria-hidden="true" />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-orange-100 py-6">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-500 text-lg">© 2026 Европа саёҳати</p>
        </div>
      </footer>
    </div>
  );
};

export default RegistrationPage;
