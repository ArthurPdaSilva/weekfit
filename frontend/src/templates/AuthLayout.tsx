import React, { useCallback, useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import Form from "semantic-ui-react/dist/commonjs/collections/Form";
import GridColumn from "semantic-ui-react/dist/commonjs/collections/Grid/GridColumn";
import Message from "semantic-ui-react/dist/commonjs/collections/Message";
import Button from "semantic-ui-react/dist/commonjs/elements/Button";
import Header from "semantic-ui-react/dist/commonjs/elements/Header";
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment";
import { AuthContext } from "../contexts/auth";

type Props = {
  isRegister?: boolean;
};

export default function AuthLayout(props: Props) {
  const appContext = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (props.isRegister)
        await appContext?.register({ name, password, email });
      else await appContext?.login({ email, password });
    },
    [name, email, password, appContext]
  );

  if (appContext?.user) return <Navigate to="/home" />;
  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <GridColumn style={{ maxWidth: "500px" }}>
        <Header as="h1" color="orange" textAlign="center">
          Week Fit
        </Header>
        <Form size="large" onSubmit={(e) => handleSubmit(e)}>
          <Segment>
            {props.isRegister && (
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="Nome de usuário"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            )}
            <Form.Input
              fluid
              icon="envelope"
              iconPosition="left"
              placeholder="E-mail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Senha"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button color="orange" fluid size="large" type="submit">
              {props.isRegister ? "Cadastrar" : "Entrar"}
            </Button>
          </Segment>
        </Form>
        <Message>
          {props.isRegister
            ? "Já possui uma conta? "
            : "Não possui uma conta? "}
          {props.isRegister ? (
            <Link to="/">Entrar com uma conta</Link>
          ) : (
            <Link to="/register">Criar uma conta</Link>
          )}
        </Message>
      </GridColumn>
    </Grid>
  );
}
