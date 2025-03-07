const Loading = () => {
  return (
    <div className="absolute inset-y-40 inset-x-30 flex items-center justify-center ">
      <div className=" border-gray-400 h-20 w-20 animate-spin rounded-full border-8 border-t-blue-700" />
    </div>
  );
};

export default Loading;
