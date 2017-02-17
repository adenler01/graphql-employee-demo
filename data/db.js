import mysql from 'mysql';

export default function createConnection() {
  let conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'employees'
  });

  return {
    conn,

    getDepartment(dept_no) {
      return new Promise((resolve, reject) => {
        this.conn.query(`
        select *
        from departments
        where dept_no = ?
      `, [dept_no], function (err, results, fields) {
            if (err) {
              reject(err);
              return;
            }

            resolve(results[0]);
          });

      });
    },

    getDepartments() {
      return new Promise((resolve, reject) => {
        this.conn.query(`
        select *
        from departments
      `, function (err, results, fields) {
            if (err) {
              reject(err);
              return;
            }
            resolve(results);
          });

      });
    },

    getDepartmentManager(dept_no, date) {
      return new Promise((resolve, reject) => {
        this.conn.query(`
        select *
        from dept_manager
        where dept_no = ?
        and from_date <= ?
        and to_date >= ?
      `, [dept_no, date, date], function (err, results, fields) {
            if (err) {
              reject(err);
              return;
            }
            resolve(results[0]);
          });

      });
    },

    getDepartmentManagers() {
      return new Promise((resolve, reject) => {
        this.conn.query(`
        select *
        from dept_manager
      `, function (err, results, fields) {
            if (err) {
              reject(err);
              return;
            }
            resolve(results);
          });

      });
    },

    getEmployee(emp_no) {
      return new Promise((resolve, reject) => {
        this.conn.query(`
        select *
        from employees
        where emp_no = ?
      `, [emp_no], function (err, results, fields) {
            if (err) {
              reject(err);
              return;
            }

            resolve(results[0]);
          });

      });
    },

    getEmployeeDepartment(emp_no, date) {
      return new Promise((resolve, reject) => {
        this.conn.query(`
        select *
        from dept_emp
        where emp_no = ?
        and from_date <= ?
        and to_date >= ?
      `, [emp_no, date, date], function (err, results, fields) {
            if (err) {
              reject(err);
              return;
            }

            if (results && results.length > 0) {
              resolve(results[0]);
            }
            else {
              resolve(null);
            }
          });

      });
    },

    getEmployees(employeeSearch) {

      let emp_no = null;
      let dept_no = null;
      let last_name = null;
      let offset = null;
      let limit = 3;

      if (employeeSearch) {
        emp_no = employeeSearch.emp_no;
        dept_no = employeeSearch.dept_no;
        last_name = employeeSearch.last_name;
        offset = employeeSearch.offset || 0;
        limit = employeeSearch.limit || 3;
      }

      let qry = "select employees.* from employees left join dept_emp on employees.emp_no = dept_emp.emp_no where 1=1";
      let params = [];

      if (dept_no) {
        let date = new Date();

        qry += " and dept_emp.dept_no = ? and dept_emp.from_date <= ? and dept_emp.to_date >= ?";
        params.push(dept_no);
        params.push(date);
        params.push(date);
      }

      qry += " limit ?";
      params.push(limit);

      return new Promise((resolve, reject) => {
        this.conn.query(qry, params, function (err, results, fields) {
          if (err) {
            reject(err);
            return;
          }
          resolve(results);
        });

      });
    },

    getSalary(emp_no, date) {
      return new Promise((resolve, reject) => {
        this.conn.query(`
        select *
        from salaries
        where emp_no = ?
        and from_date <= ?
        and to_date >= ?
      `, [emp_no, date, date], function (err, results, fields) {
            if (err) {
              reject(err);
              return;
            }

            if (results && results.length > 0) {
              resolve(results[0]);
            }
            else {
              resolve(null);
            }
          });

      });
    },

    getSalaries(salarySearch) {
      return new Promise((resolve, reject) => {

        let emp_no = null;
        let limit = 3;

        if (salarySearch) {
          emp_no = salarySearch.emp_no;
          limit = salarySearch.limit || 3;
        }

        let qry = "select salaries.* from salaries where 1=1";
        let params = [];

        if (emp_no) {
          qry += " and emp_no = ?"
          params.push(emp_no);
        }

        qry += " limit ?";
        params.push(limit);

        this.conn.query(qry, params, function (err, results, fields) {
          if (err) {
            reject(err);
            return;
          }
          resolve(results);
        });

      });
    },

    getTitle(emp_no, date) {
      return new Promise((resolve, reject) => {
        this.conn.query(`
        select *
        from titles
        where emp_no = ?
        and from_date <= ?
        and to_date >= ?
      `, [emp_no, date, date], function (err, results, fields) {
            if (err) {
              reject(err);
              return;
            }

            if (results && results.length > 0) {
              resolve(results[0]);
            }
            else {
              resolve(null);
            }
          });

      });
    },

    getTitles(titleSearch) {
      return new Promise((resolve, reject) => {
        let qry = "select titles.* from titles where 1=1";
        let params = [];

        if (titleSearch.emp_no) {
          qry += " and emp_no = ?"
          params.push(titleSearch.emp_no);
        }

        if (titleSearch.limit) {
          qry += " limit ?";
          params.push(titleSearch.limit);
        }

        this.conn.query(qry, params, function (err, results, fields) {
          if (err) {
            reject(err);
            return;
          }
          resolve(results);
        });

      });
    },
  }
}

