const {assert} = require('chai');

describe('User visits root', () => {
  describe('without existing items', () => {
    it('starts blank', () => {
      browser.url('/');
      assert.equal(browser.getText('#items-container'), '');
    });
  });

  describe('user can navigate',()=>{
    it('navigates to /create',()=>{
      //setup
      browser.url("/");

      //excercise
      browser.click('a[href="/items/create"]')

      //verify
      let html = browser.getHTML("body",false);
      assert.include(html,"Create");
    });
  });
});
