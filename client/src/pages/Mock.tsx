import axios from 'axios';
import { useEffect, useState } from 'react';
import Pagination from '../components/Pagination';

interface User {
  _id: string;
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  ip_address: string;
}

const Mock = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/api/mocks?page=${currentPage}&limit=${limit}`
        );

        setUsers(response.data.users);
        setCurrentPage(response.data.currentPage);
        setTotalPages(response.data.totalPages);
      } catch (err) {
        console.log(err);
      }
    };

    getUser();
  }, [currentPage, limit]);

  console.log(users);

  const data = users.map((item) => (
    <tr key={item._id}>
      <th>{item.id}</th>
      <td>{item.first_name}</td>
      <td>{item.last_name}</td>
      <td>{item.email}</td>
      <td>{item.gender}</td>
      <td>{item.ip_address}</td>
    </tr>
  ));

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className='mt-10 pb-20'>
      <h1 className='text-2xl font-bold mb-10'>Mocks</h1>
      <div className='overflow-x-auto'>
        <table className='table table-lg'>
          <thead>
            <tr>
              <th>ID</th>
              <th>First name</th>
              <th>Last name</th>
              <th>Email</th>
              <th>Gender</th>
              <th>IP address</th>
            </tr>
          </thead>
          <tbody>{data}</tbody>
        </table>
      </div>
      <div className='grid place-items-center mt-14'>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Mock;
