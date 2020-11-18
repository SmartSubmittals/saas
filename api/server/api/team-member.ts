import * as express from 'express';

import { signRequestForUpload } from '../aws-s3';

const router = express.Router();
/**
 * check if req.user exists upstream of Express routes. 
 * if it does not, API server responds with error status code. 
 * req.user will only exist if cookie from browser matches session, session matches user and our code (passport or passwordless) populated req.user.
 * adding middleware that checks for some permissions upstream of Express route is the way to set permissions for non-public API endpoints.
 */
router.use((req, res, next) => {
  console.log('team member API', req.path);
  if (!req.user) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  next();
});

// this express route /aws/get-signed-request-for-upload-to-s3 is agnostic to the value of the bucket's name.
router.post('/aws/get-signed-request-for-upload-to-s3', async (req, res, next) => {
  try {
    const { fileName, fileType, prefix, bucket } = req.body;

    const returnData = await signRequestForUpload({
      fileName,
      fileType,
      prefix,
      bucket,
    });

    console.log(returnData);

    res.json(returnData);
  } catch (err) {
    next(err);
  }
});

export default router;


/**
 * Notes:
 * - we place Express routes related to a Team Member user in /api/server/api/team-member.ts.
 */