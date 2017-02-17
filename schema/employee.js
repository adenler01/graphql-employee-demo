const schema = `
  type Employee {
    emp_no: Int!
    first_name: String!
    last_name: String!
    gender: String!
    hire_date: String!
    birth_date: String!
    department: Department
    salary: Salary
    salaries(limit: Int!): [Salary]
    title: Title
    titles: [Title]
  }

  input EmployeeSearch {
    emp_no: Int
    dept_no: String
    last_name: String
    offset: Int
    limit: Int
  }
  `;

const resolver = {
  Query: {
    employee(parent, args, context) {
      let db = context.db;

      let emp_no = args.emp_no;

      return db.getEmployee(emp_no);
    },

    employees(parent, { employeeSearch }, context) {
      let db = context.db;

      return db.getEmployees(employeeSearch);
    }
  },

  Employee: {
    department(parent, args, context) {
      let db = context.db;
      let emp_no = parent.emp_no;

      return db.getEmployeeDepartment(emp_no, new Date()).then(employee_department => {
        return db.getDepartment(employee_department.dept_no);
      });
    },

    salary(parent, args, context) {
      let db = context.db;
      let emp_no = parent.emp_no;

      return db.getSalary(emp_no, new Date());
    },

    salaries(parent, args, context) {
      let db = context.db;
      let emp_no = parent.emp_no;
      let limit = args.limit || 3

      return db.getSalaries({ emp_no: emp_no, limit: limit });
    },

    title(parent, args, context) {
      let db = context.db;
      let emp_no = parent.emp_no;

      return db.getTitle(emp_no, new Date());
    },

    titles(parent, args, context) {
      let db = context.db;
      let emp_no = parent.emp_no;

      return db.getTitles({ emp_no });
    }
  }
}

exports.employeeSchema = schema;
exports.employeeResolver = resolver;
