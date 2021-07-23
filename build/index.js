"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const speakeasy_1 = __importDefault(require("speakeasy"));
const qrcode_1 = __importDefault(require("qrcode"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = express_1.default();
const PORT = 3333;
app.use(body_parser_1.default.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.get('/', (req, res) => {
    res.send({ ok: "It's working" });
});
app.get('/get_secret', (req, res) => {
    const secret = speakeasy_1.default.generateSecret({
        name: "2FA sample"
    });
    res.send({ secret });
});
app.post('/generate_qr_code', (req, res) => {
    qrcode_1.default.toDataURL(String(req.body.secret.otpauth_url), (err, data_url) => {
        res.send({
            qr_code: data_url
        });
    });
});
app.post('/verify_token', (req, res) => {
    // const token2 = speakeasy.totp({
    //   secret: req.body.secret,
    //   encoding: 'ascii'
    // });
    // console.log("Token valido", token2);
    const token_is_valid = speakeasy_1.default.totp.verify({
        secret: req.body.secret,
        encoding: 'ascii',
        token: String(req.body.token)
    });
    res.send({ token_is_valid });
});
app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
