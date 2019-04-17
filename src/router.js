import Home from './components/Home';
import User from './components/User';
import Book from './components/Book';

export default [{
    path: '/',
    name: 'home',
    component: Home,
}, {
    path: '/user',
    name: 'user',
    component: User,
}, {
    path: '/book',
    name: 'book',
    component: Book
}]