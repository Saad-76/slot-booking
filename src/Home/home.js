import {
  Box,
  Grid,
  TextField,
  Typography,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";
import Stack from "@mui/material/Stack";
import React, { useState } from "react";
import DateRangeIcon from "@mui/icons-material/DateRange";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

const Home = () => {
  const [dateValue, setDateValue] = useState();
  const [timeValue, setTimeValue] = useState("");
  const [active, setActive] = useState("");
  const [response, setResponse] = useState("");
  const [showTime, setShowTime] = useState(false);
  // --toast messages--
  const [openToast, setOpenToast] = useState(false);
  const [errorSeverity, setErrorSeverity] = useState("");
  const [msg, setMsg] = useState("");

  const handleToastClose = (event, reason) => {
    setOpenToast(false);
  };
  let arr = [
    { time: "15 Minutes", id: "15" },
    { time: "30 Minutes", id: "30" },
    { time: "45 Minutes", id: "45" },
    { time: "60 Minutes", id: "60" },
  ];

  const handleChange = (newValue) => {
    setDateValue(newValue);
  };

  const handleDate = (time) => {
    setTimeValue(time);
  };

  const handleProceed = async () => {
    setShowTime(true);
    setResponse([
      { time: "12 AM", id: "12:00", start: "", end: "" },
      { time: "12:15 AM", id: "12:15", start: "", end: "" },
      { time: "1:30 PM", id: "1:30", start: "", end: "" },
      { time: "2:00 PM", id: "2:00", start: "", end: "" },
      { time: "2:15 PM", id: "2:15", start: "", end: "" },
      { time: "3:00 PM", id: "3:00", start: "", end: "" },
      { time: "4:15 PM", id: "4:15", start: "", end: "" },
    ]);
    setActive("");

    const form = new FormData();
    form.append("duration", timeValue);
    form.append("day", dateValue);
    try {
      const response = await axios({
        method: "post",
        // url: "/api/login",
        data: form,
        headers: { "Content-Type": "multipart/form-data" },
      });
      // if (response.data.success === true) {
      //   setActive("");
      //   setResponse(response);
      // }
    } catch (error) {
      console.log(error);
    }
  };

  const [activeTime, setActiveTime] = useState("");
  const [slot, setSlot] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleSelection = (id, start, end) => {
    setActiveTime(id);
    setSlot(id);
    setStartTime(start);
    setEndTime(end);
  };

  const handleBook = async () => {
    setActiveTime("");
    setOpenToast(true);
    setMsg("Successfully created");
    // setErrorSeverity("error");
    setErrorSeverity("success");
    const form = new FormData();
    form.append("start_time", startTime);
    form.append("end_time", endTime);

    try {
      const response = await axios({
        method: "post",
        // url: "/api/login",
        // data: form,
        headers: { "Content-Type": "multipart/form-data" },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Snackbar
        open={openToast}
        autoHideDuration={6000}
        onClose={handleToastClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={errorSeverity} sx={{ width: "100%" }}>
          {msg}
        </Alert>
      </Snackbar>

      <Typography
        variant="subtitle2"
        sx={{ fontSize: "22px", fontWeight: "700" }}
        display={"flex"}
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={"center"}
        pt={4}
      >
        Select Slot
      </Typography>
      <Grid
        container
        xs={12}
        mt={4}
        sx={{ paddingLeft: "20px" }}
        display={"flex"}
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={"center"}
        pl={2}
        pr={2}
      >
        <Grid item xs={6} pr={2}>
          <Box
            sx={{
              background: "#f8f7f7",
              minHeight: "50vh",
              borderRadius: "12px",
              boxShadow: "1px solid black",
              padding: "12px",
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{ fontSize: "14px", fontWeight: "500" }}
              display={"flex"}
              flexDirection={"row"}
              alignItems={"center"}
            >
              <DateRangeIcon
                style={{
                  marginLeft: "0px",
                  width: "20px",
                  height: "18px",
                  color: "green",
                }}
              />{" "}
              Date
            </Typography>
            <Box mt={2}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Stack spacing={3}>
                  <DesktopDatePicker
                    label=""
                    inputFormat="MM/DD/YYYY"
                    value={dateValue}
                    onChange={handleChange}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Stack>
              </LocalizationProvider>
            </Box>
          </Box>
        </Grid>
        <Grid xs={6} pl={2}>
          <Box
            sx={{
              background: "#f8f7f7",
              minHeight: "50vh",
              maxHeight: "54vh",
              overflow: "auto",
              borderRadius: "12px",
              padding: "12px",
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{ fontSize: "14px", fontWeight: "500" }}
              display={"flex"}
              flexDirection={"row"}
              alignItems={"center"}
            >
              <AccessTimeIcon
                style={{
                  marginLeft: "0px",
                  width: "20px",
                  height: "18px",
                  color: "green",
                }}
              />
              Time
            </Typography>

            <Grid mt={4}>
              {arr.map((item) => {
                return (
                  <Grid mt={1}>
                    <Box
                      sx={{
                        borderRadius: "8px",
                        height: "40px",
                        textAlign: "center",
                        border: "1px solid #cac3c3",
                        margin: "2px",
                        paddingLeft: "4px",
                        cursor: "pointer",
                        background: active == item.id ? "#BDD2B1" : "",
                        color: active == item.id ? "#5D953C" : "",
                        "&:hover": {
                          background: "#BDD2B1",
                          color: "#5D953C ",
                        },
                      }}
                      display={"flex"}
                      flexDirection={"row"}
                      alignItems={"center"}
                      justifyContent={"center"}
                      onClick={() => {
                        setActive(item.id);
                        handleDate(item.id);
                      }}
                    >
                      {item.time}
                    </Box>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        </Grid>
      </Grid>
      {timeValue && dateValue !== "" ? (
        <Grid
          container
          xs={12}
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"center"}
          pt={2}
        >
          <Button
            variant="contained"
            sx={{
              background: "#BDD2B1 ",
              color: "grey ",
              "&:hover": {
                background: "#BDD2B1",
                color: "#5D953C ",
              },
            }}
            onClick={handleProceed}
          >
            Proceed
          </Button>
        </Grid>
      ) : (
        ""
      )}

      {/* -----time slots after response */}
      {showTime ? (
        <>
          <Typography
            variant="subtitle2"
            sx={{ fontSize: "22px", fontWeight: "700" }}
            display={"flex"}
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent={"center"}
            pt={4}
          >
            Available Time Slots
          </Typography>

          <Grid
            container
            xs={12}
            mt={2}
            mb={1}
            sx={{ paddingLeft: "20px" }}
            display={"flex"}
            flexDirection={"row"}
            alignItems={"center"}
            pl={2}
            pr={2}
          >
            <Grid item xs={4} pr={2} pl={2}></Grid>
            <Grid item xs={4} pr={2} pl={2}>
              <Box
                sx={{
                  background: "#f8f7f7",
                  minHeight: "70h",
                  maxHeight: "71vh",
                  overflow: "auto",
                  borderRadius: "12px",
                  padding: "12px",
                  border: "1px solid #BDD2B1",
                }}
              >
                <Grid mt={1}>
                  {response?.map((item) => {
                    return (
                      <Grid mt={1}>
                        <Box
                          sx={{
                            borderRadius: "8px",
                            height: "40px",
                            textAlign: "center",
                            border: "1px solid #cac3c3",
                            margin: "2px",
                            paddingLeft: "4px",
                            cursor: "pointer",
                            "&:hover": {
                              background: "#BDD2B1",
                              color: "#5D953C ",
                            },
                            background: activeTime == item.id ? "#BDD2B1" : "",
                            color: activeTime == item.id ? "#5D953C" : "",
                          }}
                          display={"flex"}
                          flexDirection={"row"}
                          alignItems={"center"}
                          justifyContent={"center"}
                          onClick={() => {
                            setActiveTime(item.id);
                            handleSelection(item.id, item.start, item.end);
                          }}
                        >
                          {item.time}
                        </Box>
                      </Grid>
                    );
                  })}
                </Grid>
              </Box>
            </Grid>
            <Grid item xs={4} pr={2} pl={2}></Grid>
          </Grid>

          {slot !== "" ? (
            <Grid
              container
              xs={12}
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"center"}
              pt={2}
              mb={2}
            >
              <Button
                variant="contained"
                sx={{
                  background: "#BDD2B1 ",
                  color: "grey ",
                  "&:hover": {
                    background: "#BDD2B1",
                    color: "#5D953C ",
                  },
                }}
                onClick={handleBook}
              >
                Book
              </Button>
            </Grid>
          ) : (
            ""
          )}
        </>
      ) : (
        ""
      )}
    </>
  );
};
export default Home;
