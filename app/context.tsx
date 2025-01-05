"use client";

import { createContext, useEffect, useState } from "react";
import crypto from "crypto";
import { Genre, Movie } from "./types";

type MovieCache = Record<
  string,
  { page: number; index: number; data: Movie[]; pageCount: number }
>;

type MoovizContextType = {
  movies: MovieCache;
  genres: string[];
  years: [number, number];
  countries: string[];
  language: string;
  current: Movie | null;
  voteAverage: number;
  loading: boolean;
  availableGenres: Genre[];
  getMoviesByHash: () => Movie[];
  setVoteAverage: (vote: number) => void;
  setCountries: (countries: string[]) => void;
  setGenres: (genre: string[]) => void;
  setYears: (years: [number, number]) => void;
  changeLanguage: (lang: string | null) => void;
  getMovie: () => void;
};

export const MoovizContext = createContext({} as MoovizContextType);

interface MoovizContextWrapper {
  children: React.ReactNode;
}

export const MoovizContextWrapper = ({ children }: MoovizContextWrapper) => {
  const [countries, setCountries] = useState<string[]>(["US", "FR"]);
  const [loading, setLoading] = useState<boolean>(false);
  const [movies, setMovies] = useState<MovieCache>({});
  const [current, setCurrent] = useState<Movie | null>(null);
  const [availableGenres, setAvailableGenres] = useState<Genre[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [years, setYears] = useState<[number, number]>([
    2019,
    new Date().getFullYear(),
  ]);
  const [voteAverage, setVoteAverage] = useState<number>(7);
  const [language, setLanguage] = useState<string>("en-US");

  const createSearchHash = () => {
    const url = constructUrl();
    return crypto.createHash("md5").update(url).digest("hex");
  };

  const constructUrl = () => {
    const language = localStorage.getItem("language") || "en-US";
    let url = `/api/discover?include_adult=false&include_video=false&sort_by=popularity.desc&language=${language}`;

    if (genres.length > 0) {
      url += `&with_genres=${genres.sort().join("|")}`;
    }

    if (countries.length > 0) {
      url += `&with_origin_country=${countries.sort().join("|")}`;
    }

    if (years.length === 2) {
      url += `&release_date.gte=${years[0]}-01-01&release_date.lte=${years[1]}-12-31`;
    }

    if (voteAverage > 0) {
      url += `&vote_average.gte=${voteAverage}`;
    }

    return url;
  };

  const getGenres = async () => {
    const response = await fetch(`/api/genre?language=${language}`);
    const result = await response.json();
    setAvailableGenres(result.data.genres);
  };

  const discover = async (occurence = 0, pageCount = 0) => {
    setLoading(true);
    const hash = createSearchHash();
    const serverLimit = movies[hash]?.pageCount || pageCount || 499;
    const newPage = Math.floor(Math.random() * serverLimit) + 1;

    try {
      const response = await fetch(constructUrl() + `&page=${newPage}`);
      const result = await response.json();
      const newData = {
        [hash]: {
          index: 0,
          data: result.data.results,
          page: result.data.page,
          pageCount: Math.min(result.data.total_pages, 499),
        },
      };

      if (result.status) {
        setMovies(newData);
        setCurrent(result.data.results[0] || null);

        if (result.data.results.length === 0 && occurence < 10) {
          await discover(occurence + 1, result.data.total_pages);
          return;
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getMovie = async () => {
    const hash = createSearchHash();
    if (movies[hash]) {
      const { index, data, page, pageCount } = movies[hash];
      if (index < data.length - 1) {
        setMovies({
          ...movies,
          [hash]: { index: index + 1, data, page, pageCount },
        });
        setCurrent(data[index + 1]);
      } else {
        await discover();
      }
    } else {
      await discover();
    }
  };

  const getMoviesByHash = () => {
    return movies[createSearchHash()]?.data || [];
  };

  const changeLanguage = async (lang: string | null) => {
    const language = lang || "en-US";
    localStorage.setItem("language", language);
    setLanguage(language);
  };

  const data = {
    movies,
    genres,
    years,
    language,
    loading,
    current,
    availableGenres,
    voteAverage,
    countries,
    setCountries,
    getMoviesByHash,
    setGenres,
    setVoteAverage,
    setYears,
    changeLanguage,
    getMovie,
  };

  useEffect(() => {
    const initGenres = async () => {
      setLanguage(localStorage.getItem("language") || "en-US");
      await getGenres();
      await getMovie();
    };

    initGenres();
  }, []);

  return (
    <MoovizContext.Provider value={{ ...data }}>
      {children}
    </MoovizContext.Provider>
  );
};
