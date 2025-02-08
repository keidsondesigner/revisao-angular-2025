import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AngularMaterialModule } from "../angular-material/angular-material.module";
import { UserDetailsComponent } from './user-details/user-details.component';


@NgModule({
    declarations: [
        UserDetailsComponent
    ],
    imports: [
        CommonModule,
        AngularMaterialModule
    ],
    exports: [
        UserDetailsComponent
    ]
})
export class ComponentsModule { }