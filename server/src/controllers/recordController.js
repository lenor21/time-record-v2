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

  const { timeOut } = req.body;

  const timeOutExist = await Record.findOne({ timeOut });

  if (timeOutExist) {
    res.status(400);
    throw new Error('Time out already exists');
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

// @desc: get the record for the day
// @route: GET /api/records/today
// @access: Private
const getRecordToday = asyncHandler(async (req, res) => {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0); // Set time to the beginning of the day

  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999); // Set time to the end of the day

  const record = await Record.find({
    date: {
      $gte: startOfDay, // Greater than or equal to the start of the day
      $lte: endOfDay, // Less than or equal to the end of the day
    },
    user: req.user._id, // only the record for this user
  });

  res.status(200).json(record);
});

export { getRecords, addTimeIn, addTimeOut, getRecordToday };
