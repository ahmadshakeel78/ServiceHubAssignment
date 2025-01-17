const express = require('express');
const router = express.Router();
const { getAllServices, submitServiceData, getSubmissions, getReportingMetrics } = require('../controllers/serviceController');
const { authenticateJWT } = require('../middleware/authMiddleware');
/**
 * @swagger
 * /api/services:
 *   get:
 *     summary: Retrieve all services
 *     responses:
 *       200:
 *         description: A list of services
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     example: ABC Bank
 *                   id:
 *                     type: string
 *                     example: 101
 */
// Fetch all services
router.get('/', authenticateJWT, getAllServices);

/**
 * @swagger
 * /api/services/submit/{serviceId}:
 *   post:
 *     summary: Submit form data for a specific service
 *     parameters:
 *       - in: path
 *         name: serviceId
 *         required: true
 *         description: ID of the service
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: string
 *                 example: "500"
 *               bank_account_number:
 *                 type: string
 *                 example: "1234567890"
 *     responses:
 *       201:
 *         description: Data submitted successfully
 *       400:
 *         description: Validation error
 */
// Submit data for a specific service
router.post('/submit/:serviceId', authenticateJWT, submitServiceData);

/**
 * @swagger
 * /api/services/submissions/{serviceId}:
 *   get:
 *     summary: Retrieve submissions for a specific service
 *     parameters:
 *       - in: path
 *         name: serviceId
 *         required: true
 *         description: ID of the service
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         description: Page number for pagination
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: limit
 *         description: Number of submissions per page
 *         schema:
 *           type: integer
 *           example: 10
 *     responses:
 *       200:
 *         description: A list of submissions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                   example: 25
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 pages:
 *                   type: integer
 *                   example: 5
 *                 submissions:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       serviceId:
 *                         type: string
 *                         example: "101"
 *                       data:
 *                         type: object
 *                         example:
 *                           amount: "500"
 *                           bank_account_number: "1234567890"
 */
// Retrieve submissions for a specific service
router.get('/submissions/:serviceId', authenticateJWT, getSubmissions);

// Get reporting metrics
router.get('/reporting', authenticateJWT, getReportingMetrics);

module.exports = router;
