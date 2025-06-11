"use client";

import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Message sent! (Integrate with email API or backend)");
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 px-4 md:px-20 py-12 mt-12 md:mt-0">
      <h1 className="text-4xl font-bold mb-6 text-center text-found">
        Foundich Leatherworks
      </h1>

      {/* Google Map */}
      <div className="mb-16 rounded-2xl overflow-hidden shadow-lg h-[450px] w-full">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3973.9449622379043!2d7.339658173495515!3d5.112573537952514!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x10429be538ad285d%3A0xf753ab6c4383d553!2s14%20Power%20Line%2C%20Ariaria%2C%20Aba%20450102%2C%20Abia!5e0!3m2!1sen!2sng!4v1749638930160!5m2!1sen!2sng"
          className="w-full h-full"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Cards */}
        <div className="space-y-6">
          <a
            href="tel:+2348161514098"
            target="_blank"
            className="bg-gray-100 p-6 rounded-2xl shadow-md flex items-center space-x-4"
          >
            <Phone className="text-green-600" />
            <div>
              <h3 className="font-semibold">Phone</h3>
              <p className="text-sm text-gray-600">+234 816 151 4098</p>
            </div>
          </a>

          <a
            href="mailto:boyalonetechs@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-100 p-6 rounded-2xl shadow-md flex items-center space-x-4"
          >
            <Mail className="text-blue-600" />
            <div>
              <h3 className="font-semibold">Email</h3>
              <p className="text-sm text-gray-600">
                foundichleatherworks@gmail.com
              </p>
            </div>
          </a>

          <a
            href="https://wa.me/2348161514098"
            target="_blank"
            className="bg-gray-100 p-6 rounded-2xl shadow-md flex items-center space-x-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 16 16"
            >
              <path
                fill="green"
                d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144l-2.494.654l.666-2.433l-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931a6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646c-.182-.065-.315-.099-.445.099c-.133.197-.513.646-.627.775c-.114.133-.232.148-.43.05c-.197-.1-.836-.308-1.592-.985c-.59-.525-.985-1.175-1.103-1.372c-.114-.198-.011-.304.088-.403c.087-.088.197-.232.296-.346c.1-.114.133-.198.198-.33c.065-.134.034-.248-.015-.347c-.05-.099-.445-1.076-.612-1.47c-.16-.389-.323-.335-.445-.34c-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992c.47.205.84.326 1.129.418c.475.152.904.129 1.246.08c.38-.058 1.171-.48 1.338-.943c.164-.464.164-.86.114-.943c-.049-.084-.182-.133-.38-.232"
              />
            </svg>
            <div>
              <h3 className="font-semibold">WhatsApp</h3>
              <p rel="noopener noreferrer" className="text-sm text-green-700">
                Chat on WhatsApp
              </p>
            </div>
          </a>

          <div className="bg-gray-100 p-6 rounded-2xl shadow-md flex items-center space-x-4">
            <MapPin className="text-red-500" />
            <div>
              <h3 className="font-semibold">Location</h3>
              <p className="text-sm text-gray-600">Aba, Abia State, Nigeria</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-gray-50 p-8 rounded-2xl shadow-lg space-y-6"
        >
          <h2 className="text-2xl text-found font-semibold">
            Send Us a Message
          </h2>

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-black"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-black"
            required
          />

          <textarea
            name="message"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-3 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-black"
            required
          ></textarea>

          <button
            type="submit"
            className="bg-found text-white px-6 py-3 rounded-xl hover:bg-red-700 transition  flex gap-2"
          >
            Send Message
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M.292 1.665L24.002 12L.293 22.336L3.94 12zM5.708 13l-2 5.665L18.999 12L3.708 5.336l2 5.664H11v2z"
              />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
