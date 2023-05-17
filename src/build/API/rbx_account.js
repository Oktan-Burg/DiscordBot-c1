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
Object.defineProperty(exports, "__esModule", { value: true });
const axios = require('axios');
function checkUserExists(username) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios.get(`https://api.roblox.com/users/get-by-username?username=${username}`);
            const data = response.data;
            if (data.Id) {
                return true;
            }
            else {
                return false;
            }
        }
        catch (error) {
            console.error(error);
            return false;
        }
    });
}
const username = 'example_username';
checkUserExists(username);
//# sourceMappingURL=rbx_account.js.map