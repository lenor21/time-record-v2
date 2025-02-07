const Users = () => {
  return (
    <div className='min-h-[80vh] py-20'>
      <h2 className='mb-10'>List of users</h2>
      <ul className='w-full bg-[#ff0] grid md:grid-cols-3 lg:grid-cols-5 gap-4'>
        <li>
          <a href='#' className='card bg-base-100 w-full shadow-xl'>
            <figure>
              <img
                src='https://images.unsplash.com/32/Mc8kW4x9Q3aRR3RkP5Im_IMG_4417.jpg?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                alt='Shoes'
              />
            </figure>
            <div className='card-body'>
              <h2 className='card-title'>
                Shoes!
                <div className='badge badge-secondary'>NEW</div>
              </h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
              <div className='card-actions justify-end'>
                <div className='badge badge-outline'>Fashion</div>
                <div className='badge badge-outline'>Products</div>
              </div>
            </div>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Users;
