class Settings {
  constructor() {
    this.init();
  }

  async init() {
    // Load saved API key
    const result = await chrome.storage.local.get(['groqApiKey']);
    if (result.groqApiKey) {
      document.getElementById('apiKeyInput').value = result.groqApiKey;
    }

    // Set up event listeners
    this.setupEventListeners();
  }

  setupEventListeners() {
    document.getElementById('saveApiKey').addEventListener('click', () => this.saveApiKey());
    document.getElementById('clearApiKey').addEventListener('click', () => this.clearApiKey());
    document.getElementById('backBtn').addEventListener('click', () => this.goBack());
    document.getElementById('apiKeyInput').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.saveApiKey();
    });
  }

  async saveApiKey() {
    const apiKey = document.getElementById('apiKeyInput').value.trim();

    if (!apiKey) {
      this.showMessage('Please enter your API key', 'error');
      return;
    }

    try {
      // Save to storage
      await chrome.storage.local.set({ groqApiKey: apiKey });
      this.showMessage('API key saved successfully!', 'success');

      // Clear message after 3 seconds
      setTimeout(() => {
        this.hideMessage();
      }, 3000);
    } catch (error) {
      console.error('Error saving API key:', error);
      this.showMessage('Error saving API key. Please try again.', 'error');
    }
  }

  async clearApiKey() {
    try {
      await chrome.storage.local.remove('groqApiKey');
      document.getElementById('apiKeyInput').value = '';
      this.showMessage('API key cleared successfully!', 'success');

      // Clear message after 3 seconds
      setTimeout(() => {
        this.hideMessage();
      }, 3000);
    } catch (error) {
      console.error('Error clearing API key:', error);
      this.showMessage('Error clearing API key. Please try again.', 'error');
    }
  }

  goBack() {
    window.location.href = 'popup.html';
  }

  showMessage(text, type) {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = text;
    messageDiv.className = `message ${type}`;
    messageDiv.style.display = 'block';
  }

  hideMessage() {
    const messageDiv = document.getElementById('message');
    messageDiv.style.display = 'none';
  }
}

// Initialize the settings
new Settings();