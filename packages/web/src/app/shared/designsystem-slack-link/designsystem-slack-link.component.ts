import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-designsystem-slack-link',
  template: `<a
    class="e-link e-link--inline e-link--new-tab"
    target="_blank"
    rel="noopener"
    href="https://elvia-group.slack.com/archives/C01C1DU9X1Q"
  >
    <span class="e-link__title">#designsystemet</span>
    <span class="e-link__icon">
      <e-icon name="newTabBold" />
    </span>
  </a>`,
  styles: `
    :host {
      display: contents;
    }
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DesignsystemSlackLinkComponent {}
