import React from "react";
// import { IoMdArrowRoundBack } from "react-icons/io";

const CompletedTask = ({completedList}) => {
  return (
    <>
      {completedList?.map((list, index) => (
        <div key={index} className="flex">
          <li>{list.taskName}</li>
        </div>
      ))}
    </>
  );
};

export default CompletedTask;
