import axios from "axios";

const instance = axios.create({
  baseURL: "https://hd-note-taker-backend.onrender.com", 
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
