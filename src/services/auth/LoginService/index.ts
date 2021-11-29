import ApiService from 'assets/libs/config-services/apiService';
import LoginResponse from './interfaces/response';
import LoginRequest from './interfaces/request';

class LoginService extends ApiService<LoginResponse, LoginRequest> {
  constructor() {
    super({
      config: (request: LoginRequest) => ({
        url: '/login',
        method: 'POST',
        data: request,
      }),
      handleLoader: true,
      handleError: true
    });
  }
}

export default LoginService;
export type { LoginResponse, LoginRequest };