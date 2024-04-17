
import React from "react";
import api from "@/apis";
import Swal from "sweetalert2";
import { Box, Button, Modal,Fade,Typography, TextField} from "@mui/material";
import { Formik,} from "formik";
import * as yup from "yup";


function FormComponent() {
  const [open,setOpen] = React.useState(false)
  const validateSchema = yup.object({
    name: yup.string().required("name is required"),
    image: yup.string().required("image is required"),
  });
  const initialValues = { name: "", image: "" };
 

  const handleSubmit = (
    values) => {
    console.log("value",values)
    api
      .addProducts(values.name, values.image)
      .then((receipt) => {
        setOpen(false)
        Swal.fire({ text: "add success", icon: "success" });
       
      })
      .catch((error) => {
        setOpen(false)
        Swal.fire({ text: "something wrong with transaction", icon: "error" });
       
      });
  };
 const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    display:'flex',
    flexDirection:'column',
    p: 4,
  };
  return (
   <>
    <Button variant="contained" onClick={()=>setOpen(true)}>Add</Button>
    <Formik
      initialValues={initialValues}
      validationSchema={validateSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, handleSubmit, errors }) => (
        <Modal
        open={open}
        onClose={()=>setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <TextField id="standard-basic" label="Name Product" variant="standard" />
        <TextField id="standard-basic" label="Link Image" variant="standard" />
        </Box>
      </Modal>
      )}
    </Formik>
   </>
  );
}

export default FormComponent;
