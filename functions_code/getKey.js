var redis = require("redis");

module.exports = function (context, req) {
    context.con
    if (req.query.key) {
        client = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST, {password: process.env.REDIS_PASSWORD, tls: {servername: process.env.REDIS_HOST}});

        client.get(req.query.key, function(err, reply) {
            var reply_string = reply;
            if (reply !== null) {
                reply_string = reply.toString();
            }
            context.res = {
                headers: {"Content-Type": "application/json"},
                // status: 200, /* Defaults to 200 */
                body: {
                    "data": reply_string
                }
            };
            context.done();
            client.quit();
        });
    }
    else {
        context.res = {
            headers: {"Content-Type": "application/json"},
            status: 400,
            body: {"data": "Please pass a key on the query string or in the request body"}
        };
        context.done();
    }
};