import HomePage from './components/HomePage.vue';
import LoginForm from './components/LoginForm.vue';
import SignUpForm from './components/SignUpForm.vue';

export default [
    { path:'/', component:HomePage},
    { path:'/login', component:LoginForm},
    { path:'/register', component:SignUpForm}
]