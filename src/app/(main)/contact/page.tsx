"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/contexts/LanguageContext";
import { Clock, MapPin, Phone, Send } from "lucide-react";
import * as React from "react";
import { useState } from "react";
import type { Value as E164Number } from "react-phone-number-input";

import { toast, Toaster } from "react-hot-toast";
import { PhoneNumberInput } from "@/components/pages/contact/PhoneNumberInput";

export default function Contact() {
  const { t } = useLanguage();

  const [formData, setFormData] = useState<{
    name: string;
    message: string;
    tel?: E164Number;
  }>({
    name: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const telegramToken = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
    const chatId = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID;

    const text = `📩 ${t("newMessage")}:\n\n👤 ${t("name")}: ${
      formData.name
    }\n📞 ${t("phone")}: ${formData.tel || t("notProvided")}\n💬 ${t(
      "message",
    )}: ${formData.message}`;

    const toastId = toast.loading(t("sending"));

    try {
      const res = await fetch(
        `https://api.telegram.org/bot${telegramToken}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: chatId,
            text,
            parse_mode: "Markdown",
          }),
        },
      );

      if (!res.ok) {
        throw new Error(`Telegram API error: ${res.status}`);
      }

      toast.success(t("messageSent"), { id: toastId });
      setFormData({ name: "", message: "", tel: undefined });
    } catch (err) {
      console.error("Telegram API error:", err);
      toast.error(t("messageError"), { id: toastId });
    }
  };

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6 text-white" />,
      title: t("phone"),
      lines: ["+998 55 520 55 37", "+998 55 520 55 37"],
    },
    {
      icon: <MapPin className="w-6 h-6 text-white" />,
      title: t("address"),
      lines: [t("addressDes")],
    },
    {
      icon: <Clock className="w-6 h-6 text-white" />,
      title: t("businessHours"),
      lines: [t("monFri"), t("satSun")],
    },
  ];

  const maps = [
    {
      title: `${t("mainOffice")} - Tashkent`,
      src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3686.347436682621!2d69.278258!3d41.3330333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8bf1d8fdeb89%3A0xae5a5169d41df098!2sSamTravel!5e1!3m2!1sen!2s!4v1768979798093!5m2!1sen!2s",
    },

    {
      title: `${t("branchOffice")} - Samarkand`,
      src: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15120.87525837725!2d66.95069479989323!3d39.64571223878444!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f4d19c3f4b7ac45%3A0x2585e48efdd96bf7!2s%22Belt%20of%20the%20orion%22%20aviakassa!5e1!3m2!1sen!2s!4v1768979883111!5m2!1sen!2s",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* 🔥 Toast konteyneri */}
      <Toaster position="top-right" reverseOrder={false} />

      {/* Hero Section */}
      <section
        className="relative py-40 bg-center bg-cover text-center"
        style={{ backgroundImage: "url('/images/contact-hero.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 max-w-3xl mx-auto px-4">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            {t("contactTitle")}
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-6 md:mb-8">
            {t("contactSubtitle")}
          </p>
          <div className="w-20 h-1 bg-white mx-auto" />
        </div>
      </section>

      {/* Contact Form + Info */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Form */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              {t("sendMessage")}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder={t("yourName")}
                className="h-12 px-4 focus:outline-none focus:ring-0 placeholder:text-gray-400"
                required
              />

              <PhoneNumberInput
                value={formData.tel}
                onChange={(val) => setFormData({ ...formData, tel: val })}
                required
              />

              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                placeholder={t("yourMessage")}
                className="min-h-[100px] px-4 py-3 focus:outline-none focus:ring-0 placeholder:text-gray-400"
                required
              />

              <Button
                type="submit"
                className="w-full bg-[rgb(247,162,31)] hover:bg-[rgb(230,145,20)] text-white font-semibold flex items-center justify-center"
              >
                <Send className="w-5 h-5 mr-2" />
                {t("sendMessage")}
              </Button>
            </form>
          </div>

          {/* Contact Info + Maps */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              {t("contactInfo")}
            </h2>
            <div className="space-y-6 mb-8">
              {contactInfo.map((item, i) => (
                <div key={i} className="flex items-start space-x-4">
                  <div className="w-12 h-12 shrink-0 bg-gradient-to-br from-orange-400 to-orange-500 rounded-lg flex items-center justify-center">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{item.title}</h3>
                    {item.lines.map((line, j) => (
                      <p
                        key={j}
                        className="text-gray-600 max-w-[200px] text-sm md:text-base"
                      >
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
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto px-4">
          {maps.map((map, i) => (
            <div key={i}>
              <h3 className="text-lg font-semibold mb-4">{map.title}</h3>
              <div className="rounded-xl overflow-hidden shadow-md h-[250px] sm:h-[350px]">
                <iframe
                  src={map.src}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
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
