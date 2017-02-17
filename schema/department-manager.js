const schema = `
  type DepartmentManager {
    dept_no: String!
    emp_no: Int!
    from_date: String!
    to_date: String
  }
`;

const resolver = {
  Query: {
    departmentManagers(parent, args, context) {
      let db = context.db;

      return db.getDepartmentManagers();
    }
  }
}

exports.departmentManagerSchema = schema;
exports.departmentManagerResolver = resolver;


