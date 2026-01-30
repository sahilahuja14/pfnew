# Sahil Ahuja - Portfolio Website

A modern, responsive portfolio website built with React, Vite, and Node.js/Express backend for contact form submissions.

## 🚀 Features

- **Modern Design**: Dark theme with purple/blue gradients and smooth animations
- **Fully Responsive**: Works seamlessly on desktop, tablet, and mobile devices
- **Smooth Animations**: Scroll-triggered animations and interactive UI elements
- **Contact Form**: Email integration using Nodemailer and Gmail SMTP
- **Tech Stack Display**: Large, colorful tech logos with devicons
- **Experience Section**: Professional timeline of work experience
- **Project Showcase**: Featured projects with descriptions and code links
- **Coding Profiles**: Links to GitHub, LeetCode, and HackerRank

## 📋 Sections

- **Home**: Hero section with CTA buttons
- **About**: Brief introduction and statistics
- **Experience**: Professional work experience timeline
- **Skills**: Core technologies, coding profiles, and additional skills
- **Projects**: Featured projects with descriptions
- **Contact**: Contact form with email submission

## 🛠️ Tech Stack

### Frontend
- **React 18.2.0**: JavaScript library for building UI
- **Vite 5.0.0**: Next generation frontend tooling
- **Tailwind CSS**: Utility-first CSS framework (via CDN)
- **Lucide React**: Modern icon library
- **Devicons**: Technology logos

### Backend
- **Node.js v24.13.0**: JavaScript runtime
- **Express.js**: Web application framework
- **Nodemailer**: Email sending library
- **CORS**: Cross-Origin Resource Sharing
- **Body Parser**: Request parsing middleware

## 📦 Installation

### Prerequisites
- Node.js v24.13.0 or higher
- npm or yarn

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/sahilahuja14/portfolio.git
cd portfolio
```

2. **Install frontend dependencies**
```bash
cd client
npm install
```

3. **Install backend dependencies**
```bash
cd ../server
npm install
```

4. **Setup environment variables**

Create `.env` file in the `server` directory:
```
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASSWORD=your-app-specific-password
RECIPIENT_EMAIL=your-email@example.com
```

**To get Gmail App Password:**
- Enable 2FA on your Google account
- Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
- Select "Mail" and "Windows (or your device)"
- Copy the 16-character password
- Use this in `EMAIL_PASSWORD`

## 🚀 Running Locally

### Development Mode

**Terminal 1 - Frontend (Port 5173)**
```bash
cd client
npm run dev
```

**Terminal 2 - Backend (Port 5000)**
```bash
cd server
npm run dev
```

Visit `http://localhost:5173` in your browser.

### Production Build

```bash
cd client
npm run build
```

This creates an optimized build in the `dist/` folder.

## 📢 Deployment

### Frontend - Vercel

1. **Install Vercel CLI**
```bash
npm i -g vercel
```

2. **Login and deploy**
```bash
cd client
vercel
```

3. **Follow prompts** to connect your GitHub account and deploy

### Backend - Vercel Serverless

1. **Create `vercel.json`** in server directory with:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "server.js"
    }
  ]
}
```

2. **Deploy**
```bash
cd server
vercel --prod
```

3. **Set environment variables** in Vercel dashboard

4. **Update frontend** with backend URL:
   - Update `Contact.jsx` with your backend URL
   - Redeploy frontend

## 🔐 Security

- Email credentials are stored in environment variables (`.env`)
- `.env` file is in `.gitignore` and never committed
- Use Gmail App Passwords instead of account password
- CORS is configured for secure requests

## 📝 Customization

### Update Personal Info
- **Navbar**: Change "SA" logo and links in `components/Navbar.jsx`
- **Hero**: Update name, title, and bio in `components/Hero.jsx`
- **About**: Modify stats in `components/About.jsx`
- **Experience**: Update experience data in `components/Experience.jsx`
- **Skills**: Add/remove technologies in `components/Skills.jsx`
- **Projects**: Update projects in `components/Projects.jsx`
- **Contact**: Modify email recipient in server `server.js`

### Update Links
- GitHub: `https://github.com/sahilahuja14`
- LeetCode: `https://leetcode.com/u/sahilahuja194/`
- LinkedIn: Update in `components/Footer.jsx`
- Twitter: Update in `components/Footer.jsx`

## 📧 Contact Form

The contact form sends emails through Gmail's SMTP server. When a user submits:
1. Form data is validated
2. Email is sent to the configured recipient
3. Success/error message is displayed to the user

## 🎨 Design Features

- **Glass Morphism Alternative**: Gradient backgrounds with transparency
- **Shine Animation**: Animated gradient on CTA buttons
- **Scroll Animations**: Elements animate in as you scroll
- **Hover Effects**: Interactive elements with smooth transitions
- **Responsive Grid**: Adapts to different screen sizes
- **Custom Fonts**: System font stack for optimal performance

## 📄 License

MIT License - feel free to use this portfolio as a template!

## 👤 Author

**Sahil Ahuja**
- GitHub: [@sahilahuja14](https://github.com/sahilahuja14)
- Email: sahilahuja194@gmail.com
- LeetCode: [@sahilahuja194](https://leetcode.com/u/sahilahuja194/)

---

**Built with ❤️ using React, Vite, and Node.js**
