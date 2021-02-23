<!-- ✂️ - BREAKING CHANGE -->
<!-- 💥 - NEW FEATURES -->
<!-- 🐝 - BUG FIXES -->

<table>
  <tr class="changelog-row">
    <td class="e-w-25 changelog-date">
    <span class="e-title-sm">
      7.0.0
    </span>
    <br>
    <span>
      February 23, 2021
    </span>
    </td>
    <td class="changelog-content">
      <div class="changelog-section">
        <div class="changelog-section-title">✂️ Breaking changes</div>
        <div>Components: 
          <a class="e-link e-link--inline" href="https://design.elvia.io/components/link#Overview">Link</a>,
          <a class="e-link e-link--inline" href="https://design.elvia.io/identity/typography#Overview">Typography</a> & 
          <a class="e-link e-link--inline" href="https://design.elvia.io/components/search#Overview">Search</a>
        </div>
        <ul>
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
        <div class="e-mt-8">
          How to fix:
          <ul>
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
      <div class="changelog-content">
        <div class="changelog-section-title">💥 New Features</div>
        <div>Component: 
          <a class="e-link e-link--inline" href="https://design.elvia.io/components/card#Overview">Card</a>
        </div>
        New modifier class added for cards that only contain text: <span class="code-text">e-card--text-only</span>.
      </div>
      <div class="changelog-divider"></div>
    </td>
  </tr>

  <tr class="changelog-row">
    <td class="e-w-25 changelog-date">
    <span class="e-title-sm">
      6.3.0
    </span>
    <br>
    <span>
      February 10, 2021
    </span>
    </td>
    <td class="changelog-content">
      <div class="changelog-section">
        <div class="changelog-section-title">💥 New Features</div>
        <div>Component: 
          <a class="e-link e-link--inline" href="https://design.elvia.io/components/table#Overview">Table</a>
        </div>
        Compact class for table-footnote, <span class="code-text">e-table__footnote--compact</span>, and smaller table-cell class, <span class="code-text">e-table__cell--multiline-small</span>, added.
      <div class="changelog-divider"></div>
    </td>
  </tr>

  <tr class="changelog-row">
    <td class="e-w-25 changelog-date">
    <span class="e-title-sm">
      6.2.0
    </span>
    <br>
    <span>
      January 28, 2021
    </span>
    </td>
    <td class="changelog-content">
      <div class="changelog-section">
        <div class="changelog-section-title">💥 New Features</div>
        <div>Component: 
          <a class="e-link e-link--inline" href="https://design.elvia.io/identity/icons#Overview">Icons</a>
        </div>
        Icons have been updated, some have been deprecated and new icons have been added.
        <div class="changelog-divider"></div>
      </div>
    </td>
  </tr>

  <tr class="changelog-row">
    <td class="e-w-25 changelog-date">
    <span class="e-title-sm">
      6.1.0
    </span>
    <br>
    <span>
      January 21, 2021
    </span>
    </td>
    <td class="changelog-content">
      <div class="changelog-section">
        <div class="changelog-section-title">💥 New Features</div>
        <div>Component: 
          <a class="e-link e-link--inline" href="https://design.elvia.io/components/divider#Overview">Divider</a>
        </div>
        Divider component has been added.
      <div class="changelog-divider"></div>
    </td>
  </tr>

  <tr class="changelog-row">
    <td class="e-w-25 changelog-date">
    <span class="e-title-sm">
      6.0.0
    </span>
    <br>
    <span>
      January 18, 2021
    </span>
    </td>
    <td class="changelog-content">
      <div class="changelog-section">
        <div class="changelog-section-title">✂️ Breaking changes</div>
        <div>Component: 
          <a class="e-link e-link--inline" href="https://design.elvia.io/components/input#Overview">Input</a>
        </div>
        Input with icons are now using icon buttons instead of just icons. Replace the icons with the button in the <a class="e-link e-link--inline" href="https://design.elvia.io/components/input#Overview">input doc</a>. If you have been using the same structure in a date- or time-picker you may also need to replace this part with the button.
      <div class="changelog-divider"></div>
    </td>
  </tr>

  <tr class="changelog-row">
    <td class="e-w-25 changelog-date">
    <span class="e-title-sm">
      5.1.0
    </span>
    <br>
    <span>
      January 13, 2021
    </span>
    </td>
    <td class="changelog-content">
      <div class="changelog-section">
        <div class="changelog-section-title">💥 New Features</div>
        <div>Component: 
          <a class="e-link e-link--inline" href="https://design.elvia.io/identity/Typography#Overview">Typography</a>
        </div>
        Strong and light versions of body text have been added, as well as on special text called 'micro'. 
      <div class="changelog-divider"></div>
    </td>
  </tr>

  <tr class="changelog-row">
    <td class="e-w-25 changelog-date">
    <span class="e-title-sm">
      5.0.0
    </span>
    <br>
    <span>
      January 06, 2021
    </span>
    </td>
    <td class="changelog-content">
      <div class="changelog-section">
        <div class="changelog-section-title">✂️ Breaking changes</div>
        <div>Component: 
          <a class="e-link e-link--inline" href="https://design.elvia.io/components/search#Overview">Search</a>
        </div>
        The search bar component has changed the default search icon. The size of the search and close icons has also been adjusted for both local and global search. 
        <div class="e-mt-8">
          How to fix:
          The changes only affect icon used to display a search bar. The only thing needed to fix this is to replace the <span class="code-text">e-icon--search-bold</span> icon with the new  <span class="code-text">e-icon--search-color</span>
        </div>
      <div class="changelog-divider"></div>
    </td>
  </tr>

  <tr class="changelog-row">
    <td class="e-w-25 changelog-date">
    <span class="e-title-sm">
      4.7.0
    </span>
    <br>
    <span>
      January 05, 2021
    </span>
    </td>
    <td class="changelog-content">
      <div class="changelog-section">
        <div class="changelog-section-title">💥 New Features</div>
        <div>Component: 
          <a class="e-link e-link--inline" href="https://design.elvia.io/identity/icon#Overview">Icons</a>
        </div>
        <div>
          New icon structure, enabling elvis to deprecate and rename old icons. Use of deprecated icons will also be warned in console with reference to in which version of elvis the icon was deprecated, and what new icon should be used instead. 
        </div>
        <div>
          New icons from figma has also been added to elvis and search icons had been updated!
        </div>
      <div class="changelog-divider"></div>
    </td>
  </tr>

  <tr class="changelog-row">
    <td class="e-w-25 changelog-date">
    <span class="e-title-sm">
      4.6.0
    </span>
    <br>
    <span>
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
          Added alignment to typography.
        </div>
      <div class="changelog-divider"></div>
    </td>
  </tr>

  <tr class="changelog-row">
    <td class="e-w-25 changelog-date">
    <span class="e-title-sm">
      4.5.0
    </span>
    <br>
    <span>
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
          The <span class="code-text changelog-code">e-btn--loading</span> modifier for <span class="code-text changelog-code">e-btn</span> has been updated, and can now also be applied to an icon button
        </div>
      <div class="changelog-divider"></div>
    </td>
  </tr>

  <tr class="changelog-row">
    <td class="e-w-25 changelog-date">
    <span class="e-title-sm">
      4.0.0
    </span>
    <br>
    <span>
      November 19, 2020
    </span>
    </td>
    <td class="changelog-content">
      <div class="changelog-section">
        <div class="changelog-section-title">✂️ Breaking changes</div>
        <div>Component: 
          <a class="e-link e-link--inline" href="https://design.elvia.io/components/header#Overview">Header</a>
        </div>
        The header structure has changed so that the title is left aligned on desktop and tablet instead of center aligned. 
        This require that the top menu grid changes a little and that the title is added to the first column as well.
        <div class="e-mt-8">
          How to fix:
          The changes only affect the 'LOGO + APP' section.
          <ul>
            <li>
              The fastest way to fix it if to search for the section called 'LOGO + APP' under the 'TOP MENU ~ DESKTOP'. Change the first div with the 'col' classes to this:
              <div class="code-text changelog-code">&lt;div class="col-xs-2 col-sm-3 col-md-7 col-lg-8"&gt;</div>
              Then add these two lines at the bottom inside of the same div: 
              <div class="code-text changelog-code">
                &lt;span class="e-header__top-bar-desktop__line e-mx-32"&gt;&lt;/span&gt;
                <br />
                &lt;div class="e-header__top-bar-desktop__title">TITLE&lt;/div&gt;
              </div>
            </li>
            <li>
              The other way is to replace the entire 'LOGO + APP' section with the examples showed in the documentation, and then add the information back where you lost it.
            </li>
          </ul>
        </div>
      <div class="changelog-divider"></div>
    </td>
  </tr>

  <tr class="changelog-row">
    <td class="e-w-25 changelog-date">
    <span class="e-title-sm">
      3.0.0
    </span>
    <br>
    <span>
      Oktober 20, 2020
    </span>
    </td>
    <td class="changelog-content">
      <div class="changelog-section">
        <div class="changelog-section-title">✂️ Breaking changes</div>
        <div>Component: 
          <a class="e-link e-link--inline" href="https://design.elvia.io/components/popover#Overview">Popover</a>
        </div>
        The e-popover alignements classes for left and right positions have been renamed and refactored. 
              <div class="e-mt-8">
            How to fix:
            <ul>
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
        <div class="changelog-section-title">💥 New features</div>
          <div>Component: 
            <a class="e-link e-link--inline" href="https://design.elvia.io/components/popover#Overview">Popover</a>
          </div>
          <div>
            Classes for aligning 50% to the left or right from the middle.
          </div>
            <ul>
            <li>
              <span class="code-text changelog-code">e-popover--left-50</span>
            </li>
            <li>
              <span class="code-text changelog-code">e-popover--right-50</span>
            </li>
          </ul>
          <div>
            Classes for sizing popover smaller when is has limited space.
          </div>
            <ul>
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
      <div class="changelog-divider"></div>
    </td>
  </tr>

  <tr class="changelog-row">
    <td class="e-w-25 changelog-date">
    <span class="e-title-sm">
      2.0.0
    </span>
    <br>
    <span>
      September 30, 2020
    </span>
    </td>
    <td class="changelog-content">
      <div class="changelog-section">
        <div class="changelog-section-title">✂️ Breaking changes</div>
        <div>Component: 
          <a class="e-link e-link--inline" href="https://design.elvia.io/components/accordion#Overview">Accordion</a>
        </div>
        The e-accordion__label has now been renamed to e-accordion__title. The e-accordion__label class is still available, but only in combination with the e-accordion--group modifier, and e-accordion__label is the container class for e-accordion__title and e-accordion__icon in a group accordion. 
        <div class="e-mt-24">
          <div>Component: 
            <a class="e-link e-link--inline" href="https://design.elvia.io/components/header#Overview">Header</a>
          </div>
          <span class="code-text changelog-code">e-header</span> is now added in front of all classes, following the BEM standard. Desktop top-bar classes now include the word 'desktop', like on mobile e.g. <span class="code-text changelog-code">e-header__top-bar-desktop__link</span>. 
          <div class="e-mt-8">
          How to fix:
          The easiest way to fix an existing header is to search and replace the classes listed here with the new classes.
          <ul>
            <li>
              <span class="code-text changelog-code">e-top-bar</span> -> <span class="code-text changelog-code">e-header__top-bar</span>
            </li>
            <li>
              <span class="code-text changelog-code">e-sidebar</span> -> <span class="code-text changelog-code">e-header__sidebar</span>
            </li>
            <li>
              <span class="code-text changelog-code">top-bar__</span> -> <span class="code-text changelog-code">top-bar-desktop__</span>
            </li>
          </ul>
        </div>
        <div class="e-mt-24">
          <div>Component: 
            <a class="e-link e-link--inline" href="https://design.elvia.io/components/table#Overview">Table</a>
          </div>
          The design and structure of tables have been updated. Tables with black headers have been removed and a wrapper class has been added.
          <div class="e-mt-8">
            How to fix:
            Add an element with the <span class="code-text changelog-code">e-table-container</span> class outside the element with the <span class="code-text changelog-code">e-table</span> class.
            <ul>
              <li>
                <span class="code-text changelog-code">e-table</span> -> <span class="code-text changelog-code">e-table-container e-table</span>
              </li>
            </ul>
          </div>
        </div>
      <div class="changelog-section">
        <div class="changelog-section-title">💥 New features</div>
           <div>Component: 
          <a class="e-link e-link--inline" href="https://design.elvia.io/components/table#Overview">Table</a>
        </div>
        A class for adding footnotes to the table has been created: <span class="code-text changelog-code">e-table-footnote</span>.
      </div>
      <div class="changelog-divider"></div>
    </td>
  </tr>

  <tr class="changelog-row">
    <td class="e-w-25 changelog-date">
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
        <div class="changelog-section-title">✂️ Breaking changes</div>
        <div>Component: 
          <a class="e-link e-link--inline" href="https://design.elvia.io/components/card#Overview">Cards</a>,
          <a class="e-link e-link--inline" href="https://design.elvia.io/components/header#Overview">Header</a>,
          <a class="e-link e-link--inline" href="https://design.elvia.io/components/link#Type">Jumbo link</a>,
          <a class="e-link e-link--inline" href="https://design.elvia.io/components/modal#Overview">Modal</a>
        </div>
        Some of the typography has new font-sizes and line-heights. The changes will affect the appearance of the typography where it is used and may need to be updated. Some components we offer have also changed typography which means some minor visual differences to these components. 
      </div>
      <div class="changelog-section">
        <div class="changelog-section-title">💥 New features</div>
           <div>Component: 
          <a class="e-link e-link--inline" href="https://design.elvia.io/components/typography#Overview">Typography</a>
        </div>
        A new smaller title has been added: <span class="code-text changelog-code">e-title-xs</span>.
      </div>
      <div class="changelog-divider"></div>
    </td>
  </tr>

  <tr class="changelog-row">
    <td class="e-w-25 changelog-date">
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
        <div class="changelog-section-title">✂️ Breaking changes</div>
        <div>
          Component: 
          <a class="e-link e-link--inline" href="https://design.elvia.io/components/modal#Overview">Modal</a>,
          <a class="e-link e-link--inline" href="https://design.elvia.io/components/popover#Overview">Popover</a>
        </div>
        All <span class="code-text changelog-code">---visible</span> classes for modal and popover components are removed. New utility classes are added instead for showing and hiding elements. If you are using the modal or popover components you now have to use the new utility classes for hiding and showing. Theses components are by default now always visible.
        <div class="e-mt-8">
          How to fix:
          Add the <span class="code-text changelog-code">e-none</span> or <span class="code-text changelog-code">e-invisble</span> utility classes to toggle the components.
          <ul>
            <li>
              <span class="code-text changelog-code">e-component---visible</span> -> <span class="code-text changelog-code">e-none</span> & <span class="code-text changelog-code">e-invisible</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="changelog-section">
        <div class="changelog-section-title">💥 New features</div>
        <div>Component: 
          <a class="e-link e-link--inline" href="https://design.elvia.io/identity/utilities">Utility classes</a>
        </div>
        New utility classes have been added.
      </div>
      <div class="changelog-divider"></div>
    </td>
  </tr>

  <tr class="changelog-row">
    <td class="e-w-25 changelog-date">
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
        <div class="changelog-section-title">✂️ Breaking changes</div>
        <div>Component: 
          <a class="e-link e-link--inline" href="https://design.elvia.io/identity/grid#Overview">Grid</a>
        </div>
        If you are using the grid-classes some might have to be updated to work as usual. The classes that have changed / been added:
        <ul>
          <li>
            <span class="code-text changelog-code">e-grid-margin</span> -> <span class="code-text changelog-code">e-grid-margin-ext</span> + <span class="code-text changelog-code">e-grid-margin-int</span>
          </li>
          <li>
            <span class="code-text changelog-code">e-custom-gutters</span> -> <span class="code-text changelog-code">e-grid-gutters-ext</span> +
            <span class="code-text changelog-code">e-grid-gutters-int</span> + <span class="code-text changelog-code">e-grid-gutters-vertical</span>
          </li>
        </ul>
      </div>
      <div class="changelog-section">
        <div class="changelog-section-title">💥 New features</div>
        <div>Component: 
          <a class="e-link e-link--inline" href="https://design.elvia.io/identity/grid#Overview">Grid</a>
        </div>
        New classes have been added for the internal-systems as well as classes for vertical gutters.
      </div>
      <div class="changelog-divider"></div>
    </td>
  </tr>

  <tr class="changelog-row">
    <td class="e-w-25 changelog-date">
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
        <div class="changelog-section-title">✂️ Breaking changes</div>
        Switched from @import to @use. The @use rule is the primary replacement for @import, which will be deprecated in near future (2022 latest). @use is currently not supported by the node-sass compiler. Dart-sass is the primary implementation of Sass and do support the use of @use. Read more about the advantages of @use here: 
        <a class="e-link e-link--inline" href="https://sass-lang.com/blog/the-module-system-is-launched">Sass module system</a>
        <div class="e-mt-8">
          How to fix:
          If you are using our stylesheets directly and your sass-compiler do not support the use of @use you will have to migrate as well.
        </div>
      </div>
      <div class="changelog-divider"></div>
    </td>
  </tr>

  <tr class="changelog-row">
    <td class="e-w-25 changelog-date">
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
        <div class="changelog-section-title">✂️ Breaking changes</div>
        Switched from node-sass compiler to dart-sass compiler. Dart-sass is the primary implementation of Sass, which means it gets new features before any other implementation and at current time node-sass do not support the use of @use, which is the module system replacing @import. This might not affect you as a user.
      </div>
      <div class="changelog-divider"></div>
    </td>
  </tr>

  <tr class="changelog-row">
    <td class="e-w-25 changelog-date">
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
        <div class="changelog-section-title">✂️ Breaking changes</div>
        <div>Component: 
          <a class="e-link e-link--inline" href="https://design.elvia.io/identity/icon#Overview">Icons</a> 
        </div>
        Major renaming of icons. All icons now follow the correct and desired naming scheme for a maintainable library. Icon names have changed, so some references should be expected to now be broken
      </div>
      <div class="changelog-divider"></div>
    </td>
  </tr>

  <tr class="changelog-row">
    <td class="e-w-25 changelog-date">
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
        <div class="changelog-section-title">✂️ Breaking changes</div>
        <div>Component: 
          <a class="e-link e-link--inline"  href="https://design.elvia.io/identity/icon#Overview">Icons</a> 
        </div>
        In this update icons are injected as background-images again on the 'i' tags with <span class="code-text changelog-code">e-icon</span> classes. We do not think this will have a large impact on how to use icons.
      </div>
      <div class="changelog-divider"></div>
    </td>
  </tr>

  <tr class="changelog-row">
    <td class="e-w-25 changelog-date">
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
        <div class="changelog-section-title">✂️ Breaking changes</div>
        <div>Component: 
          <a class="e-link e-link--inline" href="https://design.elvia.io/components/button#Overview">Buttons</a> 
        </div>
        In this update we provided a solution for icons changing colors on hover. This affected buttons particularly. The structure of a button with icon was changed.
      </div>
      <div class="changelog-divider"></div>
    </td>
  </tr>

  <tr class="changelog-row">
    <td class="e-w-25 changelog-date">
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
        <div class="changelog-section-title">✂️ Breaking changes</div>
        <div>Component: 
          <a class="e-link e-link--inline" href="https://design.elvia.io/components/input#Overview">Inputs</a> 
        </div>
        In this update outline was changes to work on IE11 and Firefox. The input field structure had to be updated because of the outline changes.
      </div>
    </td>
  </tr>
</table>
