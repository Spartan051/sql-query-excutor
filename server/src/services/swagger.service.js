/**
 * @swagger
 * tags:
 *   -  name: Connections
 *      description: connection managing API
 *   -  name: Queries
 *      description: query managing API
 *   -  name: Forms
 *      description: form managing API
 * /connection/{user_id}:
 *   get:
 *     summary: Returns the list of user connections
 *     tags: [Connections]
 *     parameters: 
 *     - name: user_id
 *       in: query
 *       required: true
 *       type: integer
 *       in: query
 *       required: true
 *       type: string
 *     responses:
 *       200:
 *         description: The list of user connections
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/connections'
 *       500:
 *         description: some error in get connections
 * /connection?user_id&connection_id:
 *   get:
 *     summary: Return the connection whit the given id
 *     tags: [Connections]
 *     parameters: 
 *     - name: user_id
 *       in: query
 *       required: true
 *       type: integer
 *       required: true
 *       type: string
 *     - name: connection_id
 *       in: query
 *       required: true
 *       type: integer
 *     responses:
 *       200:
 *         description: The connection
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/connection'
 *       404:
 *         description: this id was not found !
 *       500:
 *         description: some error in get connection
 * /connection:
 *   post:
 *     summary: create a new connection
 *     tags: [Connections]
 *     responses:
 *       200:
 *         description: The connection is created !
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/connection'
 *       500:
 *         description: some error in create connection
 *   put:
 *     summary: update an existing connection
 *     tags: [Connections]
 *     responses:
 *       200:
 *         description: The list of the connections
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/connection'
 *       404:
 *         description: this id was not found !
 *       500:
 *         description: some error in update connection
 *   delete:
 *     summary: delete an existing connection
 *     tags: [Connections]
 *     responses:
 *       200:
 *         description: The list of the connections
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/connection'
 *       404:
 *         description: this id was not found !
 *       500:
 *         description: some error in delete connection
 * /query/{user_id}:
 *   get:
 *     summary: Returns the list of user queries
 *     tags: [Queries]
 *     responses:
 *       200:
 *         description: The list of user queries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/connection'
 *       500:
 *         description: some error in get queries
 * /query?user_id&query_id:
 *   get:
 *     summary: Return the query whit the given id
 *     tags: [Queries]
 *     responses:
 *       200:
 *         description: The query
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/connection'
 *       404:
 *         description: this id was not found !
 *       500:
 *         description: some error in get query
 * /query:
 *   post:
 *     summary: create a new query
 *     tags: [Queries]
 *     responses:
 *       200:
 *         description: The query is created !
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/connection'
 *       500:
 *         description: some error in create query
 *   put:
 *     summary: update an existing query
 *     tags: [Queries]
 *     responses:
 *       200:
 *         description: The list of the queries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/connection'
 *       404:
 *         description: this id was not found !
 *       500:
 *         description: some error in update query
 *   delete:
 *     summary: delete an existing query
 *     tags: [Queries]
 *     responses:
 *       200:
 *         description: The list of the queries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/connection'
 *       404:
 *         description: this id was not found !
 *       500:
 *         description: some error in delete query
 * /forms/{user_id}:
 *   get:
 *     summary: Returns the list of user forms
 *     tags: [Forms]
 *     responses:
 *       200:
 *         description: The list of user forms
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/connection'
 *       500:
 *         description: some error in get forms
 * /forms:
 *   post:
 *     summary: create a new form
 *     tags: [Forms]
 *     responses:
 *       200:
 *         description: The form is created !
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/connection'
 *       500:
 *         description: some error in create form
 * components:
 *  schemas:
 *    connection:
 *       type: object
 *       required:
 *         - connection_id
 *         - connection_name
 *         - host
 *         - database_name
 *         - username
 *         - password
 *       properties:
 *         connection_id:
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
 *         connection_id: 1
 *         connection_name: "con 1"
 *         host: "localhost"
 *         database_name: "db 1"
 *         username: "user 1"
 *         password: "abc123"
 *    create_connection:
 *       type: object
 *       required:
 *         - user_id
 *         - connection_name
 *         - host
 *         - database_name
 *         - username
 *         - password
 *       properties:
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
 *         user_id: 1
 *         connection_name: "con 1"
 *         host: "localhost"
 *         database_name: "db 1"
 *         username: "user 1"
 *         password: "abc123"
 *    update_connection:
 *       type: object
 *       required:
 *         - connection_id
 *         - connection_name
 *         - host
 *         - database_name
 *         - username
 *         - password
 *       properties:
 *         connection_id:
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
 *         connection_id: 1
 *         connection_name: "con 1"
 *         host: "localhost"
 *         database_name: "db 1"
 *         username: "user 1"
 *         password: "abc123"
 *    delete_connection:
 *       type: object
 *       required:
 *         - connection_id
 *         - connection_name
 *         - host
 *         - database_name
 *         - username
 *         - password
 *       properties:
 *         connection_id:
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
 *         connection_id: 1
 *         connection_name: "con 1"
 *         host: "localhost"
 *         database_name: "db 1"
 *         username: "user 1"
 *         password: "abc123"
 *    query:
 *       type: object
 *       required:
 *         - user_id
 *         - connection_name
 *         - query_name
 *         - query
 *         - fields
 *         - show_type
 *       properties:
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
 *         user_id: 1
 *         connection_name: "con 1"
 *         query_name: "query 1"
 *         query: "SELECT input1 FROM input2 WHERE input3 = 'input4'"
 *         fields: "Selection,table name,condition 1,condition 2"
 *         show_type: "table"
 */
