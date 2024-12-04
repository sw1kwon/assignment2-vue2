import { createRouter, createWebHistory } from 'vue-router';

// Import Vue components
import Home from '../views/HomeView.vue';
import HomeMain from '../views/home/HomeMainView.vue';
import HomePopular from '../views/home/HomePopularView.vue';
import HomeWishlist from '../views/home/HomeWishlistView.vue';
import HomeSearch from '../views/home/HomeSearchView.vue';
import SignIn from '../views/SignInView.vue';

// Define routes
const routes = [
  {
    path: '/',
    component: Home,
    children: [
      { path: '', component: HomeMain }, // 기본 자식 경로
      { path: 'popular', component: HomePopular },
      { path: 'wishlist', component: HomeWishlist },
      { path: 'search', component: HomeSearch },
    ],
  },
  {
    path: '/signin',
    component: SignIn,
  },
];

// Create router
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
