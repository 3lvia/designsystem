<table>
<tr>
    <td class="e-w-25">
    <span class="e-title-sm">
    1.0.0
    </span>
    <br>
      <span class="e-text-info">
    August 12, 2020
    </span>
    </td>
    <td class="e-text-info e-w-75">
        <span>
         Some of the typography has new font-sizes and line-heights and a new smaller title has been added: e-title-xs.
        </span>
        <br>
        <br>
        <span class="e-mt-8">
            <b>Breaking changes</b>
            The changes will affect the appearance of the typography where it is used and may need to be updated. Some
components we offer has also changed typography which means some minor visual differences to these components:

- card
- internal header
- jumbo-link
- modal </span>

---

</td>
</tr>

<tr>
    <td class="e-w-25">
    <span class="e-title-sm">
    0.11.0
    </span>
    <br>
      <span class="e-text-info">
    August 5, 2020
    </span>
    </td>
    <td class="e-text-info e-w-75">
        <span>
         ---visible classes for modal and popover components is removed. New utility classes for show and hide elements.
        </span>
        <br>
        <br>
        <span class="e-mt-8">
            <b>Breaking changes</b>
            If you are using the modal or popover components you now have to use the new utility classes for hiding and showing. Theses components are by default now always visible, add the 'e-none' or 'e-invisble' utlity classes to toggle the components.

e-component---visible -> e-none & e-invisible </span>

---

</td>

</tr>

<tr>
    <td class="e-w-25">
    <span class="e-title-sm">
    0.10.0
    </span>
    <br>
      <span class="e-text-info">
    July 27, 2020
    </span>
    </td>
    <td class="e-text-info e-w-75">
        <span>
         Grid classes have updated to include internal systems. New classes have been added for the internal-systems as well as classes for vertical gutters
        </span>
        <br>
        <br>
        <span class="e-mt-8">
            <b>Breaking changes</b>
            If you are using the grid-classes some might have to be updated to work as usual. The classes that have changed / been added:

e-grid-margin -> e-grid-margin-ext + e-grid-margin-int e-custom-gutters -> e-grid-gutters-ext +
e-grid-gutters-int + e-grid-gutters-vertical </span>

---

</td>

</tr>

<tr>
    <td class="e-w-25">
    <span class="e-title-sm">
    0.7.0
    </span>
    <br>
      <span class="e-text-info">
    June 4, 2020
    </span>
    </td>
    <td class="e-text-info e-w-75">
        <span>
         Switched from @import to @use. The @use rule is the primary replacement for @import, which will be deprecated in near future (2022 latest).
        </span>
        <br>
        <br>
        <span class="e-mt-8">
            <b>Breaking changes</b>
            If you are using our stylesheets directly and your sass-compiler do not support the use of @use. @use is currently not supported by the node-sass compiler. Dart-sass is the primary implementation of Sass and do support the use of @use. Read more about the advantages of @use here: https://sass-lang.com/blog/the-module-system-is-launched. </span>
            
            
---
 </td>
</tr>

<tr>
    <td class="e-w-25">
    <span class="e-title-sm">
    0.6.0
    </span>
    <br>
      <span class="e-text-info">
    June 3, 2020
    </span>
    </td>
    <td class="e-text-info e-w-75">
        <span>
         Switched from node-sass compiler to dart-sass compiler. Dart-sass is the primary implementation of Sass, which means it gets new features before any other implementation and at current time node-sass do not support the use of @use, which is the module system replacing @import.
        </span>
        <br>
        <br>
        <span class="e-mt-8">
            <b>Breaking changes</b>
            We do not believe this will affect you as a user.

</span>

---

</td>

</tr>

<tr>
    <td class="e-w-25">
    <span class="e-title-sm">
    0.5.0
    </span>
    <br>
      <span class="e-text-info">
    May 20, 2020
    </span>
    </td>
    <td class="e-text-info e-w-75">
        <span>
         Major renaming of icons. All icons now follow the correct and desired naming scheme for a maintainable library.
        </span>
        <br>
        <br>
        <span class="e-mt-8">
            <b>Breaking changes</b>
            Icon names have changed, so some references should be expected to now be broken
 </span>
 
 
---
 </td>
</tr>

<tr>
    <td class="e-w-25">
    <span class="e-title-sm">
    0.4.0
    </span>
    <br>
      <span class="e-text-info">
    May 19, 2020
    </span>
    </td>
    <td class="e-text-info e-w-75">
        <span>
         In this update icons are injected as background-images again on the 'i' tags with e-icon classes.
        </span>
        <br>
        <br>
        <span class="e-mt-8">
            <b>Breaking changes</b>
            We dont think this will have a large impact on how to use icons.
 </span>
 
 
---
 </td>
</tr>

<tr>
    <td class="e-w-25">
    <span class="e-title-sm">
    0.3.0
    </span>
    <br>
      <span class="e-text-info">
    May 14, 2020
    </span>
    </td>
    <td class="e-text-info e-w-75">
        <span>
         In this update we provided a solution for icons changing colors on hover. This affected buttons particularly.
        </span>
        <br>
        <br>
        <span class="e-mt-8">
            <b>Breaking changes</b>
            The structure of a button with icon was changed.
</span>

---

 </td>
</tr>

<tr>
    <td class="e-w-25">
    <span class="e-title-sm">
    0.2.0
    </span>
    <br>
      <span class="e-text-info">
    May 14, 2020
    </span>
    </td>
    <td class="e-text-info e-w-75">
        <span>
         In this update outline was changes to work on IE11 and Firefox.
        </span>
        <br>
        <br>
        <span class="e-mt-8">
            <b>Breaking changes</b>
            The input field structure had to be updated because of the outline changes.
 </span>
 
 
---
 </td>
</tr>
</table>
