import { merge } from 'lodash';
import { makeExecutableSchema } from 'graphql-tools';
import { departmentSchema, departmentResolver } from './department';
import { departmentManagerSchema, departmentManagerResolver } from './department-manager';
import { employeeSchema, employeeResolver } from './employee';
import { salarySchema, salaryResolver } from './salary';
import { titleSchema, titleResolver } from './title';

const rootSchema = `
  # Search all HR Entities
  type Query {
    # Retreive a single department
    department(dept_no: String!): Department

    # Retreive a list of departments
    departments: [Department]

    # Retrieve the department manager crosss reference
    departmentManagers: [DepartmentManager]

    # Retrieve a single employee
    employee(emp_no: Int!): Employee

    # Retrieve a list of employees
    employees(employeeSearch: EmployeeSearch): [Employee]

    # Retrieve a list of employee salaries
    salaries(salariesSearch: SalarySearch): [Salary]

    # Retreive a list of employee titles
    titles(limit: Int!): [Title]
  }

  type Mutation {
    # insert or update a department
    insertUpdateDepartment(department: DepartmentInput!): Department

    # remove an existing department
    deleteDepartment(dept_no: String!): Int
  }

  schema {
    # Search all HR Entities
    query: Query
    mutation: Mutation

    # coming soon :-)
    # subscription: Subscription
  }
`;

const rootResolvers = {
  Query: {

  }
}

const executableSchema = makeExecutableSchema({
  typeDefs: [
    rootSchema,
    departmentSchema,
    departmentManagerSchema,
    employeeSchema,
    salarySchema,
    titleSchema
  ],
  resolvers: merge(
    rootResolvers,
    departmentResolver,
    departmentManagerResolver,
    employeeResolver,
    salaryResolver,
    titleResolver
  )
});

export default executableSchema;
