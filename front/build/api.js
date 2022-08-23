"use strict";
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
exports.delete = exports.put = exports.post = exports.get = void 0;
const axios_1 = __importDefault(require("axios"));
const backendPortNumber = 5001;
const serverUrl = 'http://' + window.location.hostname + ':' + backendPortNumber + '/';
function get(endpoint, params = '') {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`%cGET 요청 ${serverUrl + endpoint + '/' + params}`, 'color: #a25cd1;');
        return axios_1.default.get(serverUrl + endpoint + '/' + params, {
            // JWT 토큰을 헤더에 담아 백엔드 서버에 보냄.
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('userToken')}`,
            },
        });
    });
}
exports.get = get;
function post(endpoint, data) {
    return __awaiter(this, void 0, void 0, function* () {
        // console.log(endpoint);
        // JSON.stringify 함수: Javascript 객체를 JSON 형태로 변환함.
        // 예시: {name: "Kim"} => {"name": "Kim"}
        const bodyData = JSON.stringify(data);
        console.log(`%cPOST 요청: ${serverUrl + endpoint}`, 'color: #296aba;');
        console.log(`%cPOST 요청 데이터: ${bodyData}`, 'color: #296aba;');
        return axios_1.default.post(serverUrl + endpoint, bodyData, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.getItem('userToken')}`,
            },
        });
    });
}
exports.post = post;
function put(endpoint, data) {
    return __awaiter(this, void 0, void 0, function* () {
        // JSON.stringify 함수: Javascript 객체를 JSON 형태로 변환함.
        // 예시: {name: "Kim"} => {"name": "Kim"}
        const bodyData = JSON.stringify(data);
        console.log(`%cPUT 요청: ${serverUrl + endpoint}`, 'color: #059c4b;');
        console.log(`%cPUT 요청 데이터: ${bodyData}`, 'color: #059c4b;');
        return axios_1.default.put(serverUrl + endpoint, bodyData, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.getItem('userToken')}`,
            },
        });
    });
}
exports.put = put;
// 아래 함수명에 관해, delete 단어는 자바스크립트의 reserved 단어이기에,
// 여기서는 우선 delete 대신 del로 쓰고 아래 export 시에 delete로 alias 함.
function del(endpoint, params = '') {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`DELETE 요청 ${serverUrl + endpoint + '/' + params}`);
        return axios_1.default.delete(serverUrl + endpoint + '/' + params, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('userToken')}`,
            },
        });
    });
}
exports.delete = del;
