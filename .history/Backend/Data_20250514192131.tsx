const API_URL = "http://192.168.30.247:5000/send-notification-with-location";

const sendNotificationWithLocation = async () =>
{
    const data = 
    {
        latitude: "latitude",
        longitude: "longitude",
        userId: "cleanedNumber",
        fcmToken: "token",
    };
    try
    {
        const response = await fetch(API_URL,
            {
                method: 'post',
                headers:
                {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            }
        );
        const result = await response.json();
        console.log('✅ Server response:', result);
    }
    catch(error)
    {
        console.error('❌ API request failed:', error);
    }
}