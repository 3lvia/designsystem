<template>
  <div class="components-examples">
    <div class="example-wrapper">
      <!--Test the component here (delete what was here previously). When done add it to the list alphabetically-->
      <h3>Test your component here</h3>
      <!--Normal version-->
      <div>
        <!-- <elvia-segmented-control
          :items='[{name: "Weekly"}, {name: "Monthly"}, {name: "Yearly"}]'
          @value-on-change="logValue('Segmented', $event.detail.value)"
        ></elvia-segmented-control> -->
        <elvia-segmented-control
          :items="[{ name: 'Weekly' }, { name: 'Monthly' }, { name: 'Yearly' }]"
          @value-on-change="logValue('Segmented', $event.detail.value)"
        ></elvia-segmented-control>
      </div>
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
      <elvia-box :hasBorder="true" :isColored="true">
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
      <elvia-card :header="'Header'" :description="'Hover me!'">
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

    <!--Datepicker-->
    <div class="example-wrapper">
      <h3>Datepicker</h3>
      <elvia-datepicker
        :isCompact="false"
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
      <elvia-divider :isInverted="false" :type="'title'">
        <h2 slot="title">Title</h2>
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
            <elvia-datepicker :isCompact="true"></elvia-datepicker>
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
      <!-- <elvia-radio-filter
        :items="[
          { label: 'All', value: 'all' },
          { label: 'Read', value: 'read' },
          { label: 'Unread', value: 'unread' },
        ]"
        :value="'read'"
        :name="'readRadioFilters'"
        :ariaLabel="'{value} filtrering valgt'"
      ></elvia-radio-filter> -->
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
      <elvia-tabs
        :items="['Epler', 'Appelsin', 'Bananer', 'Druer', 'Kiwi']"
        :value="1"
        :isInverted="false"
      ></elvia-tabs>
    </div>

    <!--Timepicker-->
    <div class="example-wrapper">
      <h3>Timepicker</h3>
      <elvia-timepicker @value-on-change="onTimepickerChange($event.detail.value)" label="Vue timepicker" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    // Accordion
    const openAccordion = ref(false);
    // Breadcrumb
    const breadcrumbsTest = [
      { href: 'https://elvia.no', text: 'Elvia.no' },
      { href: 'https://www.elvia.no/nettleie', text: 'Nettleie' },
      { href: 'https://www.elvia.no/nettleie/elvias-leveringsplikt', text: 'Elvias leveringsplikt' },
    ];

    const breadcrumbsTestNoUrl = [
      { text: 'Elvia.no' },
      { text: 'Nettleie' },
      { text: 'Elvias leveringsplikt' },
    ];

    const carouselValue = ref(0);

    // Chips
    const deletableChipsList = [
      { value: 2022, color: 'green', isDisabled: false },
      { value: 2023, color: 'red', isDisabled: false },
      { value: 2024, color: 'blue', isDisabled: true },
    ];

    // Dropdown
    const dropdownDefaultOption = { value: '675', label: 'Mast - Råte' };
    const dropdownOptions = [
      { value: '675', label: 'Mast - Råte' },
      { value: '676', label: 'Mast - Hakkespettskade' },
      { value: '677', label: 'Mast - Annen skade/ fremmedlegemer' },
      { value: '678', label: 'Mast - Stag' },
    ];

    // Modal
    const isModalShowing = false;

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

    return {
      openAccordion,
      breadcrumbsTest,
      breadcrumbsTestNoUrl,
      carouselValue,
      deletableChipsList,
      dropdownDefaultOption,
      dropdownOptions,
      isModalShowing,
      vPos,
      hPos,
      radius,
      defaultPaginationValue,
      logValue,
      moveSpotlight,
      incrementCarouselStep,
      onTimepickerChange,
    };
  },
});
</script>
