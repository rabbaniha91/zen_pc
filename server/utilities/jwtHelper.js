import jwt from "jsonwebtoken";

export const createAccessToken = (id, creationToken, expires) => {
  return jwt.sign({ id: id }, creationToken, { expiresIn: expires });
};
export const createRefreshToken = (id, creationToken, expires) => {
  return jwt.sign({ id: id }, creationToken, { expiresIn: expires });
};

export const setRefreshTokenArray = (user, cookie) => {
  let arr;
  if (!cookie?.jwtaaass) {
    arr = user.refreshToken;
  } else {
    arr = user.refreshToken.filter((rt) => rt !== cookie?.jwtaaass);
  }
  return arr;
};
