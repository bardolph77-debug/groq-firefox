# Quick AI - Groq Firefox Extension

⚡ Fast AI answers using Groq's lightning-fast models

## Features

- **Ultra-fast responses** powered by Groq's high-performance LLM infrastructure
- **Multiple AI models** including Llama, Compound (with web search), and more
- **Simple interface** - ask questions right from your browser
- **Secure** - your API key is stored locally in your browser
- **Firefox optimized** - native Firefox extension using Manifest V3

## Installation

### 1. Get a Groq API Key
1. Visit [Groq Console](https://console.groq.com/)
2. Sign up for a free account
3. Generate your API key

### 2. Install the Extension

#### Manual Installation (Temporary)
1. Download or clone this repository
2. Open Firefox and go to `about:debugging#/runtime/this-firefox`
3. Click "Load Temporary Add-on"
4. Select the `manifest.json` file from the extension folder
5. Click on the extension icon in your toolbar
6. Enter your Groq API key when prompted

#### Permanent Installation (Advanced)
1. Package the extension as a signed .xpi file through [Firefox Add-on Developer Hub](https://addons.mozilla.org/developers/)
2. Or use [web-ext](https://extensionworkshop.com/documentation/develop/getting-started-with-web-ext/) for local development

## Usage

1. Click the extension icon in your Firefox toolbar
2. Select your preferred AI model from the dropdown
3. Type your question in the text area
4. Click "Ask AI" or press Enter
5. Get your answer instantly!

### Available Models

- **⚡ Compound** - Web search + tools for up-to-date information
- **🦙 Llama 3.3 70B** - Versatile, high-quality responses
- **🚀 Llama 3.1 8B** - Fast responses for quick queries
- **🌙 Kimi K2** - Alternative model for varied perspectives
- **🦙 Llama 4 Maverick** - Latest Llama 4 model

## Security & Privacy

⚠️ **Important Security Notes:**

- Your API key is stored **locally** in Firefox using the browser.storage API
- The key is **never** transmitted to any server except Groq's official API
- Client-side storage is **not encrypted** - anyone with access to your computer can potentially access it
- **Never share** your API key or extension settings with others
- Consider using a dedicated API key for browser extensions

## Firefox-Specific Features

- **Native Firefox integration** - Built specifically for Firefox using Manifest V3
- **Firefox storage API** - Uses browser.storage.local for secure local storage
- **Optimized for Firefox** - Tested and compatible with Firefox 109+

## Troubleshooting

### Invalid API Key Error
- Double-check your API key in the settings
- Ensure there are no extra spaces when copying
- Verify your key is active at [Groq Console](https://console.groq.com/)

### Extension Not Loading
- Make sure you're using Firefox 109 or later
- Try reloading the extension from `about:debugging`
- Check the browser console for errors (Ctrl+Shift+J)

### API Rate Limits
- Free Groq accounts have rate limits
- If you hit limits, wait a few minutes and try again
- Consider upgrading your Groq plan for higher limits

## Development

### Project Structure
```
/
├── manifest.json       # Extension configuration (Firefox MV3)
├── popup.html         # Main popup interface
├── popup.js           # Popup logic and API calls
├── settings.html      # Settings page
├── settings.js        # Settings logic
├── icons/             # Extension icons
└── README.md          # This file
```

### Building from Source
1. Clone the repository
2. No build process required - it's plain HTML/CSS/JS
3. Load as temporary add-on in Firefox

### Using web-ext for Development
```bash
# Install web-ext
npm install -g web-ext

# Run in Firefox
web-ext run

# Build .zip package
web-ext build
```

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## License

MIT License - feel free to use and modify as needed.

## Support

For issues with:
- **The extension**: Open an issue on GitHub
- **Groq API**: Visit [Groq Support](https://groq.com/)
- **API keys**: Check [Groq Console](https://console.groq.com/)
- **Firefox add-ons**: See [Firefox Extension Workshop](https://extensionworkshop.com/)

## Changelog

### v1.0.1 (Latest)
- Added API response validation guards
- Improved error handling
- Added comprehensive README

### v1.0.0
- Initial release for Firefox
- Multiple model support
- Settings page
- API key management
- Firefox Manifest V3 compatible
