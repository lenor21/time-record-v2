const UserCard = ({ ...item }) => {
  return (
    <li>
      <a href='#' className='card bg-base-100 w-full shadow-xl'>
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
      </a>
    </li>
  );
};

export default UserCard;
