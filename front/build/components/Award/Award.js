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
// import * as Api from "../../api";
const AwardCard_1 = __importDefault(require("./AwardCard"));
const AwardEditForm_1 = __importDefault(require("./AwardEditForm"));
function Award({ award, setAwards, isEditable }) {
    //useState로 isEditing 상태를 생성함.import React, { useState } from "react";
    const [isEditing, setIsEditing] = (0, react_1.useState)(false);
    return (<>
      {isEditing ? (<AwardEditForm_1.default currentAward={award} setAwards={setAwards} setIsEditing={setIsEditing}/>) : (<AwardCard_1.default award={award} isEditable={isEditable} setAwards={setAwards} setIsEditing={setIsEditing}/>)}
    </>);
}
exports.default = Award;
