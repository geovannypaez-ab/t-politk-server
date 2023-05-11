"use strict";
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: login with username and password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *                 minLength: 6
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: this is token for authentication in all routes
 *                 role:
 *                   type: string
 *                   enum: [lider, admin]
 *                   description: User's role
 */ 
