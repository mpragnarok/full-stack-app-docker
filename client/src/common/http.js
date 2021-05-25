import axios from 'axios';

const rootApiUrl = 'http://localhost:3050/api/v1/';
export default axios.create({
    baseURL: rootApiUrl,
    headers: {
        'Content-Type': 'application/json',
    },
});
