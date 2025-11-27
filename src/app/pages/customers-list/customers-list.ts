import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersService } from '../../services/customers';
import { MatTableDataSource } from '@angular/material/table';

import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';

@Component({
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCardModule],
  templateUrl: './customers-list.html',
  styleUrls: ['./customers-list.css']
})
export class CustomersListComponent implements OnInit {
  displayedColumns = ['name', 'email', 'createdAt'];
  dataSource = new MatTableDataSource<any>();

  constructor(private customers: CustomersService) { }

  ngOnInit() {
    this.customers.getAll().subscribe(res => {
      this.dataSource.data = res;
    });
  }
}
