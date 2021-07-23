import express from 'express';
import speakeasy from 'speakeasy';
import qrcode from 'qrcode';
import bodyParser from 'body-parser';

const app = express();

const PORT = 3333;

app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/get_secret', (req, res) => {
  const secret = speakeasy.generateSecret({
    name: "2FA sample"
  });

  res.send({ secret });
}
);

app.post('/generate_qr_code', (req, res) => {
  qrcode.toDataURL(String(req.body.secret.otpauth_url), (err, data_url) => {
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


  const token_is_valid = speakeasy.totp.verify({
    secret: req.body.secret,
    encoding: 'ascii',
    token: String(req.body.token)
  });


  res.send({ token_is_valid });
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});