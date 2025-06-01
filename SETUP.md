# 🚀 Setup Guide for BlinkShot

This guide will help you set up BlinkShot in just a few minutes!

## 📋 Prerequisites

- Node.js 18+ installed
- A Together AI account (free)

## 🔧 Installation

### 1. Install dependencies
```bash
npm install
```

### 2. Configure your Together AI API key

#### Get your API key:
1. Go to [Together AI](https://api.together.xyz/settings/api-keys)
2. Create a free account (you get $1 credit)
3. Copy your API key

#### Configure the environment variable:
1. Open the `.env.local` file in the root folder
2. Replace `your_together_ai_api_key_here` with your actual API key:

```env
TOGETHER_API_KEY=your_api_key_here
```

**Example:**
```env
TOGETHER_API_KEY=abc123def456ghi789jkl012mno345pqr678stu901vwx234yz
```

### 3. Start the application
```bash
npm run dev
```

### 4. Open your browser
Go to [http://localhost:3000](http://localhost:3000)

## ✨ How to use BlinkShot

1. **Basic Generation**: Start typing in the textarea to generate images in real-time
2. **Consistency Mode**: Enable the toggle to generate images that build upon each other
3. **Example prompts**:
   - "a majestic horse galloping through a field at sunset"
   - "a futuristic city with flying cars and neon lights"
   - "a cozy coffee shop on a rainy day"

## 🔧 Troubleshooting

### Error: "Together AI API key not configured"
- Check that the `.env.local` file exists
- Verify that the API key is correct
- Restart the development server (`Ctrl+C` then `npm run dev`)

### Error: "Failed to generate image"
- Check your internet connection
- Verify that the API key is valid
- Make sure you have sufficient credits on Together AI

### The app won't start
- Verify you have Node.js 18+ installed
- Run `npm install` to install dependencies
- Check that port 3000 is not occupied

## 🎨 Customization

### Change the image model
In the `app/api/generateImage/route.ts` file, you can change the model:

```typescript
model: 'black-forest-labs/FLUX.1-schnell', // Fast
// or
model: 'black-forest-labs/FLUX.1-dev',     // Higher quality
```

### Modify generation parameters
```typescript
steps: 3,        // More steps = better quality but slower
width: 1024,     // Image width
height: 768,     // Image height
```

## 📚 Useful Resources

- [Together AI Documentation](https://docs.together.ai)
- [Available Models](https://docs.together.ai/docs/inference-models)
- [Together AI Discord](https://discord.gg/together)
- [Original Tutorial](https://www.together.ai/blog/how-to-build-a-real-time-image-generator-with-together-ai)

## 🆘 Support

If you have problems:
1. Check the [documentation](https://docs.together.ai)
2. Search in the [Together AI Discord](https://discord.gg/together)
3. Open an issue on GitHub

---

**Happy image generation! 🎨✨** 