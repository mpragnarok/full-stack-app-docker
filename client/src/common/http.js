import axios from "axios";
const rootUrl = process.env.REACT_APP_API_HOST || "http://localhost:3050";
console.log("rootUrl", rootUrl);
const rootApiUrl = `${rootUrl}/api/v1/`;
export default axios.create({
  baseURL: rootApiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});
