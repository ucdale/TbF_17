export type RouteType = {
  id: string;
  title: string;
  path: string;
  menu?: string;
  sidebar?: boolean;
  home?: boolean;
  permalink: string;
};

enum RouteKeys {
  HOME,
  LEADERBOARDS,
  MANAGE
}

const ROUTES: { [key in keyof typeof RouteKeys]: RouteType } = {
  // HOME
  HOME: {
    id: 'root',
    title: 'Home',
    path: '/',
    home: true,
    permalink: ''
  },
  LEADERBOARDS: {
    id: 'leaderboards',
    title: 'Leaderboards',
    path: 'leaderboards/',
    home: true,
    permalink: ''
  },
  MANAGE: {
    id: 'manage',
    title: 'Manage teams',
    path: 'manage/',
    home: true,
    permalink: ''
  }
};

const ROUTESKeys = Object.keys(ROUTES);

export { ROUTES, ROUTESKeys };
