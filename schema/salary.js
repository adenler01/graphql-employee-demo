const schema = `
  type Salary {
    emp_no: Int!
    salary: Int!
    from_date: String!
    to_date: String
  }

  input SalarySearch {
    emp_no: Int
    limit: Int
  }`;

const resolver = {
  Query: {
    salaries(parent, args, context) {
      let db = context.db;

      return db.getSalaries(limit);
    }
  }

}

exports.salarySchema = schema;
exports.salaryResolver = resolver;
