<template>
  <div class="movie-row">
    <h2>{{ title }}</h2>
    <div
        class="slider-container"
        @wheel="handleWheel"
        @touchstart="handleTouchStart"
        @touchmove="handleTouchMove"
        @touchend="handleTouchEnd"
        @mousemove="handleMouseMove"
        @mouseleave="handleMouseLeave"
    >
      <button
          class="slider-button left"
          @click="slide('left')"
          :style="{ opacity: showButtons && !atLeftEdge ? 1 : 0 }"
          :disabled="atLeftEdge"
      >
        &lt;
      </button>
      <div class="slider-window" ref="sliderWindow">
        <div
            class="movie-slider"
            ref="slider"
            :style="{ transform: `translateX(${-scrollAmount}px)` }"
        >
          <div
              v-for="movie in movies"
              :key="movie.id"
              class="movie-card"
              @click="toggleWishlist(movie)"
          >
            <img :src="getImageUrl(movie.poster_path)" :alt="movie.title" />
            <div v-if="isInWishlist(movie.id)" class="wishlist-indicator">👍</div>
          </div>
        </div>
      </div>
      <button
          class="slider-button right"
          @click="slide('right')"
          :style="{ opacity: showButtons && !atRightEdge ? 1 : 0 }"
          :disabled="atRightEdge"
      >
        &gt;
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, onUnmounted, watch } from "vue";
import axios from "axios";

export default defineComponent({
  name: "MovieRow",
  props: {
    title: {
      type: String,
      required: true,
    },
    fetchUrl: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const movies = ref([]);
    const scrollAmount = ref(0);
    const showButtons = ref(false);
    const isScrolling = ref(false);
    const touchStartX = ref(0);
    const touchEndX = ref(0);
    const maxScroll = ref(0);

    const slider = ref<HTMLElement | null>(null);
    const sliderWindow = ref<HTMLElement | null>(null);

    const atLeftEdge = computed(() => scrollAmount.value <= 0);
    const atRightEdge = computed(() => scrollAmount.value >= maxScroll.value);

    const fetchMovies = async () => {
      try {
        const response = await axios.get(props.fetchUrl);
        movies.value = response.data.results;
        calculateMaxScroll();
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    const getImageUrl = (path: string) => {
      return `https://image.tmdb.org/t/p/w300${path}`;
    };

    const slide = (direction: "left" | "right", amount: number | null = null) => {
      const slideAmount =
          amount || (sliderWindow.value?.clientWidth ?? 0) * 0.8;
      if (direction === "left") {
        scrollAmount.value = Math.max(0, scrollAmount.value - slideAmount);
      } else {
        scrollAmount.value = Math.min(
            maxScroll.value,
            scrollAmount.value + slideAmount
        );
      }
    };

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      if (isScrolling.value) return;

      isScrolling.value = true;
      const direction = event.deltaY > 0 ? "right" : "left";
      slide(direction);

      setTimeout(() => {
        isScrolling.value = false;
      }, 500);
    };

    const handleTouchStart = (event: TouchEvent) => {
      touchStartX.value = event.touches[0].clientX;
      touchEndX.value = event.touches[0].clientX;
    };

    const handleTouchMove = (event: TouchEvent) => {
      touchEndX.value = event.touches[0].clientX;
    };

    const handleTouchEnd = () => {
      const touchDiff = touchStartX.value - touchEndX.value;
      const minSwipeDistance = 50;

      if (Math.abs(touchDiff) > minSwipeDistance) {
        const direction = touchDiff > 0 ? "right" : "left";
        slide(direction, Math.abs(touchDiff));
      }
    };

    const calculateMaxScroll = () => {
      if (slider.value && sliderWindow.value) {
        maxScroll.value = Math.max(
            0,
            slider.value.scrollWidth - (sliderWindow.value.clientWidth || 0)
        );
      }
    };

    const toggleWishlist = (movie: any) => {
      console.log("Toggled wishlist for movie:", movie);
      // Implement your wishlist logic here
    };

    const isInWishlist = (movieId: number) => {
      // Implement wishlist check logic here
      return false;
    };

    const handleMouseMove = () => {
      showButtons.value = true;
    };

    const handleMouseLeave = () => {
      showButtons.value = false;
    };

    onMounted(() => {
      fetchMovies();
      window.addEventListener("resize", calculateMaxScroll);
    });

    onUnmounted(() => {
      window.removeEventListener("resize", calculateMaxScroll);
    });

    return {
      movies,
      scrollAmount,
      showButtons,
      atLeftEdge,
      atRightEdge,
      fetchMovies,
      getImageUrl,
      slide,
      handleWheel,
      handleTouchStart,
      handleTouchMove,
      handleTouchEnd,
      calculateMaxScroll,
      toggleWishlist,
      isInWishlist,
      handleMouseMove,
      handleMouseLeave,
      slider,
      sliderWindow,
    };
  },
});
</script>

<style scoped>
/* CSS 그대로 붙여 넣었습니다. */
</style>
