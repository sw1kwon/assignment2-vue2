<template>
  <div class="popular-container">
    <div class="view-toggle">
      <button
          @click="setView('grid')"
          :class="{ active: currentView === 'grid' }"
      >
        <i class="fa fa-th"></i>
      </button>
      <button
          @click="setView('list')"
          :class="{ active: currentView === 'list' }"
      >
        <i class="fa fa-bars"></i>
      </button>
    </div>

    <MovieGrid
        v-if="currentView === 'grid'"
        :title="'인기 영화'"
        :fetchUrl="fetchURL()"
    />
    <MovieInfiniteScroll
        v-if="currentView === 'list'"
        :apiKey="apiKey"
        :genreCode="'28'"
        :sortingOrder="'all'"
        :voteEverage="-1"
    />
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import MovieGrid from "@/components/views/MovieGrid.vue";
import MovieInfiniteScroll from "@/components/views/MovieInfiniteScroll.vue";
import { URLService } from "@/util/movie/URL";

export default {
  name: "HomePopularView",
  components: {
    MovieGrid,
    MovieInfiniteScroll,
  },
  setup() {
    const apiKey = localStorage.getItem("TMDb-Key") || "";
    const currentView = ref("grid");

    const setView = (view) => {
      currentView.value = view;
      if (view === "grid") {
        disableScroll();
      } else {
        enableScroll();
      }
    };

    const fetchURL = () => {
      return URLService.getURL4PopularMovies(apiKey);
    };

    const disableScroll = () => {
      document.body.style.overflow = "hidden";
    };

    const enableScroll = () => {
      document.body.style.overflow = "auto";
    };

    onMounted(() => {
      disableScroll();
    });

    return {
      currentView,
      setView,
      fetchURL,
      apiKey,
    };
  },
};
</script>

<style scoped>
.popular-container {
  display: block;
}

.view-toggle {
  display: flex;
  justify-content: flex-end;
  margin-top: 50px;
}

.view-toggle button {
  background-color: #333;
  color: white;
  border: none;
  padding: 10px 15px;
  margin-left: 10px;
  cursor: pointer;
  border-radius: 4px;
}

.view-toggle button.active {
  background-color: #535bf2;
}

@media (max-width: 768px) {
  .view-toggle {
    margin-top: 80px;
  }
}
</style>
