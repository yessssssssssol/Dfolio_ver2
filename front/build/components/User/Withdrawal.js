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
const sweetalert2_1 = __importDefault(require("sweetalert2"));
const sweetalert_1 = __importDefault(require("sweetalert"));
const Api = __importStar(require("../../api"));
const App_1 = require("../../App");
const App_2 = require("../../App");
require("../../styles/scss/Withdrawal.scss");
function Withdrawal() {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const dispatch = (0, react_1.useContext)(App_1.DispatchContext);
    const userState = (0, react_1.useContext)(App_2.UserStateContext);
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
    // 비밀번호와 확인용 비밀번호가 일치하는지 여부를 확인함.
    // 이메일과 비밀번호 조건이 동시에 만족되는지 확인함.
    const isFormValid = isEmailValid && isPasswordValid;
    const handleSubmit = (e) => __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        let value;
        yield sweetalert2_1.default.fire({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this account!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then((isConfirm) => {
            if (isConfirm.value === true) {
                value = true;
            }
            else if (isConfirm.dismiss === "cancel") {
                value = false;
            }
        });
        try {
            if (value === true) {
                yield Api.post(`withdrawal/${userState.user.id}`, {
                    email,
                    password,
                });
                (0, sweetalert_1.default)("Your account has been deleted.", "Thank you for using Dfolio!", {
                    icon: "success",
                });
                dispatch({ type: "LOGOUT" });
                navigate("/login");
                sessionStorage.removeItem("userToken");
            }
            else if (value === false) {
                (0, sweetalert_1.default)("Your membership cancellation request has been cancelled.", {
                    icon: "error"
                });
                navigate("/");
            }
        }
        catch (err) {
            (0, sweetalert_1.default)("Failed to cancel membership.", "Please check your email or password", {
                icon: "warning"
            });
        }
    });
    return (<div className="withdrawal-container">
      <div className="withdrawal-left-container">
        <div className="withdrawal-left-wrap">
          <h1>Dfolio</h1>
          <p>Discover the world’s top developers</p>
        </div>
      </div>
      <div className="withdrawal-right-container">
        <div id="withdrawal-right-logo">Dfolio</div>
        <div id="withdrawal-text">
          <h5>Are you sure leave the Dfolio?</h5>
          <p>
            Enter the email address you used when you joined.
            <br />
          </p>
        </div>
        <div className="withdrawal-input-container" onSubmit={handleSubmit}>
          <div>
            <div id="withdrawal-eamil-container">
              <react_bootstrap_1.Form.Control className="withdrawal-input-wrap input-id" id="withdrawal-input-id" placeholder="Email" type="email" autoComplete="on" value={email} onChange={(e) => setEmail(e.target.value)}/>
              {!isEmailValid && (<p className="text-primary" style={{ fontSize: "12px", margin: "5px 0 0 0" }}>
                  Email is invalid.
                </p>)}
            </div>
          </div>
          <div>
            <div id="withdrawal-password-container">
              <react_bootstrap_1.Form.Control className="withdrawal-input-wrap input-password" id="withdrawal-input-password" placeholder="Password" type="password" autoComplete="on" value={password} onChange={(e) => setPassword(e.target.value)}/>
              {!isPasswordValid && (<p className="text-primary" style={{ fontSize: "12px", margin: "5px 0 0 0" }}>
                  Password is too short (minimum is 4 characters)
                </p>)}
            </div>
          </div>
          <form className="withdrawal-btn-wrap">
            <button className="withdrawal-btn-back" type="submit" onClick={() => navigate("/")}>
              Back
            </button>
            <button className="withdrawal-btn-delete" type="submit" disabled={!isFormValid}>
              Delete
            </button>
          </form>
        </div>
      </div>
    </div>);
}
exports.default = Withdrawal;
