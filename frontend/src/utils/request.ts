import axios from "axios";

const frontendPort = process.env.REACT_APP_BACKEND_PORT;
const base_url = `http://localhost:${frontendPort}`;

// also return error data
axios.interceptors.response.use((response) => {
  return response;
}, (error) => {
  return error.response;
});

// Method: GET implementation
export const GET = (url: string, token?: string) => {
  return axios.get(base_url + url, {
    headers: {
      "Authorization": token === undefined ? '' : token,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "*"
    }
  })
  .then((response) => { return response; })
  .catch((error) => { return error; });
};

// Method: POST implementation
export const POST = (url: string, params: any, token?: string) => {
  return axios.post(base_url + url, params, {
    headers: {
      "Authorization": token === undefined ? '' : token,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "*"
    }
  })
  .then((response) => { return response; })
  .catch((error) => { return error; });
};

// Method: PUT implementation
export const PUT = (url: string, params: any, token?: string) => {
  return axios.put(base_url + url, params, {
    headers: {
      "Authorization": token === undefined ? '' : token,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "*"
    }
  })
  .then((response) => { return response; })
  .catch((error) => { return error; });
};

// Method: DELETE implementation
export const DELETE = (url: string, params: any, token?: string) => {
  return axios.delete(base_url + url, {
    headers: {
      "Authorization": token === undefined ? '' : token,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "*"
    }, 
    data: params
  })
  .then((response) => { return response; })
  .catch((error) => { return error; });
};
