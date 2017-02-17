import { merge } from 'lodash';
import { makeExecutableSchema } from 'graphql-tools';
import { departmentSchema, departmentResolver } from './department';
import { departmentManagerSchema, departmentManagerResolver } from './department-manager';
import { employeeSchema, employeeResolver } from './employee';
import { salarySchema, salaryResolver } from './salary';
import { titleSchema, titleResolver } from './title';

const rootSchema = `
  type Query {
    department(dept_no: String!): Department
    departments: [Department]
    departmentManagers: [DepartmentManager]
    employee(emp_no: Int!): Employee
    employees(employeeSearch: EmployeeSearch): [Employee]
    salaries(salariesSearch: SalarySearch): [Salary]
    titles(limit: Int!): [Title]
  }

  schema {
    query: Query
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
