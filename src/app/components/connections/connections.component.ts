import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Connection } from 'src/app/models/connection.model';
import { ConnectionService } from 'src/app/services/connection.service';

@Component({
    selector: 'app-connections',
    templateUrl: './connections.component.html',
    styleUrls: ['./connections.component.scss'],
})
export class ConnectionsComponent implements OnInit {
    connections: Connection[] = [];

    constructor(
        private router: Router,
        private connectionService: ConnectionService,
        private snackBar: MatSnackBar
    ) {}

    ngOnInit(): void {}

    refreshConnections() {
        this.connectionService.getAll().subscribe({
            next: (connections) => {
                this.connections = connections;
            },
            error: (error) => {
                console.error(error);
                this.snackBar.open('اشکال در دریافت اتصال‌ها از سرور', '', {
                    duration: 3000,
                    verticalPosition: 'bottom',
                    horizontalPosition: 'center',
                    panelClass: 'red-snackbar',
                });
            },
        });
    }

    deleteConnection(element: Connection) {
        this.connectionService.delete(element.id!).subscribe({
            next: () => {
                this.snackBar.open('اتصال با موفقیت حذف شد', '', {
                    duration: 3000,
                    verticalPosition: 'bottom',
                    horizontalPosition: 'center',
                    panelClass: 'green-snackbar',
                });
                this.refreshConnections();
            },
            error: (error) => {
                console.error(error);
                this.snackBar.open('اشکال در حذف اتصال', '', {
                    duration: 3000,
                    verticalPosition: 'bottom',
                    horizontalPosition: 'center',
                    panelClass: 'red-snackbar',
                });
            },
        });
    }

    addPipeline() {
    }
}
