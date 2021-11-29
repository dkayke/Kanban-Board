import ApiService from 'assets/libs/config-services/apiService';
import GetCardsResponse from './interfaces/response';
import GetCardsRequest from './interfaces/request';

class GetCardsService extends ApiService<GetCardsResponse, GetCardsRequest> {
  constructor() {
    super({
      config: (request: GetCardsRequest) => ({
        url: '/cards',
        method: 'GET',
        data: request,
      }),
      handleLoader: true,
      handleError: true
    });
  }
}

export default GetCardsService;
export type { GetCardsResponse, GetCardsRequest };