import asyncHandler from 'express-async-handler';
import Mock from '../models/mockModel.js';

// @desc: Get mock data
// @route: GET /api/users/mocks
// @access: Public
const getMocks = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const totalMocks = await Mock.countDocuments();
  const totalPages = Math.ceil(totalMocks / limit);

  const users = await Mock.find().skip(skip).limit(limit);
  res.status(200).json({ users, currentPage: page, totalPages, totalMocks });
});

export { getMocks };
