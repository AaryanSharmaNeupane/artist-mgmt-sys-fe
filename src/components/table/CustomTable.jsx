import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { MdOutlineDeleteForever } from "react-icons/md";
import "./CustomTable.css";
import { FaEdit } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

export const CustomTable = ({
  columnDefs,
  rowData,
  onDeleteClick,
  onEditClick,
  onViewClick,
  showViewButton = false,
}) => {
  const cellStyle = {
    fontSize: "16px",
    backgroundColor: "#DEDEDE",
    borderRight: "0.5px solid #ffffff",
  };

  return (
    <section>
      <div className="ag-theme-alpine" style={{ height: 538, width: "100%" }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs.map((col) => ({
            ...col,
            cellStyle: cellStyle,
            cellRenderer:
              col.field === "Action"
                ? (row) => (
                    <div className="flex pt-2">
                      <button
                        onClick={() => onEditClick(row.data)}
                        className="pr-4"
                      >
                        <FaEdit
                          size={16}
                          className="text-successColor cursor-pointer"
                        />
                      </button>
                      <button
                        onClick={() => onDeleteClick(row.data.id)}
                        className="pr-4"
                      >
                        <MdOutlineDeleteForever
                          size={20}
                          className="mx-6 text-errorColor cursor-pointer"
                        />
                      </button>
                      {showViewButton && (
                        <button onClick={() => onViewClick(row.data.id)}>
                          <FaEye
                            size={20}
                            className="mx-6  text-primaryColor cursor-pointer"
                          />
                        </button>
                      )}
                    </div>
                  )
                : undefined,
          }))}
          pagination={true}
          paginationPageSizeSelector={[10, 25, 50]}
          paginationPageSize={10}
          suppressCellFocus={true}
        />
      </div>
    </section>
  );
};
