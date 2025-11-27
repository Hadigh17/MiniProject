import { Component, OnInit } from '@angular/core';
import { CustomersService } from '../../services/customers';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-manage-customers',
  templateUrl: './manage-customers.html',
  imports: [
    CommonModule, FormsModule, DatePipe, MatTableModule,
  ],
})
export class ManageCustomersComponent implements OnInit {

  displayedColumns = ['name', 'email', 'createdAt', 'actions'];
  customers = new MatTableDataSource<any>([]);
  editing = false;
  form = { id: 0, name: '', email: '' };

  constructor(private service: CustomersService) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.service.getAll().subscribe(res => {
      this.customers.data = res;   // 👈 MAGIC LINE (auto-refresh)
    });
  }

  startEdit(c: any) {
    this.editing = true;
    this.form = { ...c };
  }

  save() {
    if (this.editing)
      this.service.update(this.form.id, this.form).subscribe(() => this.load());
    else
      this.service.create(this.form).subscribe(() => this.load());

    this.editing = false;
    this.form = { id: 0, name: '', email: '' };
  }

  delete(id: number) {
    this.service.delete(id).subscribe(() => this.load());
  }
}
