const { Keystone } = require('@keystonejs/keystone');
const { Text, DateTime, Integer, CloudinaryImage } = require('@keystonejs/fields');
const { CloudinaryAdapter } = require('@keystonejs/file-adapters');
const { GraphQLApp } = require('@keystonejs/app-graphql');
const { AdminUIApp } = require('@keystonejs/app-admin-ui');
const { StaticApp } = require('@keystonejs/app-static');

const { MongooseAdapter: Adapter } = require('@keystonejs/adapter-mongoose');

const PROJECT_NAME = "dumb-fridge-server";


const keystone = new Keystone({
    name: PROJECT_NAME,
    adapter: new Adapter({
        mongoUri: "mongodb+srv://neothesecond1404:NeoTheSecond1404^^@dumb-fridge-server-zdlza.mongodb.net/test?retryWrites=true&w=majority"
    }),
});

keystone.createList('Todo', {
  schemaDoc: 'A list of things which need to be done',
  fields: {
    name: { type: Text, schemaDoc: 'This is the thing you need to do' },
  },
});

keystone.createList('Fridge', {
  schemaDoc: 'List of items in fridge',
  fields: {
    name: { type: Text, schemaDoc: 'Food title'},
    entryDate: { 
      type: DateTime,
      format: 'MM/DD/YYYY h:mm A',
      yearRangeFrom: 1901,
      yearRangeTo: 2018,
      yearPickerType: 'auto',
    }
  }
})


const cloudinaryAdapter = new CloudinaryAdapter({
  cloudName: "dtiupisqk",
  apiKey: 116611895117877,
  apiSecret: "ENLB9SERQgz8zkUJpKaYE0aL6mo",
  folder: 'dumb-fridge-server',
});

keystone.createList('Food', {
  schemaDoc: 'Food expire duration',
  fields: {
    name: { type: Text, schemaDoc: 'Food title'},
    duration: {
      type: Integer, schemaDoc: 'Food duration'
    },
    image: { type: CloudinaryImage, adapter: cloudinaryAdapter },
    quantity: { type: Integer, schemaDoc: "amount of item"}
  }
})

module.exports = {
  keystone,
  apps: [
    new GraphQLApp(),
    new StaticApp({ path: '/', src: 'public' }),
    new AdminUIApp({ enableDefaultRoute: true }),
  ],
};
