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
const UserEditForm_1 = __importDefault(require("./UserEditForm"));
const UserCard_1 = __importDefault(require("./UserCard"));
const Api = __importStar(require("../../api"));
function User({ portfolioOwnerId, isEditable, isNetwork }) {
    // useState 훅을 통해 isEditing 상태를 생성함.
    const [isEditing, setIsEditing] = (0, react_1.useState)(false);
    // useState 훅을 통해 user 상태를 생성함.
    const [user, setUser] = (0, react_1.useState)(null);
    // console.log("1", user);
    (0, react_1.useEffect)(() => {
        // "users/유저id" 엔드포인트로 GET 요청을 하고, user를 response의 data로 세팅함.
        Api.get("users", portfolioOwnerId).then((res) => setUser(res.data));
    }, [portfolioOwnerId]);
    return (<>
      {isEditing ? (<UserEditForm_1.default user={user} setIsEditing={setIsEditing} setUser={setUser}/>) : (<UserCard_1.default user={user} setIsEditing={setIsEditing} isEditable={isEditable} setUser={setUser} isNetwork={isNetwork}/>)}
    </>);
}
exports.default = User;
