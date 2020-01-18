let webPush = require('web-push');

const vapidKeys = {
   "publicKey": "BHCqiZenAWNRzY5G9hKa1UN1R0BhnVK-c4j3mBFPpQ1Ay9j8cOO1PHwyTSaM5spPfGKwFCBa-dVRLUew4WuP7MM",
   "privateKey": "jlwrNQhRH2QTuRZLAqutmybILfTs-iUw9uOVX73Mk6Q"
};

webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/dGKjdxNGzUI:APA91bEtYIuyBhUy6D5ewSP86H5nSSuOe9KMR690aHBmu_H5XIZvbpvB1iXuhsj6R2xXUmsFOISdRxLwoyUQTWzMAoJvmFufHPYpxH2yhU4WT1xJSNqRKX582dhGBmhPbaLyKYecQHjB",
   "keys": {
      "p256dh": "BM9VIND72XYfV5FDDKmpSroaSunHyJ5+f9GeK1TpwnWcvrsKGxyW1zMehk2MjADyMN/Tw1kweK/RkWZ+z+J2V/c=",
      "auth": "wGpB5IqiRKVrODgoQvdkzg=="
   }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi dari Football App PWA!';

var options = {
   gcmAPIKey: '882952837140',
   TTL: 60
};

webPush.sendNotification(
   pushSubscription,
   payload,
   options
).then(response => {
 console.log(response);
}).catch(err => {
 console.log(err);
});