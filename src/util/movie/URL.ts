import axios from "axios";

export const URLService = {
    async fetchFeaturedMovie(apiKey: string) {
        try {
            const response = await axios.get(
                `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=ko-KR`
            );
            console.log(response.data.results[0]);
            return response.data.results[0];
        } catch (error) {
            console.error("Error fetching featured movie:", error);
            return null; // 에러 발생 시 null 반환
        }
    },

    getURL4PopularMovies(apiKey: string, page = 1): string {
        return `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=ko-KR&page=${page}`;
    },

    getURL4ReleaseMovies(apiKey: string, page = 2): string {
        return `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=ko-KR&page=${page}`;
    },

    getURL4GenreMovies(apiKey: string, genre: string, page = 1): string {
        return `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genre}&language=ko-KR&page=${page}`;
    },
};
