/**
 * @swagger
 * components:
 *  schemas:
 *    connection:
 *       type: object
 *       required:
 *         - token
 *         - user_id
 *         - connection_name
 *         - host
 *         - database_name
 *         - username
 *         - password
 *       properties:
 *         token:
 *           type: string
 *         user_id:
 *           type: number
 *         connection_name:
 *           type: string
 *         host:
 *           type: string
 *         database_name:
 *           type: string
 *         username:
 *           type: string
 *         password:
 *           type: string
 *       example:
 *         token: "d5fEasz..."
 *         user_id: 1
 *         connection_name: "con 1"
 *         host: "localhost"
 *         database_name: "db 1"
 *         username: "user 1"
 *         password: "abc123"
 *    query:
 *       type: object
 *       required:
 *         - token
 *         - user_id
 *         - connection_name
 *         - query_name
 *         - query
 *         - fields
 *         - show_type
 *       properties:
 *         token:
 *           type: string
 *         user_id:
 *           type: number
 *         connection_name:
 *           type: string
 *           description: The connection name must exist
 *         query_name:
 *           type: string
 *         query:
 *           type: string
 *           description: Specify the desired input by placing a number in front of it
 *         fields:
 *           type: string
 *           description: if you have two or more field , You must separate with cama(,)
 *         show_type:
 *           type: string
 *           description: table , number or chart
 *       example:
 *         token: "d5fEasz..."
 *         user_id: 1
 *         connection_name: "con 1"
 *         query_name: "query 1"
 *         query: "SELECT input1 FROM input2 WHERE input3 = 'input4'"
 *         fields: "Selection,table name,condition 1,condition 2"
 *         show_type: "table"
 */

 {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Library API",
      version: "1.0.0",
      description: "A simple Express Library API",
    },
    servers: [
      {
        url: "http://localhost:4000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};


/**
  * @swagger
  * tags:
  *   name: Books
  *   description: The books managing API
  */

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Returns the list of all the books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: The list of the books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 */

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Get the book by id
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The book id
 *     responses:
 *       200:
 *         description: The book description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: The book was not found
 */

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: The book was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /books/{id}:
 *  put:
 *    summary: Update the book by the id
 *    tags: [Books]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The book id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Book'
 *    responses:
 *      200:
 *        description: The book was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Book'
 *      404:
 *        description: The book was not found
 *      500:
 *        description: Some error happened
 */

/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Remove the book by id
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The book id
 * 
 *     responses:
 *       200:
 *         description: The book was deleted
 *       404:
 *         description: The book was not found
 */