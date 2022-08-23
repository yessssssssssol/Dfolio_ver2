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
require("../../styles/scss/ResetPassword.scss");
const ResetPassword = () => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    //useState로 email 상태를 생성함.
    const [email, setEmail] = (0, react_1.useState)("");
    //이메일이 abc@example.com 형태인지 regex를 이용해 확인함.
    const validateEmail = (email) => {
        return email
            .toLowerCase()
            .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    };
    //위 validateEmail 함수를 통해 이메일 형태 적합 여부를 확인함.
    const isEmailValid = validateEmail(email);
    const handleSubmit = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        try {
            // "reset-password" 엔드포인트로 post요청함.
            yield Api.post("reset-password", { email });
            (0, sweetalert_1.default)("💌", "If this email address was used to create an account, instructions to reset your password will be sent to you. Please check your email.", "info");
            // 기본 페이지로 이동함.
            navigate("/", { replace: true });
        }
        catch (err) {
            console.log("로그인에 실패하였습니다.\n", err);
        }
    });
    return (<div className="reset-container">
      <div className="reset-left-container">
        <div className="reset-left-wrap">
          <h1>Dfolio</h1>
          <p>Discover the world’s top developers</p>
        </div>
      </div>
      <div className="reset-right-container">
        <form className="right-top-wrap">
          <span>Don't have an account?</span>
          <button className="create-account-btn shadow-light" onClick={() => navigate("/register")}>
            Register
          </button>
        </form>
        <div id="reset-right-logo">Dfolio</div>
        <div id="reset-text">
          <h5>Forgot Password?</h5>
          <p>
            Enter the email address you used when you joined and we’ll send you
            instructions to reset your password.
            <br />
            <br />
            For security reasons, we do NOT store your password. So rest assured
            that we will never send your password via email.
          </p>
        </div>
        <div className="reset-input-container" onSubmit={handleSubmit}>
          <div>
            <div id="reset-eamil-container">
              <react_bootstrap_1.Form.Control className="reset-input-wrap input-id" id="reset-input-id" placeholder="Email" type="email" autoComplete="on" value={email} onChange={(e) => setEmail(e.target.value)}/>
              {!isEmailValid && (<p className="text-primary" style={{ fontSize: "12px", margin: "5px 0 0 0" }}>
                  Email is invalid.
                </p>)}
            </div>
          </div>

          <form className="reset-btn-wrap">
            <button className="reset-btn" type="submit" disabled={!isEmailValid}>
              Send
            </button>
          </form>
        </div>
        <p id="reset-login-page-lending" onClick={() => navigate("/login")}>
					Already a member?
				</p>
      </div>
    </div>);
};
exports.default = ResetPassword;
