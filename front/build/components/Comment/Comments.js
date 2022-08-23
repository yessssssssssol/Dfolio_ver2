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
const react_bootstrap_1 = require("react-bootstrap");
const Api = __importStar(require("../../api"));
const CommentCard_1 = __importDefault(require("./CommentCard"));
const CommentAddForm_1 = __importDefault(require("./CommentAddForm"));
function Comments({ portfolioOwnerId }) {
    //useState로 awards 상태를 생성함.
    const [comments, setComments] = (0, react_1.useState)([]);
    (0, react_1.useEffect)(() => {
        // "commentlist/유저id"로 GET 요청하고, response의 data로 comments를 세팅함.
        Api.get("commentlist", portfolioOwnerId).then((res) => setComments(res.data));
    }, [portfolioOwnerId]);
    return (<react_bootstrap_1.Card>
      <react_bootstrap_1.Card.Body>
        <react_bootstrap_1.Card.Title>Comments</react_bootstrap_1.Card.Title>
        <CommentAddForm_1.default portfolioOwnerId={portfolioOwnerId} setComments={setComments}/>
        {comments.map((comment) => (<CommentCard_1.default portfolioOwnerId={portfolioOwnerId} key={comment.id} comment={comment} setComments={setComments}/>))}
      </react_bootstrap_1.Card.Body>
    </react_bootstrap_1.Card>);
}
exports.default = Comments;
