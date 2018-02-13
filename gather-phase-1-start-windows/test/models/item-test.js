const Item = require('../../models/item');
const {assert} = require('chai');
const {mongoose, databaseUrl, options} = require('../../database');


describe('Model: Item', () => {
  beforeEach( async ()=>{
     await mongoose.connect(databaseUrl, options);
     await mongoose.connection.db.dropDatabase();
  });

  afterEach( async () => {
     await mongoose.disconnect();
  });

  // Write your tests below:
  describe("#title",()=>{
    it('should be a string',()=>{
      const titleAsNonString = 0;
      const item = new Item({title:titleAsNonString});
      assert.strictEqual(item.title, titleAsNonString.toString());
    })

    it('is required',()=>{
      const item = new Item();
      item.validateSync();
      assert.equal(item.errors.title.message,'Path `title` is required.');
    })//end

  })

  describe("#description",()=>{
    it('should be a string',()=>{
      const descriptionNonString = 0;
      const item = new Item({description:descriptionNonString});
      assert.strictEqual(item.description,descriptionNonString.toString());
    })

    it('is required',()=>{
      const item = new Item();
      item.validateSync();
      assert.equal(item.errors.description.message,'Path `description` is required.');
    })
  })

  describe("#imageUrl",()=>{
    it('should be a string',()=>{
      const imageUrlNonString = 0;
      const item = new Item({imageUrl:imageUrlNonString});
      assert.strictEqual(item.imageUrl,imageUrlNonString.toString());
    })

    it('is required',()=>{
      const item = new Item();
      item.validateSync();
      assert.equal(item.errors.imageUrl.message,'Path `imageUrl` is required.');
    })
  })
});
