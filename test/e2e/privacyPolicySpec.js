describe('/#/privacy-security/privacy-policy', () => {
  describe('challenge "privacyPolicy"', () => {
    it('should be possible to access privacy policy', () => {
      browser.get('/#/privacy-security/privacy-policy')
      browser.getCurrentUrl().then((url) => expect(url).toMatch(/\/privacy-policy/))
    })

    protractor.expect.challengeSolved({ challenge: 'Privacy Policy' })
  })
})
