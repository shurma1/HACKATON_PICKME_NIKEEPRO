import express from 'express';
import ReliabilityRoute from "./reliability.route";

const router = express.Router();


router.use('/reliability', ReliabilityRoute);

export default router