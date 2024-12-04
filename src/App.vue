<template>
  <div id="app">
    <nav>
      <router-link to="/" exact-active-class="active-link">Home</router-link>
      <router-link to="/popular" exact-active-class="active-link">Popular</router-link>
      <router-link to="/wishlist" exact-active-class="active-link">Wishlist</router-link>
      <router-link to="/search" exact-active-class="active-link">Search</router-link>
      <router-link to="/signin" exact-active-class="active-link">Sign In</router-link>
    </nav>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #f4f4f4; /* 배경색 추가 */
  min-height: 100vh;
}

nav {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #333;
  padding: 15px 20px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

nav a {
  margin: 0 10px;
  color: white;
  font-weight: bold;
  text-decoration: none;
  transition: color 0.3s;
}

nav a:hover {
  color: #42b983; /* Hover 색상 */
}

nav a.active-link {
  color: #42b983;
  border-bottom: 2px solid #42b983;
}

.router-view {
  padding: 20px;
}
</style>
