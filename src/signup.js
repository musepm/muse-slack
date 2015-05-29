

module.exports = {
  signup() {
    let su = `
Please visit https://slack.com/signup
After signing up, click the activation link in the email.

Then visit https://slack.com/settings/tokens

Copy and paste your API token here`
   
    console.log(su);
  }
}
