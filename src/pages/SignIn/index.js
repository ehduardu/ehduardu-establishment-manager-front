import React, { useContext } from "react";
import { GoogleLogin } from "react-google-login";
import { toast } from "react-toastify";

import logo from "../../assets/store.png";
import Container from "../../components/UI/Container";
import AuthLayout from "../_layouts/auth";
import { Titulo } from "./styles";
import { AuthContext } from "../../context/AuthContext";
import history from "../../services/history";
import api from "../../services/api";

export default function SignIn() {
  const { signIn } = useContext(AuthContext);

  const responseGoogleLogin = async (response) => {
    const googleData = {
      email: response.profileObj.email,
      name: response.profileObj.name,
      googleId: response.profileObj.googleId,
    };

    console.info(googleData);

    try {
      const loginResponse = await api.get(
        `/login/${response.profileObj.googleId}/${response.profileObj.email}`
      );

      console.log(loginResponse);

      signIn(loginResponse.data);
      toast.success("Login realizado com sucesso", { autoClose: 5000 });
      history.push("/dashboard");
    } catch (error) {
      console.log(error.response.status);

      toast.error(error.response.data.message, { autoClose: 5000 });
    }
  };

  const responseGoogleRegister = async (response) => {
    const bodyData = {
      email: response.profileObj.email,
      name: response.profileObj.name,
      googleId: response.profileObj.googleId,
    };

    console.info(bodyData);

    try {
      const loginResponse = await api.post("/register", bodyData);

      console.log(loginResponse);

      signIn(loginResponse.data);
      toast.success("Cadastro realizado com sucesso", { autoClose: 5000 });
      history.push("/dashboard");
    } catch (error) {
      console.log(error.response.status);
      toast.warn(error.response.data.message, { autoClose: 5000 });
    }
  };

  return (
    <AuthLayout>
      <Container>
        <img src={logo} alt="Safetec" />

        <form>
          <Titulo>Bem-vindo ao Gerenciador de Estabelecimentos</Titulo>

          <GoogleLogin
            className="loginButton"
            clientId="300141464015-jq0letie3edbqjttj5qgcglmcvikmtg5.apps.googleusercontent.com"
            onSuccess={responseGoogleLogin}
            onFailure={(response) =>
              console.log("Falhou: " + JSON.stringify(response))
            }
            cookiePolicy="single_host_origin"
            buttonText="Entrar com Google"
            // isSignedIn={signed}
            autoLoad={false}
          />
          <p style={{ color: "#FFF", fontWeight: "bold", margin: "10px" }}>
            Ou Cadastre-se
          </p>

          <GoogleLogin
            className="loginButton"
            clientId="300141464015-jq0letie3edbqjttj5qgcglmcvikmtg5.apps.googleusercontent.com"
            onSuccess={responseGoogleRegister}
            onFailure={(response) =>
              console.log("Falhou: " + JSON.stringify(response))
            }
            cookiePolicy="single_host_origin"
            buttonText="Cadastrar"
            // isSignedIn={signed}
            autoLoad={false}
          />
        </form>
      </Container>
    </AuthLayout>
  );
}
