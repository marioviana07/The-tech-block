const router = require('express').Router();
const apiRoutes = require('./api');
const dashboardRoutes = require('./dashboard-routes')
const homeRoutes = require('./homepage-routes.js');

router.use('/', homeRoutes);

router.use('/api', apiRoutes);

router.use('/dashboard', dashboardRoutes);

module.exports = router;