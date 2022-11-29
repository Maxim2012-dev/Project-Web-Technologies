import HomePage from './components/HomePage.vue';
import LoginForm from './components/LoginForm.vue';
import SignUpForm from './components/SignUpForm.vue';

export default [
    { path:'/', name:'root', component:HomePage},
    { path:'/login', name:'login', component:LoginForm},
    { path:'/register', name:'register', component:SignUpForm}
    { path: '/Article/:id', name: 'ArticleDetails', component: ArticleDetails},
    { path: '/Article', name: 'Article', component: Article}
]
