
const schema = `
  type Title {
    emp_no: Int!
    title: String!
    from_date: String!
    to_date: String
  }

  type TitleSearch {
    emp_no: Int
    limit: Int
  }
`;

const resolver = {
  Query: {
    titles(parent, { limit }, context) {
      let db = context.db;

      return db.getTitles({ limit });
    }
  }

}

exports.titleSchema = schema;
exports.titleResolver = resolver;




