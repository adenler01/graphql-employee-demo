const departmentSchema = `
  type Department {
    dept_no: String!
    dept_name: String!
    manager: Employee
    managerStartDate: String
    employees: [Employee]
  }`;

const departmentResolver = {
  Query: {
    department(parent, args, context) {
      let db = context.db;
      let dept_no = args.dept_no;

      return db.getDepartment(dept_no);
    },

    departments(parent, args, context) {
      let db = context.db;

      return db.getDepartments();
    }
  },

  Department: {
    employees(parent, args, context) {
      let db = context.db;
      let dept_no = parent.dept_no;

      return db.getEmployees({ dept_no: dept_no });
    },

    manager(parent, args, context) {
      let db = context.db;

      let dept_no = parent.dept_no;

      return db.getDepartmentManager(dept_no, new Date()).then(dept_manager => {
        return db.getEmployee(dept_manager.emp_no).then(employee => {
          return employee;
        });
      });
    },

    managerStartDate(parent, args, context) {
      let db = context.db;
      let dept_no = parent.dept_no;

      return db.getDepartmentManager(dept_no, new Date()).then(dept_manager => {
        return dept_manager.from_date;
      });
    }
  }

}

exports.departmentSchema = departmentSchema;
exports.departmentResolver = departmentResolver;
