import { useEffect, useState } from "react";
import "./App.css";
import AddTask from "./components/addTask/AddTask";
import ListTask from "./components/listTask/ListTask";
import SearchTask from "./components/searchTask/SearchTask";
import CompletedTask from "./components/completedTask/CompletedTask";

const getLocalStorageItems = () => {
  let tasks = localStorage.getItem('taskList')
  console.log(tasks)
  if(tasks){
    return JSON.parse(tasks)
  }else{
    return []
  }
}
getLocalStorageItems()

function App() {
  const [lists, setLists] = useState(getLocalStorageItems());
  const [filteredLists, setFilteredLists] = useState([]);
  const [taskCount, setTaskCount] = useState(0);
  const [completedList, setCompletedList] = useState([]);
  const [completedListCount, setCompletedListCount] = useState(0);
  
  useEffect(() => {
    if (filteredLists.length > 0) {
      const uncheckedLists = lists.filter((list) => list['checked'] === false)
      setTaskCount(uncheckedLists.length);
    }
  }, [filteredLists]);

  useEffect(() => {
    const completedTasks = lists.filter((list) => list["checked"] === true);
    setCompletedList(completedTasks);
    setCompletedListCount(completedTasks.length);
  }, [lists]);
  
  console.log(lists)
  // console.log(completedList);
  

  return (
    <>
      <div className="h-[100vh] w-full bg-black">
        <div className="h-full flex justify-center items-center">

          {/* todo manager */}
          <div className="w-[30%]  h-[80vh] bg-gray-100 p-2 space-y-2">
            <h1 className="text-center font-semibold">
              Todo Manager- <span className="text-blue-600">{taskCount}</span>
            </h1>
            <AddTask
            lists={lists}
              setLists={setLists}
              setFilteredLists={setFilteredLists}
            />
            <SearchTask
              lists={lists}
              setFilteredLists={setFilteredLists}
            />
            <div className="">
              <ListTask
                lists={lists}
                setLists={setLists}
                filteredLists={filteredLists}
                setFilteredLists={setFilteredLists}
                setCompletedList={setCompletedList}
                setTaskCount={setTaskCount}
              />
            </div>
          </div>

          {/* completed todo */}
          <div className="w-[30%]  h-[80vh] bg-gray-300 p-2">
            <h1 className="text-center font-semibold text-white bg-blue-500">
              Completed Todo - {completedListCount}
            </h1>
            <CompletedTask completedList={completedList}
              />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
