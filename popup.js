class QuickAI {
  constructor() {
    this.apiKey = null;
    this.init();
  }

  async init() {
    // Load saved API key
    const result = await chrome.storage.local.get(['groqApiKey']);
    this.apiKey = result.groqApiKey;

    // Set up UI
    this.setupEventListeners();

    // Show appropriate screen
    if (this.apiKey) {
      this.showMainScreen();
    } else {
      this.showSetupScreen();
    }
  }

  setupEventListeners() {
    // Setup screen
    document.getElementById('saveApiKey').addEventListener('click', () => this.saveApiKey());
    document.getElementById('apiKeyInput').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.saveApiKey();
    });

    // Main screen
    document.getElementById('askBtn').addEventListener('click', () => this.askQuestion());
    document.getElementById('questionInput').addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this.askQuestion();
      }
    });
    document.getElementById('settingsBtn').addEventListener('click', () => this.showSettings());
  }

  async saveApiKey() {
    const apiKey = document.getElementById('apiKeyInput').value.trim();

    if (!apiKey) {
      this.showError('Please enter your API key');
      return;
    }

    // Save to storage
    await chrome.storage.local.set({ groqApiKey: apiKey });
    this.apiKey = apiKey;

    this.showMainScreen();
  }

  async askQuestion() {
    const question = document.getElementById('questionInput').value.trim();

    if (!question) {
      return;
    }

    const askBtn = document.getElementById('askBtn');
    const answerDiv = document.getElementById('answer');

    // Show loading state
    askBtn.disabled = true;
    askBtn.textContent = 'Thinking...';
    answerDiv.className = 'answer loading';
    answerDiv.textContent = 'Getting your answer...';
    answerDiv.classList.remove('hidden');

    try {
      const selectedModel = document.getElementById('modelSelect').value;

      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: selectedModel,
          messages: [
            {
              role: 'system',
              content: 'You are a helpful assistant. Keep responses concise and under 100 words when possible.'
            },
            {
              role: 'user',
              content: question
            }
          ],
          max_tokens: 200,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.error?.message || `HTTP ${response.status}`;
        throw new Error(errorMessage);
      }

      const data = await response.json();
      const answer = data.choices[0].message.content;

      // Show answer
      answerDiv.className = 'answer';
      answerDiv.textContent = answer;

    } catch (error) {
      console.error('Error:', error);
      answerDiv.className = 'answer error';

      // Show detailed error message
      let errorMsg = 'Sorry, something went wrong.';
      if (error.message.includes('401') || error.message.includes('Unauthorized')) {
        errorMsg = '❌ Invalid API key. Please check your API key in settings.';
      } else if (error.message.includes('404') || error.message.includes('not found')) {
        errorMsg = `❌ Model not available. The selected model may not be supported by your API key.`;
      } else if (error.message.includes('429') || error.message.includes('rate limit')) {
        errorMsg = '❌ Rate limit exceeded. Please wait a moment and try again.';
      } else if (error.message) {
        errorMsg = `❌ Error: ${error.message}`;
      }

      answerDiv.textContent = errorMsg;
    } finally {
      // Reset button
      askBtn.disabled = false;
      askBtn.textContent = 'Ask AI';
    }
  }

  showMainScreen() {
    document.getElementById('setupScreen').classList.add('hidden');
    document.getElementById('mainScreen').classList.remove('hidden');
    document.getElementById('questionInput').focus();
  }

  showSetupScreen() {
    document.getElementById('mainScreen').classList.add('hidden');
    document.getElementById('setupScreen').classList.remove('hidden');
    document.getElementById('apiKeyInput').focus();
  }

  showSettings() {
    // Navigate to settings page
    window.location.href = 'settings.html';
  }

  showError(message) {
    // Simple error display for setup
    alert(message);
  }
}

// Initialize the app
new QuickAI();
