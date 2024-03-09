import React, { useState, useEffect, useRef } from "react";
import { Input, Grid, Row, Col } from "rsuite";
import { SelectPicker } from "rsuite";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Button, ButtonToolbar } from "rsuite";
import { Tooltip, Whisper } from "rsuite";
import DeleteIcon from "@mui/icons-material/Delete";
import CardActions from "@mui/material/CardActions";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Avatar } from "@mui/material";
import "rsuite/dist/rsuite.min.css";
import "../../../styles/Admin/DashboardItems.css";
import { useDispatch, useSelector } from "react-redux";
import { updateOpenPopup, updatePopupData } from "../../../redux/userReducer";
import { baseUrl, getApi, postApi, putApi } from "../../../Services/service";
import { PopupDelete } from "../PopupDelete";

export const ViewUsers = () => {
  const User = useSelector((state) => state.Elite.user);
  const [UserList, setUserList] = useState([]);
  const [open, setOpen] = useState(false);
  const [deleteItem, setDeleteItem] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
    getUserList();
  }, []);

  const getUserList = async () => {
    const response = await getApi("admin/userlist");
    if (response?.status === "Failed") {
      openPopup("error", "Network Error! Try again later.");
    } else {
      setUserList(response?.data.filter((obj) => obj.email !== User.email));
    }
    closePopup();
  };

  const openPopup = (type, message) => {
    dispatch(updateOpenPopup(true));
    dispatch(
      updatePopupData({
        type: type,
        message: message,
      })
    );
  };

  const closePopup = () => {
    setTimeout(() => {
      dispatch(updateOpenPopup(false));
      dispatch(updatePopupData(""));
    }, 3500);
  };

  const ConfirmDelete = (item) => async () => {
    const response = await postApi("admin/delete/" + item.id);
    if (response?.status === "Failed") {
      openPopup("error", "Network Error! Try again later.");
    } else if (response?.status_code === 200) {
      openPopup("info", "User successfully deleted.");
    } else if (response?.status_code === 400) {
      openPopup("error", "User deletion Failed.");
    }
    getUserList();
    closePopup();
    setOpen(false);
  };

  const handleRemoveUser = (item) => async () => {
    setOpen(true);
    setDeleteItem(item);
  };

  return (
    <div className="ViewUser-container">
      {UserList.length > 0 && (
        <div>
          <h6 className="Display-content-heading-member">User List !</h6>
        </div>
      )}
      <Grid>
        <div className="Form-DisplayContainer">
          {UserList.map((item) => (
            <Col xs={24} sm={24} md={8} lg={8} xl={8} key={item}>
              <Card className="Form-DisplayCard-member">
                <CardContent>
                  <div>
                    <h6 className="Display-content-heading-member">
                      {item.username}
                    </h6>
                    <p className="Display-content-text-Smember">{item.email}</p>
                    <p className="Display-content-text-Smember">{item.role}</p>
                  </div>
                  <div className="Display-content-edit-member">
                    <Whisper
                      placement="top"
                      speaker={<Tooltip> Delete!</Tooltip>}
                    >
                      <Button
                        variant="outlined"
                        id="delete"
                        style={{ color: "red" }}
                        startIcon={<DeleteIcon />}
                        onClick={handleRemoveUser(item)}
                      />
                    </Whisper>
                  </div>
                </CardContent>
              </Card>
            </Col>
          ))}
        </div>
      </Grid>
      {UserList.length == 0 && (
        <div>
          <h6 className="Display-content-heading-member">
            No User is Available !
          </h6>
        </div>
      )}
      {open && (
        <PopupDelete
          item={deleteItem}
          open={open}
          ConfirmDelete={ConfirmDelete}
          setOpen={setOpen}
        />
      )}
    </div>
  );
};
