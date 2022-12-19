import HomePage from './components/HomePage.vue';
import LoginForm from './components/LoginForm.vue';
import SignUpForm from './components/SignUpForm.vue';
import ArticleDetails from './components/Company/ArticleDetails.vue';
import OrganizerHome from './components/Organiser/OrganizerHome';
import ProviderHome from './components/Company/ProviderHome';
import ProfilePage from './components/ProfilePage';
import MyArticles from './components/Company/MyArticles.vue';

export default [
    { path:'/', name:'root', component:HomePage},
    { path:'/login', name:'login', component:LoginForm},
    { path:'/register', name:'register', component:SignUpForm},
    { path:'/organizer-home', name:'organizerHome', component:OrganizerHome},
    { path:'/provider-home', name:'providerHome', component:ProviderHome},
    { path:'/profile', name:'profilePage', component:ProfilePage},
    { path: '/Article/:id', name: 'ArticleDetails', component: ArticleDetails},
    { path: '/MyArticles', name: 'MyArticles', component: MyArticles}
]
