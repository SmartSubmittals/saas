import * as express from 'express';

import { signRequestForUpload } from '../aws-s3';

import User from '../models/User';
import Team from '../models/Team';

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

// moving this route to be for only logged in users
router.post('/user/update-profile', async (req, res, next) => {
  console.log('Express route: /user/update-profile');

  try {
    const { name, avatarUrl } = req.body;
    
    console.log(name);

    const updatedUser = await User.updateProfile({
      userId: req.user.id,
      name,
      avatarUrl,
    });

    res.json({ updatedUser });

  } catch (err) {
    next(err);
  }
 });

router.post('/user/toggle-theme', async (req, res, next) => {
  try {
    const { darkTheme } = req.body;

    console.log('server body: ', darkTheme)

    console.log(await User.toggleTheme({ userId: req.user.id, darkTheme }));

    res.json({ done: 1 });
  } catch (err) {
    next(err);
  }
});

router.post('/get-initial-data', async (req, res, next) => {
  try {
    const teams = await Team.getAllTeamsForUser(req.user.id);

    let selectedTeamSlug = req.body.teamSlug;
    if (!selectedTeamSlug && teams && teams.length > 0) {
      selectedTeamSlug = teams[0].slug;
    }

    for (const team of teams) {
      if (team.slug === selectedTeamSlug) {
        Object.assign(team, await loadTeamData(team, req.user.id));
        break;
      }
    }

    res.json({ teams });
  } catch (err) {
    next(err);
  }
});
 
async function loadTeamData(team, userId) {
  const initialMembers = await User.getMembersForTeam({
    userId,
    teamId: team._id,
  });

  const data: any = { initialMembers };

  return data;
}

router.post('/get-initial-data', async (req, res, next) => {
  try {
    const teams = await Team.getAllTeamsForUser(req.user.id);

    let selectedTeamSlug = req.body.teamSlug;
    if (!selectedTeamSlug && teams && teams.length > 0) {
      selectedTeamSlug = teams[0].slug;
    }

    for (const team of teams) {
      if (team.slug === selectedTeamSlug) {
        Object.assign(team, await loadTeamData(team, req.user.id));
        break;
      }
    }

    res.json({ teams });
  } catch (err) {
    next(err);
  }
});

router.get('/teams', async (req, res, next) => {
  try {
    const teams = await Team.getAllTeamsForUser(req.user.id);

    res.json({ teams });
  } catch (err) {
    next(err);
  }
});

router.get('/teams/get-members', async (req, res, next) => {
  try {
    const users = await User.getMembersForTeam({ userId: req.user.id, teamId: req.query.teamId as string});

    res.json({ users });
  } catch (err) {
    next(err);
  }
});

router.post('/teams/update', async (req, res, next) => {
  try {
    const { teamId, name, avatarUrl } = req.body;

    const team = await Team.updateTeam({
      userId: req.user.id,
      teamId,
      name,
      avatarUrl,
    });

    res.json(team);
  } catch (err) {
    next(err);
  }
});

export default router;


/**
 * Notes:
 * - we place Express routes related to a Team Member user in /api/server/api/team-member.ts.
 */