import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Dashboard.vue"),
  },
  {
    path: "/about",
    name: "About",
    component: () => {
      import("../views/About.vue");
    },
  },
  {
    path: "/Dashboard",
    name: "Dashboard",
    component: () => import("../views/Dashboard.vue"),
  },
  {
    path: "/Patient",
    name: "Patient",
    component: () => import("../views/Patient.vue"),
  },
  {
    path: "/PatientList",
    name: "PatientList",
    component: () => import("../views/PatientList.vue"),
  },

  {
    path: "/Diary-Info",
    name: "Diary-Info",
    component: () => import("../views/Diary_Info.vue"),
  },

  {
    path: "/Advice-info",
    name: "Advice-info",
    component: () => import("../views/Advice_Info.vue"),
  },

  {
    path: "/Test",
    name: "Test",
    component: () => import("../views/Test.vue"),
  },
  {
    path: "/InfoHomework",
    name: "InfoHomework",
    component: () => import("../views/InfoHomework.vue"),
  },
  {
    path: "/ExamList",
    name: "ExamList",
    component: () => import("../views/ExamList.vue"),
  },{
    path: "/Homework",
    name: "Homework",
    component: () => import("../views/Homework.vue"),
  },
  {
    path: "/Login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/Logout",
    name: "Logout",
    component: () => import("../views/Logout.vue"),
  },
  ,
  {
    path: "/CheckHomework",
    name: "CheckHomework",
    component: () => import("../views/CheckHomework.vue"),
  },
  
  {
    path: "/HomeworkList",
    name: "HomeworkList",
    component: () => import("../views/HomeworkList.vue"),
  },
  {
    path: "/CreateHomework",
    name: "CreateHomework",
    component: () => import("../views/CreateHomework.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;