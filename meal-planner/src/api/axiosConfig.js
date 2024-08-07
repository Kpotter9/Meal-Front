import axios from "axios";

export default axios.create({
    baseURL: "https://c226-71-62-148-33.ngrok-free.app",
   headers: {"Access-Control-Allow-Origin": "*"}

});