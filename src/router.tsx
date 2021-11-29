import { FC, lazy, Suspense } from 'react';
import { BrowserRouter, Redirect, Route, RouteProps, useHistory } from 'react-router-dom';
import { config } from "./config"
import Cookies from 'js-cookie';

const AuthModule = lazy(() => import('./modules/auth'));
const DashboardModule = lazy(() => import('./modules/dashboard'));

const routerPaths = [
    '/',
    '/kanban'
];

const RootRouter: FC = () => {
    return (
        <Suspense fallback={
            <BrowserRouter basename={config.baseUrl}>
                <p>Carregando...</p>
            </BrowserRouter>
        }>
            <BrowserRouter basename={config.baseUrl}>
                <CustomRoute component={AuthModule} />
                <CustomRoute isPrivate path="/kanban" component={DashboardModule} />
                <Route path="*" children={({ match }) => {
                    return (routerPaths.indexOf(match?.url || '') === -1) && <Redirect from="*" to={config.defaultUrl} />
                }} />
            </BrowserRouter>
        </Suspense>
    )
};

export const CustomRoute: FC<RouteProps & { isPrivate?: boolean }> = ({ isPrivate, ...rest }) => {
    const token = Cookies.get("token");
    const history = useHistory();

    setTimeout(() => {
        if (isPrivate && !token) {
            history.push('/login');
        }
    });

    return <Route {...rest} />;
};

export default RootRouter;
