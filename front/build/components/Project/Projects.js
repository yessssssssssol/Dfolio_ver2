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
const addBtn_png_1 = __importDefault(require("../../img/addBtn.png"));
require("../../styles/scss/Portfolio.scss");
const Api = __importStar(require("../../api"));
const Project_1 = __importDefault(require("./Project"));
const ProjectAddForm_1 = __importDefault(require("./ProjectAddForm"));
function Projects({ portfolioOwnerId, isEditable }) {
    // useState로 projects 상태를 생성함.
    const [projects, setProjects] = (0, react_1.useState)([]);
    // useState로 isAdding 상태를 생성함.
    const [isAdding, setIsAdding] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        // "projectlist/유저id"로 GET 요청하고, response의 data로 projects 세팅함.
        Api.get("projectlist", portfolioOwnerId).then((res) => setProjects(res.data));
    }, [portfolioOwnerId]);
    return (<react_bootstrap_1.Card id="portfolio-card-body">
      <react_bootstrap_1.Card.Body style={{ padding: "30px 40px" }}>
        <react_bootstrap_1.Card.Title>Projects</react_bootstrap_1.Card.Title>
        {/* Project list를 map 함수로 뿌려줌 */}
        {projects.map((project) => (<Project_1.default key={project.id} project={project} setProjects={setProjects} isEditable={isEditable}/>))}
        {/* isEditable === true -> + button  */}
        {isEditable && (<react_bootstrap_1.Row className="mt-3 text-center mb-4">
            <react_bootstrap_1.Col sm={{ span: 20 }}>
              <div className="portfolio-add-btn" onClick={() => setIsAdding(true)} style={{ cursor: "pointer" }}>
                <img className="portfolio-add-img" src={addBtn_png_1.default}/>
                Add Project
              </div>
            </react_bootstrap_1.Col>
          </react_bootstrap_1.Row>)}
        {isAdding && (<ProjectAddForm_1.default portfolioOwnerId={portfolioOwnerId} setProjects={setProjects} setIsAdding={setIsAdding}/>)}
      </react_bootstrap_1.Card.Body>
    </react_bootstrap_1.Card>);
}
exports.default = Projects;
