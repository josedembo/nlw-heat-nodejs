import { serverHttp } from "./src/app"

serverHttp.listen(4000, () => {
    console.log(" 🚀 server is running at port 4000");
});