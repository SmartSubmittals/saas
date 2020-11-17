import sendRequestAndGetResponse from './sendRequestAndGetResponse';

const BASE_PATH = '/api/v1/team-member';
/**
 * sends a request with the method POST from our APP server to API server.
 * the request's body contains all information (fileName, fileType, prefix, bucket) required by the AWS S3 server to generate a signed request that we need to successfully upload a file.
 * on our API server, the Express route /aws/get-signed-request-for-upload-to-s3 gets a request from APP and calls a handler function.
 */
export const getSignedRequestForUploadApiMethod = ({ fileName, fileType, prefix, bucket }) =>
  sendRequestAndGetResponse(`${BASE_PATH}/aws/get-signed-request-for-upload-to-s3`, {
    body: JSON.stringify({ fileName, fileType, prefix, bucket }),
  });

/**
 * uploads a file using a signed request.
 */
export const uploadFileUsingSignedPutRequestApiMethod = (file, signedRequest, headers = {}) =>
  sendRequestAndGetResponse(signedRequest, {
    externalServer: true,
    method: 'PUT',
    body: file,
    headers,
  });

/**
 * Notes:
 * - We place the code to a team-member.ts file instead of public.ts, because uploading files is allowed only for logged-in users.
 * - If a user is logged in to our web application, we call this user a Team Member.
 * - If a user is logged in and has the parameter isTeamLeader: true, then we call this user a Team Leader.
 * - We will talk about the Team Model later in this book. For now, simply note that API methods exclusive to logged-in users who are not team leaders will be stored at book/4-begin/app/lib/api/team-member.ts.
 */
