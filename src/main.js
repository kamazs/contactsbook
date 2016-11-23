require("./styles/main.scss");
import axios from "axios";

document.write("Nu nez.");

axios.post("http://localhost:3001/create").then( res=>{
    document.write("POST Response: ", res.toString());
    console.log("POST Response: ", res);
});