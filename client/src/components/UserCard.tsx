const UserCard = ({ ...item }) => {
  return (
    <li>
      <a href='#' className='card bg-base-100 w-full shadow-xl'>
        <div className='card-body min-h-40'>
          <h2 className='card-title'>
            {item.name}
            <div className='badge badge-secondary'>NEW</div>
          </h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
        </div>
      </a>
    </li>
  );
};

export default UserCard;
