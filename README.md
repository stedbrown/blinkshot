# 🎨 BlinkShot - AI Image Generator

![BlinkShot Banner](https://img.shields.io/badge/BlinkShot-AI%20Image%20Generator-purple?style=for-the-badge&logo=react)

**BlinkShot** is a modern, real-time AI image generator built with Next.js 15, React 18, and powered by Together AI's FLUX.1 models. Transform your words into stunning visual art with advanced controls and a beautiful, animated interface.

## ✨ Features

### 🎯 **Core Functionality**
- **Real-time Image Generation**: Instant AI-powered image creation
- **Advanced Prompt Processing**: Intelligent debouncing and optimization
- **Multiple AI Models**: FLUX.1 [schnell] for speed, FLUX.1 [dev] for quality
- **Consistency Mode**: Generate coherent image sequences
- **Seed Control**: Lock seeds for reproducible results

### 🎨 **User Interface**
- **Modern Dark Theme**: Beautiful gradient backgrounds with glass morphism
- **Animated Particles**: Dynamic floating elements and smooth transitions
- **Responsive Design**: Perfect on desktop, tablet, and mobile
- **Interactive Controls**: Intuitive sliders, toggles, and input fields
- **Loading Animations**: Custom multi-layered spinner with floating particles

### ⚙️ **Advanced Controls**
- **Generation Steps**: 1-8 steps for quality vs speed balance
- **Image Dimensions**: 5 presets + custom width/height inputs
- **Seed Management**: Lock/unlock, random generation, manual input
- **Model Selection**: Choose between fast and high-quality models
- **Parameter Validation**: Auto-correction and FLUX-compatible dimensions

### 🚀 **Additional Features**
- **Download Images**: Save generated images locally
- **Share Functionality**: Web Share API integration
- **Quick Prompts**: Pre-made inspiration suggestions
- **Character Counter**: 500 character limit with live feedback
- **Error Handling**: Comprehensive error management and user feedback

## 🛠️ Tech Stack

### **Frontend**
- **Next.js 15.1.0** - React framework with App Router
- **React 18** - Latest React with concurrent features
- **TypeScript 5.6.3** - Type-safe development
- **Tailwind CSS 3.4.14** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library

### **State Management & Data**
- **TanStack Query 5.59.20** - Powerful data fetching and caching
- **@uidotdev/usehooks** - Custom React hooks collection

### **AI & API**
- **Together AI 0.16.0** - AI model integration
- **FLUX.1 Models** - State-of-the-art image generation

### **Development Tools**
- **ESLint** - Code linting and quality
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes

## 🚀 Quick Start

### Prerequisites
- **Node.js 18+** (recommended: 20+)
- **npm** or **yarn** or **pnpm**
- **Together AI API Key** ([Get one here](https://together.ai))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/stedbrown/blinkshot.git
   cd blinkshot
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and add your Together AI API key:
   ```env
   TOGETHER_API_KEY=your_together_ai_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
blinkshot/
├── app/                          # Next.js App Router
│   ├── api/                      # API routes
│   │   └── generateImage/        # Image generation endpoint
│   │       └── route.ts          # Together AI integration
│   │   └── components/           # React components
│   │       ├── ClientOnly.tsx    # SSR-safe wrapper
│   │       ├── LoadingSpinner.tsx# Custom loading animation
│   │       └── NoSSR.tsx        # Alternative SSR wrapper
│   ├── globals.css              # Global styles and animations
│   ├── layout.tsx               # Root layout component
│   ├── page.tsx                 # Main application page
│   └── providers.tsx            # React Query provider
├── docs/                        # Documentation
│   ├── CHANGELOG.md             # Version history
│   └── SETUP.md                 # Detailed setup guide
├── public/                      # Static assets
├── .env.example                 # Environment variables template
├── .gitignore                   # Git ignore rules
├── next.config.js               # Next.js configuration
├── package.json                 # Dependencies and scripts
├── tailwind.config.js           # Tailwind CSS configuration
└── tsconfig.json                # TypeScript configuration
```

## 🎮 Usage Guide

### Basic Usage

1. **Enter a Prompt**: Describe your vision in the text area
2. **Wait for Magic**: AI generates your image in real-time
3. **Download or Share**: Save or share your creation

### Advanced Features

#### **Consistency Mode**
- Toggle ON for coherent image sequences
- Uses fixed seed (123) for all generations
- Perfect for creating variations of the same theme

#### **Seed Control**
- **Lock Seed**: Use the same seed for reproducible results
- **Random Seed**: Generate new random seeds
- **Manual Input**: Enter specific seed numbers

#### **Generation Parameters**
- **Steps**: 1 (fastest) to 8 (highest quality)
- **Dimensions**: Choose from presets or set custom sizes
- **Model**: FLUX.1 [schnell] (fast) or FLUX.1 [dev] (quality)

### Example Prompts

```
"a magical castle floating in the clouds"
"a robot painting a masterpiece"
"a glowing crystal forest at midnight"
"a futuristic underwater city with neon lights"
"a steampunk airship flying over Victorian London"
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `TOGETHER_API_KEY` | Your Together AI API key | ✅ Yes |

### API Configuration

The Together AI integration supports:
- **Models**: FLUX.1 [schnell], FLUX.1 [dev]
- **Dimensions**: 512x512 to 1344x1344 (multiples of 64)
- **Steps**: 1-8 generation steps
- **Seeds**: Custom or random seed generation

## 🎨 Customization

### Styling
- **Colors**: Modify gradient colors in `globals.css`
- **Animations**: Adjust animation durations and effects
- **Layout**: Customize component layouts in `page.tsx`

### Functionality
- **Models**: Add new AI models in the API route
- **Presets**: Modify size presets in the main component
- **Prompts**: Update quick inspiration suggestions

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect to Vercel**
   ```bash
   npx vercel
   ```

2. **Set Environment Variables**
   - Add `TOGETHER_API_KEY` in Vercel dashboard
   - Configure domain settings

3. **Deploy**
   ```bash
   npx vercel --prod
   ```

### Other Platforms

- **Netlify**: Use `npm run build` and deploy `out/` folder
- **Railway**: Connect GitHub repo and set environment variables
- **Docker**: Use the included Dockerfile for containerization

## 🔍 Troubleshooting

### Common Issues

#### **Hydration Mismatch Errors**
- **Solution**: The app uses `ClientOnly` wrapper to prevent SSR issues
- **Cause**: Browser extensions modifying DOM attributes

#### **API Key Errors**
- **Check**: Ensure `TOGETHER_API_KEY` is set correctly
- **Verify**: API key has sufficient credits and permissions

#### **Image Generation Fails**
- **Timeout**: Try reducing generation steps
- **Dimensions**: Ensure dimensions are multiples of 64
- **Prompt**: Check prompt length (max 500 characters)

#### **Performance Issues**
- **Debouncing**: Adjust debounce delay in `useDebounce`
- **Caching**: React Query handles automatic caching
- **Memory**: Clear browser cache if needed

### Development Issues

#### **TypeScript Errors**
```bash
npm run type-check
```

#### **Linting Issues**
```bash
npm run lint
npm run lint:fix
```

#### **Build Errors**
```bash
npm run build
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Development Guidelines

- **Code Style**: Follow existing patterns and use TypeScript
- **Testing**: Test all new features thoroughly
- **Documentation**: Update README and comments
- **Performance**: Ensure changes don't impact performance

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **[Together AI](https://together.ai)** - AI model hosting and API
- **[Black Forest Labs](https://blackforestlabs.ai)** - FLUX.1 model development
- **[Next.js Team](https://nextjs.org)** - Amazing React framework
- **[Tailwind CSS](https://tailwindcss.com)** - Utility-first CSS framework
- **[Lucide](https://lucide.dev)** - Beautiful icon library

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/stedbrown/blinkshot/issues)
- **Discussions**: [GitHub Discussions](https://github.com/stedbrown/blinkshot/discussions)
- **Email**: [Contact Developer](mailto:your-email@example.com)

## 🔗 Links

- **Live Demo**: [BlinkShot App](https://blinkshot.vercel.app)
- **Documentation**: [Full Docs](./docs/)
- **API Reference**: [Together AI Docs](https://docs.together.ai)
- **FLUX Models**: [Black Forest Labs](https://blackforestlabs.ai)

---

<div align="center">

**Made with ❤️ by [stedbrown](https://github.com/stedbrown)**

[![GitHub stars](https://img.shields.io/github/stars/stedbrown/blinkshot?style=social)](https://github.com/stedbrown/blinkshot/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/stedbrown/blinkshot?style=social)](https://github.com/stedbrown/blinkshot/network/members)
[![GitHub issues](https://img.shields.io/github/issues/stedbrown/blinkshot)](https://github.com/stedbrown/blinkshot/issues)

</div> 