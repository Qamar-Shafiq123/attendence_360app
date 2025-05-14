  const API_URL = "http://192.168.30.247:5000/send-notification-with-location";
export const sendNotificationWithLocation = async (
  latitude: number | string,
  longitude: number | string,
  token: string,
  cleanedNumber: string // ← pass this from caller
) => {
  const payLoad = {
    latitude: latitude.toString(),
    longitude: longitude.toString(),
    userId: cleanedNumber, // ← actual phone number here
    fcmToken: token,
  };

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payLoad),
    });

    const result = await response.json();
    console.log('✅ Server response:', result);
  } catch (error) {
    console.error('❌ API request failed:', error);
  }
};
