import mainRouterView from './pages/RouterView.vue'
import home from './pages/home'
import firstpage from './pages/firstpage'
import secondpage from './pages/secondpage'
import thirdpage from './pages/thirdpage'



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
            { path: '/one', component: firstpage, name: '评论区'},
            { path: '/two', component: secondpage, name: '贪吃蛇'}
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
