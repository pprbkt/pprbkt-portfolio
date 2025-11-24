# Dhanush HS - Personal Portfolio Website

A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS. Features smooth animations, clean design, and comprehensive sections showcasing skills, projects, experience, and certifications.

## 🚀 Features

- **Modern Design**: Clean, professional layout with smooth animations
- **Responsive**: Fully responsive design that works on all devices
- **Performance Optimized**: Built with Next.js for optimal performance
- **SEO Friendly**: Proper meta tags and structured data
- **Interactive Elements**: Smooth hover effects and transitions
- **Contact Form**: Functional contact form for easy communication

## 📄 Pages

- **Home**: Hero section with introduction and featured content
- **About**: Personal story, interests, and background
- **Projects**: Comprehensive showcase of all projects with filtering
- **Experience**: Professional experience and timeline
- **Certifications**: Complete list of certifications and achievements
- **Contact**: Contact form and social media links

## 🛠️ Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Fonts**: Inter & Poppins (Google Fonts)

## 🏗️ Project Structure

```
portfolio/
├── app/
│   ├── components/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── about/
│   │   └── page.tsx
│   ├── projects/
│   │   └── page.tsx
│   ├── experience/
│   │   └── page.tsx
│   ├── certifications/
│   │   └── page.tsx
│   ├── contact/
│   │   └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── profile/
│   ├── personal-info.md
│   └── personal-data.json
├── package.json
├── tailwind.config.js
├── next.config.js
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/paperbukit/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎨 Customization

### Colors
The website uses a custom color palette defined in `tailwind.config.js`. You can modify the primary colors:

```javascript
colors: {
  primary: {
    50: '#f0f9ff',
    500: '#0ea5e9',
    600: '#0284c7',
    // ... more shades
  }
}
```

### Content
Personal information is stored in `profile/personal-data.json`. Update this file to change:
- Personal details
- Skills and technologies
- Experience information
- Project descriptions
- Certifications

### Animations
Animations are powered by Framer Motion. You can customize them in each page component by modifying the motion variants.

## 🌐 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with zero configuration

### Netlify
1. Build the project: `npm run build`
2. Deploy the `out` folder to Netlify

### Other Platforms
The website can be deployed to any static hosting service that supports Next.js.

## 📧 Contact

- **Email**: dhanushhs1@outlook.com
- **GitHub**: [@paperbukit](https://github.com/paperbukit)
- **LinkedIn**: [@paperbukit](https://linkedin.com/in/paperbukit)

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/paperbukit/portfolio/issues).

## ⭐ Show Your Support

If you like this project, please consider giving it a star on GitHub!

---

**Built with 💻 and ☕ by Dhanush HS**
