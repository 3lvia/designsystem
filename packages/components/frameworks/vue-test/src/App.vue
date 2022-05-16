<template>
  <h1>Vue 3 Preview</h1>

  <div class="components-examples">
    <div class="example-wrapper">
      <!--Test the component here (delete what was here previously). When done add it to the list alphabetically-->
      <h3>Test your component here</h3>
      <!--Normal version-->
      <div class="e-bg-white">
        <h3>Popover</h3>
        <elvia-popover type="list" :selectable="true" :disableAutoClose="true">
          <button slot="trigger" class="e-btn">Show popover</button>
          <div slot="content" class="ewc-popover__list">
            <button>
              <elvia-icon name="checkBold" size="xs"></elvia-icon>
              <span>Dato nyeste</span>
            </button>
            <button>
              <span>Dato eldste</span>
            </button>
            <a>
              <span>Relevans</span>
            </a>
          </div>
        </elvia-popover>
        <elvia-popover type="list" :hasDivider="true">
          <button slot="trigger" class="e-btn">Show popover</button>
          <div slot="content" class="ewc-popover__list">
            <div class="ewc-popover__list-group">
              <h1>Title 1</h1>
              <button class="ewc-popover__list-item--selected">
                <elvia-icon name="edit" size="xs"></elvia-icon>
                <span>Rediger</span>
              </button>
              <button>
                <elvia-icon name="bin" size="xs"></elvia-icon>
                <span>Slett</span>
              </button>
              <a>
                <elvia-icon name="download" size="xs"></elvia-icon>
                <span>Last ned</span>
              </a>
            </div>
            <div class="ewc-popover__list-group">
              <h1>Title 2</h1>
              <button>
                <elvia-icon name="edit" size="xs"></elvia-icon>
                <span>Rediger</span>
              </button>
              <button>
                <elvia-icon name="bin" size="xs"></elvia-icon>
                <span>Slett</span>
              </button>
              <a>
                <elvia-icon name="download" size="xs"></elvia-icon>
                <span>Last ned</span>
              </a>
            </div>
          </div>
        </elvia-popover>
      </div>
      <!--Inverted version-->
      <div class="e-bg-grey"></div>
    </div>

    <!--Accordion-->
    <div class="example-wrapper">
      <h3>Accordion</h3>
      <elvia-accordion openLabel="Show" closeLabel="Hide" size="medium" type="overflow" :overflowHeight="10">
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
      <elvia-breadcrumb :breadcrumbs="breadcrumbsTestNoUrl"></elvia-breadcrumb>
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
      <button @click="carouselValue = incrementCarouselStep(carouselValue)" class="e-btn e-btn--sm">
        Increment step
      </button>
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
        :disableDate="(day) => day.getDay() === 0 || day.getDay() === 6"
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
      <elvia-pagination :numberOfElements="156" :value="defaultPaginationValue"></elvia-pagination>
    </div>

    <!--Popover-->
    <div class="example-wrapper">
      <h3>Popover</h3>
      <elvia-popover heading="BankID" horizontalPosistion="right">
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
      ></elvia-radio-filter>
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
      carouselValue: 0,
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
      // Spotlight
      vPos: 200,
      hPos: 200,
      radius: 100,
      // Pagination
      defaultPaginationValue: { start: 1, end: 10 },
    };
  },
  methods: {
    logValue(component, value) {
      console.log(component, ': ', value);
    },
    moveSpotlight() {
      if (this.$data.vPos === 200) {
        this.$data.vPos = 500;
        this.$data.hPos = 500;
        this.$data.radius = 300;
      } else {
        this.$data.vPos = 200;
        this.$data.hPos = 200;
        this.$data.radius = 100;
      }
    },
    incrementCarouselStep(carouselValue) {
      carouselValue = (carouselValue + 1) % 3;
      console.log('Carousel value: ', carouselValue);
      return carouselValue;
    },
  },
};
</script>
<style scoped>
@import './App.scss';
</style>
