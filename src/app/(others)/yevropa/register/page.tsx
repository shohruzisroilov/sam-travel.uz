"use client";

import React, { useState, ChangeEvent, FormEvent, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  User,
  Phone,
  CheckCircle,
  ArrowLeft,
  Loader2,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { trackEvent, trackPixel } from "@/lib/analytics";

const SERVER_ERRORS: Record<string, string> = {
  "Invalid name": "Исмингизни тўлиқ ёзинг",
  "Invalid phone": "Телефон рақамингизни тўғри форматда киринг",
  "Too many requests": "Жуда кўп уриниш. Бироздан сўнг қайта уриниб кўринг",
};

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
  const phoneInputRef = useRef<HTMLInputElement>(null);

  // Valid Uzbek mobile operator codes
  const UZ_OPERATOR_CODES = [
    "33", // Humans
    "50", // Perfectum
    "55", // UMS
    "77", // Uztelecom
    "88", // Uztelecom
    "90", "91", // Beeline
    "93", "94", // Ucell
    "95", // UMS
    "97", "98", "99", // Mobiuz / UMS
  ];

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^\+998 (\d{2}) \d{3} \d{2} \d{2}$/;
    const match = phone.match(phoneRegex);
    if (!match) return false;
    return UZ_OPERATOR_CODES.includes(match[1]);
  };

  const validateName = (name: string): boolean => {
    return name.trim().length >= 2;
  };

  const setCursorPosition = (input: HTMLInputElement, position: number) => {
    setTimeout(() => {
      input.setSelectionRange(position, position);
    }, 0);
  };

  const handlePhoneFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const input = e.target;
    const value = input.value;

    // Agar input bo'sh yoki faqat "+998 " bo'lsa
    if (value === "+998 " || value.length <= 5) {
      setFormData({ ...formData, phone: "+998 " });
      setCursorPosition(input, 5);
    } else {
      const cursorPos = value.length;
      setCursorPosition(input, cursorPos);
    }
  };

  const handlePhoneClick = (e: React.MouseEvent<HTMLInputElement>) => {
    const input = e.currentTarget;

    // Agar bosilgan joy +998 dan oldin bo'lsa, kursorni +998 dan keyinga o'tkazish
    if (input.selectionStart !== null && input.selectionStart < 5) {
      setCursorPosition(input, 5);
    }
  };

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let value = e.target.value;
    const input = e.target;
    const cursorPos = input.selectionStart || 0;

    // Keep only digits; strip prefix if present
    const allDigits = value.replace(/\D/g, "");
    const local = (allDigits.startsWith("998") ? allDigits.slice(3) : allDigits).slice(0, 9);

    // Format: +998 XX XXX XX XX
    const parts = [
      local.slice(0, 2),
      local.slice(2, 5),
      local.slice(5, 7),
      local.slice(7, 9),
    ].filter(Boolean);

    value = parts.length ? "+998 " + parts.join(" ") : "+998 ";

    setFormData({ ...formData, phone: value });

    // Kursorni to'g'ri joyga qo'yish
    setTimeout(() => {
      if (cursorPos < 5) {
        // Agar kursor +998 dan oldinda bo'lsa, +998 dan keyinga qo'yish
        input.setSelectionRange(5, 5);
      } else {
        // Aks holda, yangi value uzunligiga qarab kursor joyini saqlash
        const newLength = value.length;
        const oldLength = formData.phone.length;
        const diff = newLength - oldLength;

        if (diff > 0) {
          // Agar matn qo'shilgan bo'lsa, kursorni qo'shilgan joydan keyinga qo'yish
          input.setSelectionRange(cursorPos + diff, cursorPos + diff);
        } else {
          // Agar matn o'chirilgan bo'lsa, kursorni joriy joyda qoldirish
          input.setSelectionRange(cursorPos, cursorPos);
        }
      }
    }, 0);
  };

  const handleBlur = (field: string): void => {
    setTouched({ ...touched, [field]: true });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateName(formData.full_name)) return;
    if (!validatePhone(formData.phone)) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.full_name,
          phone: formData.phone,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success) {
        setIsSuccess(true);
        trackEvent("generate_lead", {
          event_category: "registration",
          event_label: "yevropa",
        });
        trackPixel("Lead", {
          content_name: "Yevropa Sayohati",
          status: "success",
        });
      } else {
        setError(SERVER_ERRORS[data.error] ?? "Хатолик юз берди. Қайта уриниб кўринг");
      }
    } catch {
      setError("Интернет алоқасини текширинг ва қайта уриниб кўринг");
    } finally {
      setIsSubmitting(false);
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
      <div className="min-h-screen bg-cream flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl p-8 md:p-12 max-w-lg w-full text-center animate-in fade-in zoom-in duration-500 ring-1 ring-ink/5">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" aria-hidden="true" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-ink mb-3">
            Раҳмат!
          </h2>
          <p className="text-lg text-ink-soft mb-8 leading-relaxed">
            Маълумотларингиз қабул қилинди. Менежерларимиз тез орада сиз билан алоқага чиқади.
          </p>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="text-base px-6 py-5 rounded-xl border-2 border-brand/30 text-brand hover:bg-brand-muted focus-visible:ring-4 focus-visible:ring-brand/30"
          >
            <a
              href="https://www.instagram.com/samtraveluz/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Мижозларимиз отзывлари
            </a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-ink/5 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/yevropa"
            className="group inline-flex items-center gap-2 text-ink-soft hover:text-brand transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 rounded-lg px-2 py-1"
            aria-label="Орқага қайтиш"
          >
            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
            <span className="text-base font-medium">Орқага</span>
          </Link>
          <span className="text-base sm:text-lg font-semibold text-ink">
            Европа саёҳати
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-xl mx-auto px-4 py-10 md:py-16">
        {/* Title */}
        <div className="text-center mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand mb-3">
            Рўйхатдан ўтиш
          </p>
          <h1 className="text-2xl md:text-3xl font-bold text-ink mb-3 leading-tight">
            Маълумотларингизни қолдиринг
          </h1>
          <p className="text-ink-soft">
            Менежеримиз тез орада сиз билан боғланади
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl p-6 md:p-10 ring-1 ring-ink/5">
          <form onSubmit={handleSubmit} className="space-y-8" noValidate>
            {/* Error Message */}
            {error && (
              <div role="alert" className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
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
                <User className="w-6 h-6 text-brand" aria-hidden="true" />
                Исмингиз
              </Label>
              <Input
                id="full_name"
                type="text"
                autoComplete="name"
                placeholder="Исмингиз"
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
                  Исмингизни тўлиқ ёзинг
                </p>
              )}
            </div>

            {/* Phone Field */}
            <div className="space-y-3">
              <Label
                htmlFor="phone"
                className="text-xl font-semibold text-gray-700 flex items-center gap-2"
              >
                <Phone className="w-6 h-6 text-brand" aria-hidden="true" />
                Телефон рақамингиз
              </Label>
              <Input
                ref={phoneInputRef}
                id="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="+998 90 123 45 67"
                value={formData.phone}
                onChange={handlePhoneChange}
                onFocus={handlePhoneFocus}
                onClick={handlePhoneClick}
                onBlur={() => handleBlur("phone")}
                maxLength={17}
                required
                className={`text-xl py-7 px-5 rounded-xl border-2 transition-colors ${
                  getPhoneInputClass() || "border-gray-200"
                } focus:border-orange-400 focus:ring-orange-400 placeholder:text-gray-400`}
                aria-required="true"
                aria-invalid={touched.phone && !validatePhone(formData.phone)}
              />
              {touched.phone && !validatePhone(formData.phone) && (
                <p className="text-sm text-red-500 mt-2 font-medium">
                  {(() => {
                    const match = formData.phone.match(
                      /^\+998 (\d{2}) \d{3} \d{2} \d{2}$/,
                    );
                    if (match && !UZ_OPERATOR_CODES.includes(match[1])) {
                      return "Оператор коди нотўғри. Масалан: 90, 91, 93, 94, 95, 97, 98, 99, 33, 50, 55, 77, 88.";
                    }
                    return "Телефон рақамингизни тўғри форматда киринг: +998 90 123 45 67";
                  })()}
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
              className="w-full bg-brand-gradient text-white text-2xl py-8 rounded-2xl font-bold transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 focus:ring-4 focus:ring-brand/30"
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
          {/* <div className="mt-8 p-4 bg-orange-50 rounded-2xl border-2 border-orange-200">
            <p className="text-xl text-gray-700 text-center leading-relaxed">
              Тўлдиринг ва, <br />
              <span className="font-bold text-orange-600 text-2xl">
                “Турга ёзилиш”
              </span>{" "}
              тугмасини босинг.
            </p>
          </div> */}
        </div>

        {/* Footer spacing */}
        <div className="h-20" aria-hidden="true" />
      </main>

      {/* Footer */}
    </div>
  );
};

export default RegistrationPage;
