# Banner Example

## What the Banner Displays

The generated banner is an SVG image (800x250px) that displays:

### Layout

```
┌────────────────────────────────────────────────────────────────────────────┐
│                                                                            │
│  ┌──────┐                                                      💰 50 ₳    │
│  │      │    DISPLAY NAME                                      🎯 10 CP   │
│  │ IMG  │    username                                                     │
│  │      │    📧 email@student.1337.ma                                     │
│  └──────┘    🏫 1337 Khouribga                                            │
│              ⚔️ Coalition Name                                             │
│                                                                            │
│              Level 5  ████████████░░░░░░░░░░ 65.2%                        │
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘
```

## Visual Features

### Animations
- ✨ Pulsing background circles (multiple layers)
- 🌊 Gradient borders with glow effect
- 📊 Animated level progress bar (fills on load)
- 💫 Glowing profile image border

### Color Scheme
- **Background**: Dark gradient (navy to deep blue)
- **Primary**: Cyan (#00d9ff)
- **Secondary**: Neon green (#00ff88)
- **Text**: White with varying opacity
- **Coalition**: User's coalition color

### Typography
- Font: Courier New (monospace)
- Sizes: 
  - Display Name: 28px (bold)
  - Username: 16px
  - Details: 14px
  - Level: 16px

## Example SVG Structure

```xml
<svg width="800" height="250">
  <!-- Gradient backgrounds -->
  <!-- Animated circles -->
  <!-- Border with gradient -->
  <!-- Profile image (circular, clipped) -->
  <!-- User information (name, email, etc.) -->
  <!-- Level display with progress bar -->
  <!-- Stats (wallet, correction points) -->
</svg>
```

## Banner Variations

The banner automatically adapts to:
- **Different levels**: Progress bar shows exact percentage
- **Coalition colors**: Text color matches user's coalition
- **Long names**: Text stays within bounds
- **Missing data**: Gracefully handles N/A values

## Usage Example

### In Your GitHub Profile README

```markdown
# Hi there 👋

![My 1337 Banner](https://your-domain.com/api/banner/your_username)

## About Me
...
```

### Result
The banner will display above your profile description, showing:
- Your current progress at 1337
- Your identity (name, image, email)
- Your affiliation (campus, coalition)
- Your achievements (level, wallet, CP)

## Technical Details

- **Format**: SVG (Scalable Vector Graphics)
- **Size**: 800x250 pixels
- **Animation**: CSS-based (SMIL animations)
- **Caching**: 1 hour cache header
- **Compatibility**: Works in all modern browsers and GitHub

## Live Example

To see a live example, run the application and visit:
```
http://localhost:3000/api/banner/your_username
```

Replace `your_username` with any valid 1337 student username.

## Customization Notes

The banner is designed to be:
- **Professional**: Suitable for portfolios and resumes
- **Eye-catching**: Animated elements draw attention
- **Informative**: Shows key metrics at a glance
- **Consistent**: Matches 42/1337 branding
- **Dynamic**: Updates automatically with your progress

No manual updates needed - the banner always shows your latest stats!
