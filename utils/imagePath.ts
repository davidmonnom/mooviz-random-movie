import { Movie } from "@/app/types";

export default function getImagePath(current: Movie | null) {
  return current?.poster_path
    ? process.env.NEXT_PUBLIC_TMDB_IMAGE_PATH + current?.poster_path
    : null;
}
