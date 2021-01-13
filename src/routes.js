import { KoikeApp } from './pages/KoikeApp';
import Simulator from './pages/Simulator';

const routes = [
    { path: '/', component: KoikeApp, exact : true },
    { path: '/simulate', component: Simulator,},
  ];
  
  export default routes;