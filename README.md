[Figma](https://www.figma.com/file/oTqNLs8iXiZD5YGkeRTLu8/Get2Gether-Frontend?node-id=0%3A1)

### Things to consider before development:

For backend:

-   Use Husky?
-   Use Jest and Supertest (for testing node.js HTTP servers)?
-   Use Swagger docs?
-   Should use a logging library like Winston

### Temporary Dev Notes

#### Using Prisma:

-   When tweaking or adding new data models in `schema.prisma`, it's necessary to manually invoke `prisma generate` to accomodate the changes in the Prisma Client API. See https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases/install-prisma-client-typescript-postgres/
    -   Can be automated by making nodemon watch for changes in schema.prisma, but haven't looked into it
-   To write database queries through prisma's query builder, Prisma Client, see https://www.prisma.io/docs/concepts/components/prisma-client
-   Prisma's error handling results in pretty unreadable code :(. Need to match exception code with these error identifiers https://www.prisma.io/docs/reference/api-reference/error-reference

Note: like Prisma, other ORMs like TypeORM and Sequelize all suck ass in their own way
