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
const Api = __importStar(require("../../api"));
require("../../styles/scss/RegisterForm.scss");
function RegisterForm() {
    const navigate = (0, react_router_dom_1.useNavigate)();
    //useState로 email 상태를 생성함.
    const [email, setEmail] = (0, react_1.useState)('');
    //useState로 password 상태를 생성함.
    const [password, setPassword] = (0, react_1.useState)('');
    //useState로 confirmPassword 상태를 생성함.
    const [confirmPassword, setConfirmPassword] = (0, react_1.useState)('');
    //useState로 name 상태를 생성함.
    const [name, setName] = (0, react_1.useState)('');
    //이메일이 abc@example.com 형태인지 regex를 이용해 확인함.
    const validateEmail = email => {
        return email
            .toLowerCase()
            .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    };
    //위 validateEmail 함수를 통해 이메일 형태 적합 여부를 확인함.
    const isEmailValid = validateEmail(email);
    // 비밀번호가 4글자 이상인지 여부를 확인함.
    const isPasswordValid = password.length >= 4;
    // 비밀번호와 확인용 비밀번호가 일치하는지 여부를 확인함.
    const isPasswordSame = password === confirmPassword;
    // 이름이 2글자 이상인지 여부를 확인함.
    const isNameValid = name.length >= 2;
    // 위 4개 조건이 모두 동시에 만족되는지 여부를 확인함.
    const isFormValid = isEmailValid && isPasswordValid && isPasswordSame && isNameValid;
    const handleSubmit = (e) => __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        try {
            // "user/register" 엔드포인트로 post요청함.
            yield Api.post('user/register', {
                email,
                password,
                name,
            });
            // 로그인 페이지로 이동함.
            navigate('/login');
        }
        catch (err) {
            console.log('회원가입에 실패하였습니다.', err);
        }
    });
    return (<div className="register-container">
      <div className="register-left-container">
        <div className="register-left-wrap">
          <h1>Dfolio</h1>
          <p>Discover the world’s top developers</p>
        </div>
      </div>
		  <div className="register-right-container">
			  <form className="right-top-wrap">
          <span>Already a member?</span>
          <button className="create-account-btn shadow-light" onClick={() => navigate("/login")}>
            Login
          </button>
        </form>
        <div id="register-right-logo">
          Dfolio
        </div>
			  <div className="register-input-container" onSubmit={handleSubmit}>
          <div>
            <div id="register-eamil-container">
              <react_bootstrap_1.Form.Control className="register-input-wrap input-id" id="register-input-id" placeholder="Email" type="email" autoComplete="on" value={email} onChange={(e) => setEmail(e.target.value)}/>
              {!isEmailValid && (<p className="text-primary" style={{ fontSize: "12px", margin: "5px 0 0 0" }}>
                  Email is invalid.
                </p>)}
            </div>
          </div>
          <div>
            <div id="register-password-container">
              <react_bootstrap_1.Form.Control className="register-input-wrap input-password" id="register-input-password" placeholder="Password" type="password" autoComplete="on" value={password} onChange={(e) => setPassword(e.target.value)}/>
              {!isPasswordValid && (<p className="text-primary" style={{ fontSize: "12px", margin: "5px 0 0 0" }}>
                Password is too short (minimum is 4 characters)
              </p>)}
            </div>
            <div id="register-confirm-password-container">
							<react_bootstrap_1.Form.Control className="register-input-wrap input-password input-confirm-password" id="register-input-confirm-password" placeholder="Confirm Password" type="password" autoComplete="on" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
              {!isPasswordSame && (<p className="text-primary" id="change-text-sucess" style={{ fontSize: "12px", margin: "5px 0 0 0" }}>
                  Passwords dose not match.
                </p>)}
						</div>
            <div id="register-name-container">
							<react_bootstrap_1.Form.Control className="register-input-name input-name" id="register-input-name" placeholder="Name" type="text" autoComplete="on" value={name} onChange={(e) => setName(e.target.value)}/>
								{!isNameValid && (<p className="text-primary" id="change-text-sucess" style={{ fontSize: "12px", margin: "5px 0 0 0" }}>
										Name is too short (minimum is 2 characters)
									</p>)}
						</div>
          </div>
          <form className="register-btn-wrap">
            <button className="register-btn" type="submit" disabled={!isFormValid}>Register</button>
          </form>
			  </div>
      </div>
	  </div>);
}
exports.default = RegisterForm;
