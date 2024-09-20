import app from "./app";
import config from "./config/config";
import http from "http";


http.createServer(app).listen(config.PORT, () => {
    console.log(`Server is running on port ${config.PORT}`);
});