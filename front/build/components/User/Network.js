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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
const react_bootstrap_1 = require("react-bootstrap");
const Api = __importStar(require("../../api"));
const UserCard_1 = __importDefault(require("./UserCard"));
const App_1 = require("../../App");
require("../../styles/scss/Network.scss");
function Network() {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const userState = (0, react_1.useContext)(App_1.UserStateContext);
    // useState 훅을 통해 users 상태를 생성함.
    const [users, setUsers] = (0, react_1.useState)([]);
    const [sortBy, setSortBy] = (0, react_1.useState)("updatedAt");
    const sort = [
        { name: "Recently", value: "updatedAt" },
        { name: "Like", value: "likeCount" },
    ];
    (0, react_1.useEffect)(() => {
        // 만약 전역 상태의 user가 null이라면, 로그인 페이지로 이동함.
        if (!userState.user) {
            navigate("/login");
            return;
        }
        // "userlist" 엔드포인트로 GET 요청을 하고, users를 response의 data로 세팅함.
        Api.get("userlist", sortBy).then((res) => setUsers(res.data));
    }, [userState]);
    const handelClickSortBtn = (e, value) => {
        setSortBy(value);
        Api.get("userlist", value).then((res) => setUsers(res.data));
    };
    return (<>
      <react_bootstrap_1.ButtonGroup id="network-toggle-btn-group">
        {sort.map((radio, idx) => (<react_bootstrap_1.ToggleButton key={idx} id={`radio-${idx}`} type="radio" variant="outline-secondary" name="radio" checked={sortBy === radio.value} onClick={(e) => handelClickSortBtn(e, radio.value)}>
            {radio.name}
          </react_bootstrap_1.ToggleButton>))}
      </react_bootstrap_1.ButtonGroup>
      <div className="userlist-container">
        {users.map((user) => (<UserCard_1.default key={user.id} user={user} isNetwork setUsers={setUsers} users={users}/>))}
      </div>
    </>);
}
exports.default = Network;
