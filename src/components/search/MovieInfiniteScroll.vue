<template>
  <div class="movie-grid" ref="gridContainer">
    <div :class="['grid-container', currentView]">
      <div
          v-for="(movieGroup, i) in visibleMovieGroups"
          :key="i"
          :class="['movie-row', { full: movieGroup.length === rowSize }]"
      >
        <div
            v-for="movie in movieGroup"
            :key="movie.id"
            class="movie-card"
        >
          <img :src="getImageUrl(movie.poster_path)" :alt="movie.title" />
          <div class="movie-title">{{ movie.title }}</div>
          <div v-if="isInWishlist(movie.id)" class="wishlist-indicator">👍</div>
        </div>
      </div>
    </div>
    <div ref="loadingTrigger" class="loading-trigger">
      <div v-if="isLoading" class="loading-indicator">Loading...</div>
    </div>
    <button v-if="showTopButton" @click="scrollToTopAndReset" class="top-button">
      Top
    </button>
  </div>
</template>

<script lang="ts">
export default {
  name: "MovieGrid",
};
</script>

<style scoped>
/* 빈 스타일 */
</style>
