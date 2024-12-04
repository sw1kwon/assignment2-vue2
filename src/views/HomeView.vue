<template>
  <div id="app">
    <Header /> <!-- Angular의 <app-header>를 Vue의 컴포넌트로 대체 -->
    <div id="container">
      <router-view /> <!-- Angular의 <router-outlet>를 Vue의 <router-view>로 대체 -->
    </div>
  </div>
</template>

<script>
import Header from "@/components/header/Header.vue"; // Header 컴포넌트를 import

export default {
  name: "HomeView",
  components: {
    Header, // Header 컴포넌트를 등록
  },
};
</script>

<style scoped>
#app {
  width: 95vw; /* svw → vw (CSS 단위 수정) */
  height: 95vh; /* svh → vh */
  overflow-x: hidden;
  margin: auto;
}
</style>
