<!-- ✂️ Breaking Changes -->
<!-- 💥 New Features -->
<!-- 🐝 Bug Fixes -->
<table>
  <tr class="changelog-row changelog-divider py-5">
    <td class="changelog-date">
      <span class="e-title-sm">
        8.1.1
      </span>
      <br>
      <span class="changelog-date-span">
        March 17, 2022
      </span>
    </td>
    <td class="changelog-content">
      <div class="changelog-section">
       <div class="changelog-section-title">🐝 Bug Fixes</div>
          <div>Component: 
            <a class="e-link e-link--inline" href="https://design.elvia.io/components/toggle">Toggle</a>
          </div>
          <ul class="e-list">
            <li>
              Fixed a bug that caused toggle to not display correctly in Firefox browsers.
            </li>
          </ul>
        </div>
      </div>
    </td>
  </tr>
  <tr class="changelog-row changelog-divider py-5">
    <td class="changelog-date">
      <span class="e-title-sm">
        8.1.0
      </span>
      <br>
      <span class="changelog-date-span">
        March 03, 2022
      </span>
    </td>
    <td class="changelog-content">
      <div class="changelog-section">
       <div class="changelog-section-title">💥 New Features</div>
          <div>Page: 
            <a class="e-link e-link--inline" href="https://design.elvia.io/brand/icon#Overview">Icons</a>
          </div>
          <ul class="e-list">
            <li>
              Added icons: thumbnail-color and adjust
            </li>
          </ul>
        </div>
      </div>
    </td>
  </tr>
  <tr class="changelog-row changelog-divider py-5">
    <td class="changelog-date">
      <span class="e-title-sm">
        8.0.4
      </span>
      <br>
      <span class="changelog-date-span">
        February 28, 2022
      </span>
    </td>
    <td class="changelog-content">
      <div class="changelog-section">
        <div class="changelog-section-title">🛠 Patch</div>
          <ul class="e-list">
            <li>
              Updated list  of deprecated elvis classes.
            </li>
          </ul>
        </div>
        <div class="changelog-section-title">🐝 Bug Fixes</div>
        <div>Component: 
            <a class="e-link e-link--inline" href="https://design.elvia.io/components/toggle">Toggle</a>
          </div>
          <ul class="e-list">
            <li>
              Fixed focus outline on Toggle.
            </li>
          </ul>
        </div>
      </div>
    </td>
  </tr>
  <tr class="changelog-row changelog-divider py-5">
    <td class="changelog-date">
      <span class="e-title-sm">
        8.0.3
      </span>
      <br>
      <span class="changelog-date-span">
        February 18, 2022
      </span>
    </td>
    <td class="changelog-content">
      <div class="changelog-section">
        <div class="changelog-section-title">🛠 Patch</div>
          <ul class="e-list">
            <li>
              Updated icons package.
            </li>
          </ul>
        </div>
      </div>
    </td>
  </tr>
  <tr class="changelog-row changelog-divider py-5">
    <td class="changelog-date">
      <span class="e-title-sm">
        8.0.2
      </span>
      <br>
      <span class="changelog-date-span">
        February 18, 2022
      </span>
    </td>
    <td class="changelog-content">
      <div class="changelog-section">
        <div class="changelog-section-title">🛠 Patch</div>
        <div>Component: 
            <a class="e-link e-link--inline" href="https://design.elvia.io/components/alert">Alert</a>
          </div>
          <ul class="e-list">
            <li>
              Small update inside local alert.
            </li>
          </ul>
        </div>
      </div>
    </td>
  </tr>
  <tr class="changelog-row changelog-divider py-5">
    <td class="changelog-date">
      <span class="e-title-sm">
        8.0.1
      </span>
      <br>
      <span class="changelog-date-span">
        February 17, 2022
      </span>
    </td>
    <td class="changelog-content">
      <div class="changelog-section">
        <div class="changelog-section-title">🛠 Patch</div>
        <div>Component: 
            <a class="e-link e-link--inline" href="https://design.elvia.io/components/segmented-control">Segmented Control</a>
          </div>
          <ul class="e-list">
            <li>
              Migrated the deprecated divider symbol to math.div for Sass. 
            </li>
            <li>
              Updated Bootstrap to v4.6.1. Used in the grid classes. 
            </li>
          </ul>
        </div>
      </div>
    </td>
  </tr>
  <tr class="changelog-row changelog-divider py-5">
    <td class="changelog-date">
      <span class="e-title-sm">
        8.0.0
      </span>
      <br>
      <span class="changelog-date-span">
        February 16, 2022
      </span>
    </td>
    <td class="changelog-content">
      <div class="changelog-section">
        <div class="changelog-section-title">✂️ Breaking Changes</div>
          <div>Components: 
            <a class="e-link e-link--inline" href="https://design.elvia.io/components/segmented-control#Size">Segmented Control</a>,
            <a class="e-link e-link--inline" href="https://design.elvia.io/brand/typography">Typography</a> &
            <a class="e-link e-link--inline" href="https://design.elvia.io/components/toggle">Toggle</a>
          </div>
          <ul class="e-list">
            <li>
              Segmented controls are now in three sizes: <br />
              Small -> Medium <br />
              Medium -> Large <br />
              New Small size (smaller than the previous) <br />
              <strong>How to fix</strong>: 
              <div class="how-to-fix-description">
                Check where you are using segmented controls and update the sizes to the correct new size. If you have no specified size add <span class="code-text">e-segmented-controls--lg</span> and if you have the small size specified (<span class="code-text">e-segmented-controls--sm</span>) just remove the specification to receive medium size instead.
              </div>
            </li>
            <li>
              Title xs on mobiles has been updated font-size from 18px -> 16px. This is done so that the difference between title sm and xs i more distinct. 
              <strong>How to fix</strong>: 
              <div class="how-to-fix-description">
                You should not have to change anything here, just be aware that title-xs is smaller.
              </div>
            </li>
            <li>
              Toggle has updated structure and now includes label and role. This is done for better accessibility.
              <strong>How to fix</strong>:
              <div class="how-to-fix-description">
               Replace the old structure for all your toggles with the structure in the <a class="e-link e-link--inline" href="https://design.elvia.io/components/toggle#Overview">examples</a>.
              </div>
            </li>
          </ul>
        </div>
      </div>
    </td>
  </tr>
  <tr class="changelog-row changelog-divider py-5">
    <td class="changelog-date">
      <span class="e-title-sm">
        7.17.0
      </span>
      <br>
      <span class="changelog-date-span">
        February 15, 2022
      </span>
    </td>
    <td class="changelog-content">
      <div class="changelog-section">
        <div class="changelog-section-title">💥 New Features</div>
          <div>Page: 
            <a class="e-link e-link--inline" href="https://design.elvia.io/components/label#Overview">Label</a>
          </div>
          <ul class="e-list">
            <li>
              Added primary colors(black, white and grey) as possible label colors.
            </li>
          </ul>
        </div>
      </div>
    </td>
  </tr>
 <tr class="changelog-row changelog-divider py-5">
    <td class="changelog-date">
      <span class="e-title-sm">
        7.16.0
      </span>
      <br>
      <span class="changelog-date-span">
        February 9, 2022
      </span>
    </td>
    <td class="changelog-content">
      <div class="changelog-section">
        <div class="changelog-section-title">💥 New Features</div>
          <div>Page: 
            <a class="e-link e-link--inline" href="https://design.elvia.io/tools/utility-classes#Overview">Utility classes</a>
          </div>
          <ul class="e-list">
            <li>
              Border radius utility classes are now available as <span class="code-text">e-br-4</span> and <span class="code-text">e-br-8</span>.
            </li>
          </ul>
        </div>
      </div>
    </td>
  </tr>
  <tr class="changelog-row changelog-divider py-5">
    <td class="changelog-date">
      <span class="e-title-sm">
        7.15.4
      </span>
      <br>
      <span class="changelog-date-span">
        February 2, 2022
      </span>
    </td>
    <td class="changelog-content">
      <div class="changelog-section">
        <div class="changelog-section-title">🛠 Patch</div>
          <div>Component: 
            <a class="e-link e-link--inline" href="https://design.elvia.io/components/stepper#Overview">Stepper</a> 
          </div>
          <ul class="e-list">
            <li>
              Stepper hover state added.
            </li>
          </ul>
        </div>
      </div>
    </td>
  </tr>
  <tr class="changelog-row changelog-divider py-5">
    <td class="changelog-date">
      <span class="e-title-sm">
        7.15.3
      </span>
      <br>
      <span class="changelog-date-span">
        January 26, 2022
      </span>
    </td>
    <td class="changelog-content">
      <div class="changelog-section">
        <div class="changelog-section-title">🛠 Patch</div>
          <ul class="e-list">
            <li>
              Updated devDependencies.
            </li>
          </ul>
        </div>
      </div>
    </td>
  </tr>
  <tr class="changelog-row changelog-divider py-5">
    <td class="changelog-date">
      <span class="e-title-sm">
        7.15.2
      </span>
      <br>
      <span class="changelog-date-span">
        January 24, 2022
      </span>
    </td>
    <td class="changelog-content">
      <div class="changelog-section">
        <div class="changelog-section-title">🛠 Patch</div>
          <ul class="e-list">
            <li>
              Removed unused dependency.
            </li>
          </ul>
        </div>
      </div>
    </td>
  </tr>
  <tr class="changelog-row changelog-divider py-5">
    <td class="changelog-date">
      <span class="e-title-sm">
        7.15.1
      </span>
      <br>
      <span class="changelog-date-span">
        January 17, 2022
      </span>
    </td>
    <td class="changelog-content">
      <div class="changelog-section">
        <div class="changelog-section-title">🐝 Bug Fixes</div>
          <div>Component: 
            <a class="e-link e-link--inline" href="https://design.elvia.io/components/link#Overview">Link</a> &
            <a class="e-link e-link--inline" href="https://design.elvia.io/components/list#Overview">List</a>
          </div>
          <ul class="e-list">
            <li>
              Added import for Red Hat Text in font-weight 600 and updated link and list components to use this typography.
            </li>
          </ul>
        </div>
      </div>
    </td>
  </tr>
  <tr class="changelog-row changelog-divider py-5">
    <td class="changelog-date">
      <span class="e-title-sm">
        7.15.0
      </span>
      <br>
      <span class="changelog-date-span">
        January 17, 2022
      </span>
    </td>
    <td class="changelog-content">
      <div class="changelog-section">
           <div class="changelog-section-title">💥 New Features</div>
            <div>Component: 
            <a class="e-link e-link--inline" href="https://design.elvia.io/components/table#Overview">Table</a>
          </div>
          <ul class="e-list">
            <li>
              Added new modifier class for removing stripes in table body: <span class="code-text">e-table--no-stripes</span>.
            </li>
          </ul>
        </div>
        </div>
      </div>
    </td>
  </tr>
  <tr class="changelog-row changelog-divider py-5">
    <td class="changelog-date">
      <span class="e-title-sm">
        7.14.2
      </span>
      <br>
      <span class="changelog-date-span">
        January 17, 2022
      </span>
    </td>
    <td class="changelog-content">
      <div class="changelog-section">
        <div class="changelog-section-title">🛠 Patch</div>
          <ul class="e-list">
            <li>
              Using newest version of elvis-assets-icon package in elvis. 
            </li>
          </ul>
        </div>
      </div>
    </td>
  </tr>
  <tr class="changelog-row changelog-divider py-5">
    <td class="changelog-date">
      <span class="e-title-sm">
        7.14.1
      </span>
      <br>
      <span class="changelog-date-span">
        January 10, 2022
      </span>
    </td>
    <td class="changelog-content">
      <div class="changelog-section">
        <div class="changelog-section-title">🐝 Bug Fixes</div>
          <ul class="e-list">
            <li>
              Added import for Red Hat Text in font-weight 700.
            </li>
          </ul>
        </div>
      </div>
    </td>
  </tr>
  <tr class="changelog-row changelog-divider py-5">
    <td class="changelog-date">
      <span class="e-title-sm">
        7.14.0
      </span>
      <br>
      <span class="changelog-date-span">
        January 06, 2022
      </span>
    </td>
    <td class="changelog-content">
      <div class="changelog-section">
        <div class="changelog-section-title">💥 New Features</div>
          <div>Component: 
            <a class="e-link e-link--inline" href="https://design.elvia.io/components/table#Overview">Table</a>
          </div>
          <ul class="e-list">
            <li>
              Added new typography class for comparing numbers in tables: <span class="code-text">e-text-mono</span>.
            </li>
          </ul>
        </div>
      </div>
    </td>
  </tr>
  <tr class="changelog-row changelog-divider py-5">
    <td class="changelog-date">
      <span class="e-title-sm">
        7.13.6
      </span>
      <br>
      <span class="changelog-date-span">
        December 22, 2021
      </span>
    </td>
    <td class="changelog-content">
      <div class="changelog-section">
        <div class="changelog-section-title">🐝 Bug Fixes</div>
          <div>Component: 
            <a class="e-link e-link--inline" href="https://design.elvia.io/components/input#Overview">Text fields</a>
          </div>
          <ul class="e-list">
            <li>
              Updated height for text-fields. 
            </li>
          </ul>
        </div>
      </div>
    </td>
  </tr>
  <tr class="changelog-row changelog-divider py-5">
    <td class="changelog-date">
      <span class="e-title-sm">
        7.13.5
      </span>
      <br>
      <span class="changelog-date-span">
        December 14, 2021
      </span>
    </td>
    <td class="changelog-content">
      <div class="changelog-section">
        <div class="changelog-section-title">🐝 Bug Fixes</div>
          <div>Component: 
            <a class="e-link e-link--inline" href="https://design.elvia.io/components/card#Overview">Card</a> &
            <a class="e-link e-link--inline" href="https://design.elvia.io/components/link#Overview">Link</a>
          </div>
          <ul class="e-list">
            <li>
              Deprecated e-card and e-link--card, replaced with card component.  
            </li>
            <li>
              Deprecated e-link--jumbo, replaced with  <a class="e-link e-link--inline" href="https://design.elvia.io/patterns/groups#Examples">action group pattern</a>.  
            </li>
          </ul>
        </div>
      </div>
    </td>
  </tr>
  <tr class="changelog-row changelog-divider py-5">
    <td class="changelog-date">
      <span class="e-title-sm">
        7.13.4
      </span>
      <br>
      <span class="changelog-date-span">
        November 18, 2021
      </span>
    </td>
    <td class="changelog-content">
      <div class="changelog-section">
        <div class="changelog-section-title">🐝 Bug Fixes</div>
          <div>Component: 
            <a class="e-link e-link--inline" href="https://design.elvia.io/components/tooltip#Overview">Tooltip</a> &
            <a class="e-link e-link--inline" href="https://design.elvia.io/components/autocomplete#Overview">Autocomplete</a>
          </div>
          <ul class="e-list">
            <li>
              Updated several z-index values to be more consistent.
            </li>
          </ul>
        </div>
      </div>
    </td>
  </tr>
  <tr class="changelog-row changelog-divider py-5">
    <td class="changelog-date">
      <span class="e-title-sm">
        7.13.3
      </span>
      <br>
      <span class="changelog-date-span">
        November 17, 2021
      </span>
    </td>
    <td class="changelog-content">
      <div class="changelog-section">
        <div class="changelog-section-title">🐝 Bug Fixes</div>
          <div>Component: 
            <a class="e-link e-link--inline" href="http://design.elvia.io/components/header#Overview">Header</a>
          </div>
          <ul class="e-list">
            <li>
              Increased header z-index.
            </li>
          </ul>
        </div>
      </div>
    </td>
  </tr>
  <tr class="changelog-row changelog-divider py-5">
    <td class="changelog-date">
      <span class="e-title-sm">
        7.13.2
      </span>
      <br>
      <span class="changelog-date-span">
        November 10, 2021
      </span>
    </td>
    <td class="changelog-content">
      <div class="changelog-section">
        <div class="changelog-section-title">🐝 Bug Fixes</div>
          <div>Component: 
            <a class="e-link e-link--inline" href="http://design.elvia.io/components/checkbox#Overview">Checkbox</a>
          </div>
          <ul class="e-list">
            <li>
              Fixed small checkbox-mark misalignment.
            </li>
          </ul>
        </div>
      </div>
    </td>
  </tr>
  <tr class="changelog-row changelog-divider py-5">
    <td class="changelog-date">
      <span class="e-title-sm">
        7.13.1
      </span>
      <br>
      <span class="changelog-date-span">
        October 21, 2021
      </span>
    </td>
    <td class="changelog-content">
      <div class="changelog-section">
        <div class="changelog-section-title">🐝 Bug Fixes</div>
          <div>Component: 
            <a class="e-link e-link--inline" href="http://design.elvia.io/components/list#Overview">Lists</a>
          </div>
          <ul class="e-list">
            <li>
              Lists inside lists will get the correct elvis style.
            </li>
          </ul>
        </div>
      </div>
    </td>
  </tr>
  <tr class="changelog-row changelog-divider py-5">
    <td class="changelog-date">
      <span class="e-title-sm">
        7.13.0
      </span>
      <br>
      <span class="changelog-date-span">
        October 18, 2021
      </span>
    </td>
    <td class="changelog-content">
      <div class="changelog-section">
        <div class="changelog-section-title">💥 New Feature</div>
          <div>Component: 
            <a class="e-link e-link--inline" href="http://design.elvia.io/brand/icons#Overview">icons</a>
          </div>
          <ul class="e-list">
            <li>
              New icon 'season' and one updated icon.
            </li>
          </ul>
        </div>
      </div>
    </td>
  </tr>
  <tr class="changelog-row changelog-divider py-5">
    <td class="changelog-date">
      <span class="e-title-sm">
        7.12.0
      </span>
      <br>
      <span class="changelog-date-span">
        October 8, 2021
      </span>
    </td>
    <td class="changelog-content">
      <div class="changelog-section">
        <div class="changelog-section-title">🐝 Bug Fixes</div>
          <div>Component: 
            <a class="e-link e-link--inline" href="http://design.elvia.io/components/radiobutton#Overview">Radiobutton</a>,
            <a class="e-link e-link--inline" href="http://design.elvia.io/components/segmented-control#Overview">Segmented Control</a>,
            <a class="e-link e-link--inline" href="http://design.elvia.io/components/fileUpload#Overview">file Upload</a>,
            <a class="e-link e-link--inline" href="http://design.elvia.io/brand/typography#Overview">Typography</a> &
            <a class="e-link e-link--inline" href="http://design.elvia.io/components/position-picker#Overview">Position Picker</a>
          </div>
          <ul class="e-list">
            <li>
              Radiobutton error state added.
            </li>
            <li>
              Small version of Segmented control added.
            </li>
            <li>
              Documentation for using file upload with more examples.
            </li>
            <li>
              Text micro light typography added.
            </li>
            <li>
              The position-picker states 'normal' and 'picked' have been updated to be more user friendly and text color has been updated.
            </li>
          </ul>
        </div>
      </div>
    </td>
  </tr>
  <tr class="changelog-row changelog-divider py-5">
    <td class="changelog-date">
      <span class="e-title-sm">
        7.11.2
      </span>
      <br>
      <span class="changelog-date-span">
        October 7, 2021
      </span>
    </td>
    <td class="changelog-content">
      <div class="changelog-section">
        <div class="changelog-section-title">🐝 Bug Fixes</div>
          <div>Component: 
            <a class="e-link e-link--inline" href="http://design.elvia.io/components/search#Overview">Search</a>
          </div>
          <ul class="e-list">
            <li>
              Search paddings updated so that close button is not in the way.
            </li>
          </ul>
        </div>
      </div>
    </td>
  </tr>
  <tr class="changelog-row changelog-divider py-5">
    <td class="changelog-date">
      <span class="e-title-sm">
        7.11.1
      </span>
      <br>
      <span class="changelog-date-span">
        September 21, 2021
      </span>
    </td>
    <td class="changelog-content">
      <div class="changelog-section">
        <div class="changelog-section-title">🐝 Bug Fixes</div>
          <div>Component: 
            <a class="e-link e-link--inline" href="http://design.elvia.io/components/content-loader#Overview">Content loader</a>
          </div>
          <ul class="e-list">
            <li>
              Bug fix for text content-loader so that height can be set directly on content-loader element.
            </li>
          </ul>
        </div>
      </div>
    </td>
  </tr>
  <tr class="changelog-row changelog-divider py-5">
    <td class="changelog-date">
      <span class="e-title-sm">
        7.11.0
      </span>
      <br>
      <span class="changelog-date-span">
        September 9, 2021
      </span>
    </td>
    <td class="changelog-content">
      <div class="changelog-section">
        <div class="changelog-section-title">💥 New Feature</div>
          <div>Component: 
            <a class="e-link e-link--inline" href="http://design.elvia.io/brand/icons#Overview">Icons</a>
          </div>
          <ul class="e-list">
            <li>
              New icons added and electricity icons updated.
            </li>
          </ul>
        </div>
      </div>
    </td>
  </tr>
  <tr class="changelog-row changelog-divider py-5">
    <td class="changelog-date">
      <span class="e-title-sm">
        7.10.0
      </span>
      <br>
      <span class="changelog-date-span">
        August 30, 2021
      </span>
    </td>
    <td class="changelog-content">
      <div class="changelog-section">
        <div class="changelog-section-title">💥 New Feature</div>
          <div>Component: 
            <a class="e-link e-link--inline" href="http://design.elvia.io/components/accordion#Overview">Accordion</a>
          </div>
          <ul class="e-list">
            <li>
              Now possible to disable hover on icons when hovering accordion title, by using the new modifier <span class="code-text">e-accordion__title--no-icon-hover</span>.
            </li>
          </ul>
        </div>
      <div class="changelog-section">
        <div class="changelog-section-title">🐝 Bug Fixes</div>
          <div>Component: 
            <a class="e-link e-link--inline" href="http://design.elvia.io/components/accordion#Overview">Modal</a>
          </div>
          <ul class="e-list">
            <li>
              Adjustment of z-index so it is now possible to use a datepicker inside a modal content area.
            </li>
          </ul>
        </div>
      </div>
    </td>
  </tr>
  <tr class="changelog-row changelog-divider py-5">
    <td class="changelog-date">
      <span class="e-title-sm">
        7.9.4
      </span>
      <br>
      <span class="changelog-date-span">
        August 25, 2021
      </span>
    </td>
    <td class="changelog-content">
      <div class="changelog-section">
        <div class="changelog-section-title">🐝 Bug Fixes</div>
          <div>Component: 
            <a class="e-link e-link--inline" href="http://design.elvia.io/components/accordion#Overview">Accordion</a>
          </div>
          <ul class="e-list">
            <li>
              Now possible to use a single accordion inside a group accordion content area. 
            </li>
          </ul>
        </div>
      </div>
    </td>
  </tr>
  <tr class="changelog-row changelog-divider py-5">
    <td class="changelog-date">
      <span class="e-title-sm">
        7.9.3
      </span>
      <br>
      <span class="changelog-date-span">
        August 13, 2021
      </span>
    </td>
    <td class="changelog-content">
      <div class="changelog-section">
        <div class="changelog-section-title">🐝 Bug Fixes</div>
          <div>Component: 
            <a class="e-link e-link--inline" href="http://design.elvia.io/components/fileUpload#Overview">File Upload</a>
          </div>
          <ul class="e-list">
            <li>
              Deprecated pseudoclass "e-fileupload---hover", now using new modifier "e-fileupload--dragover". 
            </li>
          </ul>
        </div>
      </div>
    </td>
  </tr>
  <tr class="changelog-row changelog-divider py-5">
    <td class="changelog-date">
      <span class="e-title-sm">
        7.9.1
      </span>
      <br>
      <span class="changelog-date-span">
        June 16, 2021
      </span>
    </td>
    <td class="changelog-content">
      <div class="changelog-section">
        <div class="changelog-section-title">🐝 Bug Fixes</div>
          <div>Component: 
            <a class="e-link e-link--inline" href="https://design.elvia.io/components/card#Overview">Card</a>
          </div>
          <ul class="e-list">
            <li>
              Update positioning of titles in cards with title above, now works together with popover compoent. 
            </li>
          </ul>
        </div>
      </div>
    </td>
  </tr>
  <tr class="changelog-row changelog-divider py-5">
    <td class="changelog-date">
      <span class="e-title-sm">
        7.9.0
      </span>
      <br>
      <span class="changelog-date-span">
        May 7, 2021
      </span>
    </td>
    <td class="changelog-content">
      <div class="changelog-section">
        <div class="changelog-section-title">💥 New Features</div>
          <div>Component: 
            <a class="e-link e-link--inline" href="https://design.elvia.io/brand/icon#Overview">Icon</a>
          </div>
          <ul class="e-list">
            <li>
              Added five new icons.
            </li>
          </ul>
        </div>
      </div>
      <div class="changelog-section">
        <div class="changelog-section-title">🐝 Bug Fixes</div>
        <div>Component: 
          <a class="e-link e-link--inline" href="https://design.elvia.io/brand/icon#Overview">Icon</a> 
        </div>
        <ul class="e-list">
          <li>
            Updated sortings icons, ascending is arrow up and descending is arrow down.
          </li>
        </ul>
      </div>
    </td>
  </tr>

  <tr class="changelog-row changelog-divider py-5">
    <td class="changelog-date">
      <span class="e-title-sm">
        7.8.4
      </span>
      <br>
      <span class="changelog-date-span">
        June 4, 2021
      </span>
    </td>
    <td class="changelog-content">
      <div class="changelog-section">
        <div class="changelog-section-title">🐝 Bug Fixes</div>
        <div>Component: 
          <a class="e-link e-link--inline" href="https://design.elvia.io/components/radiobutton#Overview">Radiobutton</a> 
        </div>
        <ul class="e-list">
          <li>
            Deprecated radiobutton classes for invalid state, because a button should always be selected by default so the state is not necessary.
          </li>
        </ul>
      </div>
    </td>
  </tr>

  <tr class="changelog-row changelog-divider py-5">
    <td class="changelog-date">
      <span class="e-title-sm">
        7.8.1
      </span>
      <br>
      <span class="changelog-date-span">
        May 5, 2021
      </span>
    </td>
    <td class="changelog-content">
      <div class="changelog-section">
        <div class="changelog-section-title">💥 New Features</div>
          <div>Component: 
            <a class="e-link e-link--inline" href="https://design.elvia.io/components/content-loader#Overview">Content loader</a>,
              <a class="e-link e-link--inline" href="https://design.elvia.io/brand/color#Overview">Color</a> &
            <a class="e-link e-link--inline" href="https://design.elvia.io/components/button#Overview">Button</a> 
          </div>
          <ul class="e-list">
            <li>
              Content loader has new modifier for grey backgrounds.
            </li>
            <li>
              Red signal color has been updated, #FF0000 -> #EE0701, for better contrast and validation against both black and white.
            </li>
            <li>
              The danger button hover color has been changed and documentation for more use cases has been updated. Disabled states have also been added to documentation.
            </li>
          </ul>
        </div>
      </div>
      <div class="changelog-section">
        <div class="changelog-section-title">🐝 Bug Fixes</div>
        <div>Component: 
          <a class="e-link e-link--inline" href="https://design.elvia.io/components/table#Overview">Table</a>,
          <a class="e-link e-link--inline" href="https://design.elvia.io/components/button#Overview">Button</a> &
          <a class="e-link e-link--inline" href="https://design.elvia.io/components/accordion#Overview">Accordion</a>
        </div>
        <ul class="e-list">
          <li>
            Subtitles in tables on mobile have updated typography using the design system typographies.
          </li>
          <li>
            Deprecated danger icon button, removed documentation, and fixed an hover bug for inverted icon button.
          </li>
          <li>
            Group accordion have updated spacing between title and text. 
          </li>
        </ul>
      </div>
    </td>
  </tr>

  <tr class="changelog-row changelog-divider py-5">
    <td class="changelog-date">
    <span class="e-title-sm">
      7.7.1
    </span>
    <br>
    <span class="changelog-date-span">
      April 30, 2021
    </span>
    </td>
    <td class="changelog-content">
      <div class="changelog-section-title">💥 New Features</div>
        <div>Component: 
          <a class="e-link e-link--inline" href="https://design.elvia.io/brand/icon#Overview">Icon</a>
        </div>
        <ul class="e-list">
          <li>
            New icons added. 
          </li>
        </ul>
      </div>
    </td>
  </tr>

  <tr class="changelog-row changelog-divider py-5">
    <td class="changelog-date">
    <span class="e-title-sm">
      7.7.0
    </span>
    <br>
    <span class="changelog-date-span">
      April 15, 2021
    </span>
    </td>
    <td class="changelog-content">
      <div class="changelog-section-title">💥 New Features</div>
        <div>Component: 
          <a class="e-link e-link--inline" href="https://design.elvia.io/components/table#Overview">Table</a> &
          <a class="e-link e-link--inline" href="https://design.elvia.io/components/input#Overview">Input</a> 
        </div>
        <ul class="e-list">
          <li>
            Documentation for different actions in tables have been added, like inputs, buttons, selects and links. Sorting for tables is also updated, with new icons and functionality, but old functionality will not break. 
          </li>
          <li>
            Compact inputs without labels are now possible to use.
          </li>
        </ul>
      </div>
      <div class="changelog-section">
        <div class="changelog-section-title">🐝 Bug Fixes</div>
        <div>Component: 
          <a class="e-link e-link--inline" href="https://design.elvia.io/components/label#Overview">Label</a>
        </div>
        <ul class="e-list">
          <li>
            Updated labels with nowrap, font-wight and font-family to avoid inheriting wrong style.
          </li>
        </ul>
      </div>
    </td>
  </tr>

  <tr class="changelog-row changelog-divider py-5">
    <td class="changelog-date">
    <span class="e-title-sm">
      7.6.1
    </span>
    <br>
    <span class="changelog-date-span">
      April 6, 2021
    </span>
    </td>
    <td class="changelog-content">
      <div class="changelog-section">
        <div class="changelog-section-title">🐝 Bug Fixes</div>
        <div>Component: 
          <a class="e-link e-link--inline" href="https://design.elvia.io/components/accordion#Overview">Accordion</a>
        </div>
        <ul class="e-list">
          <li>
          Update to icons(from 32px to 24px), and font-size(18px to 20px) for large accordions. 
          </li>
        </ul>
      </div>
    </td>
  </tr>

  <tr class="changelog-row changelog-divider py-5">
    <td class="changelog-date">
    <span class="e-title-sm">
      7.6.0
    </span>
    <br>
    <span class="changelog-date-span">
      March 29, 2021
    </span>
    </td>
    <td class="changelog-content">
      <div class="changelog-section">
        <div class="changelog-section-title">💥 New Features</div>
        <div>Component: 
          <a class="e-link e-link--inline" href="https://design.elvia.io/components/tooltip#Overview">Tooltip</a>
        </div>
        <ul class="e-list">
          <li>
          Tooltips now have left and right alignment classes
          </li>
        </ul>
      </div>
    </td>
  </tr>

  <tr class="changelog-row changelog-divider py-5">
    <td class="changelog-date">
    <span class="e-title-sm">
      7.4.0
    </span>
    <br>
    <span class="changelog-date-span">
      March 12, 2021
    </span>
    </td>
    <td class="changelog-content">
      <div class="changelog-section">
        <div class="changelog-section-title">💥 New Features</div>
        <div>Component: 
          <a class="e-link e-link--inline" href="https://design.elvia.io/components/link#Overview">Link</a> &
          <a class="e-link e-link--inline" href="https://design.elvia.io/brand/icon#Overview">Icon</a>
        </div>
        External links and icons have been replaced with New tab links and icons. After discussions and research about External link VS New tab link, it is now clear that we only need one of them, which can stand for both uses.
        <ul class="e-list">
          <li>
            External links have been deprecated and replaced by New tab links. <span class="code-text">e-link--external</span> will automatically work as <span class="code-text">e-link--new-tab</span> instead.
          </li>
          <li>
            External icons have also been deprecated in this context: <span class="code-text">arrow_external</span> and <span class="code-text">arrow_external-bold</span> now points to the new tab icon <span class="code-text">new_tab-bold</span>.
          </li>
        </ul>
      </div>
    </td>
  </tr>

  <tr class="changelog-row changelog-divider py-5">
    <td class="changelog-date">
    <span class="e-title-sm">
      7.3.0
    </span>
    <br>
    <span class="changelog-date-span">
      March 11, 2021
    </span>
    </td>
    <td class="changelog-content">
      <div class="changelog-section">
        <div class="changelog-section-title">💥 New Features</div>
        <div>Component: 
          <a class="e-link e-link--inline" href="https://design.elvia.io/components/checkbox#Overview">Checkbox</a>
        </div>
        <ul class="e-list">
          <li>
          Added documentation for nested checkboxes and added the new state indeterminate.
          </li>
        </ul>
      </div>
      <div class="changelog-section">
        <div class="changelog-section-title">🐝 Bug Fixes</div>
        <div>Component: 
          <a class="e-link e-link--inline" href="https://design.elvia.io/components/checkbox#Overview">Checkbox</a>
        </div>
        <ul class="e-list">
          <li>
          Normal sized checkboxes now has font-size 16px, instead of inheriting their font-size.
          </li>
        </ul>
      </div>
    </td>
  </tr>

  <tr class="changelog-row changelog-divider py-5">
    <td class="changelog-date">
    <span class="e-title-sm">
      7.2.0
    </span>
    <br>
    <span class="changelog-date-span">
      March 10, 2021
    </span>
    </td>
    <td class="changelog-content">
      <div class="changelog-section">
        <div class="changelog-section-title">💥 New Features</div>
        <div>Component: 
          <a class="e-link e-link--inline" href="https://design.elvia.io/brand/typography#Overview">Typography</a>
        </div>
        <ul class="e-list">
          <li>
            Using <span class="code-text">b</span> and <span class="code-text">strong</span> elements inside our text-classes (not title classes), will now give <span class="code-text">font-weight: 500</span>, to make it easier to use bold versions of our typography in all types of applications. Example:
            <div class="e-text-sm">
              <span class="code-text">&lt;p class="e-text-sm"&gt;</span>
                <div class="changelog-section-margin">
                  <div>Text styled as text sm.</div>
                  <b><span class="code-text">&lt;b&gt;</span>This text will have e-text-sm style, but with font-weight 500 <span class="code-text">&lt;/b&gt;</span></b>
                </div>
              <span class="code-text">&lt;/p&gt;</span>
            </div>
          </li>
        </ul>
      </div>
    </td>
  </tr>

  <tr class="changelog-row changelog-divider py-5">
    <td class="changelog-date">
    <span class="e-title-sm">
      7.1.0
    </span>
    <br>
    <span class="changelog-date-span">
      February 26, 2021
    </span>
    </td>
    <td class="changelog-content">
      <div class="changelog-section">
        <div class="changelog-section-title">💥 New Features</div>
        <div>Component: 
          <a class="e-link e-link--inline" href="https://design.elvia.io/components/content-loader#Overview">Content loader</a>
        </div>
        <ul class="e-list">
          <li>
          Content loader for dark backgrounds added: <span class="code-text">e-content-loader--inverted</span>.
          </li>
        </ul>
      </div>
      <div class="changelog-section">
        <div class="changelog-section-title">🐝 Bug Fixes</div>
        <div>Component: 
          <a class="e-link e-link--inline" href="https://design.elvia.io/components/typography#Overview">Typography</a>
        </div>
        <ul class="e-list">
          <li>
          Typography now has Verdana as fallback font.
          </li>
        </ul>
      </div>
    </td>
  </tr>

  <tr class="changelog-row changelog-divider py-5">
    <td class="changelog-date">
    <span class="e-title-sm">
      7.0.0
    </span>
    <br>
    <span class="changelog-date-span">
      February 23, 2021
    </span>
    </td>
    <td class="changelog-content">
      <div class="changelog-section">
        <div class="changelog-section-title">✂️ Breaking Changes</div>
        <div>Components: 
          <a class="e-link e-link--inline" href="https://design.elvia.io/components/link#Overview">Link</a>,
          <a class="e-link e-link--inline" href="https://design.elvia.io/brand/typography#Overview">Typography</a> & 
          <a class="e-link e-link--inline" href="https://design.elvia.io/components/search#Overview">Search</a>
        </div>
        <ul class="e-list">
          <li>
            Documentation on links is updated and usage of different links made clearer. Breaking changes are; Forward links should be replaced by action links, back links should be replaced and now uses the --back modifier, and jumbo links uses a new icon.
          </li>
          <li>
            Typography now has no specified text-align except those with text-align center. All components now also include left-alignment inside the component itself.
          </li>
          <li>
          <span class="code-text">e-search--local</span> have been replaced by two new search variants; <span class="code-text">e-search--instant</span> & <span class="code-text">e-search--on-submit</span>.
          The class <span class="code-text">e-search--global</span> has also been removed and is no longer supported in Elvis. 
          </li>
        </ul>
      </div>
      <div class="changelog-section">
      <div class="e-mt-8">
          How to fix:
          <ul class="e-list">
          <li>
            Jumbo links can be fixed by just changing <span class="code-text">e-icon--arrow_right-bold</span> to <span class="code-text">e-icon--arrow_long_right-bold</span>. 
          </li>
          <li>
            For back and forward links read the documentation with examples to replace these.
          </li>
          <li>
            Typography should fix itself where there were problems with the previous change. Otherwise this change should not change any layout behavior.
          </li>
          <li>
            Search classes must be replaced by the new classes, see documentation for examples. 
          </li>
        </ul>
        </div>
      </div>
      <div class="changelog-section">
        <div class="changelog-section-title">💥 New Features</div>
        <div>Component: 
          <a class="e-link e-link--inline" href="https://design.elvia.io/components/card#Overview">Card</a>
        </div>
        <ul class="e-list">
          <li>
          New modifier class added for cards that only contain text: <span class="code-text">e-card--text-only</span>.
          </li>
        </ul>
      </div>
    </td>
  </tr>

  <tr class="changelog-row changelog-divider py-5">
    <td class="changelog-date">
    <span class="e-title-sm">
      6.3.0
    </span>
    <br>
    <span class="changelog-date-span">
      February 10, 2021
    </span>
    </td>
    <td class="changelog-content">
      <div class="changelog-section">
        <div class="changelog-section-title">💥 New Features</div>
        <div>Component: 
          <a class="e-link e-link--inline" href="https://design.elvia.io/components/table#Overview">Table</a>
        </div>
        <ul class="e-list">
          <li>
          Compact class for table-footnote, <span class="code-text">e-table__footnote--compact</span>, and smaller table-cell class, <span class="code-text">e-table__cell--multiline-small</span>, added.
          </li>
        </ul>
    </td>
  </tr>

  <tr class="changelog-row changelog-divider py-5">
    <td class="changelog-date">
    <span class="e-title-sm">
      6.2.0
    </span>
    <br>
    <span class="changelog-date-span">
      January 28, 2021
    </span>
    </td>
    <td class="changelog-content">
      <div class="changelog-section">
        <div class="changelog-section-title">💥 New Features</div>
        <div>Component: 
          <a class="e-link e-link--inline" href="https://design.elvia.io/brand/icons#Overview">Icons</a>
        </div>
        <ul class="e-list">
          <li>
          Icons have been updated, some have been deprecated and new icons have been added.
          </li>
        </ul>
      </div>
    </td>

  </tr>

  <tr class="changelog-row changelog-divider py-5">
    <td class="changelog-date">
    <span class="e-title-sm">
      6.1.0
    </span>
    <br>
    <span class="changelog-date-span">
      January 21, 2021
    </span>
    </td>
    <td class="changelog-content">
      <div class="changelog-section">
        <div class="changelog-section-title">💥 New Features</div>
        <div>Component: 
          <a class="e-link e-link--inline" href="https://design.elvia.io/components/divider#Overview">Divider</a>
        </div>
        <ul class="e-list">
          <li>
          Divider component has been added.
          </li>
        </ul>
    </td>
  </tr>

  <tr class="changelog-row changelog-divider py-5">
    <td class="changelog-date">
    <span class="e-title-sm">
      6.0.0
    </span>
    <br>
    <span class="changelog-date-span">
      January 18, 2021
    </span>
    </td>
    <td class="changelog-content">
      <div class="changelog-section">
        <div class="changelog-section-title">✂️ Breaking Changes</div>
        <div>Component: 
          <a class="e-link e-link--inline" href="https://design.elvia.io/components/input#Overview">Input</a>
        </div>
        <ul class="e-list">
          <li>
          Input with icons are now using icon buttons instead of just icons. Replace the icons with the button in the <a class="e-link e-link--inline" href="https://design.elvia.io/components/input#Overview">input doc</a>. If you have been using the same structure in a date- or time-picker you may also need to replace this part with the button.
          </li>
        </ul>
    </td>
  </tr>

  <tr class="changelog-row changelog-divider py-5">
    <td class="changelog-date">
    <span class="e-title-sm">
      5.1.0
    </span>
    <br>
    <span class="changelog-date-span">
      January 13, 2021
    </span>
    </td>
    <td class="changelog-content">
      <div class="changelog-section">
        <div class="changelog-section-title">💥 New Features</div>
        <div>Component: 
          <a class="e-link e-link--inline" href="https://design.elvia.io/brand/Typography#Overview">Typography</a>
        </div>
        <ul class="e-list">
          <li>
          Strong and light versions of body text have been added, as well as on special text called 'micro'. 
          </li>
        </ul>
    </td>
  </tr>

  <tr class="changelog-row changelog-divider py-5">
    <td class="changelog-date">
    <span class="e-title-sm">
      5.0.0
    </span>
    <br>
    <span class="changelog-date-span">
      January 06, 2021
    </span>
    </td>
    <td class="changelog-content">
      <div class="changelog-section">
        <div class="changelog-section-title">✂️ Breaking Changes</div>
        <div>Component: 
          <a class="e-link e-link--inline" href="https://design.elvia.io/components/search#Overview">Search</a>
        </div>
        <ul class="e-list">
          <li>
            The search bar component has changed the default search icon. The size of the search and close icons has also been adjusted for both local and global search.
            <div class="e-mt-8">
              How to fix:
              <div class="how-to-fix-description">
                The changes only affect icon used to display a search bar. The only thing needed to fix this is to replace the <span class="code-text">e-icon--search-bold</span> icon with the new  <span class="code-text">e-icon--search-color</span>
              </div>
            </div>
          </li>
        </ul>
    </td>
  </tr>

  <tr class="changelog-row changelog-divider py-5">
    <td class="changelog-date">
    <span class="e-title-sm">
      4.7.0
    </span>
    <br>
    <span class="changelog-date-span">
      January 05, 2021
    </span>
    </td>
    <td class="changelog-content">
      <div class="changelog-section">
        <div class="changelog-section-title">💥 New Features</div>
        <div>Component: 
          <a class="e-link e-link--inline" href="https://design.elvia.io/brand/icon#Overview">Icons</a>
        </div>
        <ul class="e-list">
          <li>
              New icon structure, enabling elvis to deprecate and rename old icons. Use of deprecated icons will also be warned in console with reference to in which version of elvis the icon was deprecated, and what new icon should be used instead.
            </li>
            <li>
              New icons from figma has also been added to elvis and search icons had been updated!
            </li>
        </ul>
    </td>
  </tr>

  <tr class="changelog-row changelog-divider py-5">
    <td class="changelog-date">
    <span class="e-title-sm">
      4.6.0
    </span>
    <br>
    <span class="changelog-date-span">
      December 22, 2020
    </span>
    </td>
    <td class="changelog-content">
      <div class="changelog-section">
        <div class="changelog-section-title">💥 New Features</div>
        <div>Component: 
          <a class="e-link e-link--inline" href="https://design.elvia.io/components/typography#Overview">Typography</a>
        </div>
        <div>
          <ul class="e-list">
            <li>
            Added alignment to typography.
            </li>
          </ul>
        </div>
    </td>
  </tr>

  <tr class="changelog-row changelog-divider py-5">
    <td class="changelog-date">
    <span class="e-title-sm">
      4.5.0
    </span>
    <br>
    <span class="changelog-date-span">
      December 9, 2020
    </span>
    </td>
    <td class="changelog-content">
      <div class="changelog-section">
        <div class="changelog-section-title">💥 New Features</div>
        <div>Component: 
          <a class="e-link e-link--inline" href="https://design.elvia.io/components/header#Overview">Icon Button</a>
        </div>
        <div>
          <ul class="e-list">
            <li>
            The <span class="code-text changelog-code">e-btn--loading</span> modifier for <span class="code-text changelog-code">e-btn</span> has been updated, and can now also be applied to an icon button
            </li>
          </ul>
        </div>
    </td>
  </tr>

  <tr class="changelog-row changelog-divider py-5">
    <td class="changelog-date">
    <span class="e-title-sm">
      4.0.0
    </span>
    <br>
    <span class="changelog-date-span">
      November 19, 2020
    </span>
    </td>
    <td class="changelog-content">
      <div class="changelog-section">
        <div class="changelog-section-title">✂️ Breaking Changes</div>
        <div>Component: 
          <a class="e-link e-link--inline" href="https://design.elvia.io/components/header#Overview">Header</a>
        </div>
        <ul class="e-list">
          <li>
            The header structure has changed so that the title is left aligned on desktop and tablet instead of center aligned.
            This require that the top menu grid changes a little and that the title is added to the first column as well.
         
              How to fix:
              <div class="how-to-fix-description">
                The changes only affect the 'LOGO + APP' section.
                    The fastest way to fix it if to search for the section called 'LOGO + APP' under the 'TOP MENU ~ DESKTOP'. Change the first div with the 'col' classes to this:
                    <div class="code-text changelog-code">&lt;div class="col-xs-2 col-sm-3 col-md-7 col-lg-8"&gt;</div>
                    Then add these two lines at the bottom inside of the same div:
                    <div class="code-text changelog-code">
                      &lt;span class="e-header__top-bar-desktop__line e-mx-32"&gt;&lt;/span&gt;
                      <br />
                      &lt;div class="e-header__top-bar-desktop__title">TITLE&lt;/div&gt;
                    </div>
                
                    The other way is to replace the entire 'LOGO + APP' section with the examples showed in the documentation, and then add the information back where you lost it.
              </div>
         
          </li>
        </ul>
    </td>
  </tr>

  <tr class="changelog-row changelog-divider py-5">
    <td class="changelog-date">
    <span class="e-title-sm">
      3.0.0
    </span>
    <br>
    <span class="changelog-date-span">
      Oktober 20, 2020
    </span>
    </td>
    <td class="changelog-content">
      <div class="changelog-section">
        <div class="changelog-section-title">✂️ Breaking Changes</div>
        <div>Component: 
          <a class="e-link e-link--inline" href="https://design.elvia.io/components/popover#Overview">Popover</a>
        </div>
        <ul class="e-list">
          <li>
          The e-popover alignements classes for left and right positions have been renamed and refactored.
          </li>
              <div class="e-mt-8">
            How to fix:
              <li>
                <span class="code-text changelog-code">e-popover--top--left</span> -> <span class="code-text changelog-code">e-popover--left</span>
              </li>
              <li>
                <span class="code-text changelog-code">e-popover--bottom--left</span> -> <span class="code-text changelog-code">e-popover--bottom e-popover--left</span>
              </li>
              <li>
                <span class="code-text changelog-code">e-popover--top--right</span> -> <span class="code-text changelog-code">e-popover--right</span>
              </li>
              <li>
                <span class="code-text changelog-code">e-popover--bottom--right</span> -> <span class="code-text changelog-code">e-popover--bottom e-popover--right</span>
              </li>
              </ul>
          </div>
        </div>
      <div class="changelog-section">
        <div class="changelog-section-title">💥 New Features</div>
          <div>Component: 
            <a class="e-link e-link--inline" href="https://design.elvia.io/components/popover#Overview">Popover</a>
          </div>
          <div>
            <ul class="e-list">
              <li>
              Classes for aligning 50% to the left or right from the middle.
              </li>
            <li>
              <span class="code-text changelog-code">e-popover--left-50</span>
            </li>
            <li>
              <span class="code-text changelog-code">e-popover--right-50</span>
            </li>
            <li>
              Classes for sizing popover smaller when is has limited space.
            </li>
            <li>
              <span class="code-text changelog-code">e-popover--w-200</span>
            </li>
            <li>
              <span class="code-text changelog-code">e-popover--w-220</span>
            </li>
            <li>
              <span class="code-text changelog-code">e-popover--w-240</span>
            </li>
            <li>
              <span class="code-text changelog-code">e-popover--w-260</span>
            </li>
          </ul>
      </div>
    </td>
  </tr>

  <tr class="changelog-row changelog-divider py-5">
    <td class="changelog-date">
    <span class="e-title-sm">
      2.0.0
    </span>
    <br>
    <span class="changelog-date-span">
      September 30, 2020
    </span>
    </td>
    <td class="changelog-content">
        <div class="changelog-section">
         <div class="changelog-section-title">✂️ Breaking Changes</div>
          <div class="e-mt-24">
           <div>Component: 
          <a class="e-link e-link--inline" href="https://design.elvia.io/components/accordion#Overview">Accordion</a>
                        <a class="e-link e-link--inline" href="https://design.elvia.io/components/header#Overview">Header</a>
                        <a class="e-link e-link--inline" href="https://design.elvia.io/components/table#Overview">Table</a>
        </div>
            <ul class="e-list">
              <li>
                The e-accordion__label has now been renamed to e-accordion__title. The e-accordion__label class is still available, but only in combination with the e-accordion--group modifier, and e-accordion__label is the container class for e-accordion__title and e-accordion__icon in a group accordion. 
                </li>
                <li>
                <span class="code-text changelog-code">e-header</span> is now added in front of all classes, following the BEM standard. Desktop top-bar classes now include the word 'desktop', like on mobile e.g. <span class="code-text changelog-code">e-header__top-bar-desktop__link</span>.
                <div class="e-mt-8">
                How to fix:
                <div class="how-to-fix-description">
                The easiest way to fix an existing header is to search and replace the classes listed here with the new classes.
                </div>
                    <span class="code-text changelog-code">e-top-bar</span> -> <span class="code-text changelog-code">e-header__top-bar</span>
                    <span class="code-text changelog-code">e-sidebar</span> -> <span class="code-text changelog-code">e-header__sidebar</span>
                    <span class="code-text changelog-code">top-bar__</span> -> <span class="code-text changelog-code">top-bar-desktop__</span>
                </li>
                <li>
                    The design and structure of tables have been updated. Tables with black headers have been removed and a wrapper class has been added.
                      How to fix:
                      <div class="how-to-fix-description">
                        Add an element with the <span class="code-text changelog-code">e-table-container</span> class outside the element with the <span class="code-text changelog-code">e-table</span> class.
                      </div>
                          <span class="code-text changelog-code">e-table</span> -> <span class="code-text changelog-code">e-table-container e-table</span>
                </li>
            </ul>
          </div>
        </div>
      <div class="changelog-section">
        <div class="changelog-section-title">💥 New Features</div>
           <div>Component: 
          <a class="e-link e-link--inline" href="https://design.elvia.io/components/table#Overview">Table</a>
        </div>
        <ul class="e-list">
          <li>
          A class for adding footnotes to the table has been created: <span class="code-text changelog-code">e-table-footnote</span>.
          </li>
        </ul>
      </div>
    </td>
  </tr>

  <tr class="changelog-row changelog-divider py-5">
    <td class="changelog-date">
    <span class="e-title-sm">
      1.0.0
    </span>
    <br>
    <span class="changelog-dato">
      August 12, 2020
    </span>
    </td>
    <td class="changelog-content">
      <div class="changelog-section">
        <div class="changelog-section-title">✂️ Breaking Changes</div>
        <div>Component: 
          <a class="e-link e-link--inline" href="https://design.elvia.io/components/card#Overview">Cards</a>,
          <a class="e-link e-link--inline" href="https://design.elvia.io/components/header#Overview">Header</a>,
          <a class="e-link e-link--inline" href="https://design.elvia.io/components/link#Type">Jumbo link</a>,
          <a class="e-link e-link--inline" href="https://design.elvia.io/components/modal#Overview">Modal</a>
        </div>
        <ul class="e-list">
          <li>
            Some of the typography has new font-sizes and line-heights. The changes will affect the appearance of the typography where it is used and may need to be updated. Some components we offer have also changed typography which means some minor visual differences to these components.
          </li>
        </ul>
      </div>
      <div class="changelog-section">
        <div class="changelog-section-title">💥 New Features</div>
           <div>Component: 
          <a class="e-link e-link--inline" href="https://design.elvia.io/components/typography#Overview">Typography</a>
        </div>
        <ul class="e-list">
          <li>
          A new smaller title has been added: <span class="code-text changelog-code">e-title-xs</span>.
          </li>
        </ul>
      </div>
    </td>
  </tr>

  <tr class="changelog-row changelog-divider py-5">
    <td class="changelog-date">
    <span class="e-title-sm">
      0.11.0
    </span>
    <br>
    <span class="changelog-dato">
      August 5, 2020
    </span>
    </td>
    <td class="changelog-content">
      <div class="changelog-section">
        <div class="changelog-section-title">✂️ Breaking Changes</div>
        <div>
          Component: 
          <a class="e-link e-link--inline" href="https://design.elvia.io/components/modal#Overview">Modal</a>,
          <a class="e-link e-link--inline" href="https://design.elvia.io/components/popover#Overview">Popover</a>
        </div>
        <ul class="e-list">
          <li>
            All <span class="code-text changelog-code">---visible</span> classes for modal and popover components are removed. New utility classes are added instead for showing and hiding elements. If you are using the modal or popover components you now have to use the new utility classes for hiding and showing. Theses components are by default now always visible.
            <div class="e-mt-8">
              How to fix:
              <div class="how-to-fix-description">
                Add the <span class="code-text changelog-code">e-none</span> or <span class="code-text changelog-code">e-invisble</span> utility classes to toggle the components. 
              </div>
                  <span class="code-text changelog-code">e-component---visible</span> -> <span class="code-text changelog-code">e-none</span> & <span class="code-text changelog-code">e-invisible</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="changelog-section">
        <div class="changelog-section-title">💥 New Features</div>
        <div>Component: 
          <a class="e-link e-link--inline" href="https://design.elvia.io/brand/utilities">Utility classes</a>
        </div>
        <ul class="e-list">
          <li>
          New utility classes have been added.
          </li>
        </ul>
      </div>
    </td>
  </tr>

  <tr class="changelog-row changelog-divider py-5">
    <td class="changelog-date">
    <span class="e-title-sm">
      0.10.0
    </span>
    <br>
    <span class="changelog-dato">
      July 27, 2020
    </span>
    </td>
    <td class="changelog-content">
      <div class="changelog-section">
        <div class="changelog-section-title">✂️ Breaking Changes</div>
        <div>Component: 
          <a class="e-link e-link--inline" href="https://design.elvia.io/brand/grid#Overview">Grid</a>
        </div>
        <ul class="e-list">
          <li>
            If you are using the grid-classes some might have to be updated to work as usual. The classes that have changed / been added:
                <span class="code-text changelog-code">e-grid-margin</span> -> <span class="code-text changelog-code">e-grid-margin-ext</span> + <span class="code-text changelog-code">e-grid-margin-int</span>
                <span class="code-text changelog-code">e-custom-gutters</span> -> <span class="code-text changelog-code">e-grid-gutters-ext</span> +
                <span class="code-text changelog-code">e-grid-gutters-int</span> + <span class="code-text changelog-code">e-grid-gutters-vertical</span>@
          </li>
        </ul>
      </div>
      <div class="changelog-section">
        <div class="changelog-section-title">💥 New Features</div>
        <div>Component: 
          <a class="e-link e-link--inline" href="https://design.elvia.io/brand/grid#Overview">Grid</a>
        </div>
        <ul class="e-list">
          <li>
          New classes have been added for the internal-systems as well as classes for vertical gutters.
          </li>
        </ul>
      </div>
    </td>
  </tr>

  <tr class="changelog-row changelog-divider py-5">
    <td class="changelog-date">
    <span class="e-title-sm">
      0.7.0
    </span>
    <br>
    <span class="changelog-dato">
      June 4, 2020
    </span>
    </td>
    <td class="changelog-content">
      <div class="changelog-section">
        <div class="changelog-section-title">✂️ Breaking Changes</div>
        <ul class="e-list">
          <li>
            Switched from @import to @use. The @use rule is the primary replacement for @import, which will be deprecated in near future (2022 latest). @use is currently not supported by the node-sass compiler. Dart-sass is the primary implementation of Sass and do support the use of @use. Read more about the advantages of @use here:
            <a class="e-link e-link--inline" href="https://sass-lang.com/blog/the-module-system-is-launched">Sass module system</a>
            <div class="e-mt-8">
              How to fix:
              <div class="how-to-fix-description">
              If you are using our stylesheets directly and your sass-compiler do not support the use of @use you will have to migrate as well.
              </div>
            </div>
          </li>
        </ul>
      </div>
    </td>
  </tr>

  <tr class="changelog-row changelog-divider py-5">
    <td class="changelog-date">
    <span class="e-title-sm">
      0.6.0
    </span>
    <br>
    <span class="changelog-dato">
      June 3, 2020
    </span>
    </td>
    <td class="changelog-content">
      <div class="changelog-section">
        <div class="changelog-section-title">✂️ Breaking Changes</div>
        <ul class="e-list">
          <li>
          Switched from node-sass compiler to dart-sass compiler. Dart-sass is the primary implementation of Sass, which means it gets new features before any other implementation and at current time node-sass do not support the use of @use, which is the module system replacing @import. This might not affect you as a user.
          </li>
        </ul>
      </div>
    </td>
  </tr>

  <tr class="changelog-row changelog-divider py-5">
    <td class="changelog-date">
    <span class="e-title-sm">
      0.5.0
    </span>
    <br>
    <span class="changelog-dato">
      May 20, 2020
    </span>
    </td>
    <td class="changelog-content">
      <div class="changelog-section">
        <div class="changelog-section-title">✂️ Breaking Changes</div>
        <div>Component: 
          <a class="e-link e-link--inline" href="https://design.elvia.io/brand/icon#Overview">Icons</a> 
        </div>
        <ul class="e-list">
          <li>
          Major renaming of icons. All icons now follow the correct and desired naming scheme for a maintainable library. Icon names have changed, so some references should be expected to now be broken
          </li>
        </ul>
      </div>
    </td>
  </tr>

  <tr class="changelog-row changelog-divider py-5">
    <td class="changelog-date">
    <span class="e-title-sm">
      0.4.0
    </span>
    <br>
    <span class="changelog-dato">
      May 19, 2020
    </span>
    </td>
    <td class="changelog-content">
      <div class="changelog-section">
        <div class="changelog-section-title">✂️ Breaking Changes</div>
        <div>Component: 
          <a class="e-link e-link--inline"  href="https://design.elvia.io/brand/icon#Overview">Icons</a> 
        </div>
        <ul class="e-list">
          <li>
          In this update icons are injected as background-images again on the 'i' tags with <span class="code-text changelog-code">e-icon</span> classes. We do not think this will have a large impact on how to use icons.
          </li>
        </ul>
      </div>
    </td>
  </tr>

  <tr class="changelog-row changelog-divider py-5">
    <td class="changelog-date">
    <span class="e-title-sm">
      0.3.0
    </span>
    <br>
    <span class="changelog-dato">
      May 14, 2020
    </span>
    </td>
    <td class="changelog-content">
      <div class="changelog-section">
        <div class="changelog-section-title">✂️ Breaking Changes</div>
        <div>Component: 
          <a class="e-link e-link--inline" href="https://design.elvia.io/components/button#Overview">Buttons</a> 
        </div>
        <ul class="e-list">
          <li>
          In this update we provided a solution for icons changing colors on hover. This affected buttons particularly. The structure of a button with icon was changed.
          </li>
        </ul>
      </div>
    </td>
  </tr>

  <tr class="changelog-row changelog-divider py-5">
    <td class="changelog-date">
    <span class="e-title-sm">
      0.2.0
    </span>
    <br>
    <span class="changelog-dato">
      May 14, 2020
    </span>
    </td>
    <td class="changelog-content">
      <div>
        <div class="changelog-section-title">✂️ Breaking Changes</div>
        <div>Component: 
          <a class="e-link e-link--inline" href="https://design.elvia.io/components/input#Overview">Inputs</a> 
        </div>
        <ul class="e-list">
          <li>
            In this update outline was changes to work on IE11 and Firefox. The input field structure had to be updated because of the outline changes.
          </li>
        </ul>
      </div>
    </td>
  </tr>
</table>
