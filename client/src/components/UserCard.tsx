import { Link } from 'react-router';
import { useUserRecordsQuery } from '../features/record/recordsApiSlice';
import { useEffect, useState } from 'react';

const UserCard = ({ ...item }) => {
  const [present, setPresent] = useState(false);

  const { data: records } = useUserRecordsQuery(item._id);

  useEffect(() => {
    console.log(JSON.stringify(records, null, 2));
  }, [records]);

  return (
    <li>
      <Link
        to={`/account/admin/${item._id}`}
        className={`card w-full shadow-xl bg-base-100`}>
        <div className='card-body min-h-40'>
          <h2 className='card-title'>
            {item.name}
            <div className='badge badge-secondary'>NEW</div>
          </h2>
          <p>{item.email}</p>
          <p>{item.role}</p>
          <p>
            {new Date(item.createdAt).toLocaleString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
      </Link>
    </li>
  );
};

export default UserCard;
