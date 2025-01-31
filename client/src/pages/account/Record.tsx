import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { useRecordTodayQuery } from '../../features/record/recordsApiSlice';
import { setRecord } from '../../features/record/recordSlice';

const Record = () => {
  const [date, setDate] = useState(new Date());
  const [timeIn, setTimeIn] = useState<string | null>(null);
  const [timeOut, setTimeOut] = useState<string | null>(null);
  const [records, setRecords] = useState(null);

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state: RootState) => state.auth);
  const { recordInfo } = useSelector((state: RootState) => state.record);

  const { data: recordData } = useRecordTodayQuery(userInfo._id);

  const localizedDate = date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const localizedTime = date.toLocaleString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const handleTimeIn = () => {
    Swal.fire({
      title: 'Are you sure about this time in?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: localizedTime,
          text: 'Your time in has been saved.',
          icon: 'success',
        });

        localStorage.setItem('timeIn', localizedTime);

        setTimeIn(localStorage.getItem('timeIn'));
      }
    });
  };

  const handleTimeOut = () => {
    Swal.fire({
      title: 'Are you sure about this time out?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: localizedTime,
          text: 'Your time in has been saved.',
          icon: 'success',
        });

        localStorage.setItem('timeOut', localizedTime);

        setTimeOut(localStorage.getItem('timeOut'));
      }
    });
  };

  useEffect(() => {
    dispatch(setRecord({ ...recordData }));
  }, [userInfo, recordData]);

  useEffect(() => {
    console.log(recordInfo[0]);
    setRecords(recordInfo[0]);
  }, [recordInfo]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className='grid place-items-center min-h-[80vh]'>
      <div className='card bg-base-100 w-full md:w-96 shadow-xl'>
        <div className='card-body'>
          <h2 className='card-title'>Hello {userInfo.name}</h2>
          <p>Company name {records?.date}</p>
          <div className='stats shadow w-full border border-[#c2c9d3] rounded-md bg-base-200 mt-4'>
            <div className='stat'>
              <div className='stat-title'>{localizedDate}</div>
              <div className='stat-value'>{localizedTime}</div>
            </div>
          </div>
          <div className='flex'>
            <div className='stats w-full rounded-md'>
              <div className='stat'>
                <div className='stat-title text-center'>Time in:</div>
                <div className='stat-value text-xl text-center'>
                  {timeIn ? localStorage.getItem('timeIn') : 'No record'}
                </div>
                <button
                  onClick={handleTimeIn}
                  className='btn mt-6'
                  disabled={timeIn !== null || timeOut !== null}>
                  TIME IN
                </button>
              </div>
            </div>
            <div className='stats w-full rounded-md'>
              <div className='stat'>
                <div className='stat-title text-center'>Time out:</div>
                <div className='stat-value text-xl text-center'>
                  {timeOut ? localStorage.getItem('timeOut') : 'No record'}
                </div>
                <button
                  onClick={handleTimeOut}
                  className='btn mt-6'
                  disabled={timeOut !== null}>
                  TIME OUT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Record;
