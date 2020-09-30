<!-- ✂️ - BREAKING CHANGE -->
<!-- 💥 - NEW FEATURES -->
<!-- 🐝 - BUG FIXES -->

<table>
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
        <div class="changelog-section-title">Breaking changes</div>
        <div>Component: 
          <a class="e-link e-link--inline" href="https://design.elvia.io/components/table-doc#Overview">Table</a>
        </div>
        The design and structure of tables have been updated.
        <ul>
          <li>
            Tables with black headers have been removed and tables have white headers be default.
          </li>
          <li>
            For better alignment of content inside the tables there has been added a wrapper-class making the border of the table as well as assuring scrolling when the table overflows.
          </li>
          <li>
            The class for bold text in the first column has also been removed as no usecase for it was apparent.
          </li>
        </ul>
      </div>
      <div class="changelog-section">
        <div class="changelog-section-title">Conditioner</div>
        Add an element with the <span class="code-text changelog-code">e-table-container</span> class outside the element with the <span class="code-text changelog-code">e-table</span> class.
        <ul>
          <li>
            <span class="code-text changelog-code">e-table</span> -> <span class="code-text changelog-code">e-table-container e-table</span>
          </li>
        </ul>
      </div>
      <div class="changelog-section">
        <div class="changelog-section-title">New features</div>
           <div>Component: 
          <a class="e-link e-link--inline" href="https://design.elvia.io/components/typography-doc#Overview">Table</a>
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
          <a class="e-link e-link--inline" href="https://design.elvia.io/components/card-doc#Overview">Cards</a>,
          <a class="e-link e-link--inline" href="https://design.elvia.io/components/header-doc#Overview">Header</a>,
          <a class="e-link e-link--inline" href="https://design.elvia.io/components/link-doc#Type">Jumbo link</a>,
          <a class="e-link e-link--inline" href="https://design.elvia.io/components/modal-doc#Overview">Modal</a>
        </div>
        Some of the typography has new font-sizes and line-heights. The changes will affect the appearance of the typography where it is used and may need to be updated. Some components we offer have also changed typography which means some minor visual differences to these components. 
      </div>
      <div class="changelog-section">
        <div class="changelog-section-title">💥 New features</div>
           <div>Component: 
          <a class="e-link e-link--inline" href="https://design.elvia.io/components/typography-doc#Overview">Typography</a>
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
          <a class="e-link e-link--inline" href="https://design.elvia.io/components/modal-doc#Overview">Modal</a>,
          <a class="e-link e-link--inline" href="https://design.elvia.io/components/popover-doc#Overview">Popover</a>
        </div>
        All <span class="code-text changelog-code">---visible</span> classes for modal and popover components are removed. New utility classes are added instead for showing and hiding elements. If you are using the modal or popover components you now have to use the new utility classes for hiding and showing. Theses components are by default now always visible.
        <div class="e-mt-24">
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
          <a class="e-link e-link--inline" href="https://design.elvia.io/identity/utilities-doc">Utility classes</a>
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
          <a class="e-link e-link--inline" href="https://design.elvia.io/identity/grid-doc#Overview">Grid</a>
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
          <a class="e-link e-link--inline" href="https://design.elvia.io/identity/grid-doc#Overview">Grid</a>
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
        <div class="e-mt-24">
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
          <a class="e-link e-link--inline" href="https://design.elvia.io/identity/icon-doc#Overview">Icons</a> 
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
          <a class="e-link e-link--inline"  href="https://design.elvia.io/identity/icon-doc#Overview">Icons</a> 
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
          <a class="e-link e-link--inline" href="https://design.elvia.io/components/button-doc#Overview">Buttons</a> 
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
          <a class="e-link e-link--inline" href="https://design.elvia.io/components/input-doc#Overview">Inputs</a> 
        </div>
        In this update outline was changes to work on IE11 and Firefox. The input field structure had to be updated because of the outline changes.
      </div>
      <div class="changelog-divider"></div>
    </td>
  </tr>
</table>
