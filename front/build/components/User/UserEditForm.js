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
const Api = __importStar(require("../../api"));
const sweetalert_1 = __importDefault(require("sweetalert"));
function UserEditForm({ user, setIsEditing, setUser }) {
    //useState로 name 상태를 생성함.
    const [name, setName] = (0, react_1.useState)(user.name);
    //useState로 email 상태를 생성함.
    const [email, setEmail] = (0, react_1.useState)(user.email);
    //useState로 description 상태를 생성함.
    const [description, setDescription] = (0, react_1.useState)(user.description);
    //useState로 profilelink 상태를 생성함.
    const [profilelink, setProfilelink] = (0, react_1.useState)(user.profilelink);
    const [image, setImage] = (0, react_1.useState)(user.image);
    // useRef 함수로 current 속성을 가지고 있는 객체 반환 재랜더링 하지 않기 위해 사용
    const fileInput = (0, react_1.useRef)(null);
    const handleSubmit = (e) => __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        // "users/유저id" 엔드포인트로 PUT 요청함.
        const res = yield Api.put(`users/${user.id}`, {
            name,
            email,
            description,
            profilelink,
            image,
        });
        // 유저 정보는 response의 data임.
        const updatedUser = res.data;
        // 해당 유저 정보로 user을 세팅함.
        setUser(updatedUser);
        // isEditing을 false로 세팅함.
        setIsEditing(false);
    });
    const onChange = (e) => {
        // 화면에 프로필 사진 표시 && file 객체를 dataUrl을 통해 이미지로 변환
        let file = e.target.files[0];
        if (file.size > 45000) {
            (0, sweetalert_1.default)("Oops", "45KB 미만의 사진을 선택해주세요 😂", "error");
        }
        else {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    const dataURL = reader.result;
                    // readyState === 2 -> DONE 작업 완료
                    setImage(dataURL);
                    // console.log("dataURL", dataURL);
                    return;
                }
                else {
                    //업로드 취소/실패할 시
                    setImage("http://placekitten.com/200/200");
                    return;
                }
            };
            reader.readAsDataURL(file);
        }
    };
    return (<react_bootstrap_1.Card className="edit-card-container">
      <react_bootstrap_1.Card.Body>
        <react_bootstrap_1.Row className="justify-content-md-center">
          <div className="justify-content-md-center row">
            <img className="card-img mb-3" src={image} style={{ width: "10rem", height: "8rem", borderRadius: "70%" }} onClick={() => {
            fileInput.current.click();
        }}/>
          </div>
          <input type="file" name="imageFile" accept="image/*" ref={fileInput} onChange={onChange}/>
          <br />
        </react_bootstrap_1.Row>
        <react_bootstrap_1.Form onSubmit={handleSubmit}>
          <react_bootstrap_1.Form.Group controlId="useEditName" className="mb-3">
            <react_bootstrap_1.Form.Control type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}/>
          </react_bootstrap_1.Form.Group>

          <react_bootstrap_1.Form.Group controlId="userEditEmail" className="mb-3">
            <react_bootstrap_1.Form.Control type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} readOnly/>
          </react_bootstrap_1.Form.Group>

          <react_bootstrap_1.Form.Group controlId="userEditDescription">
            <react_bootstrap_1.Form.Control type="text" placeholder="One-line introduction(maximum is 40 characters)" value={description} onChange={(e) => setDescription(e.target.value)} maxLength="40"/>
          </react_bootstrap_1.Form.Group>

          <react_bootstrap_1.Form.Group controlId="userEditProfilelink">
            <react_bootstrap_1.Form.Control type="text" placeholder="Git link" value={profilelink} onChange={(e) => setProfilelink(e.target.value)}/>
          </react_bootstrap_1.Form.Group>

          <react_bootstrap_1.Form.Group as={react_bootstrap_1.Row} className="mt-3 text-center">
            <react_bootstrap_1.Col sm={{ span: 20 }}>
              <react_bootstrap_1.Button variant="primary" type="submit" className="me-3">
                Save
              </react_bootstrap_1.Button>
              <react_bootstrap_1.Button variant="secondary" onClick={() => setIsEditing(false)}>
                Back
              </react_bootstrap_1.Button>
            </react_bootstrap_1.Col>
          </react_bootstrap_1.Form.Group>
        </react_bootstrap_1.Form>
      </react_bootstrap_1.Card.Body>
    </react_bootstrap_1.Card>);
}
exports.default = UserEditForm;
