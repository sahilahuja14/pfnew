import { useState } from 'react';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { useElementReveal } from '../hooks/useElementReveal';

const API_ENDPOINT = 'https://portfolio-dyupqjjq7-sahil-ahujas-projects-b2783dbf.vercel.app/send-email';
const initialFormData = { name: '', email: '', message: '', company: '' };

const validateContactForm = (data) => {
  const errors = {};
  const name = data.name.trim();
  const email = data.email.trim();
  const message = data.message.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const namePattern = /^[a-zA-Z\s'.-]+$/;
  const linkCount = (message.match(/https?:\/\/|www\./gi) || []).length;

  if (!name) {
    errors.name = 'Please enter your name.';
  } else if (name.length < 2) {
    errors.name = 'Name should be at least 2 characters.';
  } else if (name.length > 60) {
    errors.name = 'Name should stay under 60 characters.';
  } else if (!namePattern.test(name)) {
    errors.name = 'Name can include letters, spaces, apostrophes, periods, and hyphens.';
  }

  if (!email) {
    errors.email = 'Please enter your email address.';
  } else if (email.length > 120) {
    errors.email = 'Email should stay under 120 characters.';
  } else if (!emailPattern.test(email)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!message) {
    errors.message = 'Please add a message.';
  } else if (message.length < 20) {
    errors.message = 'Message should be at least 20 characters.';
  } else if (message.length > 1000) {
    errors.message = 'Message should stay under 1000 characters.';
  } else if (linkCount > 2) {
    errors.message = 'Please keep links to a maximum of two.';
  }

  if (data.company.trim()) {
    errors.form = 'Submission blocked by spam protection.';
  }

  return errors;
};

const Contact = () => {
  const [ref, isVisible] = useIntersectionObserver();
  const pillRef = useElementReveal({ inClass: 'pill-in', selector: '[data-pill-reveal]' });
  const infoCardsRef = useElementReveal({ inClass: 'slide-in', selector: '[data-slide-left]', staggerMs: 90 });
  const [formData, setFormData] = useState(initialFormData);
  const [status, setStatus] = useState(null);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const visibleError = (field) => (touched[field] && errors[field] ? errors[field] : '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = validateContactForm(formData);
    setErrors(nextErrors);
    setTouched({ name: true, email: true, message: true });

    if (Object.keys(nextErrors).length > 0) {
      setStatus('validation');
      return;
    }

    setStatus('sending');
    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      message: formData.message.trim(),
    };

    try {
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        setStatus('success');
        setFormData(initialFormData);
        setErrors({});
        setTouched({});
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  const handleChange = (e) => {
    const nextFormData = { ...formData, [e.target.name]: e.target.value };
    setFormData(nextFormData);
    setErrors(validateContactForm(nextFormData));
    if (status && status !== 'sending') {
      setStatus(null);
    }
  };

  const handleBlur = (e) => {
    setTouched((current) => ({ ...current, [e.target.name]: true }));
    setErrors(validateContactForm(formData));
  };

  return (
    <section id="contact" className="glass-theme-section py-24 relative overflow-hidden">
      <div ref={ref} className={`max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative scroll-reveal ${isVisible ? 'is-visible' : ''}`}>

        {/* Section Title — Glass pill */}
        <div className="flex justify-center mb-16" ref={pillRef}>
          <div className="contact-title-pill" data-pill-reveal>
            <span className="contact-title-text">Contact</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Info Side */}
          <div>
            <h3 className="text-3xl font-bold text-white mb-4">Let's work together</h3>
            <p className="text-white/75 text-base md:text-lg mb-8 leading-relaxed">
              I'm open to internships, data science projects, machine learning systems, and analytics collaborations where <span className="text-white font-medium">clean</span> pipelines and measurable outcomes matter.
            </p>

            <div className="contact-info-pill-list space-y-4" ref={infoCardsRef}>
              <a href="mailto:sahilahuja194@gmail.com" data-slide-left className="contact-info-card group" style={{ animationDelay: '0ms' }}>
                <div className="contact-info-icon">
                  <Mail size={22} />
                </div>
                <div>
                  <h4 className="text-white/60 text-base font-medium mb-0.5">Email</h4>
                  <p className="text-white font-medium text-xl group-hover:text-white/80 transition-colors">sahilahuja194@gmail.com</p>
                </div>
              </a>

              <div data-slide-left className="contact-info-card" style={{ animationDelay: '90ms' }}>
                <div className="contact-info-icon">
                  <MapPin size={22} />
                </div>
                <div>
                  <h4 className="text-white/60 text-base font-medium mb-0.5">Location</h4>
                  <p className="text-white font-medium text-xl">Krishna Nagar, Delhi</p>
                </div>
              </div>

              <a href="tel:+919870530775" data-slide-left className="contact-info-card group" style={{ animationDelay: '180ms' }}>
                <div className="contact-info-icon">
                  <Phone size={22} />
                </div>
                <div>
                  <h4 className="text-white/60 text-base font-medium mb-0.5">Phone</h4>
                  <p className="text-white font-medium text-xl group-hover:text-white/80 transition-colors">+91-9870530775</p>
                </div>
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-card">
            <form onSubmit={handleSubmit} className="contact-form space-y-5" noValidate>
              {/* Honeypot */}
              <div className="hidden" aria-hidden="true" hidden>
                <label htmlFor="company">Company</label>
                <input
                  id="company"
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  tabIndex="-1"
                  autoComplete="off"
                />
              </div>

              <div>
                <label htmlFor="name" className="block text-base font-medium text-white/80 mb-2">Name</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  maxLength={60}
                  aria-invalid={Boolean(visibleError('name'))}
                  aria-describedby={visibleError('name') ? 'name-error' : undefined}
                  placeholder="Your name"
                  className={`contact-input ${visibleError('name') ? 'contact-input--error' : ''}`}
                />
                {visibleError('name') && (
                  <p id="name-error" className="mt-2 text-sm text-red-300">{visibleError('name')}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-base font-medium text-white/80 mb-2">Email</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  maxLength={120}
                  aria-invalid={Boolean(visibleError('email'))}
                  aria-describedby={visibleError('email') ? 'email-error' : undefined}
                  placeholder="your@email.com"
                  className={`contact-input ${visibleError('email') ? 'contact-input--error' : ''}`}
                />
                {visibleError('email') && (
                  <p id="email-error" className="mt-2 text-sm text-red-300">{visibleError('email')}</p>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between gap-4 mb-2">
                  <label htmlFor="message" className="block text-base font-medium text-white/80">Message</label>
                  <span className="text-sm text-white/60">{formData.message.trim().length}/1000</span>
                </div>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  rows={5}
                  maxLength={1000}
                  aria-invalid={Boolean(visibleError('message'))}
                  aria-describedby={visibleError('message') ? 'message-error' : undefined}
                  placeholder="Tell me about the role, project, dataset, or analytics problem..."
                  className={`contact-input resize-none ${visibleError('message') ? 'contact-input--error' : ''}`}
                ></textarea>
                {visibleError('message') && (
                  <p id="message-error" className="mt-2 text-sm text-red-300">{visibleError('message')}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="contact-submit-btn"
              >
                {status === 'sending' ? (
                  <span>Sending...</span>
                ) : (
                  <>
                    <Send size={18} />
                    <span>Send Message</span>
                  </>
                )}
              </button>

              {status === 'validation' && (
                <div className="contact-status-msg contact-status-msg--error">
                  {errors.form || 'Please fix the highlighted fields before sending.'}
                </div>
              )}
              {status === 'success' && (
                <div className="contact-status-msg contact-status-msg--success">
                  Message sent successfully! I'll get back to you soon.
                </div>
              )}
              {status === 'error' && (
                <div className="contact-status-msg contact-status-msg--error">
                  Something went wrong. Please try again later.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
