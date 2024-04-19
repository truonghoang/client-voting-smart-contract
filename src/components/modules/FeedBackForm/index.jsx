import React from "react";
import api from "@/apis";
import Swal from "sweetalert2";
import { Box, Button, Modal } from "@mui/material";
import StarRate from "../StarRate.js";
import { useFormik } from "formik";
import * as yup from "yup";

import "@/styles/Form.scss";
function FormComponent({ id, open, onOpen }) {
  const validateSchema = yup.object({
    reviewText: yup.string().required("feedback is required"),
    rating: yup.number().min(1).max(5),
  });
  let timeout;
  const initialValues = { productId: id, rating: 1, reviewText: "" };

  const handleSubmit = (values) => {
      console.log("value", values);
      api
        .feedback(values)
        .then((receipt) => {
              console.log("🚀 ~ .then ~ receipt:", receipt);
              if (receipt == undefined) {
                    throw Error("Product can be voted or cannot Estimate Gas");
                  } else {
                    formik.resetForm()
                    onOpen(false)
                        Swal.fire({ text: "Voted successfully", icon: "success" });
                      }
                    })
                    .catch((error) => {
                    
                          onOpen(false);
                          Swal.fire({ text: error.message, icon: "error" });
                        });
                      
  };
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
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validateSchema,
    onSubmit: handleSubmit,
  });
 
  return (
    <>
      <Modal
        open={open}
        onClose={() => onOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={formik.handleSubmit}>
            <div className="rating">
              <label>Rate:</label>
              <StarRate
                onChangeStar={(star) => {
                  formik.setFieldValue("rating", star);
                }}
              />
            </div>

            <label>Feedback</label>
            <textarea
              className="feedback"
              id="reviewText"
              name="reviewText"
              label="Feed back"
              rows={7}
              maxLength={200}
              value={formik.values.reviewText}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
             
            />

            <Button
              color="primary"
              variant="contained"
              className="btn-submit"
              type="submit"
            >
              Submit
            </Button>
          </form>
        </Box>
      </Modal>
    </>
  );
}

export default FormComponent;
