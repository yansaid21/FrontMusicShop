import Home from "../Components/Pages/Home/Home";
import Login from "../Components/Pages/LoginPage/Login";
import PrivacyPolicy from "../Components/Pages/PrivacyPolicyPage/PrivacyPolicyPage";
import Signup from "../Components/Pages/SignupPage/Signup";
;
const GeneralRoutes = [
    {path: '/',component: Home},
    {path: '/login',component: Login},
    {path: '/privacy',component: PrivacyPolicy},
    {path: '/signup',component: Signup},
];

export default GeneralRoutes;