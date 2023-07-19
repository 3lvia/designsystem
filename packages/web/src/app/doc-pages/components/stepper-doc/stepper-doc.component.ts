import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/doc-pages';
import { Title } from '@angular/platform-browser';
import { stepperData } from './stepper-data';
import { configurationProps } from './stepper-configuration-props';

@Component({
  selector: 'app-stepper-doc',
  templateUrl: './stepper-doc.component.html',
  styleUrls: ['./stepper-doc.component.scss'],
})
export class StepperDocComponent {
  figmaUrl = getComponent('stepper')?.figmaUrl;
  description = getComponent('stepper')?.description;
  title = getComponent('stepper')?.title;
  componentData = stepperData;
  stepperConfigurationProps = configurationProps;
  does = stepperData.does;
  donts = stepperData.donts;

  constructor(private titleService: Title) {
    this.titleService.setTitle(this.title + ' | Elvia design system');
  }
}
