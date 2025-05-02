import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:5102/api",
  headers: {
    "Content-type": "application/json",
  },
});
