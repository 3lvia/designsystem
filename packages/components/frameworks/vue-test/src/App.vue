<template>
  <h1>Vue 3 Preview</h1>

  <div class="components-examples">
    <div class="previewDivider"></div>

    <h3>Accordion</h3>
    <elvia-accordion
      content="any text of your choice"
      openLabel="Show"
      closeLabel="Hide"
      size="medium"
      type="normal"
    ></elvia-accordion>

    <h3>Box</h3>
    <elvia-box :hasBorder="true">
      <div slot="title">Title</div>
      <div slot="content">Webcomponentent content for the box component</div>
    </elvia-box>

    <h3>Breadcrumb</h3>
    <elvia-breadcrumb :breadcrumbs="breadcrumbsTest"></elvia-breadcrumb>

    <h3>Carousel</h3>
    <elvia-carousel
      :elements="elements"
      :hideArrows="true"
      @value-on-change="carouselValue = $event.detail.value"
    ></elvia-carousel>

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

    <h3>Datepicker</h3>
    <elvia-datepicker
      :isCompact="true"
      label="Fra dato"
      @value-on-change="onFromDateChange($event)"
    ></elvia-datepicker>

    <h3>Divider</h3>
    <elvia-divider></elvia-divider>

    <h3>Dropdown</h3>
    <elvia-dropdown :defaultValue="defaultOption" :options="elviaOptions"></elvia-dropdown>

    <h3>Icon</h3>
    <elvia-icon :name="'addCircle'" :color="'green'" :customSize="'5rem'"></elvia-icon>
    <elvia-icon :name="'sortingBold'" :color="'red'" :customSize="'5rem'"></elvia-icon>

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

    <h3>Pagination</h3>
    <elvia-pagination items="156" :value="defaultPaginatioValue"></elvia-pagination>

    <h3>Popover</h3>
    <elvia-popover header="BankID" posX="right">
      <div slot="trigger"><button class="e-btn">Right top</button></div>
      <div slot="content">
        Alle privatkunder må bruke BankID første gang. Alle privatkunder må bruke BankID første gang.
      </div>
    </elvia-popover>

    <h3>Progressbar</h3>
    <elvia-progress-linear :value="50" :isIndeterminate="false" :isError="false"></elvia-progress-linear>

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

    <h3>Tabs</h3>
    <elvia-tabs
      :items="['Epler', 'Appelsin', 'Bananer', 'Druer', 'Kiwi']"
      :value="1"
      :isInverted="false"
      @callback-name="value = $event.detail.value"
    ></elvia-tabs>
  </div>
</template>

<script>
import '@elvia/elvis-accordion';
import '@elvia/elvis-box';
import '@elvia/elvis-breadcrumb';
import '@elvia/elvis-carousel';
import '@elvia/elvis-chip';
import '@elvia/elvis-datepicker';
import '@elvia/elvis-divider';
import '@elvia/elvis-dropdown';
import '@elvia/elvis-icon';
import '@elvia/elvis-modal';
import '@elvia/elvis-pagination';
import '@elvia/elvis-popover';
import '@elvia/elvis-progress-linear';
import '@elvia/elvis-radio-filter';
import '@elvia/elvis-tabs';

export default {
  name: 'App',
  data: function () {
    return {
      isModalShowing1: false,
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

<style>
@import url('https://fonts.googleapis.com/css?family=Red+Hat+Display:400,400i,500,700,900&display=swap');
@import url('https://fonts.googleapis.com/css?family=Red+Hat+Text:400,400i,500&display=swap');

#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #000;
  margin-top: 24px;
  font-family: 'Red Hat Text';
}

.previewDivider {
  height: 4px;
  background: #29d305;
  margin-bottom: 16px;
}
.components-examples {
  max-width: 700px;
  width: 100%;
  margin: 0 auto;
}

h1 {
  text-align: center;
  font-family: 'Red Hat Display';
}
h3 {
  font-size: 24px;
  margin: 48px 0 12px;
  font-family: 'Red Hat Display';
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
