import nodemailer from "nodemailer";
import { google } from "googleapis";

const { OAuth2 } = google.auth;

const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REFRESH_TOKEN,
  OAUTH_LINK,
  MAIL,
} = process.env;

const auth = new OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REFRESH_TOKEN,
  OAUTH_LINK
);

async function config() {
  auth.setCredentials({
    refresh_token: GOOGLE_REFRESH_TOKEN,
  });

  const accessToken = await auth.getAccessToken();

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: MAIL,
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      accessToken,
      refreshToken: GOOGLE_REFRESH_TOKEN,
    },
  });
}

export const sendVerficationEmail = async (email, name, code) => {
  try {
    const stmp = await config();

    const mailOption = {
      from: MAIL,
      to: email,
      subject: "ZenPc acount verfication",
      html: `<link href="https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/Vazirmatn-font-face.css" rel="stylesheet" type="text/css" />
<div dir="rtl" style="font-family: Vazirmatn;"><div style="max-width: 700px;margin-bottom: 1rem;display: flex;align-items: center;gap: 10px;
    font-weight: 600;color: #3b5998;"><img src="https://res.cloudinary.com/dzmn9xnso/image/upload/v1698762853/zenpc/logo/zen-pc-high-resolution-logo-transparent_hdp2ph.svg"
    alt=""style="width: 70px"/><span>تایید حساب کاربری</span></div><div style="padding: 1rem 0;border-top: 1px solid #e5e5e5;
    border-bottom: 1px solid #e5e5e5;color: #141823;font-size: 17px;"><span>سلام ${name}</span>
  <div style="padding: 20px 0"><span style="padding: 1.5rem 0">شما در حال ایجاد یک حساب کاربری در zenpc  هستید.لطفا برای تکمیل فرایند ثبت نام از کد زیر استفاده کنید.</span
    ></div><div style="text-align: center; width: 50%; margin-top: 20px;"><a style="padding: 15px 35px;
      background: #1c48af;color: #fff;text-decoration: none;font-weight: 600;border-radius: 10px;">${code}</a>
  </div><br /><div style="padding-top: 20px"></div></div></div>`,
    };

    stmp.sendMail(mailOption, (err, res) => {
      if (err) return err;
      return res;
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};