import HomePage from './components/HomePage.vue';
import LoginForm from './components/LoginForm.vue';
import SignUpForm from './components/SignUpForm.vue';
import ArticleDetails from './components/ArticleDetails.vue';
import OrganizerHome from './components/OrganizerHome';
import ProfilePage from './components/ProfilePage';
//import Article from './components/Article.vue';

export default [
    { path:'/', name:'root', component:HomePage},
    { path:'/login', name:'login', component:LoginForm},
    { path:'/register', name:'register', component:SignUpForm},
    { path:'/organizer-home', name:'organizerHome', component:OrganizerHome},
    { path:'/profile', name:'profilePage', component:ProfilePage},
    { path: '/Article/:id', name: 'ArticleDetails', component: ArticleDetails}
    //{ path: '/Article', name: 'Article', component: Article}
]
