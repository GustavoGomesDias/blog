global.db?.createCollection('articles', {
  validator: {
    $jsonScheme: {
      bsonType: 'object',
      required: ['title', 'description', 'content', 'image', 'user_id'],
      properties: {
        title: {
          bsonType: 'string',
          description: 'must be a string and is required',
        },
        description: {
          bsonType: 'string',
          description: 'must be a string and is required',
        },
        content: {
          bsonType: 'string',
          description: 'must be a string and is required',
        },
        user_id: {
          $ref: 'users',
          $id: 'objectId',
          $db: 'blog',
        },
      },
    },
  },
});
