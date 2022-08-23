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
const Award_1 = __importDefault(require("./Award"));
const AwardAddForm_1 = __importDefault(require("./AwardAddForm"));
const addBtn_png_1 = __importDefault(require("../../img/addBtn.png"));
require("../../styles/scss/Portfolio.scss");
function Awards({ portfolioOwnerId, isEditable }) {
    //useState로 awards 상태를 생성함.
    const [awards, setAwards] = (0, react_1.useState)([]);
    //useState로 isAdding 상태를 생성함.
    const [isAdding, setIsAdding] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        // "awardlist/유저id"로 GET 요청하고, response의 data로 awards를 세팅함.
        Api.get("awardlist", portfolioOwnerId).then((res) => setAwards(res.data));
    }, [portfolioOwnerId]);
    return (<react_bootstrap_1.Card id="portfolio-card-body">
      <react_bootstrap_1.Card.Body style={{ padding: "30px 40px" }}>
        <react_bootstrap_1.Card.Title>Awards</react_bootstrap_1.Card.Title>
        {awards.map((award) => (<Award_1.default key={award.id} award={award} setAwards={setAwards} isEditable={isEditable}/>))}
        {isEditable && (<react_bootstrap_1.Row className="mt-3 text-center mb-4">
            <react_bootstrap_1.Col sm={{ span: 20 }}>
              <div className="portfolio-add-btn" style={{ cursor: "pointer" }} onClick={() => setIsAdding(true)}>
                <img className="portfolio-add-img" src={addBtn_png_1.default}/>
                Add Award
              </div>
            </react_bootstrap_1.Col>
          </react_bootstrap_1.Row>)}
        {isAdding && (<AwardAddForm_1.default portfolioOwnerId={portfolioOwnerId} setAwards={setAwards} setIsAdding={setIsAdding}/>)}
      </react_bootstrap_1.Card.Body>
    </react_bootstrap_1.Card>);
}
exports.default = Awards;
