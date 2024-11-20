import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThemeName } from '@elvia/elvis-colors';
import { StepStates } from '@elvia/elvis-stepper';

import { SvgAbbreviationPopoverComponent } from '../svg-abbreviation-popover/svg-abbreviation-popover.component';
import { WhySvgPopoverComponent } from '../why-svg-popover/why-svg-popover.component';
import {
  createTeamSymbol,
  generateAndSaveZip,
  generateRandomColors,
  removeXmlElement,
} from './symbolHelpers';
import { LocalThemeSwitchComponent } from 'src/app/shared/local-theme-switch/local-theme-switch.component';
import { SafeHtmlPipe } from 'src/app/shared/safeHtml.pipe';

@Component({
  selector: 'app-team-symbol-generator',
  imports: [
    CommonModule,
    FormsModule,
    LocalThemeSwitchComponent,
    SafeHtmlPipe,
    SvgAbbreviationPopoverComponent,
    WhySvgPopoverComponent,
  ],
  templateUrl: './team-symbol-generator.component.html',
  styleUrl: './team-symbol-generator.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class TeamSymbolGeneratorComponent {
  stepStates: StepStates = {
    '1': { heading: 'Upload image', nextButtonText: 'Next', isCompleted: false },
    '2': { heading: 'Find a color', nextButtonText: 'Next', previousButtonText: 'Back', isCompleted: false },
    '3': {
      heading: 'Add team name',
      nextButtonText: 'Create',
      previousButtonText: 'Back',
      isCompleted: false,
    },
  };

  isFinished = false;
  currentStep = 1;
  theme: ThemeName = 'light';

  errorText = '';

  fileUrl: string | ArrayBuffer | null = null;

  generatedColors: string[] = [];
  chosenColor: string | undefined;

  svgContent = '';
  generatedSvg = '';
  svgWithTeamName = '';

  teamName = '';

  async handleChangeThemeEvent(newTheme: ThemeName) {
    this.theme = newTheme;
    this.svgWithTeamName = await createTeamSymbol(
      this.svgContent,
      this.theme,
      this.chosenColor,
      this.teamName,
    );
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      if (file.type !== 'image/svg+xml') {
        this.errorText = 'Filetype must be SVG';
        return;
      }

      if (file.size > 100 * 1024) {
        this.errorText = 'Filesize must be less than 100KB';
        return;
      }
      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {
        this.svgContent = removeXmlElement(e.target.result);
        this.updateBackgroundCircle();
      };
      reader.readAsText(file);
      this.stepStates['1'].isCompleted = true;
    }
  }

  removeFile() {
    this.generatedSvg = '';
    this.stepStates['1'].isCompleted = false;
  }

  async handleStepChange(step: number) {
    this.currentStep = step;

    if (step === 1) {
      this.generatedSvg = await createTeamSymbol(this.svgContent, this.theme);
    } else {
      this.updateBackgroundCircle(this.chosenColor);
    }
  }

  async handleNextClick() {
    if (this.currentStep === 3 && this.teamName !== '') {
      this.stepStates['3'].isCompleted = true;
      this.isFinished = true;
      this.svgWithTeamName = await createTeamSymbol(
        this.svgContent,
        this.theme,
        this.chosenColor,
        this.teamName,
      );
    }
  }

  reset() {
    this.stepStates['1'].isCompleted = false;
    this.stepStates['2'].isCompleted = false;
    this.stepStates['3'].isCompleted = false;
    this.isFinished = false;
    this.currentStep = 1;
    this.generatedColors = [];
    this.chosenColor = undefined;
    this.svgContent = '';
    this.generatedSvg = '';
    this.svgWithTeamName = '';
    this.teamName = '';
  }

  downloadZip() {
    generateAndSaveZip(this.generatedSvg, this.svgWithTeamName);
  }

  async updateBackgroundCircle(color?: string) {
    this.chosenColor = color;
    this.generatedSvg = await createTeamSymbol(this.svgContent, this.theme, color);
    if (color) {
      this.stepStates['2'].isCompleted = true;
    }
  }

  generateColors() {
    this.generatedColors = generateRandomColors();
  }
}
