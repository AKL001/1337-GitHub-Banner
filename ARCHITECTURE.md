# Project Overview

## 1337 GitHub Banner Generator

This application creates dynamic, animated profile banners for 1337 (42 Network) students to showcase on their GitHub profiles.

### Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Client Browser                        │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  index.html - Main Page with Animated Background        │  │
│  │  - Enter username                                        │  │
│  │  - Preview banner                                        │  │
│  │  - Copy HTML/Markdown code                              │  │
│  └────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                     Express.js Server                        │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  Rate Limiting Middleware                               │  │
│  │  - 100 req/15min (general)                              │  │
│  │  - 50 req/15min (API)                                   │  │
│  └────────────────────────────────────────────────────────┘  │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  API Routes                                              │  │
│  │  - GET /api/user/:username                              │  │
│  │  - POST /api/generate-banner                            │  │
│  │  - GET /api/banner/:username (returns SVG)              │  │
│  └────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    42 API Client Module                      │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  - OAuth2 authentication with token caching             │  │
│  │  - Rate limiting (100ms between requests)               │  │
│  │  - Input validation and sanitization                    │  │
│  │  - Error handling                                        │  │
│  └────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                        42 Intra API                          │
│                  (api.intra.42.fr)                          │
└─────────────────────────────────────────────────────────────┘
```

### Key Components

#### 1. Frontend (public/)
- **index.html**: Main page with form and preview area
- **style.css**: Animated background with particles, responsive design
- **app.js**: Form handling, API calls, code copying functionality

#### 2. Backend (server.js + src/)
- **server.js**: Express setup with rate limiting
- **api42Client.js**: 42 API integration with security features
- **routes/api.js**: API endpoints and SVG banner generation

#### 3. Banner Features
The generated SVG banner includes:
- Animated background elements (pulsing circles)
- User profile image with glowing border
- Display name and username
- Email address
- Campus name
- Coalition name (with coalition colors)
- Level with animated progress bar
- Wallet balance
- Correction points
- Gradient borders and effects

### Security Features

1. **Rate Limiting**
   - Prevents DoS attacks
   - Separate limits for web and API endpoints

2. **Input Validation**
   - Username sanitization (alphanumeric + hyphens/underscores only)
   - Length checks (max 50 characters)
   - Type validation

3. **Token Management**
   - OAuth2 token caching
   - Automatic token refresh
   - Secure credential storage in environment variables

4. **Request Forgery Prevention**
   - URL validation
   - No direct user input in API calls
   - Sanitized username in API requests

### File Structure

```
1337-GitHub-Banner/
├── server.js                 # Main Express server
├── package.json             # Dependencies
├── .env.example             # Environment template
├── .gitignore              # Git ignore rules
├── README.md               # User documentation
├── DEMO.md                 # Demo instructions
├── public/                 # Static files
│   ├── index.html          # Main page
│   ├── css/
│   │   └── style.css       # Animated styles
│   └── js/
│       └── app.js          # Frontend logic
└── src/                    # Backend modules
    ├── api42Client.js      # 42 API integration
    └── routes/
        └── api.js          # API endpoints

```

### Dependencies

```json
{
  "express": "^5.1.0",           // Web framework
  "axios": "^1.13.0",            // HTTP client
  "dotenv": "^17.2.3",           // Environment config
  "express-rate-limit": "^7.6.0" // Rate limiting
}
```

### API Flow

1. User enters username in web form
2. Frontend sends POST to `/api/generate-banner`
3. Backend validates input and calls 42 API
4. 42 API returns user data
5. Backend generates SVG banner with user data
6. Backend returns banner URL and HTML/Markdown code
7. Frontend displays preview and code to copy
8. User copies code to GitHub README
9. GitHub renders banner by calling `/api/banner/:username`
10. Server generates and returns SVG on each request

### Deployment Considerations

- Environment variables must be set (API credentials)
- Node.js v14+ required
- Can be deployed to: Heroku, Vercel, Railway, DigitalOcean, etc.
- Update 42 API application settings with production domain
- Consider caching strategies for high traffic
- Monitor rate limits and adjust as needed

### Future Enhancements (Optional)

- [ ] Multiple theme options
- [ ] Custom color schemes
- [ ] Additional statistics (projects, achievements)
- [ ] Dark/light mode toggle
- [ ] Banner size options
- [ ] Export as PNG/GIF
- [ ] User favorites/history
- [ ] Analytics dashboard
