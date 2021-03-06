# graphql-employee-demo
This repository contains a demo graphQl server project created while learning graphQl using:

1. A mysql database of employee data
2. ExpressJs
3. Apollo Server

# Client
The associated client project can be found at http://github.com/adenler01/graphql-employee-demo-client

# installation
## Database:

1. download the employee database backup from https://www.dropbox.com/s/er08yiu8ecgifep/employees.sql.gz?dl=0
2. unzip
3. restore to a local mysql

## Source:

1. clone repo
2. ensure node version is >= 6.9.2 (might work with other versions but this is the version it was written against)
3. npm install
4. update database configuration in config/config.js


# running
1. npm start
2. open browser to http://localhost:3000


# future plans
## Client:
Add subscription support

## Server:
Add subscription support
Add server side caching and/or the facebook dataloader project to prevent n+1 queries from hitting the sql server.
