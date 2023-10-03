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
exports.AuthService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../error/ApiError"));
const user_model_1 = require("../user/user.model");
const jwtHelpes_1 = require("../../../helpers/jwtHelpes");
const config_1 = __importDefault(require("../../../config"));
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const isUserExist = yield user_model_1.User.isUserExist(email);
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'User is not Exist');
    }
    if (isUserExist.password &&
        !(yield user_model_1.User.isPasswordMatched(password, isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.password))) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Email or Password is Incorrect');
    }
    const jwtPayload = { id: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist._id, email: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.email };
    const accessToken = jwtHelpes_1.JwtHelpers.createToken(jwtPayload, config_1.default.secret_key, config_1.default.expires_in_secret_key);
    const refreshToken = jwtHelpes_1.JwtHelpers.createToken(jwtPayload, config_1.default.refresh_secret_key, config_1.default.expires_in_refresh_key);
    return {
        accessToken,
        refreshToken,
        user: isUserExist,
    };
});
exports.AuthService = {
    loginUser,
};
