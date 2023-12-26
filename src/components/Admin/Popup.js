import React,{useState} from 'react';
import { Modal, Button, ButtonToolbar, Placeholder } from 'rsuite';

export default function Popup() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

  return (
    <div>
       <ButtonToolbar>
        <Button onClick={handleOpen}> Open</Button>
      </ButtonToolbar>

      <Modal size="xs" open={open} style={{marginTop:"100px"}} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>Are you sure ?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p >
           By clicking OK it will be deleted permanently By clicking OK it will be deleted permanently By clicking OK it will be deleted permanently
          </p >
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} appearance="primary">
            Ok
          </Button>
          <Button onClick={handleClose} appearance="subtle">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
