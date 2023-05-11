/**
 * @swagger
 * 
 * /api/v1/user:
 *   get:
 *     description: Returns a user profile object
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Bearer token to access the API
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 documento_ad:
 *                   type: string
 *                 nombre:
 *                   type: string
 *                 apellido:
 *                   type: string
 *                 partido:
 *                   type: integer
 *                 tipocandidatura:
 *                   type: integer
 *                 imagen:
 *                   type: string
 *                 telefono:
 *                   type: string
 *                 email:
 *                   type: string
 *                 usuario:
 *                   type: string
 *                 estado:
 *                   type: string
 *                 fecha:
 *                   type: string
 *                   format: date
 *                 votos:
 *                   type: integer
 *                 candidatura:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     nombre:
 *                       type: string
 *                     descripcion:
 *                       type: string
 *                   required:
 *                     - id
 *                     - nombre
 *                 infoPartido:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     nombre:
 *                       type: string
 *                     descripcion:
 *                       type: string
 *                   required:
 *                     - id
 *                     - nombre
 */
