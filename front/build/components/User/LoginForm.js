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
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
const react_bootstrap_1 = require("react-bootstrap");
const App_1 = require("../../App");
const Api = __importStar(require("../../api"));
require("../../styles/scss/LoginForm.scss");
function LoginForm() {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const dispatch = (0, react_1.useContext)(App_1.DispatchContext);
    //useState로 email 상태를 생성함.
    const [email, setEmail] = (0, react_1.useState)("");
    //useState로 password 상태를 생성함.
    const [password, setPassword] = (0, react_1.useState)("");
    //이메일이 abc@example.com 형태인지 regex를 이용해 확인함.
    const validateEmail = (email) => {
        return email
            .toLowerCase()
            .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    };
    //위 validateEmail 함수를 통해 이메일 형태 적합 여부를 확인함.
    const isEmailValid = validateEmail(email);
    // 비밀번호가 4글자 이상인지 여부를 확인함.
    const isPasswordValid = password.length >= 4;
    //
    // 이메일과 비밀번호 조건이 동시에 만족되는지 확인함.
    const isFormValid = isEmailValid && isPasswordValid;
    const handleSubmit = (e) => __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        try {
            // "user/login" 엔드포인트로 post요청함.
            const res = yield Api.post("user/login", {
                email,
                password,
            });
            const emailData = res.data.email; // navigate 할 때, state: emailData를 사용하여 emailData를 함께 보내주고자 함
            const currentPassword = res.data.password; // passwordRouter 에서 필요하여 일단 보내보려고 함.
            if (res.data.passwordReset === true) {
                navigate("/change-password", {
                    state: {
                        email: emailData,
                        currentPassword: currentPassword,
                    },
                    replace: true,
                });
            }
            else if (res.data.passwordReset === false ||
                res.data.passwordReset === null) {
                // 유저 정보는 response의 data임.
                const user = res.data;
                // JWT 토큰은 유저 정보의 token임.
                const jwtToken = user.token;
                // sessionStorage에 "userToken"이라는 키로 JWT 토큰을 저장함.
                sessionStorage.setItem("userToken", jwtToken);
                // dispatch 함수를 이용해 로그인 성공 상태로 만듦.
                dispatch({
                    type: "LOGIN_SUCCESS",
                    payload: user,
                });
                // 기본 페이지로 이동함.
                navigate("/", { replace: true });
            }
        }
        catch (err) {
            console.log("로그인에 실패하였습니다.\n", err);
        }
    });
    return (<div className="login-container">
      <div className="login-left-container">
        <div className="login-left-wrap">
          <h1>Dfolio</h1>
          <p>Discover the world’s top developers</p>
        </div>
      </div>
      <div className="login-right-container">
        <form className="right-top-wrap">
          <span>Don't have an account?</span>
          <button className="create-account-btn shadow-light" onClick={() => navigate("/register")}>
            Register
          </button>
        </form>
        <div id="login-right-logo">Dfolio</div>
        <div className="login-input-container" onSubmit={handleSubmit}>
          <div>
            <div id="login-eamil-container">
              <react_bootstrap_1.Form.Control className="login-input-wrap input-id" id="login-input-id" placeholder="Email" type="email" autoComplete="on" value={email} onChange={(e) => setEmail(e.target.value)}/>
              {!isEmailValid && (<p className="text-primary" style={{ fontSize: "12px", margin: "5px 0 0 0" }}>
                  Email is invalid.
                </p>)}
            </div>
          </div>
          <div>
            <div id="login-password-container">
              <react_bootstrap_1.Form.Control className="login-input-wrap input-password" id="login-input-password" placeholder="Password" type="password" autoComplete="on" value={password} onChange={(e) => setPassword(e.target.value)}/>
              {!isPasswordValid && (<p className="text-primary" style={{ fontSize: "12px", margin: "5px 0 0 0" }}>
                  Password is too short (minimum is 4 characters)
                </p>)}
            </div>
            <p className="password-find" style={{
            fontSize: "12px",
            color: "gray",
            textAlign: "right",
            cursor: "pointer",
        }} onClick={() => navigate("/reset-password")}>
              Forgot password?
            </p>
          </div>
          <form className="login-btn-wrap">
            <button className="login-btn" type="submit" disabled={!isFormValid}>
              Login
            </button>
          </form>
        </div>
      </div>
    </div>);
}
exports.default = LoginForm;
