import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConnectionService } from 'src/app/services/connection.service';

@Component({
    selector: 'app-new-connection',
    templateUrl: './new-connection.component.html',
    styleUrls: ['./new-connection.component.scss'],
})
export class NewConnectionComponent implements OnInit {
    constructor(
        private connectionService: ConnectionService,
        private snackBar: MatSnackBar
    ) {}

    ngOnInit(): void {}

    addClicked() {
        this.connectionService.create(newConnection).subscribe({
            next: () => {},
            error: (error) => {
                console.error(error);
                this.snackBar.open('اشکال در افزودن اتصال', '', {
                    duration: 3000,
                    verticalPosition: 'bottom',
                    horizontalPosition: 'center',
                    panelClass: 'red-snackbar',
                });
            },
        });
    }
}
