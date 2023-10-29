import React, { useEffect, useState } from "react";

const SearchTask = ({ lists,setFilteredLists }) => {
  const [searchedTask, setSearchedTask] = useState("");
  // console.log(searchedTask)

  useEffect(() => {
    if (searchedTask === "") {
      setFilteredLists(lists);
    } else {
      const filter = lists.filter((list) => list['taskName'].includes(searchedTask))
      setFilteredLists(filter);
    }
  }, [searchedTask]);

  return (
    <>
      <input
        type="search"
        value={searchedTask}
        onChange={(e) => setSearchedTask(e.target.value)}
        className="w-full p-2"
        placeholder="Search...."
      />
    </>
  );
};

export default SearchTask;
