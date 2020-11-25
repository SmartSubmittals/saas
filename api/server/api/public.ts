import * as express from 'express';

import User from '../models/User';
import Invitation from '../models/Invitation';

const router: express.Router = express.Router();

// router.get('/get-user', (req, res) => {
//   res.json({ user: req.user || null });
// });


// declaration merging for types and custom session data
declare module 'express-session' {
  interface SessionData {
    foo: string
  }
}

// had to add custom typing for request object
declare global {
  namespace Express {
    interface Request {
      user: {
        id: string
      }
    }
  }
}

router.get('/get-user', (req, res) => {
  console.log(`req.user inside Express route: ${req.user}`);
  res.json({ user: req.user || null });
});


router.post('/get-user-by-slug', async (req, res, next) => {
  console.log('Express route: /get-user-by-slug');

  // req.session.foo= 'bar';

  try {
    const { slug } = req.body;

    console.log(slug)

    const user = await User.getUserBySlug({ slug });

    res.json({ user });
  } catch (err) {
    next(err);
  }
});

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

router.get('/invitations/accept-and-get-team-by-token', async (req: any, res, next) => {
  try {
    const team = await Invitation.getTeamByToken({
      token: req.query.token,
    });

    if (req.user) {
      await Invitation.addUserToTeam({ token: req.query.token, user: req.user });
    }

    res.json({ team });
  } catch (err) {
    next(err);
  }
});

router.post('/invitations/remove-invitation-if-member-added', async (req: any, res, next) => {
  try {
    const team = await Invitation.removeIfMemberAdded({
      token: req.body.token,
      userId: req.user.id,
    });

    res.json({ team });
  } catch (err) {
    next(err);
  }
});
 

 export default router;