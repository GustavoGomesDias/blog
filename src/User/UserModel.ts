global.db?.createCollection('users', {
  validator: {
    $jsonScheme: {
      bsonType: 'object',
      required: ['name', 'email', 'password'],
      properties: {
        name: {
          bsonType: 'string',
          description: 'must be a string and is required',
        },
        email: {
          bsonType: 'string',
          $regex: /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+/g,
          description: 'must be a string and is required',
        },
        password: {
          bsonType: 'string',
          minimum: 8,
          description: 'must be a string and is required',
        },
      },
    },
  },
});
