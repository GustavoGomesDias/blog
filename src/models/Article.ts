const articleCollection = {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['title', 'description', 'content'],
      properties: {
        title: {
          bsonType: 'string',
        },
        description: {
          bsonType: 'string',
        },
        content: {
          bsonType: 'string',
        },
      },
    },
  },
};

export default articleCollection;
