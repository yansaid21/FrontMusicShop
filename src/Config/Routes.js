import AdminLayout from "../Components/Layouts/AdminLayout/AdminLayout";
import SellerLayout from "../Components/Layouts/SellerLayout/SellerLayout";
import AdminHome from "../Components/Pages/Admin/AdminHome/AdminHome";
import Home from "../Components/Pages/Home/Home";
import Login from "../Components/Pages/LoginPage/Login";
import NonVerified from "../Components/Pages/NonVerified/NonVerified";
import PrivacyPolicy from "../Components/Pages/PrivacyPolicyPage/PrivacyPolicyPage";
import SellerHome from "../Components/Pages/Seller/SellerHome/SellerHome";
import Signup from "../Components/Pages/SignupPage/Signup";
import VerifyCode from "../Components/Pages/VerifyCode/VerifyCode";

const AdminRoutes = [
    { path: '/admin/home', component: AdminHome,layout: AdminLayout }
];

const SellerRoutes = [
    { path: '/seller/home', component: SellerHome, layout: SellerLayout}
];

const GeneralRoutes = [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/privacy', component: PrivacyPolicy },
    { path: '/signup', component: Signup },
    { path: '/nonVerified', component: NonVerified },
    { path: '/verifyCode', component: VerifyCode },
    { path: '/pqrsf', component: VerifyCode },


];

const allRoutesProject = [...AdminRoutes, ...SellerRoutes, ...GeneralRoutes];

export { SellerRoutes, GeneralRoutes,AdminRoutes,allRoutesProject };
