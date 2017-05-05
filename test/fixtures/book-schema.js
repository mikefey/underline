export default {
  name: 'books',
  keyPath: 'id',
  fields: [
    {
      name: 'id',
      unique: true,
    },
    {
      name: 'file',
      unique: false,
    },
    {
      name: 'parsed_data',
      unique: false,
    },
    {
      name: 'title',
      unique: false,
    },
    {
      name: 'author',
      unique: false,
    },
    {
      name: 'cover_image',
      unique: false,
    },
    {
      name: 'current_location',
      unique: false,
    },
    {
      name: 'total_locations',
      unique: false,
    },
  ],
};
