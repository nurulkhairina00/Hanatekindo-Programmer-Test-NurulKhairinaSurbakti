import { useRef, useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { Form, Container, Col, Row } from "react-bootstrap";
import Swal from "sweetalert2";
import Head from "next/head";

function LoginForm() {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const router = useRouter();

  async function submitHandler(event) {
    event.preventDefault();
    const enteredUsername = usernameRef.current.value;
    const enteredPassword = passwordRef.current.value;

    const result = await signIn("credentials", {
      redirect: false,
      username: enteredUsername,
      password: enteredPassword,
    });

    const loginFailed = result.error;
    if (loginFailed) {
      if (result.error === "Request failed with status code 401") {
        Swal.fire({
          title: "Warning",
          text: "Invalid username or password",
          icon: "warning",
          width: 400,
          confirmButtonColor: "#27374D",
        });
      } else {
        Swal.fire({
          title: "Warning",
          text: result.error,
          icon: "warning",
          width: 400,
          confirmButtonColor: "#27374D",
        });
      }
    }
    router.push("/");
  }

  return (
    <>
      <Head>
        <title>Hanatekindo</title>
      </Head>
      <Container fluid className="App">
        <Row className="d-flex justify-content-center align-items-center vh-100">
          <Col sm={12} md={6} lg={3}>
            <div className="card">
              <div className="card-body ">
                <div className="text-center ">
                  <h3 className="p-4">LOGIN</h3>
                </div>
                <Form onSubmit={submitHandler}>
                  <Form.Group className="mb-4">
                    <Form.Control
                      type="text"
                      placeholder="username"
                      ref={usernameRef}
                    />
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Control
                      type="password"
                      placeholder="password"
                      ref={passwordRef}
                    />
                  </Form.Group>
                  <center className="py-4">
                    <button type="submit" className="button-blue">
                      Login
                    </button>
                  </center>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default LoginForm;
