import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";
import { UserSchema, UserSchemaModel } from "../@types/User";
import { AuthContext } from "../contexts/auth";

type Props = {
  isRegister?: boolean;
};

export default function AuthLayout(props: Props) {
  const appContext = useContext(AuthContext);

  if (!appContext) return <Navigate to="/error" />;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSchemaModel>({
    resolver: zodResolver(UserSchema),
  });

  const onSubmit = (data: UserSchemaModel) => {
    if (props.isRegister) {
      const { name, password, email } = data;
      appContext.register({ name, password, email });
    } else {
      const { email, password } = data;
      appContext.login({ email, password });
    }
  };

  if (appContext.user) return <Navigate to="/home" />;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 2,
        gap: 2,
        height: "100vh",
      }}
    >
      <Typography variant="h3" color="primary" align="center" gutterBottom>
        Week Fit
      </Typography>
      <Box
        sx={{
          width: "100%",
          maxWidth: 500,
          padding: 2,
          backgroundColor: "#fff",
          boxShadow: "0 0 0 1px rgba(34,36,38,.22) inset,0 0 0 0 transparent",
          borderRadius: 1,
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ padding: 2 }}>
            {props.isRegister && (
              <TextField
                label="Nome de usuário"
                variant="outlined"
                fullWidth
                margin="normal"
                {...register("name")}
                error={!!errors.name}
                helperText={errors.name ? errors.name.message : ""}
              />
            )}
            <TextField
              label="E-mail"
              variant="outlined"
              fullWidth
              margin="normal"
              type="email"
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : ""}
            />
            <TextField
              label="Senha"
              variant="outlined"
              fullWidth
              margin="normal"
              type="password"
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password ? errors.password.message : ""}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              type="submit"
              sx={{ marginTop: 2, fontWeight: "bold" }}
            >
              {props.isRegister ? "Cadastrar" : "Entrar"}
            </Button>
          </Box>
        </form>
      </Box>
      <Box
        sx={{
          width: "100%",
          maxWidth: 500,
          display: "flex",
          justifyContent: "center",
          gap: 1,
          padding: 2,
          backgroundColor: "#F8F8F9",
          boxShadow: "0 0 0 1px rgba(34,36,38,.22) inset,0 0 0 0 transparent",
          borderRadius: 1,
        }}
      >
        {props.isRegister ? "Já possui uma conta? " : "Não possui uma conta? "}
        {props.isRegister ? (
          <Link to="/">Entrar com uma conta</Link>
        ) : (
          <Link to="/register">Criar uma conta</Link>
        )}
      </Box>
    </Box>
  );
}
