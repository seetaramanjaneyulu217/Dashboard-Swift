import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { CommentsDetails, SortType } from "../types";
import toast from "react-hot-toast";
import TableColumns from "../constants/TableColumns";
import SortItem from "../components/SortItem";
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState<number>(
    Number(localStorage.getItem("currentPage")) || 1
  );
  const [itemsPerPage, setItemsPerPage] = useState<number>(
    Number(localStorage.getItem("itemsPerPage")) || 10
  );
  const [searchText, setSearchText] = useState<string>(
    localStorage.getItem("searchText") || ""
  );

  const [sortFields, setSortFields] = useState<SortType>(() => {
    const storedSortFields = localStorage.getItem("sortFields");
    return storedSortFields !== null
      ? JSON.parse(storedSortFields)
      : {
          type: "Sort Post ID",
          count: 1,
        };
  });
  const [comments, setComments] = useState<CommentsDetails[]>([]);
  const [slicedComments, setSlicedComments] = useState<CommentsDetails[]>([]);
  const [searchedComments, setSearchedComments] = useState<CommentsDetails[]>(
    []
  );
  const [sortedComments, setSortedComments] = useState<CommentsDetails[]>([]);
  const columns = TableColumns();

  const filterComments = () => {

    let searchedComments: CommentsDetails[] = slicedComments.filter(
      (comment: CommentsDetails) => {
        if (
          comment.name
            ?.replace(/ /g, "")
            .toLowerCase()
            ?.includes(searchText.replace(/ /g, "").toLowerCase()) ||
          comment.email
            ?.replace(/ /g, "")
            .toLowerCase()
            ?.includes(searchText.replace(/ /g, "").toLowerCase()) ||
          comment.body
            ?.replace(/ /g, "")
            .toLowerCase()
            ?.includes(searchText.replace(/ /g, "").toLowerCase())
        ) {
          return comment;
        }
      }
    );

    setSearchedComments(searchedComments);
  };

  const handleSearchText = (searchText: string): void => {

    setSearchText(searchText);
    localStorage.setItem("searchText", searchText);

    if (searchText === "") {
      setSlicedComments(
        comments.slice(
          itemsPerPage * (currentPage - 1),
          currentPage * itemsPerPage
        )
      );
      setSearchedComments([]);
      return;
    }

    filterComments();
  };

  const sortItems = (sortType: string) => {
    // if the sortType is same as before then just increase the count
    // and sort in ASC if count is 1 else DESC if count is 2 and NO SORT if count is 0
    if (sortType === sortFields.type) {
      setSortFields((prev) => {
        return { count: prev.count + 1, type: prev.type };
      });

      switch (sortFields.count) {
        case 3:
          if (searchedComments.length === 0) {
            setSlicedComments(
              comments.slice(
                itemsPerPage * (currentPage - 1),
                currentPage * itemsPerPage
              )
            );
            setSortedComments([]);
          } else {
            filterComments();
          }
          break;
        case 1:
          if (searchedComments.length === 0) {
            setSortedComments(
              slicedComments.sort(
                (comment1: CommentsDetails, comment2: CommentsDetails) => {
                  return sortFn(sortType, true, comment1, comment2);
                }
              )
            );
          } else {
            setSortedComments(
              searchedComments.sort(
                (comment1: CommentsDetails, comment2: CommentsDetails) => {
                  return sortFn(sortType, true, comment1, comment2);
                }
              )
            );
          }
          break;

        case 2:
          if (searchedComments.length === 0) {
            setSortedComments(
              slicedComments.sort(
                (comment1: CommentsDetails, comment2: CommentsDetails) => {
                  return sortFn(sortType, false, comment1, comment2);
                }
              )
            );
          } else {
            setSortedComments(
              searchedComments.sort(
                (comment1: CommentsDetails, comment2: CommentsDetails) => {
                  return sortFn(sortType, false, comment1, comment2);
                }
              )
            );
          }
          break;
      }

      if (sortFields.count === 3) {
        setSortFields({ ...sortFields, count: 1 });
      }
    } else {
      setSortFields({ count: 2, type: sortType });

      if (searchedComments.length === 0) {
        setSortedComments(
          slicedComments.sort(
            (comment1: CommentsDetails, comment2: CommentsDetails) => {
              return sortFn(sortType, true, comment1, comment2);
            }
          )
        );
      } else {
        setSortedComments(
          searchedComments.sort(
            (comment1: CommentsDetails, comment2: CommentsDetails) => {
              return sortFn(sortType, true, comment1, comment2);
            }
          )
        );
      }
    }
  };

  const sortFn = (
    sortType: string,
    ascending: boolean,
    comment1: CommentsDetails,
    comment2: CommentsDetails
  ) => {
    let comparision = 0;
    if (sortType === "Sort Post ID") {
      comparision = (comment1.postId ?? 0) - (comment2.postId ?? 0);
    } else if (sortType === "Sort Name") {
      comparision = (comment1.name ?? "").localeCompare(comment2.name ?? "");
    } else {
      comparision = (comment1.email ?? "").localeCompare(comment2.email ?? "");
    }
    return ascending ? comparision : -comparision;
  };

  const makeDefaultSort = (sortFields: SortType) => {
    if (sortFields.count === 1) {
      return;
    } else if (sortFields.count === 2) {
      if (searchedComments.length === 0) {
        setSortedComments(
          slicedComments.sort(
            (comment1: CommentsDetails, comment2: CommentsDetails) => {
              return sortFn(sortFields.type, true, comment1, comment2);
            }
          )
        );
      } else {
        setSortedComments(
          searchedComments.sort(
            (comment1: CommentsDetails, comment2: CommentsDetails) => {
              return sortFn(sortFields.type, true, comment1, comment2);
            }
          )
        );
      }
    } else if (sortFields.count === 3) {
      if (searchedComments.length === 0) {
        setSortedComments(
          slicedComments.sort(
            (comment1: CommentsDetails, comment2: CommentsDetails) => {
              return sortFn(sortFields.type, false, comment1, comment2);
            }
          )
        );
      } else {
        setSortedComments(
          searchedComments.sort(
            (comment1: CommentsDetails, comment2: CommentsDetails) => {
              return sortFn(sortFields.type, false, comment1, comment2);
            }
          )
        );
      }
    }
  };

  useEffect(() => {
    const fetchComments = () => {
      fetch("https://jsonplaceholder.typicode.com/comments", {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((result) => {
          setComments(result);
        })
        .catch((err) => {
          toast.error("Error fetching comments");
        });
    };

    fetchComments();
    localStorage.setItem("sortFields", JSON.stringify(sortFields));
  }, []);

  useEffect(() => {
    if (comments.length === 0) return;

    // there may be possibility we will be in 10th page in 50 per page and then we shift to 100 per page.
    // then 10th page will not exist in 100 per page. so we set the currentPage to maximum page of 100 per page i.e. 5.
    if (currentPage > Math.ceil(comments.length / itemsPerPage)) {
      setCurrentPage(comments.length / itemsPerPage);
    }

    setSlicedComments(
      comments.slice(
        itemsPerPage * (currentPage - 1),
        currentPage * itemsPerPage
      )
    );

    handleSearchText(searchText);
    makeDefaultSort(sortFields);

    localStorage.setItem("currentPage", currentPage.toString());
    localStorage.setItem("itemsPerPage", itemsPerPage.toString());
  }, [comments, itemsPerPage, currentPage, searchText]);

  useEffect(() => {
    localStorage.setItem("sortFields", JSON.stringify(sortFields));
  }, [sortFields]);
  

  return (
    <div>
      <div className="w-4/5 mx-auto flex flex-col lg:flex-row gap-y-5 justify-between mt-6">
        <div className="flex flex-col items-start lg:flex-row lg:items-center gap-x-5 gap-y-5">
          <SortItem sortItems={sortItems} text="Sort Post ID" />
          <SortItem sortItems={sortItems} text="Sort Name" />
          <SortItem sortItems={sortItems} text="Sort Email" />
        </div>

        <div className="flex items-center">
          <div className="relative text-[#4a5b77]">
            <input
              defaultValue={searchText}
              onChange={(e) => handleSearchText(e.target.value)}
              type="text"
              className="pl-10 pr-8 py-3 border border-gray-300 rounded-xl outline-none placeholder-[#4a5b77]"
              placeholder="Search name, email, comment"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <IoSearchOutline />
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-x-hidden h-[500px] w-[80%] mx-auto mt-6">
        <DataTable
          columns={columns}
          data={
            sortedComments.length === 0 && searchedComments.length === 0
              ? slicedComments
              : searchedComments.length !== 0 && sortedComments.length === 0
              ? searchedComments
              : sortedComments
          }
        />
      </div>

      {/* for pagination */}
      <div className="flex flex-col items-start justify-start lg:justify-end lg:flex-row lg:items-center gap-x-5 w-4/5 mx-auto mt-3">
        <div className="text-[#4a5b77]">
          {itemsPerPage * (currentPage - 1) +
            1 +
            "-" +
            currentPage * itemsPerPage}{" "}
          of {comments.length} items
        </div>

        <div className="flex items-center gap-x-3">
          <MdOutlineKeyboardArrowLeft
            onClick={() =>
              currentPage !== 1 && setCurrentPage((prev) => prev - 1)
            }
            className={`cursor-pointer ${
              currentPage === 1 ? "hidden" : "block"
            }`}
            size={20}
            color="#4a5b77"
          />
          {[...Array(Math.ceil(comments.length / itemsPerPage))].map((_, i) => (
            <span
              className={`${
                currentPage === i + 1
                  ? "border-2 border-[#4a5b77] bg-[#4a5b77] text-white px-2 rounded-lg"
                  : ""
              } text-[#4a5b77] cursor-pointer`}
              onClick={() => setCurrentPage(i + 1)}
              key={i}
            >
              {i + 1}
            </span>
          ))}
          <MdOutlineKeyboardArrowRight
            onClick={() =>
              currentPage !== Math.ceil(comments.length / itemsPerPage) &&
              setCurrentPage((prev) => prev + 1)
            }
            className={`cursor-pointer ${
              currentPage === Math.ceil(comments.length / itemsPerPage)
                ? "hidden"
                : "block"
            }`}
            size={20}
            color="#4a5b77"
          />
        </div>

        <div className="border border-[#4a5b77] px-2 rounded-md">
          <select
            defaultValue={itemsPerPage}
            onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
            className="p-3 outline-none"
            name="page"
            id="page"
          >
            <option value="10">10 / page</option>
            <option value="50">50 / page</option>
            <option value="100">100 / page</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
