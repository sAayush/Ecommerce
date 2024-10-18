import { Routes } from '@angular/router';
import { LoginComponent } from './website/login/login.component';
import { BaseComponent } from './admin/base/base.component';
import { ProductsComponent } from './admin/products/products.component';
import { UserProductsComponent } from './user/user-products/user-products.component';
import { UserCategoriesComponent } from './user/user-categories/user-categories.component';
import { UserBaseComponent } from './user/user-base/user-base.component';
import { HomeComponent } from './admin/home/home.component';
import { AddProductComponent } from './admin/add-product/add-product.component';

export const routes: Routes = [

    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'admin',
        component: BaseComponent,
        children: [
            {
                path: 'home',
                component: HomeComponent
            },
            {
                path: 'products',
                component: ProductsComponent,
                children: []
                    
            },
            {
                path: 'add-product',
                component: AddProductComponent
            }
        ]
    },
    {
        path: 'user',
        component: UserBaseComponent,
        children: [
            {
                path: 'products',
                component: UserProductsComponent
            },
            {
                path: 'category',
                component: UserCategoriesComponent

            }
        ]
    }
];
