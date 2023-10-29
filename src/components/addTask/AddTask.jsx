import React, { useEffect, useState, useRef} from "react";

const AddTask = ({ lists,setLists, setFilteredLists }) => {
 
  const taskRef = useRef(null) 
  // const [task, setTask] = useState("");

  useEffect(() => {
    localStorage.setItem("taskList", JSON.stringify(lists));
  },[lists])

  const addTask = () => {
    if (taskRef.current) {
      console.log(taskRef.current.value)
      const newTask = { taskName: taskRef.current.value, checked: false };
      setLists((prevLists) => [...prevLists, newTask]);
      setFilteredLists((prevFilteredLists) => [...prevFilteredLists, newTask]);
      taskRef.current.value = null;
    }
  };
  // const addTask = () => {
  //   if (task) {
  //     const newTask = { taskName: task, checked: false };
  //     setLists((prevLists) => [...prevLists, newTask]);
  //     setFilteredLists((prevFilteredLists) => [...prevFilteredLists, newTask]);
  //     setTask("");
  //   }
  // };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  };
  return (
    <>
      <div className="flex justify-between space-x-2">
        <input
          type="text" 
          ref={taskRef} // value={task}
           // onChange={(e) => setTask(e.target.value)}
          className="w-full p-1"
          placeholder="task name"
          onKeyPress={handleKeyPress}
        />
        <button
          onClick={addTask}
          className="bg-gray-500 p-2 text-white font-bold"
        >
          +
        </button>

      </div>
    </>
  );
};

export default AddTask;
