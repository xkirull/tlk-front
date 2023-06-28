import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useState } from 'react';
import Alert from "@/shared/alert";
import { setCookie } from '@/shared/cookie';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Made by '}
            <Link color="inherit" href="https://kirull.ru/">
                Kirull
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}



const RestorePage = () => {
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [passwordRepeatError, setPasswordRepeatError] = useState(false);
    const [alertStatus, setAlertStatus] = useState({ open: false, message: "" });

    setCookie("email", "", 0);
    setCookie("password", "", 0);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        if (!data.get('email')) {
            setEmailError(true);
            return;
        } else {
            setEmailError(false);
        }

        if (!data.get('password')) {
            setPasswordError(true);
            return;
        } else {
            setPasswordError(false);
        }

        if (data.get('passwordRepeat') !== data.get('password')) {
            setPasswordRepeatError(true);
            return;
        } else {
            setPasswordRepeatError(false);
        }

        fetch(import.meta.env.VITE_BACKEND_SERVER + "/api/restorePassword", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams({ email: data.get('email'), password: data.get('password') }).toString()
        }).then(response => response.json()).then(resData => {
            if (resData.hasOwnProperty("error") && resData.error == 1) {
                setAlertStatus({ message: "Адрес электронной почты не найден!", open: true });
                return;
            }

            setCookie("email", data.get("email"), 1);
            setCookie("password", data.get("password"), 1);

            window.location.href = "/";
        }).catch(e => {
            console.error(e);
            setAlertStatus({ message: "Неизвестная ошибка!", open: true });
        });
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'info.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Восстановление аккаунта
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        error={emailError}
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Почта"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        helperText={emailError && "Нужно указать почту"}
                    />

                    <TextField
                        error={passwordError}
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Пароль"
                        type="password"
                        id="password"
                        helperText={passwordError && "Нужно указать пароль"}
                    />

                    <TextField
                        error={passwordRepeatError}
                        margin="normal"
                        required
                        fullWidth
                        name="passwordRepeat"
                        label="Пароль еще раз"
                        type="password"
                        id="passwordRepeat"
                        helperText={passwordRepeatError && "Пароли должны совпадать"}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Восстановить доступ
                    </Button>
                    <Grid container>
                        <Grid sx={{ display: "flex", justifyContent: "center" }} item xs>
                            <Link href="/login" variant="body2">
                                {"Вернуться на страницу входа"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
            <Alert message={alertStatus.message} isOpen={alertStatus.open} setOpen={setAlertStatus} />
        </Container>
    );
}

export default RestorePage;
