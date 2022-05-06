import React, { useState, useEffect } from "react";
import { Checkbox } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

export default function DataTable() {
  const [tableData, setTableData] = useState([]);

  function handleConfirmChange(clickedRow) {
    const updatedData = tableData.map((x) => {
      if (x.rowId === clickedRow.rowId) {
        return {
          ...x,
          confirmed: !clickedRow.confirmed
        };
      }
      return x;
    });
    setTableData(updatedData);
  }

  const columns = [
    { field: "title", headerName: "Title", width: 200 },
    { field: "body", headerName: "Body", width: 400 },
    {
      field: "confirmed",
      headerName: "Confirmed",
      renderCell: (params) => (
        <Checkbox
          disabled={params.rows?.disabled}
          checked={params.rows?.confirmed}
          onChange={() => handleConfirmChange(params.row)}
        />
      )
    }
  ];

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((data) => data.json())
      .then((data) => {
        setTableData(
          data.map((x, index) => ({
            ...x,
            rowId: index,
            confirmed: false,
            disabled: true
          }))
        );
      });
  }, []);

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={tableData}
        columns={columns}
        pageSize={12}
        rowsPerPageOptions={[12]}
      />
    </div>
  );
}
