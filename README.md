# Resume Builder

A modern, responsive resume builder application built with Next.js, TypeScript, and Tailwind CSS. Create professional resumes with multiple language support and real-time preview.

## Features

- 📱 **Fully Responsive Design** - Works perfectly on desktop, tablet, and mobile devices
- 🌍 **Multi-language Support** - Available in Uzbek, Russian, and English
- 🎨 **Modern UI/UX** - Clean, professional interface with smooth animations
- 📄 **PDF Export** - Download your resume as a PDF file
- ⚡ **Real-time Preview** - See changes instantly as you type
- 🎯 **Section Management** - Add/edit experience, education, projects, skills, and more

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **UI Components**: Custom components with Vaul for drawers
- **Build Tools**: ESLint, TypeScript Compiler

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/resume-builder.git
cd resume-builder
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. **Choose a Template**: Select from available resume templates
2. **Fill Your Information**: Add personal details, experience, education, etc.
3. **Customize**: Adjust sections, add skills, projects, and achievements
4. **Preview**: See your resume in real-time
5. **Export**: Download as PDF or print directly

## Project Structure

```
├── app/
│   ├── components/          # Reusable UI components
│   │   ├── FInput.tsx       # Custom input component
│   │   ├── FTextarea.tsx    # Custom textarea component
│   │   ├── SectionCard.tsx  # Section cards for sidebar
│   │   ├── MobileSidebar.tsx # Mobile sidebar drawer
│   │   └── SidebarContent.tsx # Main sidebar content
│   ├── dashboard/           # Dashboard pages and layout
│   └── globals.css          # Global styles
├── components/             # Shared components
├── public/                 # Static assets
└── types/                  # TypeScript type definitions
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Deploy automatically

### Other Platforms

This app can be deployed on any platform that supports Next.js:
- Netlify
- Railway
- Digital Ocean
- AWS Amplify

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you have any questions or need help, please open an issue on GitHub.

---

Built with ❤️ using Next.js and modern web technologies
