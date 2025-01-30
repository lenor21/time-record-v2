interface PaginationProps {
  currentPage: number;
  totalPages: number;
  handlePageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  handlePageChange,
  currentPage,
  totalPages,
}) => {
  return (
    <div className='join'>
      <button
        className='join-item btn btn-xs lg:btn-md'
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}>
        Prev
      </button>
      <button
        className={`join-item btn btn-xs lg:btn-md ${
          currentPage === 1 ? 'bg-slate-500 text-white' : ''
        }`}
        onClick={() => handlePageChange(1)}>
        1
      </button>
      {currentPage > 3 && (
        <button className='join-item btn btn-xs lg:btn-md btn-disabled'>
          ...
        </button>
      )}

      <button
        className={`join-item btn btn-xs lg:btn-md ${
          currentPage < 3 && 'hidden'
        }`}
        onClick={() => handlePageChange(currentPage - 1)}>
        {currentPage - 1}
      </button>
      <button
        className={`join-item btn btn-xs lg:btn-md ${
          currentPage === currentPage ? 'bg-slate-500 text-white' : ''
        } ${currentPage === totalPages || currentPage === 1 ? 'hidden' : ''}`}
        onClick={() => handlePageChange(currentPage)}>
        {currentPage}
      </button>
      <button
        className={`join-item btn btn-xs lg:btn-md ${
          currentPage === totalPages || currentPage === totalPages - 1
            ? 'hidden'
            : ''
        }`}
        onClick={() => handlePageChange(currentPage + 1)}>
        {currentPage + 1}
      </button>

      {currentPage < 8 && (
        <button className='join-item btn btn-xs lg:btn-md btn-disabled'>
          ...
        </button>
      )}

      <button
        className={`join-item btn btn-xs lg:btn-md ${
          currentPage === totalPages ? 'bg-slate-500 text-white' : ''
        }`}
        onClick={() => handlePageChange(totalPages)}>
        {totalPages}
      </button>
      <button
        className='join-item btn btn-xs lg:btn-md'
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
