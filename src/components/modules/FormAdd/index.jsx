import React from "react";
import api from "@/apis";
import Swal from "sweetalert2";
import { Box, Button, Modal,TextField } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";

function FormComponent() {
  const [open, setOpen] = React.useState(false);
  const validateSchema = yup.object({
    name: yup.string().required("name is required"),
    image: yup.string().required("image is required"),
  });
  const initialValues = { name: "", image: "" };

  const handleSubmit = (values) => {
    console.log("value", values);
    api
      .addProducts(values.name, values.image)
      .then((receipt) => {
        console.log("🚀 ~ .then ~ receipt:", receipt)
        if(receipt==undefined){
          throw Error("Error with MetaMask")
        }else{
          setOpen(false);
          Swal.fire({ text: "add success", icon: "success" });
          formik.resetForm({name:"",image:''})
        }
       
      })
      .catch((error) => {
        setOpen(false);
        Swal.fire({ text: "Transaction Error", icon: "error" });
      });
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    display: "flex",
    flexDirection: "column",
    p: 4,
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema:validateSchema,
    onSubmit:handleSubmit
  })
  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Add
      </Button>
     
          <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
            <form onSubmit={formik.handleSubmit}>
        <TextField
        className="input-text"
          fullWidth
          id="name"
          name="name"
          label="Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <TextField
          fullWidth
          className="input-text"
          id="image"
          name="image"
          label="image"
          value={formik.values.image}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.image && Boolean(formik.errors.image)}
          helperText={formik.touched.image && formik.errors.image}
        />
        <Button color="primary" variant="contained" className="btn-submit" type="submit">
          Submit
        </Button>
      </form>
            </Box>
          </Modal>
      
     
    </>
  );
}

export default FormComponent;
