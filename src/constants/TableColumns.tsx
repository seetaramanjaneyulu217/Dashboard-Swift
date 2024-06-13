import { CommentsDetails } from "../types";

interface ColumnType {
  name: any;
  selector: (row: CommentsDetails) => any;
}

const TableColumns = () => {
  const columns: ColumnType[] = [
    {
      name: <p className="text-[#4a5b77] text-lg">{"PostId"}</p>,
      selector: (row: CommentsDetails) => (
        <p className="text-[#4a5b77]">{row.postId!}</p>
      ),
    },
    {
      name: <p className="text-[#4a5b77] text-lg">{"Name"}</p>,
      selector: (row: CommentsDetails) => (
        <p className="text-[#4a5b77]">{row.name!}</p>
      ),
    },
    {
      name: <p className="text-[#4a5b77] text-lg">{"Email"}</p>,
      selector: (row: CommentsDetails) => (
        <p className="text-[#4a5b77]">{row.email!}</p>
      ),
    },
    {
      name: <p className="text-[#4a5b77] text-lg">{"Comment"}</p>,
      selector: (row: CommentsDetails) => (
        <p className="text-[#4a5b77]">{row.body!}</p>
      ),
    },
  ];

  return columns;
};

export default TableColumns;
