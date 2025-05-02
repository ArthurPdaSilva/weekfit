import axios from "axios";

export default axios.create({
  baseURL: "https://api-w7tt.onrender.com",
  headers: {
    "Content-type": "application/json",
  },
});
