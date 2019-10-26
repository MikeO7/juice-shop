const otplib = require('otplib')

protractor.expect = {
  challengeSolved: function (context) {
    it("challenge '" + context.challenge + "' should be solved on score board", () => {
      browser.get('/#/score-board')

      expectAsync(element(by.id(context.challenge + '.solved')).isPresent()).toBeResolvedTo(true)
      expectAsync(element(by.id(context.challenge + '.notSolved')).isPresent()).toBeResolvedTo(false)
    })
  }
}

protractor.beforeEach = {
  login: function (context) {
    it('should have logged in user "' + context.email + '" with password "' + context.password + '"', () => {
      browser.get('/#/login')

      element(by.id('email')).sendKeys(context.email)
      element(by.id('password')).sendKeys(context.password)
      element(by.id('loginButton')).click()

      if (context.totpSecret) {
        const EC = protractor.ExpectedConditions
        const twoFactorTokenInput = element(by.id('totpToken'))
        const twoFactorSubmitButton = element(by.id('totpSubmitButton'))

        browser.wait(EC.visibilityOf(twoFactorTokenInput), 1000, '2FA token field did not become visible')

        const totpToken = otplib.authenticator.generate(context.totpSecret)
        twoFactorTokenInput.sendKeys(totpToken)

        twoFactorSubmitButton.click()
      }

      browser.getCurrentUrl().then((url) => expect(url).toMatch(/\/search/)) // TODO Instead check for uib-tooltip of <i> with fa-user-circle
    })
  }
}
