# Demo Instructions

## Setup

1. Get your 42 API credentials from: https://profile.intra.42.fr/oauth/applications

2. Copy `.env.example` to `.env` and fill in your credentials:
```bash
cp .env.example .env
```

3. Install dependencies:
```bash
npm install
```

4. Start the server:
```bash
npm start
```

5. Open your browser and navigate to: http://localhost:3000

## Testing the Application

### Test with a Valid Username
1. Enter a valid 1337 username (e.g., `aklabib`)
2. Click "Generate Banner"
3. You should see:
   - The animated banner preview
   - User information
   - Copy buttons for HTML and Markdown code

### Test with an Invalid Username
1. Enter an invalid username
2. Click "Generate Banner"
3. You should see an error message

### Test Rate Limiting
The application has rate limiting:
- General routes: 100 requests per 15 minutes
- API routes: 50 requests per 15 minutes

## Using the Banner

### In GitHub README (Markdown)
```markdown
![Your Name's 1337 Banner](http://your-domain.com/api/banner/username)
```

### In GitHub README (HTML)
```html
<div align="center">
  <img src="http://your-domain.com/api/banner/username" alt="Your Name's 1337 Banner" />
</div>
```

## Example Banner Features

The banner displays:
- ✅ Profile image (circular with glowing effect)
- ✅ Display name and username
- ✅ Email address
- ✅ Campus name
- ✅ Coalition name with colors
- ✅ Level with animated progress bar
- ✅ Wallet balance (₳)
- ✅ Correction points
- ✅ Animated background elements
- ✅ Gradient borders and glowing effects

## Deployment

For production deployment:

1. Set up environment variables on your hosting platform
2. Ensure the domain is whitelisted in your 42 API application settings
3. Update the redirect URI if needed
4. Deploy using your preferred method (Heroku, Vercel, Railway, etc.)

## Troubleshooting

### "Failed to authenticate with 42 API"
- Check your API credentials in `.env`
- Ensure they match your 42 API application

### "User not found"
- Verify the username exists in the 42 network
- Check for typos in the username

### Rate Limit Errors
- Wait 15 minutes before retrying
- The application caches tokens to minimize API calls

## API Endpoints

- `GET /` - Main application page
- `GET /api/user/:username` - Get user data from 42 API
- `POST /api/generate-banner` - Generate banner with HTML/Markdown code
- `GET /api/banner/:username` - Serve the banner as SVG image
