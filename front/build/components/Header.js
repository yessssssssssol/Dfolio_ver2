"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_router_dom_1 = require("react-router-dom");
const react_1 = require("react");
const App_1 = require("../App");
require("../styles/scss/Header.scss");
const profile_1 = __importDefault(require("../img/profile"));
function Header() {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const location = (0, react_router_dom_1.useLocation)();
    const userState = (0, react_1.useContext)(App_1.UserStateContext);
    const dispatch = (0, react_1.useContext)(App_1.DispatchContext);
    // 전역상태에서 user가 null이 아니라면 로그인 성공 상태임.
    const isLogin = !!userState.user;
    // 로그아웃 클릭 시 실행되는 함수
    const logout = () => {
        // sessionStorage 에 저장했던 JWT 토큰을 삭제함.
        sessionStorage.removeItem('userToken');
        // dispatch 함수를 이용해 로그아웃함.
        dispatch({ type: 'LOGOUT' });
        // 기본 페이지로 돌아감.
        navigate('/');
    };
    const pathName = location.pathname;
    const headerId = pathName.substr(1);
    return activeKey = { location, : .pathname } >
        id;
    {
        headerId;
    }
     >
        id;
    'header-logo' > Dfolio < /h1>
        < div;
    id = 'header-menu-container' >
        style;
    {
        {
            cursor: 'pointer';
        }
    }
    onClick = {}();
    navigate('/network');
}
    >
        NetWork
    < /span>
    < /div>
    < div >
    style;
{
    {
        cursor: 'pointer';
    }
}
onClick = {}();
navigate('/Portfolio');
    >
        MyPortfolio
    < /span>
    < /div>
    < div;
className = 'header-dropdown-container';
id = 'my-page-img-btn' >
    id;
'header-dropdown-btn';
src = { profile: profile_1.default };
alt = 'user icon' /  >
    { isLogin } && className;
'header-dropdown-content' >
    id;
'logout-btn';
style = {};
{
    cursor: 'pointer';
}
onClick = { logout }
    >
        Logout
    < /a>
    < a;
id = 'delete-btn';
style = {};
{
    cursor: 'pointer';
}
onClick = {}();
navigate('/Withdrawal');
    >
        Withdrawal
    < /a>
    < /div>;
/div>
    < /div>
    < /header>
    < /Nav>;
;
exports.default = Header;
