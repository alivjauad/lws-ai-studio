const SearchLoader = () => {
  const items = Array.from({ length: 9 });

  return (
    <div className="grid grid-cols-3 grid-rows-3 w-[60.2px] h-[47.2px] mr-3">
      {items.map((_, index) => (
        <div
          key={index}
          className="bg-white"
          style={{
            animation: `flipping-18i5bq 1.5s ${
              index * 0.1
            }s infinite backwards`,
          }}
        ></div>
      ))}
    </div>
  );
};

export default SearchLoader;
