"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DispatchContext = exports.UserStateContext = void 0;
const react_1 = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
const Api = __importStar(require("./api"));
const reducer_1 = require("./reducer");
const Header_1 = __importDefault(require("./components/Header"));
const LoginForm_1 = __importDefault(require("./components/User/LoginForm"));
const Network_1 = __importDefault(require("./components/User/Network"));
const RegisterForm_1 = __importDefault(require("./components/User/RegisterForm"));
const Portfolio_1 = __importDefault(require("./components/Portfolio"));
const Withdrawal_1 = __importDefault(require("./components/User/Withdrawal"));
const ResetPassword_1 = __importDefault(require("./components/User/ResetPassword"));
const ChangePassword_1 = __importDefault(require("./components/User/ChangePassword"));
exports.UserStateContext = (0, react_1.createContext)(null);
exports.DispatchContext = (0, react_1.createContext)(null);
function App() {
    // useReducer 훅을 통해 userState 상태와 dispatch함수를 생성함.
    const [userState, dispatch] = (0, react_1.useReducer)(reducer_1.loginReducer, {
        user: null,
    });
    const isLogin = !!userState.user;
    // 아래의 fetchCurrentUser 함수가 실행된 다음에 컴포넌트가 구현되도록 함.
    // 아래 코드를 보면 isFetchCompleted 가 true여야 컴포넌트가 구현됨.
    const [isFetchCompleted, setIsFetchCompleted] = (0, react_1.useState)(false);
    const fetchCurrentUser = react_1.default.useCallback(() => __awaiter(this, void 0, void 0, function* () {
        try {
            // 이전에 발급받은 토큰이 있다면, 이를 가지고 유저 정보를 받아옴.
            const res = yield Api.get('user/current');
            const currentUser = res.data;
            // dispatch 함수를 통해 로그인 성공 상태로 만듦.
            dispatch({
                type: 'LOGIN_SUCCESS',
                payload: currentUser,
            });
            console.log('%c sessionStorage에 토큰 있음.', 'color: #d93d1a;');
        }
        catch (_a) {
            console.log('%c SessionStorage에 토큰 없음.', 'color: #d93d1a;');
        }
        // fetchCurrentUser 과정이 끝났으므로, isFetchCompleted 상태를 true로 바꿔줌
        setIsFetchCompleted(true);
    }), []);
    // useEffect함수를 통해 fetchCurrentUser 함수를 실행함.
    (0, react_1.useEffect)(() => {
        fetchCurrentUser();
    }, []);
    if (!isFetchCompleted) {
        return 'loading...';
    }
    return (<exports.DispatchContext.Provider value={dispatch}>
      <exports.UserStateContext.Provider value={userState}>
        <react_router_dom_1.BrowserRouter>
          {isLogin && <Header_1.default />}
          <react_router_dom_1.Routes>
            <react_router_dom_1.Route path='/' exact element={<Portfolio_1.default />}/>
            <react_router_dom_1.Route path='/login' element={<LoginForm_1.default />}/>
            <react_router_dom_1.Route path='/register' element={<RegisterForm_1.default />}/>
            <react_router_dom_1.Route path='/users/:userId' element={<Portfolio_1.default />}/>
            <react_router_dom_1.Route path='/network' element={<Network_1.default />}/>
            <react_router_dom_1.Route path='*' element={<Portfolio_1.default />}/>
            <react_router_dom_1.Route path='/Withdrawal' element={<Withdrawal_1.default />}/>
            <react_router_dom_1.Route path='/reset-password' element={<ResetPassword_1.default />}/>
            <react_router_dom_1.Route path='/change-password' element={<ChangePassword_1.default />}/>
          </react_router_dom_1.Routes>
        </react_router_dom_1.BrowserRouter>
      </exports.UserStateContext.Provider>
    </exports.DispatchContext.Provider>);
}
exports.default = App;
