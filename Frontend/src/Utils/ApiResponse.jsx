import axios from 'axios';
const BASE_URL = 'http://127.0.0.1:5000/';
const ApiResponse = async (method, url, params = null,data=null, headers = null) => {
  try {
    const response = await axios({
      method,
      url: `${BASE_URL}${url}`,
      params,
      data, 
      headers: headers ? headers : {},
    });
    console.log(response);
    return response;
  } catch (error) {
    throw error.response.data;
  }
};
export default ApiResponse;