import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import { hash } from "bcryptjs";

// Modal Add
const ModalAdd = (props) => {
  const { showModal, setShowModal } = props; // props
  const [input, setInput] = useState({}); //state input

  const handleClose = () => setShowModal(false); // close modal

  // handle change input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((input) => ({ ...input, [name]: value }));
  };

  // insert data user
  const handleSave = async () => {
    const hashedPassword = await hash(input.password, 10);

    await axios
      .post(`${process.env.API_PATH}:${process.env.API_PORT}/api/user/insert`, {
        ...input,
        hashedPassword,
      })
      .then((res) => {
        if (res.data.status === "Warning") {
          Swal.fire({
            title: res.data.status,
            text: res.data.message,
            confirmButtonColor: "#27374D",
            icon: "warning",
            timer: 2000,
            width: 400,
          });
          return false;
        }
        Swal.fire({
          title: res.data.status,
          text: res.data.message,
          confirmButtonColor: "#27374D",
          icon: "success",
          timer: 2000,
          width: 400,
        });
        setShowModal(false);
        location.reload();
      })
      .catch((err) => {
        throw err;
      });
  };

  return (
    <>
      <Modal size="md" show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Users</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Account</Form.Label>
              <Form.Control
                type="text"
                name="account"
                value={input.account}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={input.password}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="fullname"
                value={input.fullname}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Point</Form.Label>
              <Form.Control
                type="number"
                name="point"
                value={input.point}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="button-blue" onClick={handleSave}>
            Save
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

// Modal Edit
const ModalEdit = (props) => {
  const { showModalEdit, setShowModalEdit, dataUserEdit } = props; // props
  const [input, setInput] = useState(dataUserEdit); // state input

  const handleClose = () => setShowModalEdit(false); // handle close modal

  // handle change input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((input) => ({ ...input, [name]: value }));
  };

  // update data user
  const handleUpdate = async () => {
    const hashedPassword = await hash(input.password, 10);

    await axios
      .put(`${process.env.API_PATH}:${process.env.API_PORT}/api/user/update`, {
        ...input,
        hashedPassword,
      })
      .then(() => {
        Swal.fire({
          title: "Success",
          text: "Data Updated Successfully",
          confirmButtonColor: "#27374D",
          icon: "success",
          timer: 2000,
          width: 400,
        });
        setShowModalEdit(false);
        location.reload();
      })
      .catch((err) => {
        throw err;
      });
  };

  useEffect(() => {
    setInput({
      id: dataUserEdit.id,
      account: dataUserEdit.account,
      password: dataUserEdit.password,
      fullname: dataUserEdit.fullname,
      point: dataUserEdit.point,
    });
  }, [dataUserEdit]);

  return (
    <>
      <Modal size="md" show={showModalEdit} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Users</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Account</Form.Label>
              <Form.Control
                type="text"
                name="account"
                value={input.account}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={input.password}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="fullname"
                value={input.fullname}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Point</Form.Label>
              <Form.Control
                type="number"
                name="point"
                value={input.point}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleUpdate}>
            Save
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export { ModalAdd, ModalEdit };
