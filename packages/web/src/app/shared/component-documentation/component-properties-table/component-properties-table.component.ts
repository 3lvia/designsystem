import { Component, Input, OnInit } from '@angular/core';
import { SearchService } from 'src/app/core/services/search.service';
import ComponentData, { AttributeType } from 'src/app/doc-pages/components/component-data.interface';

interface ComponentProp extends AttributeType {
  attribute: string;
}

@Component({
  selector: 'app-component-properties-table',
  templateUrl: './component-properties-table.component.html',
  styleUrls: ['./component-properties-table.component.scss'],
})
export class ComponentPropertiesTableComponent implements OnInit {
  @Input() componentData: ComponentData;
  componentProps: ComponentProp[] = [];
  filteredComponentProps: ComponentProp[] = [];
  searchTerm = '';

  constructor(private searchService: SearchService<ComponentProp>) {}

  ngOnInit(): void {
    this.createPropArray();
    this.initializeSearchService();
    this.searchProps();
  }

  createPropArray(): void {
    Object.keys(this.componentData.attributes).forEach((attribute) => {
      const componentProp: ComponentProp = {
        attribute,
        ...this.componentData.attributes[attribute],
      };
      this.componentProps.push(componentProp);
    });
  }

  searchProps(): void {
    if (!this.searchService.isInitialized) {
      return;
    }
    if (this.searchTerm !== '') {
      this.filteredComponentProps = this.searchService.search(this.searchTerm);
    } else {
      this.filteredComponentProps = this.componentProps;
    }
  }

  private initializeSearchService(): void {
    this.searchService.initializeSearch(this.componentProps, {
      threshold: 0.4,
      keys: [
        { name: 'attribute', weight: 1 },
        { name: 'description', weight: 0.5 },
        { name: 'type', weight: 0.4 },
        { name: 'default', weight: 0.01 },
      ],
    });
  }
}
