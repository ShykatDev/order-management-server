const app = require("./app")
const config  = require("./constants/config")

app.listen(config.port, ()=> {
    console.log(`Server started on http://localhost:${config.port}`);
});