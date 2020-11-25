import sendRequestAndGetResponse from './sendRequestAndGetResponse';

const BASE_PATH = '/api/v1/public';

export const getUser = (request) =>
  sendRequestAndGetResponse(`${BASE_PATH}/get-user`, {
    request,
    method: 'GET',
  });

export const getUserBySlugApiMethod = (slug) =>
  sendRequestAndGetResponse(`${BASE_PATH}/get-user-by-slug`, {
    body: JSON.stringify({ slug }),
  });

export const getUserApiMethod = (opts = {}) =>
  sendRequestAndGetResponse(
    `${BASE_PATH}/get-user`,
    Object.assign(
      {
        method: 'GET',
      },
      opts,
    ),
  );

export const emailLoginLinkApiMethod = ({
  email,
  invitationToken,
}: {
  email: string;
  invitationToken?: string;
}) =>
  sendRequestAndGetResponse('/auth/email-login-link', {
    qs: { invitationToken },
    body: JSON.stringify({ user: email }),
  });

/**
 * acceptAndGetInvitedTeamByTokenApiMethod will get a Team from the API server using a token included in the API endpoint.
 * we then use Team to populate the Team's name and Team's logo on the Invitation page
 */
export const acceptAndGetInvitedTeamByTokenApiMethod = (token: string, request) =>
  sendRequestAndGetResponse(`${BASE_PATH}/invitations/accept-and-get-team-by-token`, {
    request,
    method: 'GET',
    qs: { token },
  });

/**
 * removeInvitationIfMemberAddedApiMethod, is used when an invited user is logged in to our application.
 * this method sends a POST request to the API server, resulting in deletion of an inivitation document from the database and addition of a new member to the Team
 */
export const removeInvitationIfMemberAddedApiMethod = (token: string) =>
  sendRequestAndGetResponse(`${BASE_PATH}/invitations/remove-invitation-if-member-added`, {
    body: JSON.stringify({ token }),
  });
