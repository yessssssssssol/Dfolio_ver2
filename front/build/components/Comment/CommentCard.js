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
const react_1 = __importDefault(require("react"));
const react_bootstrap_1 = require("react-bootstrap");
const Api = __importStar(require("../../api"));
function CommentCard({ portfolioOwnerId, comment, setComments, comments }) {
    //useState로 isEditing 상태를 생성함.import React, { useState } from "react";
    const handleDelete = (e) => __awaiter(this, void 0, void 0, function* () {
        //  페이지가 리프레쉬 되는 고유의 브라우저 동작을 preventDefault()로 막아줌
        e.preventDefault();
        // 부모 엘리먼트에게 이벤트 전달을 중단해야 할 때 쓰이는 함수
        e.stopPropagation();
        const userId = portfolioOwnerId;
        // comment.id로 조회하여 데이터 삭제
        yield Api.delete(`comments/${comment.id}`);
        // "commentlist/:userId" 엔드포인트로 GET 요청함.
        const res = yield Api.get("commentlist", userId);
        setComments(res.data);
    });
    return (<react_bootstrap_1.Card.Body>
      <react_bootstrap_1.Row className=" mr-3 align-items-center">
        <react_bootstrap_1.Col>{comment.author}</react_bootstrap_1.Col>
        <react_bootstrap_1.Col>{comment.content}</react_bootstrap_1.Col>

        <react_bootstrap_1.Col>
          <react_bootstrap_1.Button variant="light" size="sm" onClick={handleDelete} className=" mr-3 align-items-center">
            x
          </react_bootstrap_1.Button>
        </react_bootstrap_1.Col>
      </react_bootstrap_1.Row>
    </react_bootstrap_1.Card.Body>);
}
exports.default = CommentCard;
