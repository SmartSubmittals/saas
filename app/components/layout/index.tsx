import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import Link from 'next/link';
import React from 'react';

import MenuWithLinks from '../common/MenuWithLinks';
import Confirmer from '../common/Confirmer';
import Notifier from '../common/Notifier';

import { Store } from '../../lib/store';
import DiscussionList from '../discussions/DiscussionList';

const dev = process.env.NODE_ENV !== 'production';

const styleGrid = {
  width: '100vw',
  minHeight: '100vh',
  maxWidth: '100%',
  padding: '0px 10px',
};

const styleGridIsMobile = {
  width: '100vw',
  minHeight: '100vh',
  maxWidth: '100%',
  padding: '0px 0px 0px 10px',
};

function LayoutWrapper({
  children,
  isMobile,
  firstGridItem,
  store,
  isThemeDark,
}: {
  children: React.ReactNode;
  isMobile: boolean;
  firstGridItem: boolean;
  store: Store;
  isThemeDark: boolean;
}) {
  return (
    <React.Fragment>
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="stretch"
        style={isMobile ? styleGridIsMobile : styleGrid}
      >
        {firstGridItem ? (
          <Grid
            item
            sm={2}
            xs={12}
            style={{
              borderRight: '1px #707070 solid',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="124"
                height="40"
                viewBox="0 0 124 40"
                style={{
                  marginTop: '20px',
                  display: 'inline-flex',
                  height: '40px',
                }}
              >
                <g id="logo">
                  <g id="logo-40">
                    <circle id="Ellipse 2" cx="20" cy="20" r="20" fill="black" />
                    <path
                      id="path-logo"
                      d="M7.07825 -0.0960007V16H4.51825V13.088C4.04892 14.0907 3.33425 14.8693 2.37425 15.424C1.43558 15.9573 0.336917 16.224 -0.92175 16.224C-2.35108 16.224 -3.60975 15.8827 -4.69775 15.2C-5.76442 14.5173 -6.59642 13.5573 -7.19375 12.32C-7.76975 11.0613 -8.05775 9.6 -8.05775 7.936C-8.05775 6.272 -7.75908 4.81067 -7.16175 3.552C-6.56442 2.272 -5.73242 1.28 -4.66575 0.576C-3.57775 -0.128 -2.32975 -0.48 -0.92175 -0.48C0.336917 -0.48 1.43558 -0.202666 2.37425 0.352C3.31292 0.906667 4.02758 1.68533 4.51825 2.688V-0.0960007H7.07825ZM-0.40975 14.08C1.16892 14.08 2.38492 13.5467 3.23825 12.48C4.09158 11.392 4.51825 9.856 4.51825 7.872C4.51825 5.888 4.09158 4.36267 3.23825 3.296C2.38492 2.22933 1.16892 1.696 -0.40975 1.696C-1.98842 1.696 -3.22575 2.25067 -4.12175 3.36C-4.99642 4.448 -5.43375 5.97333 -5.43375 7.936C-5.43375 9.89867 -4.99642 11.4133 -4.12175 12.48C-3.24708 13.5467 -2.00975 14.08 -0.40975 14.08Z"
                      transform="translate(19.5938 12)"
                      fill="white"
                    />
                  </g>
                </g>
              </svg>
              <MenuWithLinks
                options={[
                  {
                    text: 'Team Settings',
                    href: `/team-settings?teamSlug=${store.currentTeam.slug}`,
                    as: `/team/${store.currentTeam.slug}/team-settings`,
                    simple: true,
                  },
                  {
                    text: 'Billing',
                    href: `/billing?teamSlug=${store.currentTeam.slug}`,
                    as: `/team/${store.currentTeam.slug}/billing`,
                    simple: true,
                  },
                  {
                    text: 'Your Settings',
                    href: '/your-settings',
                    highlighterSlug: '/your-settings',
                  },
                  {
                    separator: true,
                  },
                  {
                    text: 'Log out',
                    href: `${dev ? process.env.URL_API : process.env.PRODUCTION_URL_API}/logout`,
                    as: `${dev ? process.env.URL_API : process.env.PRODUCTION_URL_API}/logout`,
                    externalServer: true,
                  },
                ]}
              >
                <Avatar
                  src={store.currentUser.avatarUrl}
                  alt="Add username here later in the book"
                  style={{
                    margin: '20px auto',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    width: '40px',
                    height: '40px',
                  }}
                />

                <i className="material-icons" color="action" style={{ verticalAlign: 'super' }}>
                  arrow_drop_down
                </i>
              </MenuWithLinks>
            </div>
            <hr />
            <p />
            <p />
            <DiscussionList store={store} team={store.currentTeam} isMobile={isMobile} />
          </Grid>
        ) : null}

        {children}
      </Grid>
      <Notifier />
      <Confirmer />
    </React.Fragment>
  );
}

type Props = {
  children: React.ReactNode;
  isMobile?: boolean;
  firstGridItem?: boolean;
  store?: Store;
  teamRequired?: boolean;
};

class Layout extends React.Component<Props> {
  public render() {
    const { children, isMobile, firstGridItem, store, teamRequired } = this.props;

    const { currentUser, currentTeam } = store;

    const isThemeDark = currentUser && currentUser.darkTheme === true;

    // console.log(this.props.store.currentUser.darkTheme);

    // const isThemeDark = false;

    // console.log(isMobile);

    console.log(isThemeDark);

    // console.log(currentTeam);

    if (!currentUser) {
      return (
        <LayoutWrapper
          firstGridItem={firstGridItem}
          isMobile={isMobile}
          isThemeDark={isThemeDark}
          store={store}
        >
          <Grid item sm={12} xs={12}>
            {children}
          </Grid>
        </LayoutWrapper>
      );
    }

    if (!currentTeam) {
      if (teamRequired) {
        return (
          <LayoutWrapper
            firstGridItem={firstGridItem}
            isMobile={isMobile}
            isThemeDark={isThemeDark}
            store={store}
          >
            <Grid item sm={10} xs={12}>
              <div style={{ padding: '20px' }}>
                Select existing team or create a new team.
                <p />
                <Link href="/create-team" as="/create-team">
                  <Button variant="outlined" color="primary">
                    Create new team
                  </Button>
                </Link>
              </div>
            </Grid>
          </LayoutWrapper>
        );
      } else {
        console.log('team not required');
        return (
          <LayoutWrapper
            firstGridItem={firstGridItem}
            isMobile={isMobile}
            isThemeDark={isThemeDark}
            store={store}
          >
            <Grid item sm={10} xs={12}>
              {children}
            </Grid>
          </LayoutWrapper>
        );
      }
    }

    return (
      <LayoutWrapper
        firstGridItem={firstGridItem}
        isMobile={isMobile}
        isThemeDark={isThemeDark}
        store={store}
      >
        <Grid item sm={firstGridItem ? 10 : 12} xs={12}>
          <div>
            {isMobile || store.currentUrl.includes('create-team') ? null : (
              <React.Fragment>
                <i
                  style={{
                    float: 'left',
                    margin: '15px 0px 10px 25px',
                    opacity: 0.8,
                    fontSize: '18px',
                    cursor: 'pointer',
                    verticalAlign: 'top',
                  }}
                  className="material-icons"
                  onClick={async () => {
                    await store.currentUser.toggleTheme(!store.currentUser.darkTheme);
                  }}
                >
                  lens
                </i>
              </React.Fragment>
            )}
            <div style={{ clear: 'both' }} />
          </div>
          {children}
        </Grid>
      </LayoutWrapper>
    );
  }
}

export default Layout;
