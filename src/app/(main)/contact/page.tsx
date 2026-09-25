"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/contexts/LanguageContext";
import { Clock, MapPin, Phone, Send } from "lucide-react";
import * as React from "react";
import { useMemo, useState } from "react";
import type { Value as E164Number } from "react-phone-number-input";

import { toast, Toaster } from "react-hot-toast";
import { PhoneNumberInput } from "@/components/pages/contact/PhoneNumberInput";

export default function Contact() {
  const { t } = useLanguage();

  const [formData, setFormData] = useState<{
    name: string;
    message: string;
    tel?: E164Number;
    hp: string;
  }>({
    name: "",
    message: "",
    hp: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState<{
    name: boolean;
    tel: boolean;
    message: boolean;
  }>({ name: false, tel: false, message: false });

  const NAME_RE = /^[\p{L}\p{M}\s'.-]{2,80}$/u;
  const nameValid = NAME_RE.test(formData.name.trim());
  const telValid = !!formData.tel && /^\+?[0-9]{9,15}$/.test(formData.tel);
  const messageValid = formData.message.trim().length >= 3;
  const formValid = nameValid && telValid && messageValid;

  const SERVER_ERROR_MAP: Record<string, string> = {
    "Invalid name": "errorNameInvalid",
    "Invalid phone": "errorPhoneInvalid",
    "Invalid message": "errorMessageShort",
    "Too many requests": "errorTooManyRequests",
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!formValid) {
      setTouched({ name: true, tel: true, message: true });
      toast.error(t("fillRequired"));
      return;
    }

    const toastId = toast.loading(t("sending"));
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.tel ?? "",
          message: formData.message,
          hp: formData.hp,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        const serverError = typeof data?.error === "string" ? data.error : "";
        const localeKey = SERVER_ERROR_MAP[serverError];
        const errorMessage = localeKey
          ? t(localeKey as Parameters<typeof t>[0])
          : t("messageError");
        toast.error(errorMessage, { id: toastId });
        return;
      }

      toast.success(t("messageSent"), { id: toastId });
      setFormData({ name: "", message: "", tel: undefined, hp: "" });
      setTouched({ name: false, tel: false, message: false });
    } catch {
      toast.error(t("messageError"), { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = useMemo(() => [
    {
      icon: <Phone className="w-6 h-6 text-white" />,
      title: t("phone"),
      lines: ["+998 55 520 55 37"],
    },
    {
      icon: <MapPin className="w-6 h-6 text-white" />,
      title: t("mainOffice"),
      lines: [t("addressDes")],
    },
    {
      icon: <MapPin className="w-6 h-6 text-white" />,
      title: t("branchOffice"),
      lines: [t("addressDes2")],
    },
    {
      icon: <Clock className="w-6 h-6 text-white" />,
      title: t("businessHours"),
      lines: [t("monFri"), t("satSun")],
    },
  ], [t]);

  const maps = useMemo(() => [
    {
      title: `${t("mainOffice")}`,
      src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3686.347436682621!2d69.278258!3d41.3330333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8bf1d8fdeb89%3A0xae5a5169d41df098!2sSamTravel!5e1!3m2!1sen!2s!4v1768979798093!5m2!1sen!2s",
    },

    {
      title: `${t("branchOffice")}`,
      src: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15120.87525837725!2d66.95069479989323!3d39.64571223878444!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f4d19c3f4b7ac45%3A0x2585e48efdd96bf7!2s%22Belt%20of%20the%20orion%22%20aviakassa!5e1!3m2!1sen!2s!4v1768979883111!5m2!1sen!2s",
    },
  ], [t]);

  return (
    <div className="min-h-screen bg-cream">
      <Toaster position="top-right" reverseOrder={false} />

      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/contact-hero.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/55 to-black/85" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center text-white">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-from mb-4">
            {t("contact")}
          </p>
          <h1 className="text-4xl md:text-6xl font-bold leading-[1.1] mb-4 tracking-tight">
            {t("contactTitle")}
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
            {t("contactSubtitle")}
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
          <div className="lg:col-span-3 bg-white rounded-3xl ring-1 ring-ink/5 p-6 md:p-10">
            <h2 className="text-2xl md:text-3xl font-bold text-ink mb-2">
              {t("sendMessage")}
            </h2>
            <p className="text-ink-soft mb-8">
              {t("contactSubtitle")}
            </p>

            <form
              onSubmit={handleSubmit}
              className="space-y-3 sm:space-y-4"
              noValidate
            >
              <div>
                <label htmlFor="name" className="sr-only">
                  {t("yourName")}
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  onBlur={() => setTouched((p) => ({ ...p, name: true }))}
                  placeholder={t("yourName")}
                  className={`h-14 px-4 text-base focus:outline-none focus:ring-0 placeholder:text-gray-400 ${
                    touched.name && !nameValid
                      ? "border-red-500 focus:border-red-500"
                      : ""
                  }`}
                  autoComplete="name"
                  required
                  aria-required="true"
                  aria-invalid={touched.name && !nameValid}
                />
                {touched.name && !nameValid && (
                  <p className="text-sm text-red-500 mt-1.5">
                    {formData.name.trim().length < 2
                      ? t("errorNameShort")
                      : t("errorNameInvalid")}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="sr-only">
                  {t("phone")}
                </label>
                <div
                  onBlur={() => setTouched((p) => ({ ...p, tel: true }))}
                  className={
                    touched.tel && !telValid
                      ? "[&_input]:border-red-500"
                      : ""
                  }
                >
                  <PhoneNumberInput
                    id="phone"
                    value={formData.tel}
                    onChange={(val) => setFormData({ ...formData, tel: val })}
                    required
                  />
                </div>
                {touched.tel && !telValid && (
                  <p className="text-sm text-red-500 mt-1.5">
                    {t("errorPhoneInvalid")}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="sr-only">
                  {t("yourMessage")}
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  onBlur={() => setTouched((p) => ({ ...p, message: true }))}
                  placeholder={t("yourMessage")}
                  className={`min-h-[140px] px-4 py-4 text-base focus:outline-none focus:ring-0 placeholder:text-gray-400 ${
                    touched.message && !messageValid
                      ? "border-red-500 focus:border-red-500"
                      : ""
                  }`}
                  maxLength={2000}
                  required
                  aria-required="true"
                  aria-invalid={touched.message && !messageValid}
                />
                {touched.message && !messageValid && (
                  <p className="text-sm text-red-500 mt-1.5">
                    {t("errorMessageShort")}
                  </p>
                )}
              </div>

              {/* Honeypot field — hidden from real users */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="hp">Leave blank</label>
                <input
                  id="hp"
                  name="hp"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.hp}
                  onChange={(e) =>
                    setFormData({ ...formData, hp: e.target.value })
                  }
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-14 bg-brand-gradient hover:scale-[1.01] text-white font-semibold flex items-center justify-center transition-transform disabled:opacity-60 disabled:hover:scale-100"
              >
                <Send className="w-5 h-5 mr-2" />
                {t("sendMessage")}
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl md:text-3xl font-bold text-ink mb-6">
              {t("contactInfo")}
            </h2>
            <div className="space-y-5">
              {contactInfo.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 p-5 rounded-2xl bg-white ring-1 ring-ink/5 hover:ring-brand/30 transition-colors"
                >
                  <div className="w-11 h-11 shrink-0 bg-brand-gradient rounded-xl flex items-center justify-center shadow-brand">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-ink mb-1">{item.title}</h3>
                    {item.lines.map((line, j) => (
                      <p key={j} className="text-ink-soft text-sm md:text-base">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Maps */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {maps.map((map, i) => (
            <div key={i}>
              <h3 className="text-lg font-semibold text-ink mb-4">{map.title}</h3>
              <div className="rounded-2xl overflow-hidden ring-1 ring-ink/5 h-[280px] sm:h-[360px]">
                <iframe
                  title={map.title}
                  src={map.src}
                  width="100%"
                  height="100%"
                  className="border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
