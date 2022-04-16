import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

/*//让路由守卫的错误不显示(用路由守卫记得加上这句，重写下抛出错误机制)
*
*  https://blog.csdn.net/weixin_48940933/article/details/117303240?utm_medium=distribute.pc_aggpage_search_result.none-task-blog-2~aggregatepage~first_rank_ecpm_v1~rank_v31_ecpm-2-117303240.pc_agg_new_rank&utm_term=%E8%B7%AF%E7%94%B1%E5%AE%88%E5%8D%AB%E6%8A%A5%E9%94%99&spm=1000.2123.3001.4430*/
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err);
};

Vue.use(VueRouter);

const routes = [
    {
        path: "/home",
        name: "Home",
        component: Home
    },
    {
        path: "/",
        redirect: "/home"
    },
    {
        path: "/list",
        name: "List",
        component: () =>
            import("../views/List.vue")
    },
    {
        path: "/cart",
        name: "Cart",
        component: () =>
            import("../views/Cart.vue")
    },
    {
        path: "/my",
        name: "My",
        component: () =>
            import("../views/My.vue")
    },
    {
        path: "/search",
        name: "Search",
        children: [
            {
                path: "/",
                name: "index",
                component: () =>
                    import("../views/search/Search-index.vue")
            },
            {
                path: "list",
                name: "list",
                component: () =>
                    import("../views/search/Search-list.vue")
            }
        ],
        component: () =>
            import("../views/Search")
    },
    {
        path: "/detail",
        name: "Detail",
        meta: {
            keepAlive: true
        },
        component: () =>
            import("../views/Detail")
    },
    {
        path: "/login",
        name: "Login",
        component: () =>
            import("../views/login/Login")
    },
    {
        path: "/userLogin",
        name: "UserLogin",
        component: () =>
            import("../views/login/UserLogin")
    },
    {
        path: "/register",
        name: "Register",
        component: () =>
            import("../views/login/Register.vue")
    },
    {
        path: "/recovery",
        name: "Recovery",
        children: [
            {
                path: "/",
                name: "index",
                component: () =>
                    import("../views/recovery/RecoveryIndex.vue")
            },
            {
                path: "btn",
                name: "btn",
                component: () =>
                    import("../views/recovery/RecoveryBtn.vue")
            }
        ],
        component: () =>
            import("../views/Search.vue")
    },
    {
        path: "/path",
        name: "Path",
        children: [
            {
                path: "/",
                name: "pathIndex",
                component: () =>
                    import("../views/path/Path-Index.vue")
            },
            {
                path: "path-list",
                name: "path-list",
                component: () =>
                    import("../views/path/Path-List.vue")
            }
        ],
        component: () =>
            import("../views/Path.vue")
    },
    {
        path: "/order",
        name: "Order",
        meta: {
            keepAlive: true
        },
        component: () =>
            import("../views/Order.vue")
    },
    {
        path: "/payment",
        name: "Payment",
        component: () =>
            import("../views/Payment.vue")
    }

];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});
router.beforeEach((to, from, next) => {
    let nextRoute = ["Payment", "Cart", "Path", "Order", "pathIndex", "path-list"];

    //是否是登录中
    let userInfo = JSON.parse(localStorage.getItem("teaUserInfo"));
//当前进入的页面，是不是需要验证哪些页面      不需要 直接放行 需要  看是否登录
    if (nextRoute.indexOf(to.name) >= 0) {
        if (!userInfo) {
            router.push("/login");
        }
    }
    next();
});

export default router;
