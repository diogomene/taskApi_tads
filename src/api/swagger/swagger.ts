import swaggerJSDoc from 'swagger-jsdoc';
const options = {
  definition: {
      openapi: '3.0.0',
      info: {
        title: 'TaskAPI - TADS',
        version: '1.0.0',
        description: "Api de tasks (to-do's) para a disciplina de TADS",
      },
    },
    apis: ['./**/*.ts'],
};

export const swaggerSpecs = swaggerJSDoc(options);