import { Genre, Movie } from "@/app/types";

export default function getGenreNames(availableGenres: Genre[], current: Movie) {
  return availableGenres
    .filter((genre) => current?.genre_ids.includes(genre.id))
    .map((genre) => genre.name);
}
