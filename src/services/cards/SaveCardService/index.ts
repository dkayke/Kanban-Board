import ApiService from 'assets/libs/config-services/apiService';
import SaveCardResponse from './interfaces/response';
import SaveCardRequest from './interfaces/request';

class SaveCardService extends ApiService<SaveCardResponse, SaveCardRequest> {
  constructor() {
    super({
      config: (request: SaveCardRequest) => ({
        url: '/cards',
        method: 'POST',
        data: request,
      }),
      handleLoader: true,
      handleError: true
    });
  }
}

export default SaveCardService;
export type { SaveCardResponse, SaveCardRequest };