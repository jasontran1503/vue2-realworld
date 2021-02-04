import Vue from "vue";
import Router from "vue-router";
import LogIn from "@/components/LogIn";
import Register from "@/components/Register";
import Home from "@/components/Home";
import Editor from "@/components/Editor";
import Settings from "@/components/Settings";
import Profile from "@/components/Profile";
import Article from "@/components/Article";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      component: LogIn
    },
    {
      path: "/login",
      name: "LogIn",
      component: LogIn
    },
    {
      path: "/register",
      name: "Register",
      component: Register
    },
    {
      path: "/home",
      name: "Home",
      component: Home
    },
    {
      path: "/editor",
      name: "Editor",
      component: Editor,
      children: [{ path: ":slug", component: Editor }]
    },
    {
      path: "/editor/:slug",
      component: Editor
    },
    {
      path: "/settings",
      name: "Settings",
      component: Settings
    },
    {
      path: "/profile/:name",
      name: "Profile",
      component: Profile
    },
    {
      path: "/article/:slug",
      name: "Article",
      component: Article,
      // children: [{ path: ":slug", component: Article }]
    }
  ]
});
