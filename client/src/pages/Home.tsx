import { Link } from 'react-router';

const Home = () => {
  return (
    <div className='grid place-items-center min-h-[80vh] py-10 md:py-20'>
      <div className='hero bg-base-200 min-h-[50vh] max-w-[100%] md:max-w-[80%] md:p-10 lg:px-10 rounded-xl'>
        <div className='hero-content flex-col lg:flex-row gap-x-10 p-7'>
          <img
            src='https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp'
            className='max-w-sm rounded-lg shadow-2xl'
          />
          <div>
            <h1 className='text-5xl font-bold'>Lorem ipsum dolor sit amet!</h1>
            <p className='py-6'>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maxime
              ad suscipit laudantium explicabo commodi. Earum commodi maxime
              voluptatem cumque similique.
            </p>
            <Link to='/sign-in' className='btn btn-primary'>
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
