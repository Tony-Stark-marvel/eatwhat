# EatWhat - AI Food Calorie Analyzer

A pure frontend web application that uses Google's Gemini AI to analyze food photos and estimate calories. Track your daily meals and monitor your calorie intake with ease.

## Features

- **AI-Powered Analysis**: Upload a photo of your meal and get instant analysis using Google's Gemini Vision API
- **Calorie Estimation**: Automatically estimates calories for each food item detected
- **Meal History**: Save and track your meals over time
- **Statistics Dashboard**: View today's and weekly calorie totals
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Privacy First**: All data stored locally in your browser - nothing sent to external servers except for API analysis

## Live Demo

Visit the live demo at: [Your GitHub Pages URL]

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- A Google Gemini API key (free to obtain)

### Obtaining a Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account (or create one)
3. Click "Create API Key"
4. Copy your API key
5. Paste it into the app when prompted

### Local Development

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/eatwhat.git
   cd eatwhat
   ```

2. Open `index.html` in your web browser, or use a local server:
   ```bash
   # Using Python 3
   python -m http.server 8000

   # Using Node.js (http-server)
   npx http-server

   # Using PHP
   php -S localhost:8000
   ```

3. Visit `http://localhost:8000` in your browser

## Deployment to GitHub Pages

### Option 1: Using GitHub Web Interface

1. Create a new repository on GitHub named `eatwhat`
2. Upload all files from this project
3. Go to Settings > Pages
4. Select "Deploy from a branch"
5. Choose "main" branch and "/ (root)" folder
6. Click Save
7. Your site will be available at `https://yourusername.github.io/eatwhat`

### Option 2: Using Git Command Line

```bash
# Initialize git repository
git init
git add .
git commit -m "Initial commit: EatWhat app"

# Add remote and push
git remote add origin https://github.com/yourusername/eatwhat.git
git branch -M main
git push -u origin main

# Enable GitHub Pages via GitHub web interface
# Settings > Pages > Source: Deploy from branch > main > / (root)
```

## How It Works

1. **Upload Photo**: Take a photo or upload an image of your meal
2. **Image Processing**: The image is compressed and converted to base64 format
3. **AI Analysis**: The image is sent to Google's Gemini API for analysis
4. **Results Display**: Food items and calorie estimates are displayed
5. **Save to History**: Optionally save the meal to your local history
6. **Track Progress**: View your daily and weekly calorie statistics

## File Structure

```
eatwhat/
├── index.html          # Main HTML file
├── css/
│   └── style.css       # Styles and design system
├── js/
│   ├── app.js          # Main application logic
│   ├── gemini.js       # Gemini API integration
│   └── storage.js      # LocalStorage management
├── assets/
│   └── icons/          # SVG icons
├── .nojekyll           # GitHub Pages configuration
└── README.md           # This file
```

## Privacy & Security

- **API Key**: Stored locally in your browser's localStorage
- **Meal Data**: All history stored locally - never uploaded to any server
- **Image Processing**: Images only sent to Google's Gemini API for analysis
- **No Tracking**: No analytics or tracking scripts included

## API Usage & Costs

- Google Gemini API offers a free tier with generous limits
- Each image analysis consumes API tokens
- Check [Google AI pricing](https://ai.google.dev/pricing) for current rates
- Monitor your usage in Google AI Studio

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Troubleshooting

### "Invalid API Key" Error
- Double-check your API key for typos
- Ensure you copied the entire key
- Verify your API key is active in Google AI Studio

### "API Quota Exceeded" Error
- You've reached your API rate limit
- Wait a few minutes and try again
- Check your quota in Google AI Studio

### Image Not Analyzing
- Ensure image is under 10MB
- Try a different image format (JPG, PNG, WEBP)
- Check your internet connection

### History Not Saving
- Clear browser cache and try again
- Ensure localStorage is not disabled
- Check browser storage permissions

## Future Enhancements

Potential features for future versions:
- Export data to CSV/JSON
- Set daily calorie goals
- Macronutrient breakdown (protein, carbs, fat)
- Meal categorization (breakfast, lunch, dinner)
- Photo gallery view
- Multiple language support
- Barcode scanning for packaged foods

## Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

## License

This project is open source and available under the MIT License.

## Acknowledgments

- Powered by Google's Gemini AI API
- Built with vanilla JavaScript, HTML5, and CSS3
- Designed for simplicity and privacy

---

Made with care for healthy eating habits
