import { LinearProgress, Checkbox as MuiCheckBox, Paper, styled } from "@mui/material";
import { Box } from "@mui/system";
import { DataGridPro, GridColDef, GridFetchRowsParams, GridSortModel, useGridApiRef } from "@mui/x-data-grid-pro";
import { unstable_debounce as debounce } from "@mui/utils";
import { getUsers, useUsers } from "api/users";
import useTranslation from "next-translate/useTranslation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { User } from "@prisma/client";
import { Row } from "types";

const Checkbox = styled(MuiCheckBox)(({ theme }) => ({
  color: theme.palette.grey[600],
}));

export default function UsersList() {
  const { t } = useTranslation("common");

  const apiRef = useGridApiRef();

  const { usersData } = useUsers({
    skip: 0,
    take: 20,
  });

  const [initialRows, setInitialRows] = useState<typeof usersData.rows>([]);
  const [rowCount, setRowCount] = useState(0);
  const [dataRows, setDataRows] = useState<User[]>([]);

  const fetchRow = useCallback(
    async (params: GridFetchRowsParams) => {
      const { firstRowToRender, lastRowToRender } = params;

      const result = await getUsers({
        skip: firstRowToRender,
        take: lastRowToRender - firstRowToRender,
      });

      return result;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    if (initialRows) {
      setDataRows(initialRows);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialRows]);

  // initial load
  useEffect(() => {
    if (!usersData) {
      return;
    }

    (async () => {
      const { rows, count } = await fetchRow({
        firstRowToRender: 0,
        lastRowToRender: 20,
        sortModel: [],
        filterModel: {
          items: [],
        },
      });
      setInitialRows(rows);
      setRowCount(count);
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usersData, fetchRow]);

  const handleFetchRows = useCallback(
    async (params: GridFetchRowsParams) => {
      const { rows, count } = await fetchRow(params);

      apiRef.current.unstable_replaceRows(params.firstRowToRender, rows);

      setRowCount(count);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [apiRef, fetchRow]
  );

  const debouncedHandleFetchRows = useMemo(() => debounce(handleFetchRows, 200), [handleFetchRows]);

  const columns: GridColDef[] = [
    {
      field: "email",
      headerName: t("user_email"),
      flex: 1,
      minWidth: 100,
      align: "right",
      headerAlign: "right",
      renderCell: ({ row }: Row<User>) => row.email,
    },
    {
      field: "firstName",
      headerName: t("user_first_name"),
      flex: 1,
      minWidth: 100,
      align: "right",
      headerAlign: "right",
      renderCell: ({ row }: Row<User>) => row.firstName,
    },
    {
      field: "lastName",
      headerName: t("user_last_name"),
      flex: 1,
      minWidth: 100,
      align: "right",
      headerAlign: "right",
      renderCell: ({ row }: Row<User>) => row.lastName,
    },
  ];

  return (
    <Paper sx={{ width: "100%" }}>
      <Box sx={{ height: 950 }}>
        <DataGridPro
          apiRef={apiRef}
          rows={dataRows}
          slots={{
            loadingOverlay: LinearProgress,
            baseCheckbox: Checkbox,
          }}
          columns={columns}
          getRowId={(row) => row.uuid}
          checkboxSelection
          hideFooterPagination
          disableRowSelectionOnClick
          rowCount={rowCount}
          rowsLoadingMode="server"
          onFetchRows={debouncedHandleFetchRows}
          experimentalFeatures={{
            lazyLoading: true,
          }}
        />
      </Box>
    </Paper>
  );
}
