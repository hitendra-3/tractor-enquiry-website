const otpStore = {};

const saveOTP = (email, otp) => {
  otpStore[email] = {
    otp,
    expiresAt: Date.now() + 5 * 60 * 1000 // 5 minutes
  };
};

const verifyOTP = (email, otp) => {
  const record = otpStore[email];
  if (!record) return false;

  if (Date.now() > record.expiresAt) {
    delete otpStore[email];
    return false;
  }

  if (record.otp !== otp) return false;

  delete otpStore[email];
  return true;
};

module.exports = { saveOTP, verifyOTP };
