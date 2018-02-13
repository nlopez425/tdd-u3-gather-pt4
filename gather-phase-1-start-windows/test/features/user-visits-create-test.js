const {assert} = require('chai');
const {buildItemObject} = require('../test-utils');

// Add your tests below:
describe('User visits Create',()=>{

    describe('Post new item',()=>{
        it('should render to page',()=>{
            //setup
            const itemToCreate = buildItemObject();
            browser.url('/items/create');

            //excercise
            browser.setValue("input#title-input",itemToCreate.title);
            browser.setValue("textarea#description-input",itemToCreate.description);
            browser.setValue("input#imageUrl-input",itemToCreate.imageUrl);
            browser.click('button#submit-button');

            //verify
            assert.include(browser.getText('body'),itemToCreate.title);
            assert.include(browser.getAttribute('body img', 'src'), itemToCreate.imageUrl);
        })
    });

});
