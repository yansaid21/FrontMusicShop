import Home from "../Components/Pages/Home/Home";
import Login from "../Components/Pages/LoginPage/Login";
import NonVerified from "../Components/Pages/NonVerified/NonVerified";
import PrivacyPolicy from "../Components/Pages/PrivacyPolicyPage/PrivacyPolicyPage";
import Signup from "../Components/Pages/SignupPage/Signup";
import VerifyCode from "../Components/Pages/VerifyCode/VerifyCode";
;
const GeneralRoutes = [
    {path: '/',component: Home},
    {path: '/login',component: Login},
    {path: '/privacy',component: PrivacyPolicy},
    {path: '/signup',component: Signup},
    {path: '/nonVerified',component: NonVerified},
    {path: '/verifyCode',component: VerifyCode},
];

export default GeneralRoutes;