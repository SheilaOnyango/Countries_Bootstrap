import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, loginWithEmailAndPassword } from "../auth/firebase";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await loginWithEmailAndPassword(email, password);

      // Navigate to the Countries page after logging in
      navigate("/countries");
    } catch (error) {
      console.error("Login error", error);
      alert("Failed to login. Please try again.");
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
              <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
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
                onClick={handleLogin}
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
                Login
              </MDBBtn>
              <div className="d-flex flex-row mt-3 mb-5">
                <p className="mb-0 text-white">
                  Don't have an account?{" "}
                  <a
                    onClick={() => navigate("/register")}
                    className="text-white-50 fw-bold"
                    style={{ cursor: "pointer" }}
                  >
                    Register
                  </a>
                </p>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Login;
