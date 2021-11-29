import { FC, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { LoginService } from 'services/auth';
import { config } from 'config';
import Cookies from 'js-cookie';
import "./style.less";

const Login: FC = () => {

    const [redirect, setRedirect] = useState(false);
    const history = useHistory();
    const loginService = new LoginService().useAsHook();

    useEffect(() => {
        loginService.send({ login: "letscode", senha: "lets@123" });
    }, []); // eslint-disable-line

    loginService.onSuccess(() => {
        if(loginService.response){
            Cookies.set("token", loginService.response, { expires: config.tokenExpires });
            setRedirect(true);
        }
    });

    if(redirect){
        history.push('/kanban');
    }

    return (
        <></>
    );
}

export default Login;

