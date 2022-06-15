import { Component } from '@angular/core';
import { getDocPagesNotFromCMS } from 'src/app/shared/doc-pages';
import { spacingItems } from './spacing';

@Component({
  selector: 'app-layout-doc',
  templateUrl: './layout-doc.component.html',
  styleUrls: ['./layout-doc.component.scss'],
})
export class LayoutDocComponent {
  figmaUrl = getDocPagesNotFromCMS('layout').figmaUrl;
  description = getDocPagesNotFromCMS('layout').description;
  spacingItems = spacingItems;

  doCodeCSS = `padding: var(--e-spacing-16);
  margin: var(--e-spacing-48);`;
  dontCodeCSS = `padding: var(--e-p-16);
  margin:  var(--e-m-48);`;

  example9 = `<div class="e-title-caps e-mt-16 e-mb-8">External example</div>
  <div class="e-grid e-bg-grey-20">
    <div class="row e-grid-margin-ext e-grid-gutters-ext e-grid-gutters-vertical">
      <div class="col-4">
        <div class="e-bg-grey-70 e-p-16" style="border: 1px solid black;">
          4/12
        </div>
      </div>
      <div class="col-8">
        <div class="e-bg-grey-70 e-p-16" style="border: 1px solid black;">
          8/12
        </div>
      </div>
      <div class="col-6">
        <div class="e-bg-grey-70 e-p-16" style="border: 1px solid black;">
          6/12
        </div>
      </div>
      <div class="col-6">
        <div class="e-bg-grey-70 e-p-16" style="border: 1px solid black;">
          6/12
        </div>
      </div>
    </div>
  </div>
  <div class="e-title-caps e-mt-16 e-mb-8">Internal example</div>
  <div class="e-grid e-bg-grey-20">
    <div class="row e-grid-margin-int e-grid-gutters-int e-grid-gutters-vertical">
      <div class="col-4">
        <div class="e-bg-grey-70 e-p-16" style="border: 1px solid black;">
          4/12
        </div>
      </div>
      <div class="col-8">
        <div class="e-bg-grey-70 e-p-16" style="border: 1px solid black;">
          8/12
        </div>
      </div>
      <div class="col-6">
        <div class="e-bg-grey-70 e-p-16" style="border: 1px solid black;">
          6/12
        </div>
      </div>
      <div class="col-6">
        <div class="e-bg-grey-70 e-p-16" style="border: 1px solid black;">
          6/12
        </div>
      </div>
    </div>
  </div>
  `;

  exampleGutterExternal = `<div style="margin-left:24px;margin-right:24px">
  <div class="e-title-caps e-mt-16 e-mb-8">Without vertical gutters</div>
    <div class="e-grid e-bg-grey-20">
      <div class="row e-grid-gutters-ext">
        <div class="col">
          <div class="e-bg-grey-70 e-p-16" style="border: 1px solid black;">
            4/12
          </div>
        </div>
        <div class="col">
          <div class="e-bg-grey-70 e-p-16" style="border: 1px solid black;">
            4/12
          </div>
        </div>
        <div class="col">
          <div class="e-bg-grey-70 e-p-16" style="border: 1px solid black;">
            4/12
          </div>
        </div>
      </div>
    </div>

    <div class="e-title-caps e-mt-16 e-mb-8">With vertical gutters</div>
    <div class="e-grid e-bg-grey-20">
      <div class="row e-grid-gutters-ext e-grid-gutters-vertical">
        <div class="col">
          <div class="e-bg-grey-70 e-p-16" style="border: 1px solid black;">
            4/12
          </div>
        </div>
        <div class="col">
          <div class="e-bg-grey-70 e-p-16" style="border: 1px solid black;">
            4/12
          </div>
        </div>
        <div class="col">
          <div class="e-bg-grey-70 e-p-16" style="border: 1px solid black;">
            4/12
          </div>
        </div>
      </div>
    </div>
  </div>
`;

  exampleGutterInternal = `<div style="margin-left:24px;margin-right:24px">
  <div class="e-title-caps e-mt-16 e-mb-8">Without vertical gutters</div>
    <div class="e-grid e-bg-grey-20">
      <div class="row e-grid-gutters-int">
        <div class="col">
          <div class="e-bg-grey-70 e-p-16" style="border: 1px solid black;">
            4/12
          </div>
        </div>
        <div class="col">
          <div class="e-bg-grey-70 e-p-16" style="border: 1px solid black;">
            4/12
          </div>
        </div>
        <div class="col">
          <div class="e-bg-grey-70 e-p-16" style="border: 1px solid black;">
            4/12
          </div>
        </div>
      </div>
    </div>

    <div class="e-title-caps e-mt-16 e-mb-8">With vertical gutters</div>
    <div class="e-grid e-bg-grey-20">
      <div class="row e-grid-gutters-int e-grid-gutters-vertical">
        <div class="col">
          <div class="e-bg-grey-70 e-p-16" style="border: 1px solid black;">
            4/12
          </div>
        </div>
        <div class="col">
          <div class="e-bg-grey-70 e-p-16" style="border: 1px solid black;">
            4/12
          </div>
        </div>
        <div class="col">
          <div class="e-bg-grey-70 e-p-16" style="border: 1px solid black;">
            4/12
          </div>
        </div>
      </div>
    </div>
  </div>
  `;

  exampleExternalMargin = `<div class="e-grid e-bg-grey-20">
  <div class="row e-grid-margin-ext">
    <div class="col">
      <div class="e-bg-grey-70 e-p-16" style="border: 1px solid black;">
        4/12
      </div>
    </div>
    <div class="col">
      <div class="e-bg-grey-70 e-p-16" style="border: 1px solid black;">
        4/12
      </div>
    </div>
    <div class="col">
      <div class="e-bg-grey-70 e-p-16" style="border: 1px solid black;">
        4/12
      </div>
    </div>
  </div>
</div>
`;

  exampleInternalMargin = ` <div class="e-grid e-bg-grey-20">
  <div class="row e-grid-margin-int">
    <div class="col">
      <div class="e-bg-grey-70 e-p-16" style="border: 1px solid black;">
        4/12
      </div>
    </div>
    <div class="col">
      <div class="e-bg-grey-70 e-p-16" style="border: 1px solid black;">
        4/12
      </div>
    </div>
    <div class="col">
      <div class="e-bg-grey-70 e-p-16" style="border: 1px solid black;">
        4/12
      </div>
    </div>
  </div>
</div>
  `;

  example3 = `<div style="margin-left:24px;margin-right:24px">
  <div class="e-grid e-bg-grey-20">
    <div class="row mx-lg-n3 mx-md-n2 mx-sm-n1 mx-n1">
      <div class="col px-lg-3 px-md-2 px-sm-1 px-1">
        <div class="e-bg-grey-70 e-p-16" style="border: 1px solid black;">
          4/12
        </div>
      </div>
      <div class="col px-lg-3 px-md-2 px-sm-1 px-1">
        <div class="e-bg-grey-70 e-p-16" style="border: 1px solid black;">
          4/12
        </div>
      </div>
      <div class="col px-lg-3 px-md-2 px-sm-1 px-1">
        <div class="e-bg-grey-70 e-p-16" style="border: 1px solid black;">
          4/12
        </div>
      </div>
    </div>
  </div>
</div>
  `;

  example4 = `<div class="e-grid e-bg-grey-20">
  <div class="row no-gutters">
    <div class="col">
      <div class="e-bg-grey-70 e-p-16" style="border: 1px solid black;">
        3/12
      </div>
    </div>
    <div class="col">
      <div class="e-bg-grey-70 e-p-16" style="border: 1px solid black;">
        3/12
      </div>
    </div>
    <div class="col">
      <div class="e-bg-grey-70 e-p-16" style="border: 1px solid black;">
        3/12
      </div>
    </div>
    <div class="col">
      <div class="e-bg-grey-70 e-p-16" style="border: 1px solid black;">
        3/12
      </div>
    </div>
  </div>
</div>
`;

  example5 = `<div style="margin-left:24px;margin-right:24px">
  <div class="e-grid e-bg-grey-20">
    <div class="row">
      <div class="col-sm-7 col-md-6 col-lg-8">
        <div class="e-bg-grey-70 e-p-16" style="border: 1px solid black;">
          <div>LG: 8/12</div>
          <div>MD: 6/12</div>
          <div>SM: 7/12</div>
        </div>
      </div>
      <div class="col-sm-5 col-md-6 col-lg-4">
        <div class="e-bg-grey-70 e-p-16" style="border: 1px solid black;">
          <div>LG: 4/12</div>
          <div>MD: 6/12</div>
          <div>SM: 5/12</div>
        </div>
      </div>
    </div>
  </div>
</div>
`;

  example6 = `<div style="margin-left:24px;margin-right:24px">
  <div class="e-grid e-bg-grey-20">
    <div class="row justify-content-center">
      <div class="col-5">
        <div class="e-bg-grey-70 e-p-16" style="border: 1px solid black;">
          5/12
        </div>
      </div>
      <div class="col-5">
        <div class="e-bg-grey-70 e-p-16" style="border: 1px solid black;">
          5/12
        </div>
      </div>
    </div>
    <div class="row align-items-end" style="height: 100px;">
      <div class="col-5">
        <div class="e-bg-grey-70 e-p-16" style="border: 1px solid black;">
          5/12
        </div>
      </div>
      <div class="col-5">
        <div class="e-bg-grey-70 e-p-16" style="border: 1px solid black;">
          5/12
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-5">
        <div class="e-bg-grey-70 e-p-16" style="border: 1px solid black;">
          5/12
        </div>
      </div>
      <div class="col-5 offset-3">
        <div class="e-bg-grey-70 e-p-16" style="border: 1px solid black;">
          5/12
        </div>
      </div>
    </div>
  </div>
</div>
`;

  example7 = `<div style="margin-left:24px;margin-right:24px">
  <div class="e-grid e-bg-grey-20">
    <div class="row">
      <div class="col">
        <div class="e-bg-grey-70 e-p-16" style="border: 1px solid black;">
          First in DOM, no order applied
        </div>
      </div>
      <div class="col order-12">
        <div class="e-bg-grey-70 e-p-16" style="border: 1px solid black;">
          Second in DOM, with a larger order
        </div>
      </div>
      <div class="col order-1">
        <div class="e-bg-grey-70 e-p-16" style="border: 1px solid black;">
          Third in DOM, with an order of 1
        </div>
      </div>
    </div>
  </div>
</div>
`;

  example8 = `<div style="margin-left:24px;margin-right:24px">
  <div class="e-grid e-bg-grey-20">
    <div class="row mx-lg-n3 mx-n1">
      <div class="col-6 px-lg-3 px-1">
        <div class="e-bg-grey-70 e-p-16" style="border: 1px solid black;">
          <div>
            Level 1
          </div>
          <div class="row">
            <div class="col-lg-6 col-12">
              <div class="e-bg-grey-70 e-p-16" style="border: 1px solid black;">
                Level 2
              </div>
            </div>
            <div class="col-lg-6 col-12">
              <div class="e-bg-grey-70 e-p-16" style="border: 1px solid black;">
                Level 2
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-6 px-lg-3 px-1">
        <div class="e-bg-grey-70 e-p-16" style="border: 1px solid black;">
          <div>
            Level 1
          </div>
          <div class="row">
            <div class="col-lg-6 col-12">
              <div class="e-bg-grey-70 e-p-16" style="border: 1px solid black;">
                Level 2
              </div>
            </div>
            <div class="col-lg-6 col-12">
              <div class="e-bg-grey-70 e-p-16" style="border: 1px solid black;">
                Level 2
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
`;

  egSelectedValue = 0;
  igSelectedValue = 0;

  toggleAccordion(id: string): void {
    const element = document.getElementById(id) as HTMLElement;
    if (element) {
      if (element.classList.contains('e-accordion__item--open')) {
        element.classList.remove('e-accordion__item--open');
      } else {
        element.classList.add('e-accordion__item--open');
      }
    }
  }
}
