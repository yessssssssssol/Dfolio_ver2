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
const react_1 = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
const react_bootstrap_1 = require("react-bootstrap");
const sweetalert_1 = __importDefault(require("sweetalert"));
const Api = __importStar(require("../../api"));
require("../../styles/scss/ChangePassword.scss");
const ChangePassword = (data) => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const location = (0, react_router_dom_1.useLocation)();
    //useState로 password 상태를 생성함.
    const [password, setPassword] = (0, react_1.useState)('');
    //useState로 confirmPassword 상태를 생성함.
    const [confirmPassword, setConfirmPassword] = (0, react_1.useState)('');
    // db로 보낼 email주소를 임시 비밀번호로 로그인시 넘겨받아서 email변수에 저장.
    const email = location.state.email;
    const currentPassword = location.state.currentPassword;
    // 비밀번호가 4글자 이상인지 여부를 확인함.
    const isPasswordValid = password.length >= 4;
    // 비밀번호와 확인용 비밀번호가 일치하는지 여부를 확인함.
    const isPasswordSame = password === confirmPassword;
    const handleSubmit = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        try {
            // "change-password" 엔드포인트로 post요청함.
            yield Api.post("change-password", {
                email,
                password,
                confirmPassword,
                currentPassword,
            });
            (0, sweetalert_1.default)("🔑", "Password successfully updated.", "success");
            // 로그인 페이지로 이동함.
            navigate("/login", { replace: true });
        }
        catch (err) {
            console.log("Errrr 비밀번호 재설정 실패\n", err);
        }
    });
    return (<div className="change-container">
      <div className="change-left-container">
			  <div className="change-left-wrap">
				  <h1>Dfolio</h1>
				  <p>Discover the world’s top developers</p>
			  </div>
		  </div>
		  <div className="change-right-container">
			  <form className="right-top-wrap">
          <span>Don't have an account?</span>
          <button className="create-account-btn shadow-light" onClick={() => navigate("/register")}>
            Register
          </button>
        </form>
        <div id="change-right-logo">
          Dfolio
        </div>
				<div id="change-text">
					<h5>Reset your password</h5>
				</div>
			  <div className="change-input-container" onSubmit={handleSubmit}>
          <div>
						<div id="change-password-container">
              <react_bootstrap_1.Form.Control className="change-input-wrap input-password" id="change-input-password" placeholder="Password" type="password" autoComplete="on" value={password} onChange={(e) => setPassword(e.target.value)}/>
								{!isPasswordValid && (<p className="text-primary" id="change-text-sucess" style={{ fontSize: "12px", margin: "5px 0 0 0", cursor: "pointer" }}>
										Password is too short (minimum is 4 characters)
									</p>)}
            </div>
						<div id="change-confirm-password-container">
							<react_bootstrap_1.Form.Control className="change-input-wrap input-password input-confirm-password" id="change-input-confirm-password" placeholder="Confirm Password" type="password" autoComplete="on" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
              	{!isPasswordSame && (<p className="text-primary" id="change-text-sucess" style={{ fontSize: "12px", margin: "5px 0 0 0" }}>
										Passwords dose not match.
									</p>)}
						</div>
          </div>
          <form className="change-btn-wrap">
            <button className="change-btn" type="submit" disabled={!isPasswordValid}>Send</button>
          </form>
			  </div>
        <p id="change-login-page-lending" style={{ cursor: "pointer" }} onClick={() => navigate("/login")}>
					Already a member?
				</p>
      </div>
	</div>);
};
exports.default = ChangePassword;
