import sendRequestAndGetResponse from './sendRequestAndGetResponse';

const BASE_PATH = '/api/v1/team-leader';

/**
 * sends a request with the method POST from our APP server to API server.
 * the request's body contains all information (fileName, fileType, prefix, bucket) required by the AWS S3 server to generate a signed request that we need to successfully upload a file.
 * on our API server, the Express route /aws/get-signed-request-for-upload-to-s3 gets a request from APP and calls a handler function.
 */
export const addTeamApiMethod = (data) =>
  sendRequestAndGetResponse(`${BASE_PATH}/teams/add`, {
    body: JSON.stringify(data),
  });

export const updateTeamApiMethod = (data) =>
  sendRequestAndGetResponse(`${BASE_PATH}/teams/update`, {
    body: JSON.stringify(data),
  });
