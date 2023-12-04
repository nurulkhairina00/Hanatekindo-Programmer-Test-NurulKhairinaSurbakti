/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { getSession, signOut } from "next-auth/react";
import React, { useState, useMemo, useEffect } from "react";
import Head from "next/head";
import Sidebar from "../components/componentSidebar";
import Navbar from "../components/componentNavbar";
import Table from "../components/componentTable";
import { ModalAdd, ModalEdit } from "../components/componentModal";
import Image from "next/image";
import axios from "axios";
import Swal from "sweetalert2";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function index(props) {
  const { session } = props;
  axios.defaults.headers.common["authorization"] = session.user.token;

  // column tabel user
  const columns = useMemo(
    () => [
      {
        Header: "No",
        accessor: "no",
      },
      {
        Header: "Account",
        accessor: "account",
      },
      {
        Header: "Full Name",
        accessor: "fullname",
      },
      {
        Header: "Point",
        accessor: "point",
      },
      {
        Header: "Action",
        accessor: "action",
      },
    ],
    []
  );

  const [dataUser, setDataUser] = useState([]); // state data user
  const [dataUserEdit, setDataUserEdit] = useState([]); // state data user edit
  const [showModal, setShowModal] = useState(false); // state show modal add
  const [showModalEdit, setShowModalEdit] = useState(false); // state show modal edit

  // open modal user
  const handleOpenModal = () => setShowModal(true);

  // get data all user
  const refreshData = () => {
    axios
      .get(`${process.env.API_PATH}:${process.env.API_PORT}/api/user/get-data`)
      .then((res) => {
        const result = res.data.map((item, index) => {
          return {
            no: index + 1,
            account: item.user_account,
            fullname: item.user_fullname,
            point: item.user_point,
            action: (
              <>
                <button
                  className="btn btn-link"
                  title="Edit"
                  onClick={() => handleEdit(item.user_id)}
                >
                  <FaEdit size={20} />
                </button>
                <button
                  className="btn btn-link text-danger"
                  title="Delete"
                  onClick={() => handleDelete(item.user_id)}
                >
                  <MdDelete size={20} />
                </button>
              </>
            ),
          };
        });
        setDataUser(result);
      })
      .catch((err) => {
        throw err;
      });
  };

  // delete data user
  const handleDelete = (id) => {
    Swal.fire({
      text: "Do you want to delete this data?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      confirmButtonColor: "#27374D",
      cancelButtonColor: "#526D82",
      width: 400,
    })
      .then((result) => {
        if (result.isConfirmed) {
          axios
            .put(
              `${process.env.API_PATH}:${process.env.API_PORT}/api/user/delete/${id}`
            )
            .then(() => {
              Swal.fire({
                title: "Deleted",
                text: "Data Deleted Successfully",
                icon: "success",
                timer: 2000,
                width: 400,
                confirmButtonColor: "#27374D",
              });
              refreshData();
            });
        }
      })
      .catch((err) => {
        throw err;
      });
  };

  // edit data user
  const handleEdit = async (id) => {
    axios
      .get(`${process.env.API_PATH}:${process.env.API_PORT}/api/user/get-data`)
      .then((res) => {
        const result = res.data.find((item) => item.user_id === id);
        setDataUserEdit({
          id: result.user_id,
          account: result.user_account,
          password: result.user_password,
          fullname: result.user_fullname,
          point: result.user_point,
        });
        setShowModalEdit(true);
        refreshData();
      })
      .catch((err) => {
        throw err;
      });
  };

  useEffect(() => {
    refreshData();
  }, []);

  return (
    <>
      <div className="App">
        <Head>
          <title>Hanatekindo</title>
        </Head>
        <div className="wrapper">
          <Sidebar />
          <div className="main pt-0">
            <Navbar />
            <main className="p-2">
              <div className="container-fluid">
                <div className="mb-3">
                  <h4>User Dashboard</h4>
                </div>
                <div className="row">
                  <div className="col-12 d-flex">
                    <div className="card flex-fill border-0 illustration">
                      <div className="card-body p-0 d-flex flex-fill">
                        <div className="row g-0 w-100">
                          <div className="col-sm-12 col-md-9">
                            <div className="p-3 m-1">
                              <h4>Welcome {session.user.account}</h4>
                            </div>
                          </div>
                          <div className="col-3 align-self-end text-end d-none d-md-block">
                            <div className="p-2">
                              <Image
                                src="/computer.svg"
                                alt="image2"
                                width="130px"
                                height="130px"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card p-4">
                  <div className="card-header p-0 position-relative mx-3 z-index-2">
                    <div className="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3 bg-gray">
                      <h6 className="text-black text-capitalize ps-3">
                        Table Users
                      </h6>
                    </div>
                  </div>
                  <div className="card-body px-0 pb-2">
                    <div className="py-3">
                      <button
                        type="button"
                        className="button-blue"
                        onClick={handleOpenModal}
                      >
                        Add Users
                      </button>
                      <hr />
                    </div>
                    <Table columns={columns} data={dataUser} />
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <ModalAdd showModal={showModal} setShowModal={setShowModal} />
        <ModalEdit
          showModalEdit={showModalEdit}
          setShowModalEdit={setShowModalEdit}
          dataUserEdit={dataUserEdit}
        />
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

export default index;
