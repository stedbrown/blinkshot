# 🔌 API Documentation

This document describes the BlinkShot API endpoints and their usage.

## 📋 Overview

BlinkShot provides a simple REST API for generating images using AI models. The API is built on Next.js API routes and integrates with Together AI's FLUX models.

## 🔑 Authentication

All API requests require a valid Together AI API key configured in the environment variables.

```env
TOGETHER_API_KEY=your_together_ai_api_key_here
```

## 📡 Endpoints

### POST /api/generateImage

Generate an image from a text prompt using AI.

#### Request

**URL:** `/api/generateImage`  
**Method:** `POST`  
**Content-Type:** `application/json`

#### Request Body

```json
{
  "prompt": "string",           // Required: Text description of the image
  "seed": number | null,        // Optional: Seed for reproducible results
  "steps": number,              // Optional: Generation steps (1-8, default: 3)
  "width": number,              // Optional: Image width (512-1344, default: 1024)
  "height": number,             // Optional: Image height (512-1344, default: 768)
  "model": "string"             // Optional: AI model to use (default: FLUX.1-schnell)
}
```

#### Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `prompt` | string | ✅ Yes | - | Text description of the desired image (max 500 chars) |
| `seed` | number \| null | ❌ No | `null` | Seed for reproducible generation |
| `steps` | number | ❌ No | `3` | Generation steps (1-8, higher = better quality) |
| `width` | number | ❌ No | `1024` | Image width in pixels (512-1344, multiple of 64) |
| `height` | number | ❌ No | `768` | Image height in pixels (512-1344, multiple of 64) |
| `model` | string | ❌ No | `black-forest-labs/FLUX.1-schnell` | AI model identifier |

#### Supported Models

| Model | Speed | Quality | Description |
|-------|-------|---------|-------------|
| `black-forest-labs/FLUX.1-schnell` | ⚡ Fast | 🟢 Good | Optimized for speed, good quality |
| `black-forest-labs/FLUX.1-dev` | 🐌 Slow | 🟡 High | Higher quality, slower generation |

#### Response

**Success (200 OK):**

```json
{
  "b64_json": "string",         // Base64-encoded PNG image
  "seed": number,               // Seed used for generation
  "finish_reason": "string",    // Generation completion status
  "model": "string",            // Model used for generation
  "width": number,              // Actual image width
  "height": number              // Actual image height
}
```

**Error (400 Bad Request):**

```json
{
  "error": "string"             // Error description
}
```

**Error (500 Internal Server Error):**

```json
{
  "error": "string"             // Error description
}
```

## 📝 Examples

### Basic Image Generation

```javascript
const response = await fetch('/api/generateImage', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    prompt: 'a beautiful sunset over mountains'
  })
});

const data = await response.json();
console.log('Generated image:', data.b64_json);
```

### Advanced Generation with Custom Parameters

```javascript
const response = await fetch('/api/generateImage', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    prompt: 'a futuristic cityscape with flying cars',
    seed: 12345,
    steps: 6,
    width: 1344,
    height: 768,
    model: 'black-forest-labs/FLUX.1-dev'
  })
});

const data = await response.json();
```

### Using with React Query

```javascript
import { useQuery } from '@tanstack/react-query';

function useImageGeneration(prompt, options = {}) {
  return useQuery({
    queryKey: ['generateImage', prompt, options],
    queryFn: async () => {
      const response = await fetch('/api/generateImage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          ...options
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate image');
      }
      
      return response.json();
    },
    enabled: !!prompt.trim(),
    staleTime: Infinity,
    retry: false,
  });
}
```

## 🔧 Parameter Validation

The API automatically validates and corrects parameters:

### Steps Validation
- **Range:** 1-8
- **Auto-correction:** Values outside range are clamped
- **Default:** 3

```javascript
// Input: steps: 15
// Corrected: steps: 8

// Input: steps: 0
// Corrected: steps: 1
```

### Dimensions Validation
- **Range:** 512-1344 pixels
- **Multiple:** Must be multiple of 64 (FLUX requirement)
- **Auto-correction:** Rounded to nearest valid value

```javascript
// Input: width: 1000
// Corrected: width: 1024 (nearest multiple of 64)

// Input: height: 2000
// Corrected: height: 1344 (maximum allowed)
```

### Prompt Validation
- **Length:** Maximum 500 characters
- **Type:** Must be non-empty string
- **Encoding:** UTF-8 supported

## ⚡ Performance Considerations

### Caching
- Results are cached by React Query on the client
- Cache key includes all generation parameters
- Identical requests return cached results instantly

### Rate Limiting
- No built-in rate limiting (relies on Together AI limits)
- Consider implementing client-side debouncing
- Recommended debounce: 300ms

### Timeouts
- Default timeout: 30 seconds
- Longer for high-quality models
- Consider showing progress indicators

## 🚨 Error Handling

### Common Errors

#### 400 Bad Request
```json
{
  "error": "Prompt is required and must be a string"
}
```

**Cause:** Missing or invalid prompt parameter

#### 500 Internal Server Error
```json
{
  "error": "Together AI API key not configured. Please add TOGETHER_API_KEY to your .env.local file"
}
```

**Cause:** Missing API key configuration

#### 500 Internal Server Error
```json
{
  "error": "Failed to generate image: Model not found"
}
```

**Cause:** Invalid model identifier

### Error Handling Best Practices

```javascript
try {
  const response = await fetch('/api/generateImage', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt }),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Unknown error');
  }
  
  const data = await response.json();
  return data;
} catch (error) {
  console.error('Image generation failed:', error.message);
  // Handle error appropriately
}
```

## 🔐 Security

### Input Validation
- All inputs are validated server-side
- Prompt length is limited to prevent abuse
- Parameters are type-checked and sanitized

### API Key Security
- API key is stored server-side only
- Never exposed to client-side code
- Configured via environment variables

### Content Safety
- Together AI provides content filtering
- Inappropriate prompts may be rejected
- Generated content follows Together AI policies

## 📊 Monitoring

### Logging
- All requests are logged with timestamps
- Errors include stack traces for debugging
- Performance metrics can be tracked

### Metrics to Track
- **Request volume:** Number of API calls
- **Response times:** Generation duration
- **Error rates:** Failed requests percentage
- **Model usage:** Distribution of model selection

## 🔄 Versioning

Current API version: **v1**

### Backward Compatibility
- New optional parameters may be added
- Existing parameters will maintain compatibility
- Breaking changes will increment version number

### Future Enhancements
- Batch image generation
- Image-to-image transformation
- Style transfer capabilities
- Custom model fine-tuning

## 📚 Related Documentation

- [Setup Guide](./SETUP.md) - Environment configuration
- [Deployment Guide](./DEPLOYMENT.md) - Production deployment
- [Troubleshooting](./TROUBLESHOOTING.md) - Common issues
- [Together AI Docs](https://docs.together.ai) - API provider documentation

---

**Need help?** [Open an issue](https://github.com/stedbrown/blinkshot/issues) or check our [troubleshooting guide](./TROUBLESHOOTING.md). 