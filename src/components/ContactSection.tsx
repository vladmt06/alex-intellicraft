import { useState } from "react";
import { motion } from "framer-motion";

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", business: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative py-32 px-6 bg-background border-t border-border">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-foreground/50 mb-4">
            Contact
          </p>
          <h2 className="text-4xl md:text-5xl tracking-tight text-foreground mb-4">
            Get in touch.
          </h2>
          <p className="text-base text-foreground/60">
            Interested in what Alexandria can do for your team? Reach out.
          </p>
        </motion.div>

        {submitted ? (
          <div className="py-16">
            <p className="text-2xl tracking-tight text-foreground">Thank you for reaching out.</p>
            <p className="mt-3 text-sm text-foreground/60">We'll be in touch shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {[
              { name: "name", label: "Name", type: "text", placeholder: "Your full name" },
              { name: "email", label: "Business Email", type: "email", placeholder: "you@company.com" },
              { name: "business", label: "Business", type: "text", placeholder: "Your organisation" },
            ].map((field) => (
              <div key={field.name}>
                <label htmlFor={field.name} className="block text-xs uppercase tracking-[0.2em] mb-3 text-foreground/50 font-mono">
                  {field.label}
                </label>
                <input
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  value={form[field.name as keyof typeof form]}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border-b border-border py-3 text-sm outline-none text-foreground placeholder:text-foreground/30 focus:border-foreground transition-colors"
                />
              </div>
            ))}

            <div>
              <label htmlFor="message" className="block text-xs uppercase tracking-[0.2em] mb-3 text-foreground/50 font-mono">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="Tell us about your use case..."
                value={form.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full bg-transparent border-b border-border py-3 text-sm outline-none resize-none text-foreground placeholder:text-foreground/30 focus:border-foreground transition-colors"
              />
            </div>

            <div className="pt-6">
              <button
                type="submit"
                className="inline-flex items-center px-6 py-3 text-sm font-medium text-background bg-foreground hover:bg-foreground/90 transition-colors"
              >
                Send Inquiry
              </button>
            </div>

            <p className="text-xs text-foreground/50 pt-2">
              Or reach us directly at{" "}
              <a
                href="mailto:logan@alexandrialabs.uk"
                className="underline underline-offset-4 text-foreground/70 hover:text-foreground transition-colors"
              >
                logan@alexandrialabs.uk
              </a>
            </p>
          </form>
        )}
      </div>
    </section>
  );
};

export default ContactSection;
