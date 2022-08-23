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
// import Certificate from "./Certificate";
// import CertificateAddForm from "./CertificateAddForm";
// import Certificate from "./Certificate";
function CertificateEditForm({ currentCertificate, setCertificates, setIsEditing, }) {
    //useState로 title 상태를 생성함.
    const [title, setTitle] = (0, react_1.useState)(currentCertificate.title);
    //useState로 description 상태를 생성함.
    const [description, setDescription] = (0, react_1.useState)(currentCertificate.description);
    const [whenDate, setWhenDate] = (0, react_1.useState)(new Date(currentCertificate.whenDate));
    const handleSubmit = (e) => __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        e.stopPropagation();
        // currentCertificate의 user_id를 user_id 변수에 할당함.
        const userId = currentCertificate.userId;
        // "certificates/자격증 id" 엔드포인트로 PUT 요청함.
        yield Api.put(`certificates/${currentCertificate.id}`, {
            userId,
            title,
            description,
            whenDate,
        });
        // "certificatelist/유저id" 엔드포인트로 GET 요청함.
        const res = yield Api.get("certificatelist", userId);
        // certificates를 response의 data로 세팅함.
        setCertificates(res.data);
        // 편집 과정이 끝났으므로, isEditing을 false로 세팅함.
        setIsEditing(false);
    });
    return (<react_bootstrap_1.Form onSubmit={handleSubmit}>
      <react_bootstrap_1.Form.Group controlId="formBasicTitle">
        <react_bootstrap_1.Form.Control type="text" placeholder="Certificate" value={title} onChange={(e) => setTitle(e.target.value)}/>
      </react_bootstrap_1.Form.Group>

      <react_bootstrap_1.Form.Group controlId="formBasicDescription" className="mt-3">
        <react_bootstrap_1.Form.Control type="text" placeholder="Certificate Description" value={description} onChange={(e) => setDescription(e.target.value)}/>
      </react_bootstrap_1.Form.Group>

      <react_bootstrap_1.Form.Group as={react_bootstrap_1.Row} style={{ padding: "0 5px !important" }}>
        <react_bootstrap_1.Col xs="auto">
          <react_datepicker_1.default selected={whenDate} onChange={(date) => setWhenDate(date)}/>
        </react_bootstrap_1.Col>
      </react_bootstrap_1.Form.Group>

      <react_bootstrap_1.Form.Group as={react_bootstrap_1.Row} className="mt-3 text-center mb-4">
        <react_bootstrap_1.Col sm={{ span: 20 }}>
          <react_bootstrap_1.Button variant="primary" type="submit" className="me-3">
            Save
          </react_bootstrap_1.Button>
          <react_bootstrap_1.Button variant="secondary" onClick={() => setIsEditing(false)}>
            Cancel
          </react_bootstrap_1.Button>
        </react_bootstrap_1.Col>
      </react_bootstrap_1.Form.Group>
    </react_bootstrap_1.Form>);
}
exports.default = CertificateEditForm;
