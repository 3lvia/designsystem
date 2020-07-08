import { Component } from '@angular/core';
import { GithubService } from 'src/app/core/services/github.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {

  monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  formattedDate: string;

  constructor(private githubService: GithubService) { }

  // ngOnInit(): void {
  //   this.getLatestUpdateOfRepo();
  // }

  // getLatestUpdateOfRepo(): void {
  //   this.githubService.requestRepo().subscribe(repo => {
  //     const date = new Date(repo.updated_at);
  //     this.formattedDate = date.getDate() + ' ' + this.monthNames[date.getMonth()] + ' ' + date.getFullYear();
  //   });
  // }
}
