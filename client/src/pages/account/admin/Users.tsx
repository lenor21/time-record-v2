import { useEffect, useState } from 'react';
import UserCard from '../../../components/UserCard';
import { useGetUsersQuery } from '../../../features/auth/usersApiSlice';
import Loader from '../../../components/Loader';

const Users = () => {
  const [currentPage, setCurrentPage] = useState(1);
  // const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(3);

  const { data: posts, isLoading } = useGetUsersQuery({
    currentPage,
    limit,
  });

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  if (isLoading) {
    return <Loader />;
  }

  const users = posts.users.map((item: any) => (
    <UserCard key={item._id} {...item} />
  ));

  console.log(users);

  return (
    <div className='min-h-[80vh] py-20'>
      <h2 className='mb-10'>List of users</h2>
      <ul className='w-full bg-slate-100 p-10 rounded-xl grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
        {users}
      </ul>
      <p>{currentPage}</p>

      <button onClick={() => handlePageChange(currentPage + 1)}>Next</button>
    </div>
  );
};

export default Users;
