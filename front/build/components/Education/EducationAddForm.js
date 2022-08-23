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
const react_bootstrap_1 = require("react-bootstrap");
const react_datepicker_1 = __importDefault(require("react-datepicker"));
const Api = __importStar(require("../../api"));
function EducationAddForm({ portfolioOwnerId, setEducations, setIsAdding }) {
    //school로 description 상태를 생성함.
    const [school, setSchool] = (0, react_1.useState)("");
    //major로 description 상태를 생성함.
    const [major, setMajor] = (0, react_1.useState)("");
    //position로 description 상태를 생성함.
    const [position, setPosition] = (0, react_1.useState)("");
    const [fromDate, setFromDate] = (0, react_1.useState)(new Date());
    // useState로 toDate 상태를 생성함.
    const [toDate, setToDate] = (0, react_1.useState)(new Date());
    const handleSubmit = (e) => __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        e.stopPropagation();
        // portfolioOwnerId를 user_id 변수에 할당함.
        const userId = portfolioOwnerId;
        // "Education/create" 엔드포인트로 post요청함.
        // console.log(position);
        // console.log(typeof position);
        yield Api.post("education/create", {
            userId: portfolioOwnerId,
            school,
            major,
            position,
            fromDate,
            toDate,
        });
        // "Educationlist/유저id" 엔드포인트로 get요청함.
        const res = yield Api.get("educationlist", userId);
        // Educations를 response의 data로 세팅함.
        setEducations(res.data);
        // Education를 추가하는 과정이 끝났으므로, isAdding을 false로 세팅함.
        setIsAdding(false);
    });
    const handleNameChange = react_1.default.useCallback((e) => {
        const target = e.currentTarget;
        setSchool(target.value);
    }, []);
    return (<react_bootstrap_1.Form onSubmit={handleSubmit}>
      <react_bootstrap_1.Form.Group controlId="formBasicTitle">
        <react_bootstrap_1.Form.Control type="text" placeholder="School" value={school} onChange={handleNameChange}/>
      </react_bootstrap_1.Form.Group>
      <react_bootstrap_1.Form.Group controlId="formBasicTitle" className="mt-3">
        <react_bootstrap_1.Form.Control type="text" placeholder="Major" value={major} onChange={(e) => setMajor(e.target.value)}/>
      </react_bootstrap_1.Form.Group>

      <react_bootstrap_1.FormGroup as={react_bootstrap_1.Row} style={{ padding: "0 5px !important" }}>
        <react_bootstrap_1.Col style={{ fontSize: "13px", color: "#777777" }}>
          Period(from/to)
        </react_bootstrap_1.Col>
        <react_bootstrap_1.Col>
          <react_datepicker_1.default selected={fromDate} 
    // dateFormat="yyyy년 MM월 dd일"
    onChange={(date) => setFromDate(date)}/>
        </react_bootstrap_1.Col>
        <react_bootstrap_1.Col>
          <react_datepicker_1.default selected={toDate} onChange={(date) => setToDate(date)}/>
        </react_bootstrap_1.Col>
      </react_bootstrap_1.FormGroup>

      <react_bootstrap_1.Form.Group style={{ fontSize: "15px", color: "#777777" }}>
        <div key={`inline-radio`} className="mb-3 mt-3">
          <react_bootstrap_1.Form.Check inline label="Degree expected" id="radio1" type="radio" name="position" value="Degree expected" checked={position === "Degree expected"} onChange={(e) => setPosition(e.target.value)}/>
          <react_bootstrap_1.Form.Check inline label="Bachelor's Degree" id="radio2" type="radio" name="position" value="Bachelor's Degree" checked={position === "Bachelor's Degree"} onChange={(e) => setPosition(e.target.value)}/>
          <react_bootstrap_1.Form.Check inline label="Master's Degree" id="radio3" type="radio" name="position" value="Master's Degree" checked={position === "Master's Degree"} onChange={(e) => setPosition(e.target.value)}/>
          <react_bootstrap_1.Form.Check inline label="Doctorate Degree" id="radio4" type="radio" name="position" value="Doctorate Degree" checked={position === "Doctorate Degree"} onChange={(e) => setPosition(e.target.value)}/>
        </div>
      </react_bootstrap_1.Form.Group>

      <react_bootstrap_1.Form.Group as={react_bootstrap_1.Row} className="mt-3 text-center">
        <react_bootstrap_1.Col sm={{ span: 20 }}>
          <react_bootstrap_1.Button variant="primary" type="submit" className="me-3">
            Save
          </react_bootstrap_1.Button>
          <react_bootstrap_1.Button variant="secondary" onClick={() => setIsAdding(false)}>
            Cancel
          </react_bootstrap_1.Button>
        </react_bootstrap_1.Col>
      </react_bootstrap_1.Form.Group>
    </react_bootstrap_1.Form>);
}
exports.default = EducationAddForm;
