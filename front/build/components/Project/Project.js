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
const ProjectCard_1 = __importDefault(require("./ProjectCard"));
const ProjectEditForm_1 = __importDefault(require("./ProjectEditForm"));
function Project({ project, setProjects, isEditable }) {
    // useState 훅을 통해 isEditing 상태를 생성함.
    const [isEditing, setIsEditing] = (0, react_1.useState)(false);
    /*
    useEffect(() => {
      Api.get('projectlist', portfolioOwnerId).then(res =>
        setProjectList(res.data),
      );
    }, [portfolioOwnerId]);
    */
    return (<>
      {/* isEditing === true -> ProjectEditForm, false -> ProjectCard */}
      {isEditing ? (<ProjectEditForm_1.default currentProject={project} setIsEditing={setIsEditing} setProjects={setProjects}/>) : (<ProjectCard_1.default project={project} setIsEditing={setIsEditing} isEditable={isEditable} setProjects={setProjects}/>)}
    </>);
}
exports.default = Project;
