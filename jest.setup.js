import dotenv from "dotenv";

module.exports = async () => {
  dotenv.config({ path: ".env.test.local" });
};
