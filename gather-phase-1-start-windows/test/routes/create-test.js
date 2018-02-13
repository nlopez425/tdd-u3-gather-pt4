const {assert} = require('chai');
const request = require('supertest');
const {jsdom} = require('jsdom');

const app = require('../../app');
const Item = require('../../models/item');

const {parseTextFromHTML, buildItemObject} = require('../test-utils');
const {connectDatabaseAndDropData, diconnectDatabase} = require('../setup-teardown-utils');

const findImageElementBySource = (htmlAsString, src) => {
  const image = jsdom(htmlAsString).querySelector(`img[src="${src}"]`);
  if (image !== null) {
    return image;
  } else {
    throw new Error(`Image with src "${src}" not found in HTML string`);
  }
};

describe('Server path: /items/create', () => {
  const itemToCreate = buildItemObject();

  beforeEach(connectDatabaseAndDropData);

  afterEach(diconnectDatabase);

  // Write your describe blocks below:
  describe('GET',()=>{
    it('should render empty input fields',async ()=>{
      //setup not needed

      //excercise
      const response = await request(app).get("/items/create");

      //verify
      assert.equal(parseTextFromHTML(response.text, 'input#title-input'), '');
      assert.equal(parseTextFromHTML(response.text, 'textarea#description-input'), '');
      assert.equal(parseTextFromHTML(response.text, 'input#imageUrl-input'), '');
 
    })
  });

  describe('POST',()=>{
     it('should create new item', async ()=>{
      //setup  
      const item = buildItemObject();

      //excercise
      const response = await request(app).post('/items/create').type('form').send(item);

      //verify
      const createdItem = await Item.findOne(item);
      assert.isOk(createdItem, 'Item was not created successfully in the database');
     })

     it('should redirect to /', async ()=>{
      //setup  
      const item = buildItemObject();

      //excercise
      const response = await request(app).post('/items/create').type('form').send(item);

      //verify
      assert.equal(response.status,302);
      assert.equal(response.header.location,'/');
     })

     it('should throw an error when there is no title', async ()=>{
       //setup
       const item = {
         title:'',
         description:"test image",
         imageUrl:'www.yahoo.com/image'
       };

       //excercise
       const response = await request(app).post('/items/create').type('form').send(item);
       const result = await Item.find({});
       
       //verify
       assert.equal(result.length,0);
       assert.equal(response.status,400);
       assert.include(parseTextFromHTML(response.text, 'form'), 'required');

     })//end

     it('should throw an error when there is no description', async ()=>{
      //setup
      const item = {
        title:'bang',
        description:"",
        imageUrl:'www.yahoo.com/image'
      };

      //excercise
      const response = await request(app).post('/items/create').type('form').send(item);
      const result = await Item.find({});
      
      //verify
      assert.equal(result.length,0);
      assert.equal(response.status,400);
      assert.include(parseTextFromHTML(response.text, 'form'), 'required');
      
    })//end

    it('should throw an error when there is no image url', async ()=>{
      //setup
      const item = {
        title:"asdf",
        description:"adsfasd",
        imageUrl:''
      };

      //excercise
      const response = await request(app).post('/items/create').type('form').send(item);
      const result = await Item.find({});
      
      //verify
      assert.equal(result.length,0);
      assert.equal(response.status,400);
      assert.include(parseTextFromHTML(response.text, 'form'), 'required');
      
    })//end

  });
});
