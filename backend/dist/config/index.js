"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const MONGO_URI = process.env.MONGO_URI ? String(process.env.MONGO_URI) : 'mongodb+srv://saintAdrian:Padrii2005!@cluster0.y4djtbl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 4000;
const ROUNDS = process.env.SERVER_ROUNDS ? Number(process.env.SERVER_ROUNDS) : 10;
const JWT_SECRET = process.env.JWT_SECRET ? String(process.env.JWT_SECRET) : "6h3i24dkn4pidn27948abklxu9485";
exports.config = {
    mongo: {
        url: MONGO_URI
    },
    server: {
        port: PORT,
        rounds: ROUNDS,
        jwtSecret: JWT_SECRET
    }
};
