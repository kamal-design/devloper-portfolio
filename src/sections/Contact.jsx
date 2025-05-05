import React, { useRef, useState } from "react";
import TitleHeader from "../components/TitleHeader";
import emailjs from "@emailjs/browser";
import ContactExperience from "../components/ContactModels/ContactExperience";

const Contact = () => {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [stateMessage, setStateMessage] = useState(null);
  const [formData, setFormData] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("FormSubmitted:", formData);

    setLoading(true); // Show loading state

    try {
      await emailjs
        .sendForm(
          import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
          formRef.current,
          import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
        )
        .then((result) => {
          console.log("SUCCESS!", result.status, result.text);
          setStateMessage("Message sent successfully!");
          setTimeout(() => {
            setStateMessage(null);
          }, 5000); // Clear message after 5 seconds
          formRef.current.reset(); // Reset form fields
        });

      // Reset form and stop loading
      setForm({ name: "", email: "", message: "" });
      setFormData(null);
    } catch (error) {
      console.error("EmailJS Error:", error); // Optional: show toast
    } finally {
      setLoading(false); // Always stop loading, even on error
    }
  };

  return (
    <section id="contact" className="flex-center section-padding">
      <div className="size-full md:px-10 px-5">
        <TitleHeader
          title="Get In Touch With Me"
          sub="📝 Contact Information"
        />

        <div className="grid-12-cols mt-16">
          {/* contact form Left side  */}
          <div className="xl:col-span-5">
            {stateMessage ? (
              <p className="text-green-600 text-center bg-green-500/20 mb-4 px-4 py-2 text-base font-medium rounded-xl">
                {stateMessage}
              </p>
            ) : (
              <p className="text-center mb-4 text-sm font-light">
                Feel free to reach out for collaborations, questions, or just to
                say hi!
              </p>
            )}

            <div className="flex-center card-border rounded-xl p-10">
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="w-full flex flex-col gap-7"
              >
                <div>
                  <label htmlFor="name">Your name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="What’s your good name?"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="What’s your email address?"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="How can I help you?"
                    rows="5"
                    required
                  />
                </div>

                <button type="submit">
                  <div className="cta-button group">
                    <div className="bg-circle" />
                    <p className="text">
                      {loading ? "Sending..." : "Send Message"}
                    </p>
                    <div className="arrow-wrapper">
                      <img src="/images/arrow-down.svg" alt="arrow" />
                    </div>
                  </div>
                </button>
              </form>
            </div>
          </div>
          {/* 3D threejs Image section right */}
          <div className="xl:col-span-7 min-h-96">
            <div className="bg-orange-300 w-full h-full hover:cursor-grab rounded-3xl overflow-hidden">
              <ContactExperience />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
