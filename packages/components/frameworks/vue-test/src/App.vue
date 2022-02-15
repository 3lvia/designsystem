<template>
  <h1>Vue 3 Preview</h1>

  <div class="components-examples">
    <div class="example-wrapper">
      <!--Test the component here. When done add it to the list alphabetically-->
      <h3>Test your component here</h3>
      <!--Normal version-->
      <div class="e-bg-white"></div>
      <!--Inverted version-->
      <div class="e-bg-grey"></div>
    </div>

    <!--Accordion-->
    <div class="example-wrapper">
      <h3>Accordion</h3>
      <elvia-accordion openLabel="Show" closeLabel="Hide" size="medium" type="normal">
        <div slot="content">Webcomponentent content for the Accordion component</div>
      </elvia-accordion>
    </div>

    <!--Box-->
    <div class="example-wrapper">
      <h3>Box</h3>
      <elvia-box :hasBorder="true">
        <div slot="title">Title</div>
        <div slot="content">Webcomponentent content for the Box component</div>
      </elvia-box>
    </div>

    <!--Breadcrumb-->
    <div class="example-wrapper">
      <h3>Breadcrumb</h3>
      <elvia-breadcrumb
        :breadcrumbs="breadcrumbsTestNoUrl"
        @breadcrumbs-on-change="logValue('Breadcrumb', $event.detail.value)"
      ></elvia-breadcrumb>
    </div>

    <!--Carousel-->
    <div class="example-wrapper">
      <h3>Carousel</h3>
      <elvia-carousel :hideArrows="true" @value-on-change="logValue('Carousel', $event.detail.value)">
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

    <!--Chip-->
    <div class="example-wrapper">
      <h3>Chip</h3>
      <div v-for="chip in deletableChipsList" :key="chip.value">
        <elvia-chip
          :value="chip.value"
          :color="chip.color"
          :ariaLabel="'Fjern filtrering for ' + chip.value"
          :disabled="chip.disabled"
          @on-delete="logValue('Chip', $event.detail.value)"
        ></elvia-chip>
      </div>
    </div>

    <!--Datepicker-->
    <div class="example-wrapper">
      <h3>Datepicker</h3>
      <elvia-datepicker
        :isCompact="true"
        label="Fra dato"
        @value-on-change="logValue('Datepicker', $event.detail.value)"
      ></elvia-datepicker>
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
      <elvia-dropdown :defaultValue="dropdownDefaultOption" :options="dropdownOptions"></elvia-dropdown>
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
        :title="'Redigere bidragsytere'"
        :hasCloseBtn="true"
        @on-hide="isModalShowing = !isModalShowing"
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
        @value-on-change="logValue('Pagination', $event.detail.value)"
      ></elvia-pagination>
    </div>

    <!--Popover-->
    <div class="example-wrapper">
      <h3>Popover</h3>
      <elvia-popover header="BankID" posX="right">
        <div slot="trigger"><button class="e-btn">Right top</button></div>
        <div slot="content">
          Alle privatkunder må bruke BankID første gang. Alle privatkunder må bruke BankID første gang.
        </div>
      </elvia-popover>
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
        @value-on-change="logValue('Radio filter', $event.detail.value)"
      ></elvia-radio-filter>
    </div>

    <!--Tabs-->
    <div class="example-wrapper">
      <h3>Tabs</h3>
      <elvia-tabs
        :items="['Epler', 'Appelsin', 'Bananer', 'Druer', 'Kiwi']"
        :value="1"
        :isInverted="false"
        @value-on-change="logValue('Tabs', $event.detail.value)"
      ></elvia-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data: function () {
    return {
      // Breadcrumb
      breadcrumbsTest: [
        { url: 'https://elvia.no', title: 'Elvia.no' },
        { url: 'https://www.elvia.no/nettleie', title: 'Nettleie' },
        { url: 'https://www.elvia.no/nettleie/elvias-leveringsplikt', title: 'Elvias leveringsplikt' },
      ],
      breadcrumbsTestNoUrl: [
        { title: 'Elvia.no' },
        { title: 'Nettleie' },
        { title: 'Elvias leveringsplikt' },
      ],
      // Carousel
      elements: [
        { element: this.carouselParagraph },
        { title: 'Hei til ny tariff!', element: this.carouselParagraph },
        { title: 'Strømbruddsvarsel', element: this.carouselParagraph },
        { element: this.carouselParagraph },
      ],
      // Chips
      deletableChipsList: [
        { value: 2022, color: 'green' },
        { value: 2023, color: 'red' },
        { value: 2024, color: 'blue' },
      ],
      // Dropdown
      dropdownDefaultOption: { value: '675', label: 'Mast - Råte' },
      dropdownOptions: [
        { value: '675', label: 'Mast - Råte' },
        { value: '676', label: 'Mast - Hakkespettskade' },
        { value: '677', label: 'Mast - Annen skade/ fremmedlegemer' },
        { value: '678', label: 'Mast - Stag' },
      ],
      // Modal
      isModalShowing: false,
      // Pagination
      defaultPaginationValue: { start: 1, end: 10 },
    };
  },
  methods: {
    logValue(component, value) {
      console.log(component, ': ', value);
    },
  },
};
</script>
<style scoped>
@import './App.scss';
</style>
