import React from "react";
import TableComponent from "@/components/table";
import { useAuth } from "../../../hooks/useAuth";
import { Button, Modal, Box } from "@mui/material";
import "@/styles/Table.scss";
import apis from "../../../apis";
function TableFeedBack() {
  const [row, setRow] = React.useState([]);
  const [detail, setDetail] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const auth = useAuth();
  const columns = [
    {
      id: "id",
      label: "Id Product",
      minWidth: 50,

      format: (value) => <span>{value.toLocaleString("en-US")}</span>,
    },
    {
      id: "rate",
      align: "center",
      label: "Star",
      minWidth: 100,
    },
    {
      id: "actionButton",
      label: "Action ",
      minWidth: 100,
      align: "center",
      format: (value) => value.toFixed(2),
      render: (record) => {
        return (
          <Button
            variant="contained"
            onClick={() => {
              console.log(record.id);
              apis.getDetailFeedBack(record.id).then((value) => {
                let result = {
                  productId : record.id,
                  rating: value["rating"],
                  reviewText: value["reviewText"],
                  timeVoting: value["timestamp"]
                }
                setDetail(result)
              });
            }}
          >
            Detail
          </Button>
        );
      },
    },
  ];

  React.useEffect(() => {
    if (detail !== null) {
      setOpen(true);
    }
  }, [detail]);
  React.useEffect(() => {
    apis.getProductsOwner().then((data) => {
      setRow(data);
    });

    const { contract } = apis.initContract();
    contract.on("FeedBack", (arg1, arg2) => {
      console.log(arg1, arg2);
      apis.getProductsOwner().then((data) => {
        setRow(data);
      });
    });
    return () => {
      contract.removeAllListeners();
    };
  }, []);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    height: 300,
    bgcolor: "background.paper",
    boxShadow: 24,
    display: "flex",
    flexDirection: "column",
    p: 4,
  };
  console.log(row);
  return (
    <div className="container-table">
      <Modal
        open={open}
        onClose={() => {
          setDetail(null);
          setOpen(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
         
            {[detail].map((item,index)=>{
              return <ul style={{display:'flex',flexDirection:'column',listStyle:"none",height:"100%",justifyContent:'space-between'}} >
                <li>Id:{item?.productId}</li>
                <li>rating: {item?.rating}</li>
                <li>feedback: {item?.reviewText}</li>
                <li>timestamp: {item?.timeVoting}</li>

              </ul>
            })}
          
        </Box>
      </Modal>
      <TableComponent columns={columns} rows={row} />
    </div>
  );
}

export default TableFeedBack;
