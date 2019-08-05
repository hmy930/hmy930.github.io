import mainRouterView from './components/RouterView.vue'
import home from './components/home'
import firstpage from './components/firstpage'
import secondpage from './components/secondpage'
import thirdpage from './components/thirdpage'



export const routes = [
    {
        path: '/home',
        component: home,
        name: '首页',
    },
    {
        path: '/',
        component: mainRouterView,
        hidden: false,
        name: '菜单一',
        children: [
            { path: '/one', component: firstpage, name: 'first page'},
            { path: '/two', component: secondpage, name: 'second page'}
        ]
    },
    {
        path: '/',
        component: mainRouterView,
        hidden: false,
        name: '菜单二',
        children: [
            { path: '/three', component: thirdpage, name: 'third page' }
        ],
    }

]
