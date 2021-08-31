const app = require("./app");

const port = process.env.PORT || 3000;
app.initDb().then(function () {
    app.listen(port, function () {
        console.info(`app started at ${port}`);
    });
});