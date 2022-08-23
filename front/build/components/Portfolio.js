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
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const react_bootstrap_1 = require("react-bootstrap");
const App_1 = require("../App");
const Api = __importStar(require("../api"));
require("../styles/scss/Portfolio.scss");
function Portfolio() {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const params = (0, react_router_dom_1.useParams)();
    // useState 훅을 통해 portfolioOwner 상태를 생성함.
    const [portfolioOwner, setPortfolioOwner] = (0, react_1.useState)(null);
    // fetchPorfolioOwner 함수가 완료된 이후에만 (isFetchCompleted가 true여야) 컴포넌트가 구현되도록 함.
    // 아래 코드를 보면, isFetchCompleted가 false이면 "loading..."만 반환되어서, 화면에 이 로딩 문구만 뜨게 됨.
    const [isFetchCompleted, setIsFetchCompleted] = (0, react_1.useState)(false);
    const userState = (0, react_1.useContext)(App_1.UserStateContext);
    const fetchPorfolioOwner = (ownerId) => __awaiter(this, void 0, void 0, function* () {
        // 유저 id를 가지고 "/users/유저id" 엔드포인트로 요청해 사용자 정보를 불러옴.
        const res = yield Api.get('users', ownerId);
        // 사용자 정보는 response의 data임.
        const ownerData = res.data;
        // portfolioOwner을 해당 사용자 정보로 세팅함.
        setPortfolioOwner(ownerData);
        // fetchPorfolioOwner 과정이 끝났으므로, isFetchCompleted를 true로 바꿈.
        setIsFetchCompleted(true);
    });
    (0, react_1.useEffect)(() => {
        // 전역 상태의 user가 null이라면 로그인이 안 된 상태이므로, 로그인 페이지로 돌림.
        if (!userState.user) {
            navigate('/login', { replace: true });
            return;
        }
        if (params.userId) {
            // 만약 현재 URL이 "/users/:userId" 라면, 이 userId를 유저 id로 설정함.
            const ownerId = params.userId;
            // 해당 유저 id로 fetchPorfolioOwner 함수를 실행함.
            fetchPorfolioOwner(ownerId);
        }
        else {
            // 이외의 경우, 즉 URL이 "/" 라면, 전역 상태의 user.id를 유저 id로 설정함.
            const ownerId = userState.user.id;
            // 해당 유저 id로 fetchPorfolioOwner 함수를 실행함.
            fetchPorfolioOwner(ownerId);
        }
    }, [params, userState, navigate]);
    if (!isFetchCompleted) {
        return 'loading...';
    }
    return style = {};
    {
        padding: '2rem', background;
        '#F3F3F4';
    }
}
 >
    fluid >
    md;
'4';
style = {};
{
    marginTop: '100px';
}
 >
    portfolioOwnerId;
{
    portfolioOwner.id;
}
isEditable = { portfolioOwner, : .id === ((_a = userState.user) === null || _a === void 0 ? void 0 : _a.id) }
    /  >
    portfolioOwnerId;
{
    portfolioOwner.id;
}
// isEditable={portfolioOwner.id === userState.user?.id}
/>
    < /Col>
    < react_bootstrap_1.Col;
style = {};
{
    marginTop: '100px';
}
 >
    className;
'protfolio-card';
id = 'portfolio-Educations' >
    portfolioOwnerId;
{
    portfolioOwner.id;
}
isEditable = { portfolioOwner, : .id === ((_b = userState.user) === null || _b === void 0 ? void 0 : _b.id) }
    /  >
    /div>
    < div;
className = 'protfolio-card';
id = 'portfolio-Certificates' >
    portfolioOwnerId;
{
    portfolioOwner.id;
}
isEditable = { portfolioOwner, : .id === ((_c = userState.user) === null || _c === void 0 ? void 0 : _c.id) }
    /  >
    /div>
    < div;
className = 'protfolio-card';
id = 'portfolio-Certificates' >
    portfolioOwnerId;
{
    portfolioOwner.id;
}
isEditable = { portfolioOwner, : .id === ((_d = userState.user) === null || _d === void 0 ? void 0 : _d.id) }
    /  >
    /div>
    < div;
className = 'protfolio-card';
id = 'portfolio-Awards' >
    portfolioOwnerId;
{
    portfolioOwner.id;
}
isEditable = { portfolioOwner, : .id === ((_e = userState.user) === null || _e === void 0 ? void 0 : _e.id) }
    /  >
    /div>
    < /Col>
    < /Row>
    < /Container>
    < /div>;
;
exports.default = Portfolio;
