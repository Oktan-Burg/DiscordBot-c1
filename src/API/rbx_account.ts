const axios = require('axios');

async function checkUserExists(username) {
  try {
    const response = await axios.get(`https://api.roblox.com/users/get-by-username?username=${username}`);
    const data = response.data;
    
    if (data.Id) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}

// Example usage
const username = 'example_username';
checkUserExists(username)