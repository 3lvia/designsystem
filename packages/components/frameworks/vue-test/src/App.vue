<template>
  <h1>Vue 3 Preview</h1>

  <div class="components-examples">
    <div class="example-wrapper">
      <h3>Accordion</h3>
      <elvia-accordion openLabel="Show" closeLabel="Hide" size="medium" type="normal">
        <div slot="content">Webcomponentent content for the Accordion component</div>
      </elvia-accordion>
    </div>

    <div class="example-wrapper">
      <h3>Box</h3>
      <elvia-box :hasBorder="true">
        <div slot="title">Title</div>
        <div slot="content">Webcomponentent content for the Box component</div>
      </elvia-box>
    </div>

    <div class="example-wrapper">
      <h3>Breadcrumb</h3>
      <elvia-breadcrumb :breadcrumbs="breadcrumbsTest"></elvia-breadcrumb>
    </div>

    <div class="example-wrapper">
      <h3>Carousel</h3>
      <elvia-carousel :hideArrows="true" @value-on-change="carouselValue = $event.detail.value">
        <div slot="title-1">
          <h4 class="e-title-sm">HAN-port</h4>
        </div>
        <div slot="element-1">hello</div>
        <div slot="title-2">
          <h4 class="e-title-sm">AMS-meter</h4>
        </div>
        <div slot="element-2">halla</div>
        <div slot="title-3">
          <h4 class="e-title-sm">YOYOYO</h4>
        </div>
        <div slot="element-3">hei</div>
      </elvia-carousel>
    </div>

    <div class="example-wrapper">
      <h3>Chip</h3>
      <div v-for="chip in deletableChipsList" :key="chip.value">
        <elvia-chip
          :value="chip.value"
          :color="chip.color"
          :ariaLabel="'Fjern filtrering for ' + chip.value"
          :disabled="chip.disabled"
          @on-delete="handleOnDelete($event)"
        ></elvia-chip>
      </div>
    </div>

    <div class="example-wrapper">
      <h3>Datepicker</h3>
      <elvia-datepicker
        :isCompact="true"
        label="Fra dato"
        @value-on-change="onFromDateChange($event)"
      ></elvia-datepicker>
    </div>

    <div class="example-wrapper">
      <h3>Divider</h3>
      <elvia-divider></elvia-divider>
      <elvia-divider :isInverted="false" :type="'title'">
        <h2 slot="title">Title</h2>
      </elvia-divider>
      <elvia-divider :orientation="'vertical'" :isInverted="false">
        <h2 slot="title">Title</h2>
      </elvia-divider>
    </div>

    <div class="example-wrapper">
      <h3>Dropdown</h3>
      <elvia-dropdown :defaultValue="defaultOption" :options="elviaOptions"></elvia-dropdown>
    </div>

    <div class="example-wrapper">
      <h3>Modal</h3>
      <button class="e-btn" @click="isModalShowing1 = !isModalShowing1">Hello</button>
      <elvia-modal
        :isShowing="isModalShowing1"
        :title="'Redigere bidragsytere'"
        :hasCloseBtn="true"
        @on-hide="isModalShowing1 = !isModalShowing1"
      >
        <div slot="content">
          <div class="date-container">
            <elvia-datepicker :isCompact="true"></elvia-datepicker>
          </div>
        </div>
        <div slot="secondaryButton">
          <button class="e-btn e-btn--secondary e-btn--lg" @click="isModalShowing1 = false">Avbryt</button>
        </div>
        <div slot="primaryButton"><button class="e-btn e-btn--primary e-btn--lg">Lagre</button></div>
      </elvia-modal>
    </div>

    <div class="example-wrapper">
      <h3>Pagination</h3>
      <elvia-pagination items="156" :value="defaultPaginatioValue"></elvia-pagination>
    </div>

    <div class="example-wrapper">
      <h3>Popover</h3>
      <elvia-popover header="BankID" posX="right">
        <div slot="trigger"><button class="e-btn">Right top</button></div>
        <div slot="content">
          Alle privatkunder må bruke BankID første gang. Alle privatkunder må bruke BankID første gang.
        </div>
      </elvia-popover>
    </div>

    <div class="example-wrapper">
      <h3>Progressbar</h3>
      <elvia-progress-linear :value="50" :isIndeterminate="false" :isError="false"></elvia-progress-linear>
    </div>

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
        @value-on-change="updateSelectedFilter($event)"
      ></elvia-radio-filter>
    </div>

    <div class="example-wrapper">
      <h3>Tabs</h3>
      <elvia-tabs
        :items="['Epler', 'Appelsin', 'Bananer', 'Druer', 'Kiwi']"
        :value="1"
        :isInverted="false"
        @callback-name="value = $event.detail.value"
      ></elvia-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data: function () {
    return {
      isModalShowing1: false,
      isModalShowing: false,
      defaultPaginatioValue: { start: 1, end: 10 },
      defaultOption: { value: '675', label: 'Mast - Råte' },
      elviaOptions: [
        { value: '675', label: 'Mast - Råte' },
        { value: '676', label: 'Mast - Hakkespettskade' },
        { value: '677', label: 'Mast - Annen skade/ fremmedlegemer' },
        { value: '678', label: 'Mast - Stag' },
      ],
      testObject: '{"value":"John", "label":"hello there"}',
      breadcrumbsTest: [
        {
          url: 'https://elvia.no',
          title: 'Elvia.no',
        },
        {
          url: 'https://www.elvia.no/nettleie',
          title: 'Nettleie',
        },
        {
          url: 'https://www.elvia.no/nettleie/elvias-leveringsplikt',
          title: 'Elvias leveringsplikt',
        },
      ],
      deletableChipsList: [
        { value: 2022, color: 'green' },
        { value: 2023, color: 'red' },
        { value: 2024, color: 'blue' },
      ],
      elements: [
        {
          element: this.carouselParagraph,
        },
        {
          title: 'Hei til ny tariff!',
          element: this.carouselParagraph,
        },
        {
          title: 'Strømbruddsvarsel',
          element: this.carouselParagraph,
        },
        {
          element: this.carouselParagraph,
        },
      ],
    };
  },
  methods: {
    onFromDateChange: (event) => {
      console.log('hello: ', event);
    },
    handleOnDelete: (event) => {
      console.log(event.detail.value);
    },
    updateSelectedFilter: (event) => {
      console.log(event.detail.value);
    },
  },
};
</script>
<style scoped>
@import './App.scss';
</style>
