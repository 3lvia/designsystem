import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/e-items';

@Component({
  selector: 'app-content-loader-doc',
  templateUrl: './content-loader-doc.component.html',
  styleUrls: ['./content-loader-doc.component.scss'],
})
export class ContentLoaderDocComponent {
  figmaUrl = getComponent('content-loader-doc').figmaUrl;
  description = getComponent('content-loader-doc').description;

  exampleContentLoader = `<div class="e-content-loader"></div>
`;
  exampleContentLoaderCircle = `<div class="e-content-loader e-content-loader--circle"></div>`;
  exampleContentLoaderText = `
  <div class="e-content-loader e-content-loader--text e-mt-24"></div>
  <div class="e-content-loader e-content-loader--text e-mt-24"></div>
  <div class="e-content-loader e-content-loader--text e-mt-24"></div>
  <div class="e-content-loader e-content-loader--text e-content-loader--short e-mt-24"></div>
`;
  exampleContentLoaderExample = `<div class="e-grid">
  <!-- SMALL CIRCLES -->
  <div class="row e-grid-gutters-int e-grid-gutters-vertical">
    <div class="col-sm-6 col-md-3">
      <div class="e-content-loader e-content-loader--circle" style="width:70px; height:70px; margin: auto;"></div>
    </div>
    <div class="col-sm-6 col-md-3">
      <div class="e-content-loader e-content-loader--circle" style="width:70px; height:70px; margin: auto;"></div>
    </div>
    <div class="col-sm-6 col-md-3">
      <div class="e-content-loader e-content-loader--circle" style="width:70px; height:70px; margin: auto;"></div>
    </div>
    <div class="col-sm-6 col-md-3">
      <div class="e-content-loader e-content-loader--circle" style="width:70px; height:70px; margin: auto;"></div>
    </div>
  </div>

  <!-- BIG BOX + TEXT -->
  <div class="e-mt-56 row e-grid-gutters-int e-grid-gutters-vertical">
    <div class="col-md-12 col-lg-6">
      <div class="e-content-loader e-w-75" style="height:220px; margin:auto;"></div>
    </div>
    <div class="col-md-12 col-lg-6">
      <div class="e-content-loader e-content-loader--text e-mt-24"></div>
      <div class="e-content-loader e-content-loader--text e-mt-24"></div>
      <div class="e-content-loader e-content-loader--text e-mt-24"></div>
      <div class="e-content-loader e-content-loader--text e-content-loader--short e-mt-24"></div>
    </div>
  </div>

  <!-- CIRCLES WITH TEXT -->
  <div class="e-mt-56 row e-grid-gutters-int e-grid-gutters-vertical">
    <div class="col-md-12 col-lg-6">
      <div class="e-content-loader e-content-loader--circle" style="width:150px; height:150px; margin:auto;"></div>
      <div class="e-content-loader e-content-loader--text e-mt-24 e-content-loader--short" style="display: flex; justify-content: center;"></div>
      <div class="e-content-loader e-content-loader--text e-mt-24" style="display: flex; justify-content: center;"></div>
      <div class="e-content-loader e-content-loader--text e-mt-24" style="display: flex; justify-content: center;"></div>
      <div class="e-content-loader e-content-loader--text e-mt-24 e-content-loader--short" style="display: flex; justify-content: center;"></div>
    </div>
    <div class="col-md-12 col-lg-6">
      <div class="e-content-loader e-content-loader--circle" style="width:150px; height:150px; margin:auto;"></div>
      <div class="e-content-loader e-content-loader--text e-mt-24 e-content-loader--short" style="display: flex; justify-content: center;"></div>
      <div class="e-content-loader e-content-loader--text e-mt-24" style="display: flex; justify-content: center;"></div>
      <div class="e-content-loader e-content-loader--text e-mt-24" style="display: flex; justify-content: center;"></div>
      <div class="e-content-loader e-content-loader--text e-mt-24 e-content-loader--short" style="display: flex; justify-content: center;"></div>
    </div>
  </div>
</div>
`;
}
