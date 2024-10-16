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
exports.default = main;
const media_seed_1 = __importDefault(require("./media.seed"));
const wedding_rep_seed_1 = __importDefault(require("./wedding_rep.seed"));
const wedding_cer_seed_1 = __importDefault(require("./wedding_cer.seed"));
const subscription_seed_1 = __importDefault(require("./subscription.seed"));
const user_seed_1 = __importDefault(require("./user.seed"));
const theme_seed_1 = __importDefault(require("./theme.seed"));
const role_seed_1 = __importDefault(require("./role.seed"));
const bride_groom_media_seed_1 = __importDefault(require("./bride_groom_media.seed"));
const account_bank_seed_1 = __importDefault(require("./account_bank.seed"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, role_seed_1.default)();
        yield (0, user_seed_1.default)();
        yield (0, theme_seed_1.default)();
        yield (0, wedding_rep_seed_1.default)();
        yield (0, wedding_cer_seed_1.default)();
        yield (0, account_bank_seed_1.default)();
        yield (0, media_seed_1.default)();
        yield (0, subscription_seed_1.default)();
        yield (0, bride_groom_media_seed_1.default)();
    });
}
main()
    .catch(e => {
    console.error(e);
    process.exit(1);
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));
