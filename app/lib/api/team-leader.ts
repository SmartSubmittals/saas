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

export const inviteMemberApiMethod = (data) =>
  sendRequestAndGetResponse(`${BASE_PATH}/teams/invite-member`, {
    body: JSON.stringify(data),
  });

export const removeMemberApiMethod = (data) =>
  sendRequestAndGetResponse(`${BASE_PATH}/teams/remove-member`, {
    body: JSON.stringify(data),
  });

export const getTeamInvitationsApiMethod = (teamId: string) =>
  sendRequestAndGetResponse(`${BASE_PATH}/teams/get-invitations-for-team`, {
    method: 'GET',
    qs: { teamId },
  });

export const fetchCheckoutSessionApiMethod = ({ mode, teamId }: { mode: string; teamId: string }) =>
  sendRequestAndGetResponse(`${BASE_PATH}/stripe/fetch-checkout-session`, {
    body: JSON.stringify({ mode, teamId }),
  });

export const cancelSubscriptionApiMethod = ({ teamId }: { teamId: string }) =>
  sendRequestAndGetResponse(`${BASE_PATH}/cancel-subscription`, {
    body: JSON.stringify({ teamId }),
  });

export const getListOfInvoicesApiMethod = () =>
  sendRequestAndGetResponse(`${BASE_PATH}/get-list-of-invoices-for-customer`, {
    method: 'GET',
  });
