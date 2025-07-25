import jsonwebtoken from "jsonwebtoken";
import "dotenv/config";

const sign = process.env.JWT_SECRET;
console.log(sign);

export const token = {
  generate(data) {
    return jsonwebtoken.sign(data, sign, { expiresIn: "30d" });
  },
  verify(token) {
    return jsonwebtoken.verify(token, sign);
  },
};
