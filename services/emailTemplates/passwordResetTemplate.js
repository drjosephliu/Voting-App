module.exports = (req, token) => {
  return {
    to: req.body.email,
    from: 'reset-password@drhectapus.com',
    subject: 'Reset Your Password',
    html: `
      <p>Hello.</p>

      <p>Looks like you have forgotten your password</p>

      <p>Thankfully, you can reset your password by following this link:</p>

      <p><a href='http://${req.headers.host}/reset/${req.body.email}/${token}'>Reset Password</a></p>

      <p>- Drhectapus</p>
    `
  }
}
