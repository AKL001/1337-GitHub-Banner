const axios = require('axios');

class Api42Client {
  constructor() {
    this.baseURL = 'https://api.intra.42.fr';
    this.clientId = process.env.API42_CLIENT_ID;
    this.clientSecret = process.env.API42_CLIENT_SECRET;
    this.accessToken = null;
    this.tokenExpiry = null;
    
    // Rate limiting
    this.requestQueue = [];
    this.lastRequestTime = 0;
    this.minRequestInterval = 100; // 100ms between requests
  }

  async getAccessToken() {
    // Check if token is still valid
    if (this.accessToken && this.tokenExpiry && Date.now() < this.tokenExpiry) {
      return this.accessToken;
    }

    try {
      const response = await axios.post(`${this.baseURL}/oauth/token`, {
        grant_type: 'client_credentials',
        client_id: this.clientId,
        client_secret: this.clientSecret
      });

      this.accessToken = response.data.access_token;
      // Set expiry to 1 hour from now (tokens typically last 2 hours)
      this.tokenExpiry = Date.now() + (3600 * 1000);
      
      return this.accessToken;
    } catch (error) {
      console.error('Error getting access token:', error.response?.data || error.message);
      throw new Error('Failed to authenticate with 42 API');
    }
  }

  async rateLimitedRequest(requestFn) {
    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequestTime;
    
    if (timeSinceLastRequest < this.minRequestInterval) {
      await new Promise(resolve => 
        setTimeout(resolve, this.minRequestInterval - timeSinceLastRequest)
      );
    }
    
    this.lastRequestTime = Date.now();
    return await requestFn();
  }

  async getUserData(username) {
    // Validate username to prevent request forgery
    if (!username || typeof username !== 'string') {
      throw new Error('Invalid username');
    }
    
    // Sanitize username - only allow alphanumeric characters, hyphens, and underscores
    const sanitizedUsername = username.replace(/[^a-zA-Z0-9\-_]/g, '');
    
    if (sanitizedUsername !== username || sanitizedUsername.length === 0) {
      throw new Error('Username contains invalid characters');
    }
    
    if (sanitizedUsername.length > 50) {
      throw new Error('Username too long');
    }
    
    try {
      const token = await this.getAccessToken();
      
      return await this.rateLimitedRequest(async () => {
        const response = await axios.get(`${this.baseURL}/v2/users/${sanitizedUsername}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const user = response.data;
        
        return {
          login: user.login,
          displayname: user.displayname || user.login,
          email: user.email,
          image: user.image?.link || user.image_url,
          level: user.cursus_users?.find(c => c.cursus.name === '42cursus')?.level || 0,
          campus: user.campus?.[0]?.name || 'Unknown',
          coalition: user.coalitions?.[0]?.name || 'None',
          coalitionColor: user.coalitions?.[0]?.color || '#ffffff',
          wallet: user.wallet || 0,
          correctionPoint: user.correction_point || 0
        };
      });
    } catch (error) {
      console.error('Error fetching user data:', error.response?.data || error.message);
      
      if (error.response?.status === 404) {
        throw new Error('User not found');
      }
      
      throw new Error('Failed to fetch user data from 42 API');
    }
  }
}

module.exports = new Api42Client();
