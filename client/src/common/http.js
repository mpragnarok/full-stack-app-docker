import axios from "axios";
const rootUrl = process.env.baseURL || "http://localhost:3050";
const rootApiUrl = `${rootUrl}/api/v1/`;
export default axios.create({
  baseURL: rootApiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});
