import Home from "../Components/Pages/Home/Home";
import Login from "../Components/Pages/LoginPage/Login";
import PrivacyPolicy from "../Components/Pages/PrivacyPolicyPage/PrivacyPolicyPage";
;
const GeneralRoutes = [
    {path: '/',component: Home},
    {path: '/login',component: Login},
    {path: '/privacy',component: PrivacyPolicy},
];

export default GeneralRoutes;