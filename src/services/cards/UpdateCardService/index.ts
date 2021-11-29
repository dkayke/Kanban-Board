import ApiService from 'assets/libs/config-services/apiService';
import UpdateCardResponse from './interfaces/response';
import UpdateCardRequest from './interfaces/request';

class UpdateCardService extends ApiService<UpdateCardResponse, UpdateCardRequest> {
  constructor() {
    super({
      config: (request: UpdateCardRequest) => ({
        url: `/cards/${request.id}`,
        method: 'PUT',
        data: request,
      }),
      handleLoader: true,
      handleError: true
    });
  }
}

export default UpdateCardService;
export type { UpdateCardResponse, UpdateCardRequest };