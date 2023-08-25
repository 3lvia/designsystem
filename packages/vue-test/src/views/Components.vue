<template>
  <div class="components-examples">
    <elvia-toast />
    <div class="example-wrapper">
      <!--Test the component here (delete what was here previously). When done add it to the list alphabetically-->
      <h3>Test your component here</h3>
      <!--Normal version-->
      <div></div>
      <!--Inverted version-->
      <div class="e-bg-grey"></div>
    </div>

    <!--Accordion-->
    <div class="example-wrapper">
      <h3>Accordion</h3>
      <button class="e-btn" @click="openAccordion = !openAccordion">toggle</button>
      {{ openAccordion }}
      <elvia-accordion
        openLabel="Show"
        closeLabel="Hide"
        size="medium"
        type="overflow"
        :isOpen="openAccordion"
        :overflowHeight="10"
      >
        <div slot="content">
          Webcomponentent content for the Accordion componenWebcomponentent content for the Accordion
          componenWebcomponentent content for the Accordion componenWebcomponentent content for the Accordion
          componenWebcomponentent content for the Accordion componenWebcomponentent content for the Accordion
          componenWebcomponentent content for the Accordion componenWebcomponentent content for the Accordion
          component
        </div>
      </elvia-accordion>
    </div>

    <!--Box-->
    <div class="example-wrapper">
      <h3>Box</h3>
      <elvia-box :isColored="true">
        <div slot="title"><h1>Title for the box component</h1></div>
        <div slot="content">Webcomponentent content for the Box component</div>
      </elvia-box>
    </div>

    <!--Breadcrumb-->
    <div class="example-wrapper">
      <h3>Breadcrumb</h3>
      <elvia-breadcrumb :items="breadcrumbsTestNoUrl"></elvia-breadcrumb>
    </div>

    <!--Card-->
    <div class="example-wrapper">
      <h3>Card</h3>
      <elvia-card :heading="'Heading'" :description="'Hover me!'">
        <div slot="icon">91</div>
        <div slot="iconHover">92</div>
        <i slot="cornerIcon" class="e-icon e-icon--lock e-icon--xs" aria-hidden="true"></i>
      </elvia-card>
    </div>

    <!--Carousel-->
    <div class="example-wrapper">
      <h3>Carousel</h3>
      <elvia-carousel :hasAnimation="false" :value="carouselValue">
        <div slot="title-1">
          <h4 class="e-title-sm">HAN-port</h4>
        </div>
        <div slot="item-1">hello</div>
        <div slot="title-2">
          <h4 class="e-title-sm">AMS-meter</h4>
        </div>
        <div slot="item-2">halla</div>
        <div slot="title-3">
          <h4 class="e-title-sm">YOYOYO</h4>
        </div>
        <div slot="item-3">hei</div>
      </elvia-carousel>
      <button @click="carouselValue = incrementCarouselStep()" class="e-btn e-btn--sm">Increment step</button>
    </div>

    <!--Chip-->
    <div class="example-wrapper">
      <h3>Chip</h3>
      <div v-for="chip in deletableChipsList" :key="chip.value">
        <elvia-chip
          :type="'legend'"
          :value="chip.value"
          :color="chip.color"
          :ariaLabel="'Fjern filtrering for ' + chip.value"
          :isDisabled="chip.isDisabled"
          :isSelected="true"
          @is-selected-on-change="logValue('chip', $event.detail.value)"
        ></elvia-chip>
      </div>
    </div>

    <!-- Context menu -->
    <div class="example-wrapper">
      <h3>Context menu</h3>
      <elvia-context-menu @onOpen="isContextMenuShowing = true" @onClose="isContextMenuShowing = false">
        <button
          slot="trigger"
          class="e-btn e-btn--icon e-mr-8"
          :class="{ 'e-btn---selected': isContextMenuShowing }"
          aria-label="More menu"
          aria-haspopup="menu"
        >
          <span class="e-btn__icon">
            <i class="e-icon e-icon--more_menu e-icon--inverted" aria-hidden="true"></i>
            <i class="e-icon e-icon--more_menu" aria-hidden="true"></i>
          </span>
        </button>

        <div slot="content">
          <div class="ewc-context-menu__list-group">
            <button role="menuitem">
              <span>Be om tilgang</span>
            </button>
            <button role="menuitem">
              <span>Legg til bruker</span>
            </button>
          </div>
          <div class="ewc-context-menu__list-group">
            <a role="menuitem">
              <span>Endre passord</span>
            </a>
          </div>
        </div>
      </elvia-context-menu>
    </div>

    <!--Datepicker-->
    <div class="example-wrapper">
      <h3>Datepicker</h3>
      <elvia-datepicker
        size="small"
        label="Fra dato"
        :disableDate="(day: Date) => day.getDay() === 0 || day.getDay() === 6"
      ></elvia-datepicker>
    </div>

    <!--Date range picker-->
    <div class="example-wrapper">
      <h3>Date range picker</h3>
      <elvia-datepicker-range
        @value-on-change="logValue('range', $event.detail.value)"
      ></elvia-datepicker-range>
    </div>

    <!--Divider-->
    <div class="example-wrapper">
      <h3>Divider</h3>
      <elvia-divider></elvia-divider>
      <elvia-divider :type="'heading'">
        <h2 slot="heading">Heading</h2>
      </elvia-divider>
    </div>

    <!--Dropdown-->
    <div class="example-wrapper">
      <h3>Dropdown</h3>
      <elvia-dropdown :value="dropdownDefaultOption" :items="dropdownOptions"></elvia-dropdown>
    </div>

    <!--Ikon-->
    <div class="example-wrapper">
      <h3>Icon</h3>
      <elvia-icon name="arrowLeftBold"></elvia-icon>
      <elvia-icon name="arrowRightBold"></elvia-icon>
    </div>

    <!--Modal-->
    <div class="example-wrapper">
      <h3>Modal</h3>
      <button class="e-btn" @click="isModalShowing = !isModalShowing">Hello</button>
      <elvia-modal
        :isShowing="isModalShowing"
        :heading="'Redigere bidragsytere'"
        :hasCloseButton="true"
        @on-close="isModalShowing = !isModalShowing"
      >
        <div slot="content">
          <div class="date-container">
            <elvia-datepicker size="small"></elvia-datepicker>
          </div>
        </div>
        <div slot="secondaryButton">
          <button class="e-btn e-btn--secondary e-btn--lg" @click="isModalShowing = false">Avbryt</button>
        </div>
        <div slot="primaryButton"><button class="e-btn e-btn--primary e-btn--lg">Lagre</button></div>
      </elvia-modal>
    </div>

    <!--Pagination-->
    <div class="example-wrapper">
      <h3>Pagination</h3>
      <elvia-pagination
        :numberOfElements="156"
        :value="defaultPaginationValue"
        :dropdownMenuPosition="'top'"
      ></elvia-pagination>
    </div>

    <!--Progress linear-->
    <div class="example-wrapper">
      <h3>Progress linear</h3>
      <elvia-progress-linear :value="50" :isIndeterminate="false" :isError="false"></elvia-progress-linear>
    </div>

    <!--Radio filter-->
    <div class="example-wrapper">
      <h3>Radio Filter</h3>
      <elvia-radio-filter
        :items="[
          { label: 'All', value: 'all' },
          { label: 'Read', value: 'read' },
          { label: 'Unread', value: 'unread' },
        ]"
        :value="'read'"
        :name="'readRadioFilters'"
        :ariaLabel="'{value} filtrering valgt'"
      ></elvia-radio-filter>
    </div>

    <!--Segmented Control-->
    <div class="example-wrapper">
      <h3>Segmented Control</h3>
      <elvia-segmented-control
        :items="[{ label: 'Weekly' }, { label: 'Monthly' }, { label: 'Yearly' }]"
        @value-on-change="logValue('Segmented', $event.detail.value)"
      ></elvia-segmented-control>
      <elvia-segmented-control
        :type="'icon'"
        :items="segmentedItems"
        @value-on-change="logValue('Segmented', $event.detail.value)"
      ></elvia-segmented-control>
    </div>

    <!--Spotlight-->
    <div class="example-wrapper">
      <h3>Spotlight</h3>
      <!-- <elvia-spotlight :position="{ horizontal: hPos, vertical: vPos }" :radius="radius"></elvia-spotlight> -->
      <button @click="moveSpotlight()" style="z-index: 2147483647; position: relative">Move spotlight</button>
    </div>

    <!--Tabs-->
    <div class="example-wrapper">
      <h3>Tabs</h3>
      <elvia-tabs :items="['Epler', 'Appelsin', 'Bananer', 'Druer', 'Kiwi']" :value="1"></elvia-tabs>
    </div>

    <!--Timepicker-->
    <div class="example-wrapper">
      <h3>Timepicker</h3>
      <elvia-timepicker @value-on-change="onTimepickerChange($event.detail.value)" label="Vue timepicker" />
    </div>

    <!--Toast-->
    <div class="example-wrapper">
      <h3>Toast</h3>
      <button class="e-btn" @click="showToast">Show toast</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { openElviaToast } from '@elvia/elvis-toast';
import { ref } from 'vue';

// Accordion
const openAccordion = ref(false);
// Breadcrumb
const breadcrumbsTest = [
  { href: 'https://elvia.no', text: 'Elvia.no' },
  { href: 'https://www.elvia.no/nettleie', text: 'Nettleie' },
  { href: 'https://www.elvia.no/nettleie/elvias-leveringsplikt', text: 'Elvias leveringsplikt' },
];

const breadcrumbsTestNoUrl = [{ text: 'Elvia.no' }, { text: 'Nettleie' }, { text: 'Elvias leveringsplikt' }];

const carouselValue = ref(0);

// Chips
const deletableChipsList = [
  { value: 2022, color: 'green', isDisabled: false },
  { value: 2023, color: 'red', isDisabled: false },
  { value: 2024, color: 'blue', isDisabled: true },
];

// Context menu
const isContextMenuShowing = ref(false);

// Dropdown
const dropdownDefaultOption = '675';
const dropdownOptions = [
  { value: '675', label: 'Mast - Råte' },
  { value: '676', label: 'Mast - Hakkespettskade' },
  { value: '677', label: 'Mast - Annen skade/ fremmedlegemer' },
  { value: '678', label: 'Mast - Stag' },
];

// Modal
const isModalShowing = false;

// Segmented control

const segmentedItems = [
  {
    icon: '<i class=" e-icon e-icon--access_control"> </i>',
    iconSelected: '<i class="e-icon e-icon--access_control-color"></i>',
    altLabel: 'Label',
  },
  {
    icon: '<i class="e-icon e-icon--list"></i>',
    iconSelected: '<i class="e-icon e-icon--list_color"></i>',
    altLabel: 'Label',
  },
];

// Spotlight
const vPos = ref(200);
const hPos = ref(200);
const radius = ref(100);

// Pagination
const defaultPaginationValue = { start: 1, end: 10 };

const logValue = (component: string, value: unknown): void => {
  console.log(component, ': ', value);
};

const moveSpotlight = () => {
  if (vPos.value === 200) {
    vPos.value = 500;
    hPos.value = 500;
    radius.value = 300;
  } else {
    vPos.value = 200;
    hPos.value = 200;
    radius.value = 100;
  }
};

const incrementCarouselStep = () => {
  carouselValue.value = (carouselValue.value + 1) % 3;
  return carouselValue.value;
};

const onTimepickerChange = (e: string) => {
  console.log(e);
};

const showToast = () => {
  openElviaToast({
    title: 'Vue test of toast',
    body: 'Short body',
    customIcon: '<i class="e-icon e-icon--crane"></i>',
  });
};
</script>
