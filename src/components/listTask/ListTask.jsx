import React, { useEffect, useState } from "react";
import { TiTick } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import { AiFillEdit } from "react-icons/ai";

const ListTask = ({
  lists,
  setLists,
  filteredLists,
  setFilteredLists,
  setTaskCount,
}) => {
  const [isEdited, setIsEdited] = useState(false);
  const [editedValue, setEditedValue] = useState("");
  const [editedIndex, setEditedIndex] = useState();

  const deleteTask = (deleteList) => {
    const newTaskList = filteredLists.filter((list) => list !== deleteList);
    setFilteredLists(newTaskList);
    setLists(newTaskList);
    setTaskCount((prevValue) => prevValue - 1);
    setIsEdited(false);
  };

  const handleCheck = (e,selectedIndex) => {
    const check = e.target.checked;
    // setIsChecked(check);

    if (check === true) {
      const checkedList = lists.map((list,index) => {
        if(index === selectedIndex) {
          return {...list, checked:true};
        }
        return list;
      });
      setFilteredLists(checkedList);
      setLists(checkedList);
    }else if(check === false){
      const checkedList = lists.map((list,index) => {
        if(index === selectedIndex) {
          return {...list, checked:false};
        }
        return list;
      });
      setFilteredLists(checkedList);
      setLists(checkedList);
    }
  };

  const editTask = (list, index) => {
    setIsEdited((prevValue) => !prevValue);
    setEditedValue(list['taskName']);
    setEditedIndex(index);
    // console.log(isEdited + "  " + editedIndex + "  " + editedValue)
  };

  const updateTask = (toUpdateIndex) => {
    if (editedValue !== "") {
      const updatedTaskList = lists.map((list, index) =>
        index == toUpdateIndex ? {...list, taskName:editedValue} : list
      );
      setFilteredLists(updatedTaskList);
      setLists(updatedTaskList);
    }
    setIsEdited(false);
  };

  return (
    <div className="h-[50vh] overflow-y-scroll">
      {filteredLists?.map((list, index) => (
        <div
          key={index}
          className="flex justify-center items-center text-sm border-b-2 py-1 space-x-2"
        >
          {<input type="checkbox" 
          checked={list["checked"] === true ? true : false}
          onChange={(e) => handleCheck(e,index)} />}
          {isEdited && index === editedIndex ? (
            <>
              <input
                type="text"
                name=""
                className="p-1 w-full"
                placeholder={list['taskName']}
                onChange={(e) => setEditedValue(e.target.value)}
              />

              <button
                onClick={() => updateTask(index)}
                className="text-green-600"
              >
                <TiTick />
              </button>
            </>
          ) : 
          (
            <p
              className={`p-1 w-full ${
                // isChecked && index == checkedIndex
                (list["checked"] === true)
                  ? "line-through"
                  : "no-underline"
              }`}
            >
              {list.taskName}
            </p>
          )
          }
          <div className="space-x-2 flex">
            <button
              onClick={() => editTask(list, index)}
              disabled={list["checked"] === true ? true : false}
              className="text-blue-600"
            >
              <AiFillEdit />
            </button>
            <button onClick={() => deleteTask(list)} className="text-red-600">
              <RxCross2 />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListTask;
