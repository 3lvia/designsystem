import { NgModule, CUSTOM_ELEMENTS_SCHEMA, } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Pages } from './shared/pages.enum';
import { MainComponent } from './shell/main/main.component';
import { HomeComponent } from './shell/home/home.component';
import { ButtonDocComponent } from './doc-pages/components/button-doc/button-doc.component';
import { LabelDocComponent } from './doc-pages/components/label-doc/label-doc.component';
import { CardDocComponent } from './doc-pages/components/card-doc/card-doc.component';
import { LinkDocComponent } from './doc-pages/components/link-doc/link-doc.component';
import { TableDocComponent } from './doc-pages/components/table-doc/table-doc.component';
import { TagsDocComponent } from './doc-pages/components/tags-doc/tags-doc.component';
import { TooltipDocComponent } from './doc-pages/components/tooltip-doc/tooltip-doc.component';
import { ColorDocComponent } from './doc-pages/utilities/color-doc/color-doc.component';
import { IconDocComponent } from './doc-pages/utilities/icon-doc/icon-doc.component';
import { TypographyDocComponent } from './doc-pages/utilities/typography-doc/typography-doc.component';
import { CheckboxDocComponent } from './doc-pages/components/forms/checkbox-doc/checkbox-doc.component';
import { CheckboxToggleDocComponent } from './doc-pages/components/forms/checkbox-toggle-doc/checkbox-toggle-doc.component';
import { InputDocComponent } from './doc-pages/components/forms/input-doc/input-doc.component';
import { RadiobuttonDocComponent } from './doc-pages/components/forms/radiobutton-doc/radiobutton-doc.component';
import { SelectDocComponent } from './doc-pages/components/forms/select-doc/select-doc.component';
import { ShadowDocComponent } from './doc-pages/utilities/shadow-doc/shadow-doc.component';
import { NotificationDotDocComponent } from './doc-pages/components/notification-dot-doc/notification-dot-doc.component';
import { AccessibilityDocComponent } from './doc-pages/accessibility/accessibility-doc/accessibility-doc.component';
import { AltTextComponent } from './doc-pages/accessibility/alt-text/alt-text.component';
import { UuToolsComponent } from './doc-pages/accessibility/uu-tools/uu-tools.component';
import { SpacingDocComponent } from './doc-pages/utilities/spacing-doc/spacing-doc.component';
import { BorderDocComponent } from './doc-pages/utilities/border-doc/border-doc.component';
import { OverviewAccessibilityComponent } from './doc-pages/accessibility/overview-accessibility/overview-accessibility.component';
import { OverviewUtilComponent } from './doc-pages/utilities/overview-util/overview-util.component';
import { OverviewComponent } from './doc-pages/components/overview-comp/overview-comp.component';
import { NewProjectComponent } from './doc-pages/utilities/new-project/new-project.component';
import { TemplatesComponent } from './doc-pages/utilities/templates/templates.component';
import { AccessibilityStartComponent } from './doc-pages/accessibility/accessibility-start/accessibility-start.component';
import { ComponentsStartComponent } from './doc-pages/components/components-start/components-start.component';
import { UtilitiesStartComponent } from './doc-pages/utilities/utilities-start/utilities-start.component';
import { ListDocComponent } from './doc-pages/components/list-doc/list-doc.component';
import { BreakpointsDocComponent } from './doc-pages/utilities/breakpoints-doc/breakpoints-doc.component';
import { LogoDocComponent } from './doc-pages/utilities/logo-doc/logo-doc.component';
import { GridDocComponent } from './doc-pages/utilities/grid-doc/grid-doc.component';
import { SegmentedControlsDocComponent } from './doc-pages/components/forms/segmented-controls-doc/segmented-controls-doc.component';
import { FileUploadDocComponent } from './doc-pages/components/file-upload-doc/file-upload-doc.component';
import { ProgressbarDocComponent } from './doc-pages/components/progressbar-doc/progressbar-doc.component';
import { DraganddropDocComponent } from './doc-pages/components/forms/draganddrop-doc/draganddrop-doc.component';
import { AlignmentDocComponent } from './doc-pages/utilities/alignment-doc/alignment-doc/alignment-doc.component';
import { PopoverDocComponent } from './doc-pages/components/popover-doc/popover-doc.component';
import { ModalDocComponent } from './doc-pages/components/modal-doc/modal-doc.component';
import { AutocompleteDocComponent } from './doc-pages/components/autocomplete-doc/autocomplete-doc.component';
import { ContributeComponent } from './doc-pages/utilities/contribute/contribute.component';
import { DatetimePickerDocComponent } from './doc-pages/components/forms/datetime-picker-doc/datetime-picker-doc.component';
import { PositionPickerDocComponent } from './doc-pages/components/position-picker-doc/position-picker-doc.component';


const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: Pages.Home,
        component: HomeComponent
      },
      // Accessibility section
      { path: Pages.AccessibilityStart,
        component: AccessibilityStartComponent,
        children: [
          {
            path: '',
            component: OverviewAccessibilityComponent
          },
          {
            path: Pages.OverviewAccess,
            component: OverviewAccessibilityComponent
          },
          {
            path: Pages.Accessibility,
            component: AccessibilityDocComponent
          },
          {
            path: Pages.AltText,
            component: AltTextComponent
          },
          {
            path: Pages.UUTools,
            component: UuToolsComponent
          },
        ]
      },
      // Components section
      {
        path: Pages.ComponentsStart,
        component: ComponentsStartComponent,
        children: [
          {
            path: '',
            component: OverviewComponent
          },
          {
            path: Pages.OverviewComp,
            component: OverviewComponent
          },
          {
            path: Pages.Autocomplete,
            component: AutocompleteDocComponent
          },
          {
            path: Pages.Button,
            component: ButtonDocComponent
          },
          {
            path: Pages.Card,
            component: CardDocComponent
          },
          {
            path: Pages.Checkbox,
            component: CheckboxDocComponent
          },
          {
            path: Pages.CheckboxToggle,
            component: CheckboxToggleDocComponent
          },
          {
            path: Pages.DateTimePicker,
            component: DatetimePickerDocComponent
          },
          {
            path: Pages.DragAndDrop,
            component: DraganddropDocComponent
          },
          {
            path: Pages.FileUpload,
            component: FileUploadDocComponent
          },
          {
            path: Pages.Input,
            component: InputDocComponent
          },
          {
            path: Pages.Label,
            component: LabelDocComponent
          },
          {
            path: Pages.Link,
            component: LinkDocComponent
          },
          {
            path: Pages.List,
            component: ListDocComponent
          },
          {
            path: Pages.Modal,
            component: ModalDocComponent
          },
          {
            path: Pages.Notification,
            component: NotificationDotDocComponent
          },
          {
            path: Pages.Progressbar,
            component: ProgressbarDocComponent
          },
          {
            path: Pages.Popover,
            component: PopoverDocComponent
          },
          {
            path: Pages.PositionPicker,
            component: PositionPickerDocComponent
          },
          {
            path: Pages.Radiobutton,
            component: RadiobuttonDocComponent
          },
          {
            path: Pages.SegmentedControl,
            component: SegmentedControlsDocComponent
          },
          {
            path: Pages.Select,
            component: SelectDocComponent
          },
          {
            path: Pages.Table,
            component: TableDocComponent
          },
          {
            path: Pages.Tags,
            component: TagsDocComponent
          },
          {
            path: Pages.Tooltip,
            component: TooltipDocComponent
          },
        ]
      },
      // Utilities section
      {
        path: Pages.UtilitiesStart,
        component: UtilitiesStartComponent,
        children: [
          {
            path: '',
            component: OverviewUtilComponent
          },
          {
            path: Pages.OverviewComp,
            component: OverviewUtilComponent
          },
          {
            path: Pages.Border,
            component: BorderDocComponent
          },
          {
            path: Pages.Contribute,
            component: ContributeComponent
          },
          {
            path: Pages.Color,
            component: ColorDocComponent
          },
          {
            path: Pages.Icon,
            component: IconDocComponent
          },
          {
            path: Pages.NewProject,
            component: NewProjectComponent
          },
          {
            path: Pages.Template,
            component: TemplatesComponent
          },
          {
            path: Pages.Typography,
            component: TypographyDocComponent
          },
          {
            path: Pages.Shadow,
            component: ShadowDocComponent
          },
          {
            path: Pages.Spacing,
            component: SpacingDocComponent
          },
          {
            path: Pages.Breakpoints,
            component: BreakpointsDocComponent
          },
          {
            path: Pages.Grid,
            component: GridDocComponent
          },
          {
            path: Pages.Logo,
            component: LogoDocComponent
          },
          {
            path: Pages.Alignment,
            component: AlignmentDocComponent
          },
        ]
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class AppRoutingModule { }
