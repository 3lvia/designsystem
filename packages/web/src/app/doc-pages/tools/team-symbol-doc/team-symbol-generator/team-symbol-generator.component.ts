import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { StepStates } from '@elvia/elvis-stepper';

import { SafeHtmlPipe } from './safeHtml.pipe';
import {
  findLastTwoViewBoxValues,
  generateAndSaveZip,
  generateRandomHexColors,
  getTextElementWidth,
} from './symbolHelpers';

@Component({
  selector: 'app-team-symbol-generator',
  standalone: true,
  imports: [CommonModule, FormsModule, SafeHtmlPipe],
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

  isFinished: boolean = false;
  currentStep: number = 1;

  errorText: string = '';

  fileUrl: string | ArrayBuffer | null = null;

  generatedColors: string[] = [];
  chosenColor: string | undefined;

  svgContent: string = '';
  generatedSvg: string = '';
  svgWithTeamName: string = '';

  teamName: string = '';

  constructor(private sanitizer: DomSanitizer) {}

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
    const [width, height] = findLastTwoViewBoxValues(this.svgContent) ?? [0, 0];

    const circleRadius = Math.max(width, height);
    const scaleFactor = 0.5;

    const circleBackground = `
      <circle cx="${circleRadius}" cy="${circleRadius}" r="${circleRadius}" fill="${this.chosenColor ?? 'transparent'}" />
    `;

    if (withTeamName) {
      const fontSize = 44;
      const circleDiameter = 100;
      const margin = 16;

      const textWidth = getTextElementWidth(`
        <text font-family="Red Hat Display" font-weight="900" font-size="${fontSize}" fill="var(--e-color-illustration-main-1, #262626)">${this.teamName}</text>
      `);

      const totalWidth = circleDiameter + textWidth + 16;
      const symbolX = -(totalWidth / 2 - circleDiameter / 2);
      const textX = circleDiameter + margin;
      const textY = circleDiameter / 2 + fontSize / 2;

      this.svgWithTeamName = `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${totalWidth} ${circleDiameter}">
            <style>
              @import url('https://fonts.googleapis.com/css2?family=Red+Hat+Display:ital,wght@0,300..900;1,300..900&amp;display=swap')
            </style>
            <svg xmlns="http://www.w3.org/2000/svg" x="${symbolX}" viewBox="0 0 ${circleRadius * 2} ${circleRadius * 2}">
              ${circleBackground}
              <g transform="scale(${scaleFactor}) translate(${circleRadius}, ${circleRadius})">${this.svgContent}</g>
            </svg>
            <text x="${textX}" y="${textY}" font-family="Red Hat Display, sans-serif" font-weight="900" font-size="44" fill="var(--e-color-text-1, #000000)">${this.teamName}</text>
          </svg>
        `;
    } else {
      this.generatedSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${circleRadius * 2} ${circleRadius * 2}">
        ${circleBackground}
        <g transform="scale(${scaleFactor}) translate(${circleRadius}, ${circleRadius})">${this.svgContent}</g>
      </svg>
    `;
    }
  }

  downloadZip() {
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
    this.generatedColors = generateRandomHexColors();
  }
}
