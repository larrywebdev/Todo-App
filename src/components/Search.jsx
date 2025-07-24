function Search({ searchQuery, setSearchQuery }) {
  {
    /* Search bar to display todo task searched*/
  }
  return (
    <>
      <input
        className="search"
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
        }}
      />
    </>
  );
}
export default Search;
