// axios
import axios from "axios";

// 기본 axios instance
const basic = axios.create({
  // baseURL: '/api/v1/',
  baseURL: 'https://eprocurement.greatbee.kr/api/v1/',
});
// baseURL.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
// baseURL.defaults.headers.common['Access-Control-Allow-Headers'] = '*';
// baseURL.defaults.headers.common['Access-Control-Allow-Credentials'] = 'true';
export default basic;
