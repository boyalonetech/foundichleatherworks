'use client';

import React, { useState } from 'react';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { fullName, email, message } = formData;

    // Format the message
    const whatsappMessage = `Hello Foundich Leather Works! 👋\n\nFull Name: ${fullName}\nEmail: ${email}\nMessage: ${message}`;
    
    // Replace with your WhatsApp number in international format (e.g. 2348161514098)
    const phoneNumber = '2348161514098';

    // Open WhatsApp link
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappURL, '_blank');
  };

  return (
    <main className="min-h-screen bg-white text-black px-6 py-10 md:px-16 lg:px-32 mt-[30%] md:mt-2">
      <section className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-found">Contact Us</h1>
        <p className="mb-8 text-lg">Have a question or custom order? Message us directly on WhatsApp!</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="fullName" className="block font-medium text-sm mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              id="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-found-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block font-medium text-sm mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-found-500"
            />
          </div>

          <div>
            <label htmlFor="message" className="block font-medium text-sm mb-1">
              Message
            </label>
            <textarea
              name="message"
              id="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-found-500"
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-found text-white px-6 py-2 rounded-lg hover:bg-found-800 transition"
          >
            Send on WhatsApp
          </button>
        </form>
      </section>
    </main>
  );
};

export default ContactPage;
