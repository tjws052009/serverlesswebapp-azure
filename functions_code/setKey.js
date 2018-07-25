var redis = require("redis");

module.exports = function (context, req) {
    if (req.body && req.body.key && req.body.value) {
        client = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST, {password: process.env.REDIS_PASSWORD, tls: {servername: process.env.REDIS_HOST}});
        client.set(req.body.key, req.body.value);
        context.res = {
            body: {"data": "OK"}
        };
        client.quit();
    }
    else {
        context.res = {
            status: 400,
            body: {"data": "Please pass a key and value on the query string or in the request body"}
        };
    }

    context.done();
};