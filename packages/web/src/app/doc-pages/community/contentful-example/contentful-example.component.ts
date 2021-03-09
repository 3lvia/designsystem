import { Component, OnInit } from '@angular/core';
import { ContentfulService } from 'src/app/contentful.service';
import { Entry } from 'contentful';

@Component({
  selector: 'app-contentful-example',
  templateUrl: './contentful-example.component.html',
  styleUrls: ['./contentful-example.component.scss'],
})
export class ContentfulExampleComponent implements OnInit {
  public products: Entry<any>[] = [];
  constructor(private contentfulService: ContentfulService) { }

  ngOnInit() {
    this.contentfulService.getProducts()
      .then(products => {
        this.products = products;
        console.log(this.products);
      });
  }

}
