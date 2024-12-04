import { ref } from "vue";

export function useWishlistService() {
    const wishlist = ref<Movie[]>([]);

    const loadWishlist = () => {
        const storedWishlist = localStorage.getItem("movieWishlist");
        if (storedWishlist) {
            wishlist.value = JSON.parse(storedWishlist);
        }
    };

    const saveWishlist = () => {
        localStorage.setItem("movieWishlist", JSON.stringify(wishlist.value));
    };

    const toggleWishlist = (movie: Movie) => {
        const index = wishlist.value.findIndex((item) => item.id === movie.id);

        if (index === -1) {
            // 영화가 위시리스트에 없으면 추가
            wishlist.value.push(movie);
        } else {
            // 영화가 이미 위시리스트에 있으면 제거
            wishlist.value.splice(index, 1);
        }

        saveWishlist();
    };

    const isInWishlist = (movieId: number): boolean => {
        return wishlist.value.some((item) => item.id === movieId);
    };

    const getCurrentWishlist = (): Movie[] => {
        return wishlist.value;
    };

    // 초기 로드
    loadWishlist();

    return {
        wishlist,
        toggleWishlist,
        isInWishlist,
        getCurrentWishlist,
    };
}
