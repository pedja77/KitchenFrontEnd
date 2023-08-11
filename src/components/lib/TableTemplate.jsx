import { Delete, Edit } from "@mui/icons-material";
import {
  FormLabel,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import { Box } from "@mui/system";
import { getUserRole } from "../../utils/token";
import { useNavigate } from "react-router-dom";

/**props are {tableLabel: String, tableHeaders: [String], tableData:[{}], tdConfig:[String]}, functions */
const TableTemplate = ({ props }) => {
  const nav = useNavigate();

  return (
    <>
      <FormLabel>{props.tableLabel}:</FormLabel>
      <TableContainer>
        <Table
          sx={{ minWidth: "50vh", maxWidth: "80vh" }}
          size="small"
          aria-label={props.tableLabel}
        >
          <TableHead>
            <TableRow>
              {/*crypto je "eksternalizovan", pisao window. ispred pa se vite vise ne zali */}
              {props.tableHeaders.map((th, i) => (
                <TableCell key={window.crypto.randomUUID()}>{th}</TableCell>
              ))}
              {/* {getUserRole() === "ADMINISTRATOR" && (
                <TableCell align="right">Action</TableCell>
              )} */}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.tableData.map((t) => (
              <TableRow key={t[props.tdConfig[0]]}>
                {props.tdConfig.map((e) => (
                  <TableCell key={window.crypto.randomUUID()}>{t[e]}</TableCell>
                ))}
                {getUserRole() === "ADMINISTRATOR" && (
                  <TableCell align="right">
                    {props.deleteBtn && (
                      <Tooltip title="Delete">
                        <IconButton
                          onClick={(e) =>
                            props.removeFn(e, t, props.collectionName)
                          }
                        >
                          <Delete />
                        </IconButton>
                      </Tooltip>
                    )}
                    {props.editBtn && (
                      <Tooltip title="Edit">
                        <span>
                          <IconButton
                            disabled={props.editUrl === undefined}
                            onClick={() => nav(`${props.editUrl}/${t.id}`)}
                          >
                            <Edit />
                          </IconButton>
                        </span>
                      </Tooltip>
                    )}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TableTemplate;
