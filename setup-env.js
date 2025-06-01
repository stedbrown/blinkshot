#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env.local');

if (!fs.existsSync(envPath)) {
  const envContent = `# Together AI API Key
# Get your API key from https://api.together.xyz/settings/api-keys
TOGETHER_API_KEY=your_together_ai_api_key_here
`;

  fs.writeFileSync(envPath, envContent);
  console.log('✅ Created .env.local file');
  console.log('📝 Please edit .env.local and add your Together AI API key');
  console.log('🔗 Get your API key from: https://api.together.xyz/settings/api-keys');
} else {
  console.log('✅ .env.local already exists');
}

console.log('\n🚀 To start the development server, run:');
console.log('   npm run dev');
console.log('\n📖 Then open http://localhost:3000 in your browser'); 