import asyncHandler from 'express-async-handler';
import Record from '../models/recordModel.js';

// @desc: Get all records
// @route: GET /api/records
// @access: Private
const getRecords = asyncHandler(async (req, res) => {
  const records = await Record.find();
  res.status(200).json(records);
});

// @desc: time in on a record
// @route: GET /api/records
// @access: Private
const addTimeIn = asyncHandler(async (req, res) => {
  const { timeIn } = req.body;

  if (!timeIn) {
    res.status(400);
    throw new Error('Please fill add time in value');
  }

  // check if the date.now already exists
  const currentDay = new Date().toISOString().split('T')[0];
  const dateExists = await Record.findOne({
    date: {
      $gte: new Date(currentDay),
      $lt: new Date(currentDay + 'T23:59:59.999Z'),
    },
    user: req.user._id,
  });

  if (dateExists) {
    res.status(400);
    throw new Error('Record already exists');
  }

  const record = await Record.create({ timeIn, user: req.user._id });

  if (record) {
    res.status(200).json(record);
  } else {
    res.status(400);
    throw new Error('Invalid record data');
  }
});

// @desc: time out on a record
// @route: GET /api/records
// @access: Private
const addTimeOut = asyncHandler(async (req, res) => {
  const record = await Record.findById(req.params.id);

  if (!record) {
    res.status(404);
    throw new Error('Record not found');
  }

  // check if the date.now already exists
  const currentDay = new Date().toISOString().split('T')[0];
  const dateExists = await Record.findOne({
    date: {
      $gte: new Date(currentDay),
      $lt: new Date(currentDay + 'T23:59:59.999Z'),
    },
  });

  if (dateExists) {
    res.status(400);
    throw new Error('Record already exists');
  }

  const updatedRecord = await Record.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedRecord);
});

export { getRecords, addTimeIn, addTimeOut };
