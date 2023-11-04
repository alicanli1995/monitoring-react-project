import * as React from 'react';
import {DataGrid} from '@mui/x-data-grid';
import "../../css/stickyTable.css"

export default function StickyHeadTable(dataSet) {

  const rows = dataSet.datas.map((data) => {
    let rowData = {}
    dataSet.columns.map((column) => {
      rowData[column.field] = data[column.field]
    })
    return rowData;
  });

  return (
      <div style={{height: 400, width: "100%"}}>
        <DataGrid
            columnHeaderHeight={50}
            onCellClick={(params, event) => {
              console.log(params)
              console.log(event)
            }}
            rows={rows}
            columns={dataSet.columns}
            initialState={{
              pagination: {
                paginationModel: {page: 0, pageSize: 5},
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
        />
      </div>
  );
}
