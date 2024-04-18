import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThemeName } from '@elvia/elvis-colors';
import { StepStates } from '@elvia/elvis-stepper';

import { SafeHtmlPipe } from './safeHtml.pipe';
import {
  findHeightAndWidth,
  findLastTwoViewBoxValues,
  generateAndSaveZip,
  generateRandomColors,
  getTextElementWidth,
} from './symbolHelpers';
import { LocalThemeSwitchComponent } from 'src/app/shared/local-theme-switch/local-theme-switch.component';

@Component({
  selector: 'app-team-symbol-generator',
  standalone: true,
  imports: [CommonModule, FormsModule, SafeHtmlPipe, LocalThemeSwitchComponent],
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

  handleChangeThemeEvent = (newTheme: ThemeName) => {
    this.theme = newTheme;
    this.generateTeamSymbol(true);
  };

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
        this.svgContent = e.target.result;
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

  handleStepChange(step: number) {
    this.currentStep = step;
  }

  handleNextClick() {
    if (this.currentStep === 3 && this.teamName !== '') {
      this.stepStates['3'].isCompleted = true;
      this.isFinished = true;
      this.generateTeamSymbol(true);
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

  generateTeamSymbol(withTeamName?: boolean) {
    let circleRadius = 100;
    let svgTransform = '';

    const viewBoxValues = findLastTwoViewBoxValues(this.svgContent);
    const heightAndWidth = findHeightAndWidth(this.svgContent);

    if (heightAndWidth) {
      const [width, height] = heightAndWidth;
      circleRadius = Math.max(width, height);
      svgTransform = `translate(${circleRadius / 2}, ${circleRadius / 2})`;
    } else if (viewBoxValues) {
      const [width, height] = viewBoxValues;
      circleRadius = Math.max(width, height);
      svgTransform = `scale(0.5) translate(${circleRadius}, ${circleRadius})`;
    }

    const circleBackground = `
      <circle cx="${circleRadius}" cy="${circleRadius}" r="${circleRadius}" fill="${this.chosenColor ?? 'transparent'}" />
    `;

    if (withTeamName) {
      const fontSize = 44;
      const circleDiameter = 100;
      const margin = 16;

      const fallbackFontColor = this.theme === 'light' ? '#000000' : '#ededed';
      const textWidth = getTextElementWidth(`
        <text font-family="Red Hat Display" font-weight="900" font-size="${fontSize}">${this.teamName}</text>
      `);

      const totalWidth = circleDiameter + textWidth + 16;
      const symbolX = -(totalWidth / 2 - circleDiameter / 2);
      const textX = circleDiameter + margin;
      const textY = circleDiameter / 2 + fontSize / 2;

      this.svgWithTeamName = `
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 ${totalWidth} ${circleDiameter}">
            <style>
              @import url('https://fonts.googleapis.com/css2?family=Red+Hat+Display:ital,wght@0,300..900;1,300..900&amp;display=swap')
            </style>
            <svg xmlns="http://www.w3.org/2000/svg" x="${symbolX}" viewBox="0 0 ${circleRadius * 2} ${circleRadius * 2}">
              ${circleBackground}
              <g transform="${svgTransform}">${this.svgContent}</g>
            </svg>
            <text x="${textX}" y="${textY}" font-family="Red Hat Display, sans-serif" font-weight="900" font-size="44" fill="var(--e-color-text-1, ${fallbackFontColor})">${this.teamName}</text>
          </svg>
        `;
    } else {
      this.generatedSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 ${circleRadius * 2} ${circleRadius * 2}">
        ${circleBackground}
        <g transform="${svgTransform}">${this.svgContent}</g>
      </svg>
    `;
    }
  }

  downloadZip() {
    console.log(this.svgWithTeamName);
    generateAndSaveZip(this.generatedSvg, this.svgWithTeamName);
  }

  updateBackgroundCircle(color?: string) {
    this.chosenColor = color;
    this.generateTeamSymbol();
    if (this.chosenColor) {
      this.stepStates['2'].isCompleted = true;
    }
  }

  generateColors() {
    this.generatedColors = generateRandomColors();
  }
}
