# 1337 GitHub Banner Generator ⚔️

A dynamic, animated banner generator for 1337 (42 Network) students to showcase their profile stats on GitHub with style!

## ✨ Features

- 🎮 **Animated Design**: Eye-catching SVG banners with smooth animations inspired by anime fighting games
- 📊 **Live Stats**: Displays current level, campus, coalition, wallet, and correction points
- 🔄 **Auto-Update**: Banner updates automatically from the 42 API
- 🎨 **Custom Colors**: Uses your coalition colors for personalization
- 📋 **Easy Integration**: Simple copy-paste HTML/Markdown code
- ⚡ **Rate Limiting**: Built-in rate limiting to respect 42 API limits

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- 42 API credentials (Client ID and Secret)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/AKL001/1337-GitHub-Banner.git
cd 1337-GitHub-Banner
```

2. Install dependencies:
```bash
npm install
```

3. Set up your environment variables:
```bash
cp .env.example .env
```

4. Edit `.env` and add your 42 API credentials:
```env
API42_CLIENT_ID=your_client_id_here
API42_CLIENT_SECRET=your_client_secret_here
PORT=3000
```

### Getting 42 API Credentials

1. Go to [42 API Applications](https://profile.intra.42.fr/oauth/applications)
2. Click "New Application"
3. Fill in the required information:
   - Name: 1337 GitHub Banner
   - Redirect URI: `http://localhost:3000/callback` (or your domain)
4. Copy your Client ID and Client Secret to your `.env` file

### Running the Application

```bash
npm start
```

The application will be available at `http://localhost:3000`

## 📖 How to Use

1. Open the web application in your browser
2. Enter your 1337 username
3. Click "Generate Banner"
4. Preview your personalized banner
5. Copy the generated HTML or Markdown code
6. Paste it into your GitHub profile README.md
7. Commit and enjoy your animated banner!

## 🎯 API Endpoints

### Get User Data
```
GET /api/user/:username
```
Returns user data from the 42 API.

### Generate Banner
```
POST /api/generate-banner
Body: { "username": "your_username" }
```
Generates banner and returns HTML/Markdown code.

### Serve Banner
```
GET /api/banner/:username
```
Returns the SVG banner image for the specified user.

## 🎨 Banner Customization

The banner includes:
- User profile image (circular with glowing border)
- Display name and username
- Email address
- Campus name
- Coalition name (with coalition colors)
- Level with animated progress bar
- Wallet balance (₳)
- Correction points

## 🔧 Technical Stack

- **Backend**: Node.js + Express
- **API Integration**: Axios for 42 API communication
- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Graphics**: SVG with CSS animations

## 🛡️ Rate Limiting

The application includes built-in rate limiting to respect the 42 API:
- Minimum 100ms between API requests
- Token caching to reduce authentication calls
- Automatic retry logic

## 📝 Example Usage

### In GitHub README (Markdown)
```markdown
![Your Name's 1337 Banner](http://your-domain.com/api/banner/your_username)
```

### In GitHub README (HTML)
```html
<div align="center">
  <img src="http://your-domain.com/api/banner/your_username" alt="Your Name's 1337 Banner" />
</div>
```

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

## 📜 License

MIT License - feel free to use this project for your own purposes!

## 🙏 Acknowledgments

- 42 Network for the API
- 1337 (42 Khouribga) community
- All contributors and users

## 📧 Contact

Created by [AKL001](https://github.com/AKL001)

---

Made with ❤️ for the 1337 community
