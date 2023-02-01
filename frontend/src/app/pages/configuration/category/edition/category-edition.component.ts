import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { delay } from 'rxjs/operators';
import { Category } from 'src/app/_model/category';
import { CategoryService } from 'src/app/_service/category.service';
import { LoadingService } from 'src/app/_service/loading.service';

@Component({
  selector: 'app-category-edicion',
  templateUrl: './category-edition.component.html',
  styleUrls: ['./category-edition.component.css']
})
export class CategoryEdicionComponent implements OnInit {

  formGroup!: FormGroup;

  category =  new Category;
  modificar!: Boolean;

  loading: boolean = false;


  constructor(public dialogRef: MatDialogRef<CategoryEdicionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Category,
    private categoryService: CategoryService,
    private formBuilder: FormBuilder,
    private _loading: LoadingService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.listenToLoading()
    this.Form();
    if (this.data) {
      this.category = { ...this.data };
      this.modificar = true;
    } else {
      this.modificar = false;
    }
    this.Form();
  }

  Form() {
    this.formGroup = this.formBuilder.group({
      name: [this.category.name, Validators.required],
    })

  }
  operar(){
    let category: Category = this.formGroup.value as Category;
    if (!this.modificar){
      this.categoryService.registrar(category).subscribe(()=>{
        this.dialogRef.close();
        this.categoryService.setMensajeCambio('Se agrego la category' + ' ' + category.name)
        this.ListarCambio();
      }
      );
    }
    else if(this.modificar){
      category.id = this.category.id;
      this.categoryService.modificar(category).subscribe(()=>{
        this.dialogRef.close();
        this.categoryService.setMensajeCambio('Se modifico la category' + ' ' + category.name)
        this.ListarCambio();
      })
    }

  }

  ListarCambio(){
    this.categoryService.listar().subscribe(data=>{
      this.categoryService.setCategoryCambio(data)

    })
  }

  mensaje(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000
    });
  }

  listenToLoading(): void {
    this._loading.loadingSub
      .pipe(delay(0)) // This prevents a ExpressionChangedAfterItHasBeenCheckedError for subsequent requests
      .subscribe((loading) => {
        this.loading = loading;
      });
  }

}
