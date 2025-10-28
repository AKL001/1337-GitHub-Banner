// DOM Elements
const usernameInput = document.getElementById('username');
const generateBtn = document.getElementById('generateBtn');
const loadingEl = document.getElementById('loading');
const errorMessageEl = document.getElementById('error-message');
const previewSection = document.getElementById('preview-section');
const bannerPreview = document.getElementById('bannerPreview');
const markdownCode = document.getElementById('markdownCode');
const htmlCode = document.getElementById('htmlCode');
const userInfo = document.getElementById('userInfo');

// Event Listeners
generateBtn.addEventListener('click', generateBanner);
usernameInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    generateBanner();
  }
});

// Copy buttons
document.querySelectorAll('.copy-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    const targetId = this.getAttribute('data-target');
    const codeElement = document.getElementById(targetId);
    
    // Copy to clipboard
    navigator.clipboard.writeText(codeElement.textContent).then(() => {
      // Show copied state
      this.classList.add('copied');
      
      // Reset after 2 seconds
      setTimeout(() => {
        this.classList.remove('copied');
      }, 2000);
    }).catch(err => {
      console.error('Failed to copy:', err);
      showError('Failed to copy to clipboard');
    });
  });
});

async function generateBanner() {
  const username = usernameInput.value.trim();
  
  // Validate input
  if (!username) {
    showError('Please enter a username');
    return;
  }
  
  // Clear previous error
  hideError();
  
  // Show loading
  loadingEl.classList.add('active');
  generateBtn.disabled = true;
  previewSection.classList.add('hidden');
  
  try {
    // Call API to generate banner
    const response = await fetch('/api/generate-banner', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to generate banner');
    }
    
    const data = await response.json();
    
    // Display banner preview
    displayBanner(data);
    
  } catch (error) {
    console.error('Error:', error);
    showError(error.message || 'Failed to generate banner. Please try again.');
  } finally {
    // Hide loading
    loadingEl.classList.remove('active');
    generateBtn.disabled = false;
  }
}

function displayBanner(data) {
  const { userData, htmlCode: html, markdownCode: markdown, bannerURL } = data;
  
  // Update banner preview
  bannerPreview.src = bannerURL;
  bannerPreview.alt = `${userData.displayname}'s 1337 Banner`;
  
  // Update code blocks
  markdownCode.textContent = markdown;
  htmlCode.textContent = html;
  
  // Display user info
  userInfo.innerHTML = `
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; text-align: center;">
      <div>
        <strong style="color: var(--primary-color);">Username:</strong>
        <div style="color: var(--text-gray);">${userData.login}</div>
      </div>
      <div>
        <strong style="color: var(--primary-color);">Display Name:</strong>
        <div style="color: var(--text-gray);">${userData.displayname}</div>
      </div>
      <div>
        <strong style="color: var(--primary-color);">Level:</strong>
        <div style="color: var(--text-gray);">${userData.level.toFixed(2)}</div>
      </div>
      <div>
        <strong style="color: var(--primary-color);">Campus:</strong>
        <div style="color: var(--text-gray);">${userData.campus}</div>
      </div>
      <div>
        <strong style="color: var(--primary-color);">Coalition:</strong>
        <div style="color: ${userData.coalitionColor};">${userData.coalition}</div>
      </div>
      <div>
        <strong style="color: var(--primary-color);">Wallet:</strong>
        <div style="color: var(--text-gray);">${userData.wallet} ₳</div>
      </div>
    </div>
  `;
  
  // Show preview section with animation
  previewSection.classList.remove('hidden');
  
  // Scroll to preview
  setTimeout(() => {
    previewSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, 100);
}

function showError(message) {
  errorMessageEl.textContent = message;
  errorMessageEl.classList.add('active');
}

function hideError() {
  errorMessageEl.textContent = '';
  errorMessageEl.classList.remove('active');
}

// Add some extra flair with keyboard shortcuts
document.addEventListener('keydown', (e) => {
  // Ctrl/Cmd + Enter to generate
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
    generateBanner();
  }
});

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
  konamiCode.push(e.key);
  konamiCode = konamiCode.slice(-konamiSequence.length);
  
  if (konamiCode.join(',') === konamiSequence.join(',')) {
    // Trigger special animation
    document.body.style.animation = 'rainbow 2s linear infinite';
    setTimeout(() => {
      document.body.style.animation = '';
    }, 5000);
  }
});

// Add rainbow animation
const style = document.createElement('style');
style.textContent = `
  @keyframes rainbow {
    0% { filter: hue-rotate(0deg); }
    100% { filter: hue-rotate(360deg); }
  }
`;
document.head.appendChild(style);
