# Ayush Kirtania - Portfolio Website

A modern, responsive portfolio website built with Next.js 15, React, MongoDB, and Tailwind CSS.

![Portfolio Preview](https://via.placeholder.com/1200x600/2563eb/ffffff?text=Ayush+Kirtania+Portfolio)

## 🚀 Features

- **Modern Design**: Clean, professional design with smooth animations using Framer Motion
- **Fully Responsive**: Optimized for all devices (mobile, tablet, desktop)
- **SEO Optimized**: Meta tags, structured data, and semantic HTML
- **Contact Form**: Integrated with MongoDB for storing messages
- **Fast Performance**: Built with Next.js 15 for optimal loading speeds
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS 4
- **Backend**: Next.js API Routes
- **Database**: MongoDB
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: Vercel

## 📋 Prerequisites

Before you begin, ensure you have:
- Node.js 18+ installed
- npm or yarn package manager
- MongoDB database (local or MongoDB Atlas)

## ⚙️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ayushkirtania/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   ```

   To get your MongoDB URI:
   - **Option 1 (MongoDB Atlas - Recommended)**:
     1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
     2. Create a free account and cluster
     3. Click "Connect" → "Connect your application"
     4. Copy the connection string
     5. Replace `<password>` with your database password
   
   - **Option 2 (Local MongoDB)**:
     ```
     MONGODB_URI=mongodb://localhost:27017/portfolio
     ```

4. **Add your profile image**
   
   Place your profile photo in the `public` folder as `profile.jpg`

5. **Update personal information**
   
   The components already have your information, but you can customize:
   - Social media links in `Contact.jsx`
   - GitHub repository links in `Projects.jsx`
   - Any other personal details as needed

## 🚀 Running the Application

### Development Mode
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
```bash
npm run build
npm start
# or
yarn build
yarn start
```

## 📁 Project Structure

```
portfolio/
├── app/
│   ├── api/
│   │   └── contact/
│   │       └── route.js          # Contact form API endpoint
│   ├── components/
│   │   ├── About.jsx              # About section
│   │   ├── Contact.jsx            # Contact form & info
│   │   ├── Hero.jsx               # Hero/landing section
│   │   ├── Navbar.jsx             # Navigation bar
│   │   ├── Projects.jsx           # Projects showcase
│   │   └── Skills.jsx             # Skills & expertise
│   ├── globals.css                # Global styles
│   ├── layout.js                  # Root layout with metadata
│   └── page.js                    # Main page component
├── lib/
│   └── mongodb.js                 # MongoDB connection
├── public/
│   ├── profile.jpg                # Your profile photo
│   ├── Ayush_Kirtania_CV.pdf     # Your resume/CV
│   └── [other assets]
├── .env.local                     # Environment variables (create this)
├── .gitignore
├── package.json
└── README.md
```

## 🎨 Customization

### Colors
The color scheme uses Tailwind CSS. Main colors:
- Primary: Blue (`blue-600`)
- Secondary: Indigo (`indigo-600`)
- Accent: Purple (`purple-600`)

To change colors, update the gradient classes in the components.

### Content
Update content in the respective component files:
- **Hero.jsx**: Main headline, tagline
- **About.jsx**: Bio, achievements, highlights
- **Projects.jsx**: Project details, links, tech stack
- **Skills.jsx**: Skills list, proficiency levels
- **Contact.jsx**: Contact information, social links

### SEO
Update metadata in `layout.js` and `page.js`:
- Title, description, keywords
- Open Graph tags
- Twitter card data

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Add environment variables:
   - `MONGODB_URI`: Your MongoDB connection string
5. Deploy!

Your site will be live at `https://your-project.vercel.app`

### Deploy to Other Platforms

The app can also be deployed to:
- **Netlify**: Configure build command as `npm run build`
- **Railway**: Add MongoDB URI to environment variables
- **DigitalOcean App Platform**: Follow Next.js deployment guide

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGODB_URI` | MongoDB connection string | Yes |

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure your IP address is whitelisted in MongoDB Atlas
- Check if the connection string is correct
- Verify network access settings

### Build Errors
- Clear `.next` folder: `rm -rf .next`
- Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check Node.js version (should be 18+)

### Styling Issues
- Clear Tailwind cache if styles don't update
- Check if all Tailwind classes are valid
- Ensure `globals.css` is imported correctly

## 📧 Contact

**Ayush Kirtania**
- Email: ayushkirtania@gmail.com
- Phone: +91 9123021927
- Location: Panihati, Kolkata, West Bengal, India
- GitHub: [@ayushkirtania](https://github.com/ayushkirtania)
- LinkedIn: [ayushkirtania](https://linkedin.com/in/ayushkirtania)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Animated with [Framer Motion](https://www.framer.com/motion/)
- Icons from [Lucide](https://lucide.dev/)

---

⭐ If you found this helpful, please consider giving it a star on GitHub!