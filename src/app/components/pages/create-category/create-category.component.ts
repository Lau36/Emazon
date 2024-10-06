import { createCategory } from './../../../models/interfaces';
import { CategoryService } from 'src/app/services/category.service';
import { Component, OnInit } from '@angular/core';
import { CREATE, CREATE_CATEGORY, DESCRIPTION, NAME, PLACEHOLDER_REGULAR_INPUT } from '../../utils/constants';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent implements OnInit {

  title: string = CREATE_CATEGORY;
  textName: string = NAME;
  textDescription: string = DESCRIPTION;
  placeholder: string = PLACEHOLDER_REGULAR_INPUT;
  contentButton: string = CREATE;

  ngOnInit(): void {}


}
