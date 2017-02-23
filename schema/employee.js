const schema = `
  # An Employee
  type Employee {
    # The employee number (pk)
    emp_no: Int!

    # Employee's first name
    first_name: String!

    # Employee's last name
    last_name: String!

    # Employee's gender (M/F)
    gender: String!

    # Employee's hire date
    hire_date: String!

    # Employee's birth date
    birth_date: String!

    # The employee's current department
    department: Department

    # The employee's current salary
    salary: Salary

    # The employee's salary history, including current
    salaries(limit: Int!): [Salary]

    # The employee's current title
    title: Title

    # The employee's title history, including current
    titles: [Title]
  }

  # Employee search criteria
  input EmployeeSearch {
    emp_no: Int
    dept_no: String
    last_name: String
    # The starting record number to return
    offset: Int
    # The maximum number of records to return
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
        if (employee_department) {
          return db.getDepartment(employee_department.dept_no);
        } else {
          return null;
        }

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
