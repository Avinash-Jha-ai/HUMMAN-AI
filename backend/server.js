import app from "./src/app.js"
import { config } from "./src/configs/config.js";
import connectDb from "./src/configs/db.js";

connectDb();
app.listen(config.PORT, () => {
    console.log(`Server is running on port ${config.PORT}`);
});