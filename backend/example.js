import crypto from "crypto";

const resetToken = crypto.randomBytes(20).toString("hex")
const hashedPassword = crypto.createHash("sha256").update(resetToken).digest("hex")
console.log(hashedPassword)

// hex => 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, a, b, c, d, e, f

// sha256, sha252, sha248