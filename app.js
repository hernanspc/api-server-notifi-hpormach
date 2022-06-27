var express = require('express');
var FCM = require('fcm-node');
const SERVER_KEY = 'AAAAXfBwVY8:APA91bELECM6x2WH5D273Qu1BzkYHrZle3isb2zJ67wQt-tpjbc-eQmuoxXuxuUz62HjoWEKWkJmu_8doFtQoY1AAC1KuWEAhgN3eKQVUoyBvgI5AJyKjaGo0rHgrWlscc-edt9vK68U';

var app = express();

var port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('listening on port ', port)
})

app.use(express.json())
app.use(express.urlencoded({ extended: false }));

// fcm end point
app.post('/fcm', async (req, res, next) => {
    try {
        let fcm = new FCM(SERVER_KEY);

        let message = {
            to: '/topics/' + req.body.topic,
            notification: {
                title: req.body.title,
                body: req.body.body,
                sound: 'default',
                "click_action": "FCM_PLUGIN_ACTIVITY",
                "icon": "fcm_push_icon"
            }
        }

        fcm.send(message, (err, response) => {
            if (err) {
                next(err);
            } else {
                res.json(response);
            }
        })

    } catch (error) {
        next(error);
    }
})