'use client'

import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react'
import { useState } from 'react'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Message sent! (Integrate with email API or backend)')
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 px-4 md:px-20 py-12 mt-12 md:mt-0">
      <h1 className="text-4xl font-bold mb-6 text-center text-found">Contact Foundich Leatherworks</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Cards */}
        <div className="space-y-6">
          <div className="bg-gray-100 p-6 rounded-2xl shadow-md flex items-center space-x-4">
            <Phone className="text-green-600" />
            <div>
              <h3 className="font-semibold">Phone</h3>
              <p className="text-sm text-gray-600">+234 816 151 4098</p>
            </div>
          </div>

          <div className="bg-gray-100 p-6 rounded-2xl shadow-md flex items-center space-x-4">
            <Mail className="text-blue-600" />
            <div>
              <h3 className="font-semibold">Email</h3>
              <p className="text-sm text-gray-600">foundichleatherworks@gmail.com</p>
            </div>
          </div>

          <div className="bg-gray-100 p-6 rounded-2xl shadow-md flex items-center space-x-4">
            <MessageCircle className="text-green-500" />
            <div>
              <h3 className="font-semibold">WhatsApp</h3>
              <a
                href="https://wa.me/2348161514098"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-green-700 underline"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>

          <div className="bg-gray-100 p-6 rounded-2xl shadow-md flex items-center space-x-4">
            <MapPin className="text-red-500" />
            <div>
              <h3 className="font-semibold">Location</h3>
              <p className="text-sm text-gray-600">Aba, Abia State, Nigeria</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="bg-gray-50 p-8 rounded-2xl shadow-lg space-y-6">
          <h2 className="text-2xl text-found font-semibold">Send Us a Message</h2>

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
            className="bg-found text-white px-6 py-3 rounded-md hover:bg-red-700 transition"
          >
            Send Message
          </button>
        </form>
      </div>

      {/* Google Map */}
      <div className="mt-16 rounded-2xl overflow-hidden shadow-lg">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.961099323012!2d7.372978314262404!3d5.118003196326037!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1042c08913b9d799%3A0x4779c553b68a0c6d!2sAba%2C%20Nigeria!5e0!3m2!1sen!2sng!4v1686000000000"
          width="100%"
          height="350"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  )
}
