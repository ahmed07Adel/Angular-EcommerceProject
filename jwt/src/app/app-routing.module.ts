import { RegisterAdminComponent } from './register-admin/register-admin.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { AuthGuard } from 'src/Service/auth.guard';


const routes: Routes = [
  {path: '', component: HomeComponent},
  // {path: 'home', component: ProductsListComponent},
  {path: 'home', component: ProductsListComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'Product-detail/:id', component: ProductDetailsComponent},
  {path: 'createProduct', component: CreateProductComponent},
  {path: 'Edit-Product/:id', component: EditProductComponent},
  {path: 'registerAdmin', component: RegisterAdminComponent},
  {path: 'chat', component: ChatComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
