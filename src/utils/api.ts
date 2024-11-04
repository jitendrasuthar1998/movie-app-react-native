import axios from 'axios';
const BASE_URL = 'https://api.themoviedb.org/3';
const headers = {
  Authorization: 'bearer ' + process.env.TMDB_TOKEN,
};

export const fetchDataFromApi = async (url: string) => {
  try {
    const { data } = await axios.get(BASE_URL + url, {
      headers,
    });
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
