module.exports = (req, token) => {
  return {
    to: req.body.email,
    from: 'account-verification@drhectapus.com',
    subject: 'Please verify your account',
    html: `
      <p>Thanks for signing up!</p>

      <p>You're almost there. All you need to do is verify your account by clicking the link below:</p>

      <p><a href='http://${req.headers.host}/verify/${req.body.email}/${token}'>Verify account</a></p>

      <p>- Drhectapus</p>
    `
  };
}
