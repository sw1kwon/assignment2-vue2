<template>
  <div>
    <div class="bg-image"></div>
    <div class="container">
      <div id="phone">
        <div id="content-wrapper">
          <!-- Login Form -->
          <div :class="['card', { hidden: !isLoginVisible }]" id="login">
            <form @submit.prevent="handleLogin">
              <h1>Sign in</h1>
              <div class="input" :class="{ active: isEmailFocused || email }">
                <input
                    id="email"
                    type="email"
                    v-model="email"
                    @focus="focusInput('email')"
                    @blur="blurInput('email')"
                />
                <label for="email">Username or Email</label>
              </div>
              <div class="input" :class="{ active: isPasswordFocused || password }">
                <input
                    id="password"
                    type="password"
                    v-model="password"
                    @focus="focusInput('password')"
                    @blur="blurInput('password')"
                />
                <label for="password">Password</label>
              </div>
              <span class="checkbox remember">
                <input type="checkbox" id="remember" v-model="rememberMe" />
                <label for="remember" class="read-text">Remember me</label>
              </span>
              <span class="checkbox forgot">
                <a href="#">Forgot Password?</a>
              </span>
              <button :disabled="!isLoginFormValid">Login</button>
            </form>
            <a
                href="javascript:void(0)"
                class="account-check"
                @click.prevent="toggleCard"
            >
              Already an account? <b>Sign in</b>
            </a>
          </div>

          <!-- Register Form -->
          <div :class="['card', { hidden: isLoginVisible }]" id="register">
            <form @submit.prevent="handleRegister">
              <h1>Sign up</h1>
              <div class="input" :class="{ active: isRegisterEmailFocused || registerEmail }">
                <input
                    id="register-email"
                    type="email"
                    v-model="registerEmail"
                    @focus="focusInput('registerEmail')"
                    @blur="blurInput('registerEmail')"
                />
                <label for="register-email">Email</label>
              </div>
              <div class="input" :class="{ active: isRegisterPasswordFocused || registerPassword }">
                <input
                    id="register-password"
                    type="password"
                    v-model="registerPassword"
                    @focus="focusInput('registerPassword')"
                    @blur="blurInput('registerPassword')"
                />
                <label for="register-password">Password</label>
              </div>
              <div class="input" :class="{ active: isConfirmPasswordFocused || confirmPassword }">
                <input
                    id="confirm-password"
                    type="password"
                    v-model="confirmPassword"
                    @focus="focusInput('confirmPassword')"
                    @blur="blurInput('confirmPassword')"
                />
                <label for="confirm-password">Confirm Password</label>
              </div>
              <span class="checkbox remember">
                <input type="checkbox" id="terms" v-model="acceptTerms" />
                <label for="terms" class="read-text">
                  I have read <b>Terms and Conditions</b>
                </label>
              </span>
              <button :disabled="!isRegisterFormValid">Register</button>
            </form>
            <a
                href="javascript:void(0)"
                id="gotologin"
                class="account-check"
                @click.prevent="toggleCard"
            >
              Don't have an account? <b>Sign up</b>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import AuthService from "@/util/auth/auth.service";

export default {
  name: "SignIn",
  setup() {
    const router = useRouter();
    const authService = new AuthService();

    // Reactive state
    const isLoginVisible = ref(true);
    const email = ref("");
    const password = ref("");
    const registerEmail = ref("");
    const registerPassword = ref("");
    const confirmPassword = ref("");
    const rememberMe = ref(false);
    const acceptTerms = ref(false);

    const isFocused = reactive({
      email: false,
      password: false,
      registerEmail: false,
      registerPassword: false,
      confirmPassword: false,
    });

    // Computed properties
    const isLoginFormValid = computed(() => email.value && password.value);
    const isRegisterFormValid = computed(
        () =>
            registerEmail.value &&
            registerPassword.value &&
            confirmPassword.value &&
            registerPassword.value === confirmPassword.value &&
            acceptTerms.value
    );

    // Methods
    const toggleCard = () => {
      isLoginVisible.value = !isLoginVisible.value;
      setTimeout(() => {
        document
            .getElementById("register")
            ?.classList.toggle("register-swap");
        document.getElementById("login")?.classList.toggle("login-swap");
      }, 50);
    };

    const focusInput = (inputName) => {
      isFocused[inputName] = true;
    };

    const blurInput = (inputName) => {
      isFocused[inputName] = false;
    };

    const handleLogin = async () => {
      try {
        await authService.tryLogin(email.value, password.value);
        router.push("/");
      } catch (error) {
        alert("Login failed");
      }
    };

    const handleRegister = async () => {
      try {
        await authService.tryRegister(
            registerEmail.value,
            registerPassword.value
        );
        toggleCard();
      } catch (error) {
        alert(error.message);
      }
    };

    // Lifecycle hooks
    onMounted(() => {
      // Additional mounted logic if needed
    });

    onBeforeUnmount(() => {
      // Cleanup logic if needed
    });

    return {
      isLoginVisible,
      email,
      password,
      registerEmail,
      registerPassword,
      confirmPassword,
      rememberMe,
      acceptTerms,
      isFocused,
      isLoginFormValid,
      isRegisterFormValid,
      toggleCard,
      focusInput,
      blurInput,
      handleLogin,
      handleRegister,
    };
  },
};
</script>


<style scoped>
:root {
  --container-start-x: -50%;
  --container-end-x: -90%;
  --container-start-y: -58%;
  --container-end-y: -42%;
  --container-start-color: #ECECEC;
  --container-end-color: #100f0f;
}

.bg-image {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('https://images.unsplash.com/photo-1507041957456-9c397ce39c97?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
  background-size: cover;
  background-position: center;
}

.bg-image::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(27, 27, 27, 0.90);
}

a {
  text-decoration: none;
  margin: 0;
  padding: 0;
}

.container {
  height: 100svh;
  width: 100svw;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

#phone {
  width: 50svw;
  max-width: 80dvh;
  max-height: 50dvh;
  aspect-ratio: 3.35 / 4;
  border-radius: min(2.5cqw, 2.0cqh);
  text-align: center;
  transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

@media (max-height: 600px) {
  #phone {
    transform: translate(-50%, -50%) scale(0.5); /* Scale down on small screens */
  }
}

@media (max-height: 400px) {
  #phone {
    transform: translate(-50%, -50%) scale(0.3); /* Further scale down */
  }
}

.input input {
  background-color: transparent;
  border: none;
  border-bottom: 1px solid #9e9e9e;
  border-radius: 0;
  outline: none;
  height: 2.5rem;
  width: 100%;
  font-size: 1rem;
  padding: 0;
  box-sizing: content-box;
  transition: all 0.3s ease;
}

button {
  display: block;
  border-radius: 50px;
  border: none;
  width: 100%;
  background-color: #2069ff;
  color: #fff;
  padding: 17px;
  text-transform: uppercase;
  letter-spacing: 2px;
  box-shadow: 0px 10px 30px rgba(23, 83, 209, 0.3);
  transition: all 0.2s ease;
}

button:hover {
  box-shadow: 0px 2px 10px rgba(23, 83, 209, 0.4);
}

@keyframes register-swap {
  0% {
    transform: translate(0%, 0%);
  }
  50% {
    transform: translate(30%, 0%);
  }
  100% {
    transform: translate(0%, 0%);
  }
}

@keyframes login-swap {
  0% {
    transform: translate(0%, 0%);
  }
  50% {
    transform: translate(-70%, 0%);
  }
  100% {
    transform: translate(0%, 0%);
  }
}

@media (max-width: 768px) {
  #phone {
    width: 70%;
    transform: translate(-50%, -70%) scale(1); /* Scale down on small screens */
  }

  #login {
    top: -2svh !important;
  }

  #register {
    top: -2svh !important;
  }

  #register.hidden {
    top: calc(5svh + 90px) !important;
    z-index: 1;
  }

  #login.hidden {
    top: calc(5svh + 90px) !important;
    z-index: 1;
  }
}
</style>
