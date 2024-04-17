import { lazy } from 'react';
import Loadable from '@/components/loader/Loadable';
const HomePage = Loadable(lazy(() => import('./Home')));
const LoginPage = Loadable(lazy(()=>import('./Login')))

export {

  HomePage, LoginPage

};
