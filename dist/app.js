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
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
require("express-async-errors");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_1 = __importDefault(require("express"));
const connect_1 = __importDefault(require("./database/connect"));
const not_found_1 = __importDefault(require("./middleware/not-found"));
const error_handler_1 = __importDefault(require("./middleware/error-handler"));
const auth_1 = __importDefault(require("./routers/auth"));
const user_1 = __importDefault(require("./routers/user"));
const authentication_1 = __importDefault(require("./middleware/authentication"));
const task_1 = __importDefault(require("./routers/task"));
const app = (0, express_1.default)();
const node_path_1 = __importDefault(require("node:path"));
app.use((0, cookie_parser_1.default)(process.env.JWT_SECRET));
app.use(express_1.default.json());
app.use(express_1.default.static(node_path_1.default.resolve(__dirname, './client/build')));
app.use('/api/v1/auth', auth_1.default);
app.use('/api/v1/user', authentication_1.default, user_1.default);
app.use('/api/v1/task', authentication_1.default, task_1.default);
app.get('*', (req, res) => {
    return res.status(200).sendFile(node_path_1.default.resolve(__dirname, './client/build/index.html'));
});
app.use(not_found_1.default);
app.use(error_handler_1.default);
const port = Number(process.env.PORT) || 4000;
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, connect_1.default)(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`Server listening on port ${port}...`);
        });
    }
    catch (error) {
        console.log(error);
    }
});
start();
