import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, registerWithEmailAndPassword } from "../auth/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!name) {
      alert("Name is required");
      return;
    }

    try {
      await registerWithEmailAndPassword(name, email, password);

      // Navigate to the Login page after registration
      navigate("/login");
    } catch (error) {
      console.error("Error during registration", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <MDBContainer fluid>
      <MDBRow className="d-flex justify-content-center align-items-center h-100">
        <MDBCol col="12">
          <MDBCard
            className="bg-dark text-white my-5 mx-auto"
            style={{ borderRadius: "1rem", maxWidth: "400px" }}
          >
            <MDBCardBody className="p-5 d-flex flex-column align-items-center mx-auto w-100">
              <h2 className="fw-bold mb-2 text-uppercase">Register</h2>
              <MDBInput
                wrapperClass="mb-4 mx-5 w-100"
                labelClass="text-white"
                label="Full Name"
                id="nameInput"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                size="lg"
              />
              <MDBInput
                wrapperClass="mb-4 mx-5 w-100"
                labelClass="text-white"
                label="Email address"
                id="emailInput"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                size="lg"
              />
              <MDBInput
                wrapperClass="mb-4 mx-5 w-100"
                labelClass="text-white"
                label="Password"
                id="passwordInput"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                size="lg"
              />
              <MDBBtn
                onClick={handleRegister}
                className="mx-2 px-5"
                style={{
                  backgroundColor: "#343434",
                  color: "#F8F8FF",
                  transition: "none",
                  padding: "0.5rem 1rem",
                  lineHeight: "1",
                  height: "50px",
                  border: "none",
                }}
                size="lg"
              >
                Register
              </MDBBtn>
              <div className="d-flex flex-row mt-3 mb-5">
                <p className="mb-0 text-white">
                  Already have an account?{" "}
                  <a
                    onClick={() => navigate("/login")}
                    className="text-white-50 fw-bold"
                    style={{ cursor: "pointer" }}
                  >
                    Login
                  </a>
                </p>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Register;
