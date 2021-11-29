import ApiService from 'assets/libs/config-services/apiService';
import DeleteCardResponse from './interfaces/response';
import DeleteCardRequest from './interfaces/request';

class DeleteCardService extends ApiService<DeleteCardResponse, DeleteCardRequest> {
  constructor() {
    super({
      config: (request: DeleteCardRequest) => ({
        url:  `/cards/${request.id}`,
        method: 'DELETE',
        data: request,
      }),
      handleLoader: true,
      handleError: true
    });
  }
}

export default DeleteCardService;
export type { DeleteCardResponse, DeleteCardRequest };