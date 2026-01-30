import { useState } from 'react';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const Contact = () => {
  const [ref, isVisible] = useIntersectionObserver();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null); // 'sending', 'success', 'error'

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
  
    try {
      const response = await fetch('http://localhost:5000/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <section id="contact" className="py-24 bg-[#020617] relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[100px]" />

      <div ref={ref} className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0 animate-slide-up' : 'opacity-0 translate-y-20'}`}>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Get In Touch</h2>
          <p className="text-slate-400">Have a project in mind or want to collaborate? I'd love to hear from you!</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Contact Info */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">Let's work together</h3>
            <p className="text-slate-400 text-lg mb-10 leading-relaxed">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Feel free to reach out!
            </p>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-white/5 to-white/10 border border-white/10 flex items-start p-6 rounded-2xl hover:border-purple-500/50 hover:bg-purple-500/10 transition-all duration-300">
                <div className="p-3 bg-purple-500/20 rounded-xl text-purple-400 mr-5">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-slate-500 mb-1">Email</h4>
                  <p className="text-lg text-white font-medium">sahilahuja194@gmail.com</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-white/5 to-white/10 border border-white/10 flex items-start p-6 rounded-2xl hover:border-purple-500/50 hover:bg-purple-500/10 transition-all duration-300">
                <div className="p-3 bg-purple-500/20 rounded-xl text-purple-400 mr-5">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-slate-500 mb-1">Location</h4>
                  <p className="text-lg text-white font-medium">India</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-white/5 to-white/10 border border-white/10 flex items-start p-6 rounded-2xl hover:border-purple-500/50 hover:bg-purple-500/10 transition-all duration-300">
                <div className="p-3 bg-purple-500/20 rounded-xl text-purple-400 mr-5">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-slate-500 mb-1">Phone</h4>
                  <p className="text-lg text-white font-medium">Available on request</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gradient-to-br from-white/5 to-white/10 border border-white/20 rounded-3xl p-8 lg:p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your@email.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  placeholder="Tell me about your project..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full shine-button disabled:opacity-50 text-white font-medium py-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg shadow-purple-500/30"
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

              {status === 'success' && (
                <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-xl text-green-400 text-center text-sm">
                  Message sent successfully! I'll get back to you soon.
                </div>
              )}
              {status === 'error' && (
                <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl text-red-400 text-center text-sm">
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
