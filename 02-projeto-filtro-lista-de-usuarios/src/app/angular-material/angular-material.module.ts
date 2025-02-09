import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from "@angular/material/button";
import { MatTableModule } from '@angular/material/table';


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        MatListModule,
        MatDividerModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSelectModule,
        MatButtonModule,
        MatTableModule

    ],
    exports: [
        MatListModule,
        MatDividerModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSelectModule,
        MatButtonModule,
        MatTableModule
    ]
})
export class AngularMaterialModule { }