import React from "react";
import { RxCaretSort } from "react-icons/rx";
import { SortItemProps } from "../types";

const SortItem = ({ sortItems, text }: SortItemProps) => {
  return (
    <div onClick={() => sortItems(text)} className="cursor-pointer flex items-center gap-x-1 text-[#4a5b77] border shadow-sm shadow-[#b3cdf4] px-3 py-1 rounded-lg">
      {text} <RxCaretSort color="#4a5b77"/>
    </div>
  );
};

export default SortItem;
