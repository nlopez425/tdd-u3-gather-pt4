const {assert} = require('chai');
const {buildItemObject} = require('../test-utils');

describe('User visits single item',()=>{

    describe('Select item',()=>{
        it('should go to single item view page',()=>{
            //setup
            const itemToCreate = buildItemObject();
            browser.url('/items/create');

            //excercise
            //sumbit new item
            browser.setValue("input#title-input",itemToCreate.title);
            browser.setValue("textarea#description-input",itemToCreate.description);
            browser.setValue("input#imageUrl-input",itemToCreate.imageUrl);
            browser.click('button#submit-button');

            //app should redirect back to root , click on new item
            browser.click('.item-card:last-child a');

            //verify
            assert.include(browser.getText('body'),itemToCreate.description);
        })
    });

});//end of describe