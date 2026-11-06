import { Routes } from '@angular/router';
import { authGuard } from './guard/auth-guard';
import { HomePage } from './page/home-page/home-page';
import { LoginPage } from './page/login-page/login-page';
import { LivrePage } from './page/livre-page/livre-page';
import { AuteurPage } from './page/auteur-page/auteur-page';
import { CollectionPage } from './page/collection-page/collection-page';
import { EditeurPage } from './page/editeur-page/editeur-page';
import { AvisPage } from './page/avis-page/avis-page';


export const routes: Routes = [

    {
    path: 'login',
    component: LoginPage
    },

    {
    path: 'home',
    component: HomePage,
    //canActivate: [ authGuard ]
    },

    {
    path: 'livre',
    component: LivrePage,
    //canActivate: [ authGuard ]
    },

    {
    path: 'auteur',
    component: AuteurPage,
    //canActivate: [ authGuard ]
    },

    {
    path: 'collection',
    component: CollectionPage,
    //canActivate: [ authGuard ]
    },

    {
    path: 'editeur',
    component: EditeurPage,
    //canActivate: [ authGuard ]
    },

    {
    path: 'avis',
    component: AvisPage,
    //canActivate: [ authGuard ]
    },

    // {
    //   path: 'logout',
    //   component: LogoutPage,
    //   canActivate: [ authGuard ]
    // },

    {
      path: '',
      pathMatch: 'full',
      redirectTo: 'home'
    }

];
