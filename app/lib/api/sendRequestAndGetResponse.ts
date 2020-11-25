import 'isomorphic-unfetch';
import { makeQueryString } from './makeQueryString';

export default async function sendRequestAndGetResponse(path, opts: any = {}) {
  const headers = Object.assign(
    {},
    opts.headers || {},
    opts.externalServer
      ? {}
      : {
          'Content-type': 'application/json; charset=UTF-8',
        },
  );

  const { request } = opts;
  if (request && request.headers && request.headers.cookie) {
    headers.cookie = request.headers.cookie;
  }

  const qs = (opts.qs && `?${makeQueryString(opts.qs)}`) || '';

  // console.log(`before: ${process.env.URL_API}${path}${qs}`);

  // FETCH
  const response = await fetch(
    // only send request from APP to API when externalServer is false
    opts.externalServer ? `${path}${qs}` : `${process.env.URL_API}${path}${qs}`,
    Object.assign({ method: 'POST', credentials: 'include' }, opts, { headers }),
  );

  // console.log(`after: ${process.env.URL_API}${path}${qs}`);

  // console.log(`${process.env.URL_API}${path}${qs}`);
  // console.log(response.status);
  // console.log(response.statusText);

  const text = await response.text();

  if (response.status >= 400) {
    console.error(text);
    throw new Error(response.status.toString());
  }

  try {
    const data = JSON.parse(text);

    return data;
  } catch (err) {
    if (err instanceof SyntaxError) {
      return text;
    }

    throw err;
  }
}

/**
 * Notes:
 * - What is the externalServer parameter's purpose?
 * - By default, any API method at APP sends a request to our API server.
 * - But for file uploading, we need to send a request directly from APP to an AWS S3 server, not our API server.
 * - To achieve that, we can pass some boolean parameter as an argument to the sendRequestAndGetResponse method.
 * - As you see from above, we called this boolean parameter externalServer
 */
