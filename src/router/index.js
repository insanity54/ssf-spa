import Vue from 'vue';
import Router from 'vue-router';

import Configuration from '@/components/Configuration/Configuration';
import Provision from '@/components/Provision/Provision';


Vue.use(Router);

export default new Router({
  routes: [{
      path: '/configuration',
      name: 'Configuration',
      component: Configuration
    },
    {
      path: '/provision',
      name: 'Provision',
      component: Provision
    }
  ]
});
