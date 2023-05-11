"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paramSearchDto = exports.registerFollowerDto = exports.loginUserDto = void 0;
const joi_1 = __importDefault(require("joi"));
const email = joi_1.default.string().email();
const password = joi_1.default.string().min(6);
const name = joi_1.default.string();
const phone = joi_1.default.number().min(10);
const gender = joi_1.default.string().max(30);
const loginUserDto = joi_1.default.object({
    username: joi_1.default.string().max(30),
    password: password.required()
});
exports.loginUserDto = loginUserDto;
const registerFollowerDto = joi_1.default.object({
    name: name.required(),
    phone: phone.required(),
    gender: gender.required(),
    email: email.required()
});
exports.registerFollowerDto = registerFollowerDto;
const paramSearchDto = joi_1.default.object({
    search: joi_1.default.string().max(120),
});
exports.paramSearchDto = paramSearchDto;
