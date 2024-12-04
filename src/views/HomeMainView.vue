<template>
  <div class="home">
    <Banner :movie="featuredMovie" />

    <MovieRow title="인기 영화" :fetchUrl="popularMoviesUrl" />
    <MovieRow title="최신 영화" :fetchUrl="newReleasesUrl" />
    <MovieRow title="액션 영화" :fetchUrl="actionMoviesUrl" />
  </div>
</template>

<script>
import { onMounted, onBeforeUnmount, ref } from "vue";
import Banner from "@/components/home-main/Banner.vue";
import MovieRow from "@/components/home-main/MovieRow.vue";
import URLService from "@/util/movie/URL";

export default {
  name: "HomeMain",
  components: {
    Banner,
    MovieRow,
  },
  setup() {
    const apiKey = localStorage.getItem("TMDb-Key") || "";
    const featuredMovie = ref(null);
    const popularMoviesUrl = ref("");
    const newReleasesUrl = ref("");
    const actionMoviesUrl = ref("");
    const scrollListener = ref(null);

    const loadFeaturedMovie = async () => {
      featuredMovie.value = await URLService.fetchFeaturedMovie(apiKey);
    };

    const initializeScrollListener = () => {
      scrollListener.value = () => {
        const header = document.querySelector(".app-header");
        if (window.scrollY > 50) {
          header?.classList.add("scrolled");
        } else {
          header?.classList.remove("scrolled");
        }
      };

      window.addEventListener("scroll", scrollListener.value);
    };

    onMounted(() => {
      loadFeaturedMovie();
      initializeScrollListener();
      popularMoviesUrl.value = URLService.getURL4PopularMovies(apiKey);
      newReleasesUrl.value = URLService.getURL4ReleaseMovies(apiKey);
      actionMoviesUrl.value = URLService.getURL4GenreMovies(apiKey, "28");
    });

    onBeforeUnmount(() => {
      window.removeEventListener("scroll", scrollListener.value);
    });

    return {
      featuredMovie,
      popularMoviesUrl,
      newReleasesUrl,
      actionMoviesUrl,
    };
  },
};
</script>

<style scoped>
.home {
  display: block;
}

html,
body {
  overflow-y: scroll !important;
}

body {
  background-color: #141414 !important;
}
</style>
