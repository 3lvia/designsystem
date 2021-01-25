import { Component, OnInit } from '@angular/core';
import { getComponent } from 'src/app/shared/e-items';

export interface Step {
  number: number;
  title: string;
  status: string;
}

@Component({
  selector: 'app-stepper-doc',
  templateUrl: './stepper-doc.component.html',
  styleUrls: ['./stepper-doc.component.scss'],
})
export class StepperDocComponent implements OnInit {
  figmaUrl = getComponent('stepper').figmaUrl;
  description = getComponent('stepper').description;

  exampleShortHorizontalHTML = `<div class="e-stepper e-stepper--horizontal">
  <div class="e-stepper__steps">

    <!--STEP-->
    <div class="e-stepper__step e-stepper__step--done">
      <div class="e-stepper__step-line"></div>
      <div class="e-stepper__step-header">
        <div class="e-stepper__step-number">1</div>
      </div>
    </div>

    <!--STEP-->
    <div class="e-stepper__step e-stepper__step--error">
      <div class="e-stepper__step-line"></div>
      <div class="e-stepper__step-header">
        <div class="e-stepper__step-number">2</div>
      </div>
    </div>

    <!--STEP-->
    <div class="e-stepper__step e-stepper__step--active">
      <div class="e-stepper__step-line"></div>
      <div class="e-stepper__step-header">
        <div class="e-stepper__step-number">3</div>
      </div>
    </div>

    <!--STEP-->
    <div class="e-stepper__step">
      <div class="e-stepper__step-line"></div>
      <div class="e-stepper__step-header">
        <div class="e-stepper__step-number">4</div>
      </div>
    </div>
  </div>

  <!--CONTENT - PUT DESIRED CONTENT HERE FOR EACH STEP-->
  <div class="e-stepper__content">
    <div class="e-stepper__title">Contact</div>
    <div class="e-form-field e-mb-24">
      <label class="e-form-field__label" for="normal">Email</label>
      <div class="e-input">
        <input id="normal" type="text" placeholder="ole.norman@gmail.com" />
      </div>
    </div>
    <div class="e-form-field e-form-field--combined">
      <label class="e-form-field__label" for="phone">Phone</label>
      <div class="e-form-field__input">
        <div id="phone" class="e-input e-input--small">
          <input type="text" value="+47" />
        </div>
        <div class="e-input e-mb-24">
          <input type="text" placeholder="Placeholder text" />
        </div>
      </div>
    </div>
    <div class="e-stepper__actions">
      <button class="e-btn e-btn--secondary">Back</button>
      <button class="e-btn e-btn--primary">Next</button>
    </div>
  </div>
</div>
`;

  exampleForcedHorizontalHTML = `<div class="e-stepper e-stepper--horizontal e-stepper--forced">
  <div class="e-stepper__steps">

    <!--STEP-->
    <div class="e-stepper__step e-stepper__step--done">
      <div class="e-stepper__step-line"></div>
      <div class="e-stepper__step-header">
        <div class="e-stepper__step-number">1</div>
      </div>
    </div>

    <!--STEP-->
    <div class="e-stepper__step e-stepper__step--active-done">
      <div class="e-stepper__step-line"></div>
      <div class="e-stepper__step-header">
        <div class="e-stepper__step-number">2</div>
      </div>
    </div>

    <!--STEP-->
    <div class="e-stepper__step">
      <div class="e-stepper__step-line"></div>
      <div class="e-stepper__step-header">
        <div class="e-stepper__step-number">3</div>
      </div>
    </div>

    <!--STEP-->
    <div class="e-stepper__step">
      <div class="e-stepper__step-line"></div>
      <div class="e-stepper__step-header">
        <div class="e-stepper__step-number">4</div>
      </div>
    </div>
  </div>

  <!--CONTENT - PUT DESIRED CONTENT HERE FOR EACH STEP-->
  <div class="e-stepper__content">
    <div class="e-stepper__title">Contact</div>
    <div class="e-form-field e-mb-24">
      <label class="e-form-field__label" for="normal">Email</label>
      <div class="e-input">
        <input id="normal" type="text" placeholder="ole.norman@gmail.com" />
      </div>
    </div>
    <div class="e-form-field e-form-field--combined">
      <label class="e-form-field__label" for="phone">Phone</label>
      <div class="e-form-field__input">
        <div id="phone" class="e-input e-input--small">
          <input type="text" value="+47" />
        </div>
        <div class="e-input e-mb-24">
          <input type="text" placeholder="Placeholder text" />
        </div>
      </div>
    </div>
    <div class="e-stepper__actions">
      <button class="e-btn e-btn--secondary">Back</button>
      <button class="e-btn e-btn--primary">Next</button>
    </div>
  </div>
</div>
`;

  exampleHorizontalHTML = `<div class="e-stepper e-stepper--horizontal">
  <div class="e-stepper__steps">

    <!--STEP-->
    <div class="e-stepper__step e-stepper__step--done">
      <div class="e-stepper__step-line"></div>
      <div class="e-stepper__step-header">
        <div class="e-stepper__step-number">1</div>
      </div>
    </div>

    <!--DASHED LINES-->
    <div class="e-stepper__step-lines">
      <div class="e-stepper__step-line"></div>
      <div class="e-stepper__step-line"></div>
      <div class="e-stepper__step-line"></div>
      <div class="e-stepper__step-line"></div>
      <div class="e-stepper__step-line"></div>
    </div>

    <!--STEP-->
    <div class="e-stepper__step e-stepper__step--error">
      <!--<div class="e-stepper__step-line"></div>-->
      <div class="e-stepper__step-header">
        <div class="e-stepper__step-number">3</div>
      </div>
    </div>

    <!--STEP-->
    <div class="e-stepper__step e-stepper__step--active">
      <div class="e-stepper__step-line"></div>
      <div class="e-stepper__step-header">
        <div class="e-stepper__step-number">4</div>
      </div>
    </div>

    <!--STEP-->
    <div class="e-stepper__step">
      <div class="e-stepper__step-line"></div>
      <div class="e-stepper__step-header">
        <div class="e-stepper__step-number">5</div>
      </div>
    </div>

    <!--DASHED LINES-->
    <div class="e-stepper__step-lines">
      <div class="e-stepper__step-line"></div>
      <div class="e-stepper__step-line"></div>
      <div class="e-stepper__step-line"></div>
      <div class="e-stepper__step-line"></div>
      <div class="e-stepper__step-line"></div>
    </div>

    <!--STEP-->
    <div class="e-stepper__step">
      <!--<div class="e-stepper__step-line"></div>-->
      <div class="e-stepper__step-header">
        <div class="e-stepper__step-number">7</div>
      </div>
    </div>
  </div>

  <!--CONTENT-->
  <div class="e-stepper__content">
    <div class="e-stepper__title">Contact</div>
    <div class="e-form-field e-mb-24">
      <label class="e-form-field__label" for="normal">Email</label>
      <div class="e-input">
        <input id="normal" type="text" placeholder="ole.norman@gmail.com" />
      </div>
    </div>
    <div class="e-form-field e-form-field--combined">
      <label class="e-form-field__label" for="phone">Phone</label>
      <div class="e-form-field__input">
        <div id="phone" class="e-input e-input--small">
          <input type="text" value="+47" />
        </div>
        <div class="e-input e-mb-24">
          <input type="text" placeholder="Placeholder text" />
        </div>
      </div>
    </div>
    <div class="e-stepper__actions">
      <button class="e-btn e-btn--secondary">Back</button>
      <button class="e-btn e-btn--primary">Next</button>
    </div>
  </div>
</div>
`;

  exampleVerticalShortHTML = `<div class="e-stepper e-stepper--vertical">
  <!--STEP-->
  <div class="e-stepper__step e-stepper__step--done">
    <div class="e-stepper__step-line"></div>
    <div class="e-stepper__step-header">
      <div class="e-stepper__step-number">1</div>
      <div class="e-stepper__step-title">Create payment</div>
    </div>
  </div>

  <!--STEP-->
  <div class="e-stepper__step e-stepper__step--error">
    <div class="e-stepper__step-line"></div>
    <div class="e-stepper__step-header">
      <div class="e-stepper__step-number">2</div>
      <div class="e-stepper__step-title">Card</div>
    </div>
  </div>

  <!--STEP-->
  <div class="e-stepper__step e-stepper__step--active">
    <div class="e-stepper__step-line"></div>
    <div class="e-stepper__step-header">
      <div class="e-stepper__step-number">3</div>
      <div class="e-stepper__step-title">Contact</div>
    </div>

    <!--CONTENT - ONLY ONE VISIBLE AT THE TIME-->
    <div class="e-stepper__content">
      <div class="e-form-field e-mb-24">
        <label class="e-form-field__label" for="normal">Email</label>
        <div class="e-input">
          <input id="normal" type="text" placeholder="ole.norman@gmail.com" />
        </div>
      </div>
      <div class="e-form-field e-form-field--combined">
        <label class="e-form-field__label" for="phone">Phone</label>
        <div class="e-form-field__input">
          <div id="phone" class="e-input e-input--small">
            <input type="text" value="+47" />
          </div>
          <div class="e-input e-mb-24">
            <input type="text" placeholder="Placeholder text" />
          </div>
        </div>
      </div>
      <div class="e-stepper__actions">
        <button class="e-btn e-btn--secondary">Back</button>
        <button class="e-btn e-btn--primary">Next</button>
      </div>
    </div>
  </div>

  <!--STEP-->
  <div class="e-stepper__step">
    <!--<div class="e-stepper__step-line"></div>-->
    <div class="e-stepper__step-header">
      <div class="e-stepper__step-number">4</div>
      <div class="e-stepper__step-title">Send</div>
    </div>
  </div>
</div>
`;

  exampleVerticalForcedHTML = `<div class="e-stepper e-stepper--vertical e-stepper--forced">
  <!--STEP-->
  <div class="e-stepper__step e-stepper__step--done">
    <div class="e-stepper__step-line"></div>
    <div class="e-stepper__step-header">
      <div class="e-stepper__step-number">1</div>
      <div class="e-stepper__step-title">Create payment</div>
    </div>
  </div>

  <!--STEP-->
  <div class="e-stepper__step e-stepper__step--active">
    <div class="e-stepper__step-line"></div>
    <div class="e-stepper__step-header">
      <div class="e-stepper__step-number">2</div>
      <div class="e-stepper__step-title">Contact</div>
    </div>

    <!--CONTENT-->
    <div class="e-stepper__content" *ngIf="step.number == forcedChosenNum">
      <div class="e-form-field e-mb-24">
        <label class="e-form-field__label" for="normal">Email</label>
        <div class="e-input">
          <input id="normal" type="text" placeholder="ole.norman@gmail.com" />
        </div>
      </div>
      <div class="e-form-field e-form-field--combined">
        <label class="e-form-field__label" for="phone">Phone</label>
        <div class="e-form-field__input">
          <div id="phone" class="e-input e-input--small">
            <input type="text" value="+47" />
          </div>
          <div class="e-input e-mb-24">
            <input type="text" placeholder="Placeholder text" />
          </div>
        </div>
      </div>
      <div class="e-stepper__actions">
        <button class="e-btn e-btn--secondary">Back</button>
        <button class="e-btn e-btn--primary">Next</button>
      </div>
    </div>
  </div>

  <!--STEP-->
  <div class="e-stepper__step">
    <!--<div class="e-stepper__step-line"></div>-->
    <div class="e-stepper__step-header">
      <div class="e-stepper__step-number">3</div>
      <div class="e-stepper__step-title">Card</div>
    </div>
  </div>

  <!--STEP-->
  <div class="e-stepper__step">
    <div class="e-stepper__step-line"></div>
    <div class="e-stepper__step-header">
      <div class="e-stepper__step-number">4</div>
      <div class="e-stepper__step-title">Send</div>
    </div>
  </div>
</div>
`;

  exampleVerticalHTML = `<div class="e-stepper e-stepper--vertical">
  <!--STEP-->
  <div class="e-stepper__step e-stepper__step--done">
    <div class="e-stepper__step-line"></div>
    <div class="e-stepper__step-header">
      <div class="e-stepper__step-number">1</div>
      <div class="e-stepper__step-title">Create payment</div>
    </div>
  </div>

  <!--DASHED LINES-->
  <div class="e-stepper__step-lines">
    <div class="e-stepper__step-line"></div>
    <div class="e-stepper__step-line"></div>
    <div class="e-stepper__step-line"></div>
  </div>

  <!--STEP-->
  <div class="e-stepper__step e-stepper__step--error">
    <!--<div class="e-stepper__step-line"></div>-->
    <div class="e-stepper__step-header">
      <div class="e-stepper__step-number">3</div>
      <div class="e-stepper__step-title">Card</div>
    </div>
  </div>

  <!--STEP-->
  <div class="e-stepper__step e-stepper__step--active">
    <div class="e-stepper__step-line"></div>
    <div class="e-stepper__step-header">
      <div class="e-stepper__step-number">4</div>
      <div class="e-stepper__step-title">Contact</div>
    </div>

    <!--CONTENT-->
    <div class="e-stepper__content" *ngIf="step.number == forcedChosenNum">
      <div class="e-form-field e-mb-24">
        <label class="e-form-field__label" for="normal">Email</label>
        <div class="e-input">
          <input id="normal" type="text" placeholder="ole.norman@gmail.com" />
        </div>
      </div>
      <div class="e-form-field e-form-field--combined">
        <label class="e-form-field__label" for="phone">Phone</label>
        <div class="e-form-field__input">
          <div id="phone" class="e-input e-input--small">
            <input type="text" value="+47" />
          </div>
          <div class="e-input e-mb-24">
            <input type="text" placeholder="Placeholder text" />
          </div>
        </div>
      </div>
      <div class="e-stepper__actions">
        <button class="e-btn e-btn--secondary">Back</button>
        <button class="e-btn e-btn--primary">Next</button>
      </div>
    </div>
  </div>

  <!--STEP-->
  <div class="e-stepper__step">
    <!--<div class="e-stepper__step-line"></div>-->
    <div class="e-stepper__step-header">
      <div class="e-stepper__step-number">5</div>
      <div class="e-stepper__step-title">More</div>
    </div>
  </div>

  <!--DASHED LINES-->
  <div class="e-stepper__step-lines" *ngIf="linesBottom()">
    <div class="e-stepper__step-line"></div>
    <div class="e-stepper__step-line"></div>
    <div class="e-stepper__step-line"></div>
  </div>

  <!--STEP-->
  <div class="e-stepper__step">
    <!--<div class="e-stepper__step-line"></div>-->
    <div class="e-stepper__step-header">
      <div class="e-stepper__step-number">7</div>
      <div class="e-stepper__step-title">Send</div>
    </div>
  </div>
</div>
`;

  shortSteps: Step[] = [
    { number: 1, title: 'Create payment', status: 'done' },
    { number: 2, title: 'Card', status: 'error' },
    { number: 3, title: 'Contact', status: 'active' },
    { number: 4, title: 'Send', status: 'none' },
  ];
  forcedSteps: Step[] = [
    { number: 1, title: 'Create payment', status: 'done' },
    { number: 2, title: 'Card', status: 'done' },
    { number: 3, title: 'Contact', status: 'active' },
    { number: 4, title: 'Send', status: 'none' },
  ];
  steps: Step[] = [
    { number: 1, title: 'Create payment', status: 'done' },
    { number: 2, title: 'Card', status: 'error' },
    { number: 3, title: 'Contact', status: 'active' },
    { number: 4, title: 'More', status: 'none' },
    { number: 5, title: 'More', status: 'none' },
    { number: 6, title: 'More', status: 'none' },
    { number: 7, title: 'Send', status: 'none' },
  ];
  shortChosenNum: number;
  chosenNum: number;
  forcedChosenNum: number;
  shortActiveTitle = '';
  forcedActiveTitle = '';
  activeTitle = '';
  firstSteps: Step[] = [];
  centerSteps: Step[] = [];
  lastSteps: Step[] = [];

  // tslint:disable-next-line: max-line-length
  does = [
    'Use a stepper in a process that’s split up in clear steps, where the user could benefit from a overview and/or navigation between the steps',
  ];
  donts = [
    'If the process consists of less than three steps',
    'If the process consists of more than ten steps (in this case, consider the possibility of using less steps by changing the flow)',
    'If it is not a step-by-step process, for example a list',
  ];

  ngOnInit(): void {
    this.steps.forEach((element) => {
      if (element.status === 'active') {
        this.chosenNum = element.number;
        this.activeTitle = element.title;
      }
    });
    this.forcedSteps.forEach((element) => {
      if (element.status === 'active') {
        this.forcedChosenNum = element.number;
        this.forcedActiveTitle = element.title;
      }
    });
    this.shortSteps.forEach((element) => {
      if (element.status === 'active') {
        this.shortChosenNum = element.number;
        this.shortActiveTitle = element.title;
      }
    });
    this.getVisibleNumbers(this.chosenNum);
  }

  chooseShortStep(step: Step): void {
    this.shortSteps.forEach((s) => {
      if (this.shortChosenNum === s.number && s.status !== 'activeDone') {
        s.status = 'none';
      } else if (this.shortChosenNum === s.number && s.status === 'activeDone') {
        s.status = 'done';
      }
    });
    this.shortSteps.forEach((s) => {
      if (step.number === s.number && s.status !== 'done') {
        s.status = 'active';
        this.shortActiveTitle = s.title;
      } else if (step.number === s.number && s.status === 'done') {
        s.status = 'activeDone';
        this.shortActiveTitle = s.title;
      }
    });
    this.shortChosenNum = step.number;
  }

  chooseForcedStep(step: Step): void {
    if (step.number > 3) {
      return;
    }
    this.forcedSteps.forEach((s) => {
      if (this.forcedChosenNum === s.number && s.status !== 'activeDone') {
        s.status = 'none';
      } else if (this.forcedChosenNum === s.number && s.status === 'activeDone') {
        s.status = 'done';
      }
    });
    this.forcedSteps.forEach((s) => {
      if (step.number === s.number && s.status !== 'done') {
        s.status = 'active';
        this.forcedActiveTitle = s.title;
      } else if (step.number === s.number && s.status === 'done') {
        s.status = 'activeDone';
        this.forcedActiveTitle = s.title;
      }
    });
    this.forcedChosenNum = step.number;
  }

  // LONG STEPPERS
  chooseStep(step: Step): void {
    this.steps.forEach((s) => {
      if (this.chosenNum === s.number && s.status !== 'activeDone') {
        s.status = 'none';
      } else if (this.chosenNum === s.number && s.status === 'activeDone') {
        s.status = 'done';
      }
    });
    this.steps.forEach((s) => {
      if (step.number === s.number && s.status !== 'done') {
        s.status = 'active';
        this.activeTitle = s.title;
      } else if (step.number === s.number && s.status === 'done') {
        s.status = 'activeDone';
        this.activeTitle = s.title;
      }
    });
    this.chosenNum = step.number;
    this.getVisibleNumbers(this.chosenNum);
  }

  getVisibleNumbers(chosenNumber: number): void {
    this.firstSteps = [];
    this.lastSteps = [];
    this.centerSteps = [];

    if (chosenNumber < 4) {
      this.firstSteps = this.steps.slice(0, 4);
    } else {
      this.firstSteps = this.steps.slice(0, 1);
    }

    if (chosenNumber > this.steps.length - 3) {
      this.lastSteps = this.steps.slice(this.steps.length - 4, this.steps.length);
    } else {
      this.lastSteps = this.steps.slice(this.steps.length - 1, this.steps.length);
    }

    if (chosenNumber > 3 && chosenNumber < this.steps.length - 2) {
      this.centerSteps = this.steps.slice(
        this.steps[chosenNumber - 3].number,
        this.steps[chosenNumber].number,
      );
    }
  }

  linesBottom(): boolean {
    return this.chosenNum > 3 && this.chosenNum < this.steps.length - 2;
  }

  lastLine(step: Step): boolean {
    return this.chosenNum > this.steps.length - 3 && step.number > this.steps.length - 3;
  }

  newShortStep(chosenNumber: number): void {
    if (chosenNumber < 5 && chosenNumber > 0) {
      this.shortSteps.forEach((s) => {
        if (this.shortChosenNum === s.number && s.status !== 'activeDone') {
          s.status = 'none';
        } else if (this.shortChosenNum === s.number && s.status === 'activeDone') {
          s.status = 'done';
        }
      });
      this.shortSteps.forEach((s) => {
        if (chosenNumber === s.number && s.status !== 'done') {
          s.status = 'active';
          this.shortActiveTitle = s.title;
          this.shortChosenNum = s.number;
        } else if (chosenNumber === s.number && s.status === 'done') {
          s.status = 'activeDone';
          this.shortActiveTitle = s.title;
          this.shortChosenNum = s.number;
        }
      });
    }
  }

  newForcedStep(chosenNumber: number): void {
    if (chosenNumber > 3) {
      return;
    }
    if (chosenNumber < 5 && chosenNumber > 0) {
      this.forcedSteps.forEach((s) => {
        if (this.forcedChosenNum === s.number && s.status !== 'activeDone') {
          s.status = 'none';
        } else if (this.forcedChosenNum === s.number && s.status === 'activeDone') {
          s.status = 'done';
        }
      });
      this.forcedSteps.forEach((s) => {
        if (chosenNumber === s.number && s.status !== 'done') {
          s.status = 'active';
          this.forcedActiveTitle = s.title;
          this.forcedChosenNum = s.number;
        } else if (chosenNumber === s.number && s.status === 'done') {
          s.status = 'activeDone';
          this.forcedActiveTitle = s.title;
          this.forcedChosenNum = s.number;
        }
      });
    }
  }

  newStep(newNum: number): void {
    if (newNum < 8 && newNum > 0) {
      this.steps.forEach((s) => {
        if (this.chosenNum === s.number && s.status !== 'activeDone') {
          s.status = 'none';
        } else if (this.chosenNum === s.number && s.status === 'activeDone') {
          s.status = 'done';
        }
      });
      this.steps.forEach((s) => {
        if (newNum === s.number && s.status !== 'done') {
          s.status = 'active';
          this.activeTitle = s.title;
        } else if (newNum === s.number && s.status === 'done') {
          s.status = 'activeDone';
          this.activeTitle = s.title;
        }
      });
      this.chosenNum = newNum;
      this.getVisibleNumbers(this.chosenNum);
    }
  }
}
