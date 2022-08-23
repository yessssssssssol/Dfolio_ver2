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
const react_bootstrap_1 = require("react-bootstrap");
const Api = __importStar(require("../../api"));
function CommentAddForm({ portfolioOwnerId, setComments }) {
    //useState로 title 상태를 생성함.
    const [content, setContent] = (0, react_1.useState)("");
    const handleSubmit = (e) => __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        e.stopPropagation();
        // portfolioOwnerId를 user_id 변수에 할당함.
        const userId = portfolioOwnerId;
        // "content/register" 엔드포인트로 post요청함.
        yield Api.post("comment/register", {
            hostId: userId,
            content,
        });
        // "certificatelist/유저id" 엔드포인트로 get요청함.
        const res = yield Api.get("commentlist", userId);
        // certificates를 response의 data로 세팅함.
        setComments(res.data);
        // Certificate를 추가하는 과정이 끝났으므로, isAdding을 false로 세팅함.
    });
    return (<react_bootstrap_1.Form onSubmit={handleSubmit}>
      <react_bootstrap_1.InputGroup className="mb-3">
        <react_bootstrap_1.FormControl type="text" placeholder="Comment plz" aria-label="Comment plz" value={content} aria-describedby="basic-addon2" onChange={(e) => setContent(e.target.value)}/>
        <react_bootstrap_1.Button variant="outline-secondary" id="button-addon2" type="submit">
          Click
        </react_bootstrap_1.Button>
      </react_bootstrap_1.InputGroup>
    </react_bootstrap_1.Form>);
}
exports.default = CommentAddForm;
