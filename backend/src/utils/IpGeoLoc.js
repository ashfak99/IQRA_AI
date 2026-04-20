import axios from 'axios';

async function getLocationFromIp(ip) {
  try {
    const cleanIp = ip.replace('::ffff:', '');
    const response = await axios.get(`http://ip-api.com/json/${cleanIp}`);
    if (response.data.status === 'success') {
      return {
        ip: cleanIp,
        city: response.data.city,
        region: response.data.regionName,
        country: response.data.country,
        lat: response.data.lat,
        lon: response.data.lon,
      };
    }
  } catch (err) {
    console.error('IP geolocation failed:', err.message);
  }
  return null; 
}

export {getLocationFromIp};