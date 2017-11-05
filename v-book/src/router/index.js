import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Category from '../components/Category';
import BookDetail from '../components/BookDetail';
import BookList from '../components/BookList';
import Reader from '../components/Reader';
import Register from '../components/Register';
import Login from '../components/Login';
import Person from '../components/Person';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/category',
      name: 'Category',
      component: Category
    },
    {
      path: '/bookdetail/:id',
      name: 'BookDetail',
      component: BookDetail
    },
    {
      path: '/reader/:id',
      name: 'Reader',
      component: Reader
    },
    {
      path: '/booklist/:id',
      name: 'BookList',
      component: BookList
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path:'/person',
      name:'Person',
      component: Person
    }
  ]
})
