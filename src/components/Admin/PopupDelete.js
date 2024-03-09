import { Modal, Button, ButtonToolbar, Placeholder } from "rsuite";
import RemindIcon from "@rsuite/icons/legacy/Remind";

export const PopupDelete = ({ open, item, setOpen, ConfirmDelete }) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Modal
        backdrop="static"
        role="alertdialog"
        open={open}
        onClose={handleClose}
        size="xs"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Modal.Body>
          <RemindIcon
            style={{ color: "#ffb300", fontSize: 24, paddingRight: "10px" }}
          />
          By clicking Detele will permanently delete this record. Are you sure
          you want to proceed ?
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={ConfirmDelete(item)}
            color="red"
            appearance="primary"
          >
            Delete
          </Button>
          <Button onClick={handleClose} color="green" appearance="primary">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
