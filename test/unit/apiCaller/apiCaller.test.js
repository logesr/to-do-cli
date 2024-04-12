const axios = require('axios');
const callApi = require('../../../src/apiCaller/apiCaller');

jest.mock('axios');

describe('apiCaller', () => {
  describe('callApi', () => {
    beforeEach(() => {
      axios.mockClear();
    });

    it('should call axios with the given params', () => {
      axios.mockImplementation(() => Promise.resolve({}));
      const axiosParams = { data: { body: 'body' }, method: 'post', url: 'testUrl' };
      callApi('post', 'testUrl', { body: 'body' });
      expect(axios).toBeCalledWith(axiosParams);
    });

    it('should the response of the called api', async () => {
      const expectedResponse = { response: 'testResponse' };
      axios.mockResolvedValueOnce({
        data: {
          response: 'testResponse',
        },
      });
      const actualResponse = await callApi('get', 'testUrl');
      expect(actualResponse).toEqual(expectedResponse);
    });

    it('should throw error when api call is failed', async () => {
      axios.mockRejectedValue({ message: 'Error in api call' });
      try {
        await callApi('get', 'testUrl');
      } catch (err) {
        expect(err.message).toBe('Error in api call');
      }
    });
  });
});
