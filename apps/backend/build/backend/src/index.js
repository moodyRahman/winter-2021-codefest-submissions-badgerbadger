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
require("module-alias/register");
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("./config"));
const auth_middleware_1 = __importDefault(require("./middlewares/auth.middleware"));
const auth_1 = __importDefault(require("./routes/auth"));
const debug_1 = __importDefault(require("./routes/debug"));
const filter_1 = __importDefault(require("./routes/filter"));
const raw_data_1 = __importDefault(require("./routes/raw-data"));
const semesters_1 = __importDefault(require("./routes/semesters"));
const app = express_1.default();
app.use(body_parser_1.default.json());
app.use(cors_1.default());
app.get("/", (_req, res) => res.send("Express + TypeScript Server"));
app.use("/auth", auth_1.default);
app.use("/semesters", auth_middleware_1.default, semesters_1.default);
app.use(debug_1.default);
app.use(filter_1.default);
app.use(raw_data_1.default);
mongoose_1.default.connection.on("error", console.error);
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connect(config_1.default.get("mongo_uri"), {
        useCreateIndex: true,
        useFindAndModify: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log(`🐵[database][${new Date().toLocaleTimeString()}]: connected to remote`);
    app.listen(config_1.default.get("port"), () => {
        console.log(`⚡[server][${new Date().toLocaleTimeString()}]:`, `running on https://localhost:${config_1.default.get("port")}`);
    });
}))();
