import Home from './components/Home';
import User from './components/User';
import Book from './components/Book';
import Detail from './components/Detail';
import Chapters from './components/Chapters';

export default [{
    path: '/',
    name: 'home',
    component: Home,
    meta: {
        bread: [{content: '主页', to: null }],
    },
}, {
    path: '/user',
    name: 'user',
    component: User,
    meta: {
        bread: [{content: '用户管理', to: null }],
    }
}, {
    path: '/book',
    name: 'book',
    component: Book,
    meta: {
        bread: [{content: '书籍管理', to: null }],
    }
}, {
    path: '/detail',
    name: 'detail',
    component: Detail,
    meta: {
        bread: [{
            content: '书籍管理', to: { name: 'book'} 
        }, {
            content: '书籍详情', to: null,
        }],
    }
}, {
    path: '/chapters',
    name: 'chapters',
    component: Chapters,
    meta: {
        bread: [{
            content: '书籍管理', to: { name: 'book'} 
        }, {
            content: '章节管理', to: null,
        }],
    }
}];