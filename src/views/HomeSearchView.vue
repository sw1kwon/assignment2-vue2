<template>
  <div class="container-search">
    <div class="container-search-bar">
      <MovieSearch @change-options="changeOptions" />
    </div>
    <div class="content-search">
      <MovieInfiniteScroll
          :apiKey="apiKey"
          :genreCode="genreId"
          :sortingOrder="sortId"
          :voteEverage="ageId"
      />
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import MovieSearch from "@/components/search/MovieSearch.vue";
import MovieInfiniteScroll from "@/components/search/MovieInfiniteScroll.vue";

export default {
  name: "HomeSearch",
  components: {
    MovieSearch,
    MovieInfiniteScroll,
  },
  setup() {
    const apiKey = localStorage.getItem("TMDb-Key") || "";
    const genreId = ref("28");
    const ageId = ref(-1);
    const sortId = ref("all");

    const genreCode = {
      "장르 (전체)": 0,
      Action: 28,
      Adventure: 12,
      Comedy: 35,
      Crime: 80,
      Family: 10751,
    };

    const sortingCode = {
      "언어 (전체)": "all",
      "영어": "en",
      "한국어": "ko",
    };

    const ageCode = {
      "평점 (전체)": -1,
      "9~10": 9,
      "8~9": 8,
      "7~8": 7,
      "6~7": 6,
      "5~6": 5,
      "4~5": 4,
      "4점 이하": -2,
    };

    const changeOptions = (options) => {
      genreId.value = `${genreCode[options.originalLanguage]}`;
      ageId.value = ageCode[options.translationLanguage];
      sortId.value = sortingCode[options.sorting];
    };

    return {
      apiKey,
      genreId,
      ageId,
      sortId,
      changeOptions,
    };
  },
};
</script>

<style scoped>
.container-search {
  margin-top: 50px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.container-search-bar {
  width: 100%;
  position: relative;
  display: flex;
  justify-content: right;
  margin-top: 10px;
}

.content-search {
  width: 100%;
}
</style>
