import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import {
  useRecordTodayQuery,
  useTimeInMutation,
  useTimeOutMutation,
} from '../../features/record/recordsApiSlice';
import { setRecord } from '../../features/record/recordSlice';
import Loader from '../../components/Loader';

const Record = () => {
  const [date, setDate] = useState(new Date());

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state: RootState) => state.auth);
  const { recordInfo } = useSelector((state: RootState) => state.record);

  const { data: recordData, isLoading } = useRecordTodayQuery(userInfo._id);
  const [timeIn] = useTimeInMutation();
  const [timeOut] = useTimeOutMutation();

  const localizedDate = date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const localizedTime = date.toLocaleString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const handleTimeIn = async () => {
    Swal.fire({
      title: 'Are you sure about this time in?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await timeIn({
            timeIn: date,
          }).unwrap();

          dispatch(setRecord({ ...res }));

          Swal.fire({
            title: localizedTime,
            text: 'Your time in has been saved.',
            icon: 'success',
          });
        } catch (err: any) {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: `${err.data.message}`,
            showConfirmButton: false,
            timer: 2000,
          });
        }
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
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const currentDateMs = date.getTime();
          const timeInRecord = recordInfo.timeIn;
          const timeInString = new Date(timeInRecord);
          const timeInMs = timeInString.getTime();
          const durationMs = currentDateMs - timeInMs;
          const durationHour = durationMs / (1000 * 60 * 60);
          const durationData = durationHour.toFixed(2);

          console.log(durationData);
          // testing branch develop

          const res = await timeOut({
            timeOut: date,
            _id: recordInfo._id,
            duration: durationData,
          }).unwrap();

          dispatch(setRecord({ ...res }));

          Swal.fire({
            title: localizedTime,
            text: 'Your time in has been saved.',
            icon: 'success',
          });
        } catch (err: any) {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: `${err.data.message}`,
            showConfirmButton: false,
            timer: 2000,
          });
        }
      }
    });
  };

  useEffect(() => {
    if (recordData && recordData.length > 0) {
      console.log(recordData);
      dispatch(setRecord({ ...recordData[0] }));
    } else {
      console.log('recordData is undefined or empty');
    }
  }, [recordData, dispatch, setRecord]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className='grid place-items-center min-h-[80vh]'>
      <div className='card bg-base-100 w-full md:w-96 shadow-xl'>
        <div className='card-body'>
          <h2 className='card-title'>Hello {userInfo.name}</h2>
          <p>Company name</p>
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
                  {recordInfo?.timeIn
                    ? new Date(recordInfo?.timeIn).toLocaleString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })
                    : 'No record'}
                </div>
                <button onClick={handleTimeIn} className='btn mt-6'>
                  TIME IN
                </button>
              </div>
            </div>
            <div className='stats w-full rounded-md'>
              <div className='stat'>
                <div className='stat-title text-center'>Time out:</div>
                <div className='stat-value text-xl text-center'>
                  {recordInfo?.timeOut
                    ? new Date(recordInfo?.timeOut).toLocaleString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })
                    : 'No record'}
                </div>
                <button onClick={handleTimeOut} className='btn mt-6'>
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
