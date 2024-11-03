import axios from 'axios';
const BASE_URL = 'https://api.themoviedb.org/3';
const headers = {
  Authorization: 'bearer ' + process.env.TMDB_TOKEN,
};

export const fetchDataFromApi = async (url: string) => {
  try {
    console.log('fetching data from tmbd');
    console.log('url', url);
    const { data } = await axios.get(BASE_URL + url, {
      headers,
    });

    // console.log('data at fetchDataFromApi', data);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
