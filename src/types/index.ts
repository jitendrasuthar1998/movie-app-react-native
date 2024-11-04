export type RootStackParamList = {
  Main: undefined;
  Login: undefined;
  SignUp: undefined;
  Home: undefined;
  Start: undefined;
  Details: { title: string; id: number };
};

export interface Url {
  backdrop: string;
  poster: string;
  profile: string;
}

export interface Movie {
  id: number;
  title: string;
  genre_ids: number[];
  poster_path: string;
  vote_average: number;
  release_date: string;
  [key: string]: any;
}
