const GridLoading = () => {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(16rem,1fr))] gap-4 w-full">
      <div className="h-64 bg-indigo-300 animate-pulse rounded-md"></div>
      <div className="h-64 bg-indigo-300 animate-pulse rounded-md"></div>
      <div className="h-64 bg-indigo-300 animate-pulse rounded-md"></div>
      <div className="h-64 bg-indigo-300 animate-pulse rounded-md"></div>
      <div className="h-64 bg-indigo-300 animate-pulse rounded-md"></div>
      <div className="h-64 bg-indigo-300 animate-pulse rounded-md"></div>
      <div className="h-64 bg-indigo-300 animate-pulse rounded-md"></div>
      <div className="h-64 bg-indigo-300 animate-pulse rounded-md"></div>
    </div>
  );
};

export default GridLoading;
