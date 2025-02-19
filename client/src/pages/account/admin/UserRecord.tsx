import { useParams } from 'react-router';
import { useUserRecordsQuery } from '../../../features/record/recordsApiSlice';
import { useEffect } from 'react';
import Calendar from '../../../components/Calendar';

const UserRecord = () => {
  const { id } = useParams();

  const { data: userRecords } = useUserRecordsQuery(id);

  // useEffect(() => {
  //   console.log(userRecords);
  // }, [userRecords]);

  return (
    <div>
      UserRecord {id}
      <div className='mt-20'>
        <Calendar />
      </div>
    </div>
  );
};

export default UserRecord;
