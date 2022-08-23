"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginReducer = void 0;
function loginReducer(userState, action) {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            console.log('%c로그인!', 'color: #d93d1a;');
            return Object.assign(Object.assign({}, userState), { user: action.payload });
        case 'LOGOUT':
            console.log('%c로그아웃!', 'color: #d93d1a;');
            return Object.assign(Object.assign({}, userState), { user: null });
        default:
            return userState;
    }
}
exports.loginReducer = loginReducer;
