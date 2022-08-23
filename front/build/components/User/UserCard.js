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
const react_router_dom_1 = require("react-router-dom");
const react_1 = __importStar(require("react"));
const App_1 = require("../../App");
const github_png_1 = __importDefault(require("../../img/github.png"));
const Api = __importStar(require("../../api"));
require("../../styles/scss/UserCard.scss");
function UserCard({ user, users, setIsEditing, isEditable, isNetwork, setUser, setUsers, }) {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const userState = (0, react_1.useContext)(App_1.UserStateContext);
    const handleButtonClick = (e) => __awaiter(this, void 0, void 0, function* () {
        e.stopPropagation();
        const res = yield Api.put(`like/${userState.user.id}`, {
            otherUserId: user.id,
        });
        const updatedUser = res.data;
        if (isNetwork) {
            const newUsers = users.map((user) => {
                if (user.id === updatedUser.id) {
                    return Object.assign(Object.assign({}, user), { likeCount: updatedUser.likeCount });
                }
                return user;
            });
            setUsers(newUsers);
        }
        else {
            setUser(updatedUser);
        }
    });
    // const { likeCount } = await api.post();
    // setLike(likeCount);
    return (<div className="card-container" id="card-container">
      <div className="card-box">
        <div className="card-isEditable-hover-container">
          <div className="card-img-container" onClick={() => navigate(`/users/${user.id}`)}>
            <img id="card-img" src={(user === null || user === void 0 ? void 0 : user.image) ? user === null || user === void 0 ? void 0 : user.image : "http://placekitten.com/200/200"} alt="user profile"/>
            {isNetwork && (<div id="card-hover" style={{ cursor: "pointer" }}>
                Portfolio 👉
              </div>)}
            {isEditable && (<div id="card-isEditable-hover" style={{ cursor: "pointer" }} onClick={() => setIsEditing(true)}>
                Profile Edit 👉
              </div>)}
          </div>
        </div>
        <div className="text-wrap">
          <div id="card-name">{user === null || user === void 0 ? void 0 : user.name}</div>
          <div id="card-email">{user === null || user === void 0 ? void 0 : user.email}</div>
          <div id="card-description">{user === null || user === void 0 ? void 0 : user.description}</div>
        </div>
        <a href={user === null || user === void 0 ? void 0 : user.profilelink} target="_blank">
          <div className="card-link-box" style={{ cursor: "pointer" }}>
            <img id="card-link-img" src={github_png_1.default} alt="github link icon"/>
            <p style={{ cursor: "pointer" }}>Github</p>
          </div>
        </a>
        <div className="card-like-box" onClick={handleButtonClick} style={{ cursor: "pointer" }}>
          <p id="like-text" style={{ cursor: "pointer" }}>
            Like 👍
          </p>
          <p id="like-num" style={{ cursor: "pointer" }}>
            {user === null || user === void 0 ? void 0 : user.likeCount}
          </p>
        </div>
      </div>
    </div>);
}
exports.default = UserCard;
