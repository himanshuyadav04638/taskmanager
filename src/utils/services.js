import axios from "axios";
export const BASE_URL = "https://jsonplaceholder.typicode.com";

export const getApi = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/todos`);
      if (response.status === 200) {
        return { res: response.data};
      } else return response.data;
    } catch (err) {
      if (err.response) throw err.response.data;
      else throw err.message;
    }
  };