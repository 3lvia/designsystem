# Update [0.11.0]

---visible classes for modal and popover components is removed.
New utility classes for show and hide elements.

##### Breaking changes

If you are using the modal or popover components you now have to use the new utility classes for hiding and showing.
Theses components are by deault now always visible, add the 'e-none' or 'e-invisble' utlity classes to toggle the components.

- e-component---visible -> e-none & e-invisible

# Update [0.10.0]

Grid classes have updated to include internal systems. New classes have been added for the internal-systems as
well as classes for vertical gutters

##### Breaking changes

If you are using the grid-classes some might have to be updated to work as usual. The classes that have
changed / been added:

- e-grid-margin -> e-grid-margin-ext + e-grid-margin-int
- e-custom-gutters -> e-grid-gutters-ext + e-grid-gutters-int + e-grid-gutters-vertical

# Update [0.7.0]

Switched from @import to @use. The @use rule is the primary replacement for @import, which will be deprecated
in near future (2022 latest).

##### Breaking changes

If you are using our stylesheets directly and your sass-compiler do not support the use of @use. @use is
currently not supported by the node-sass compiler. Dart-sass is the primary implementation of Sass and do
support the use of @use. Read more about the advantages of @use here:
https://sass-lang.com/blog/the-module-system-is-launched.

# Update [0.6.0]

Switched from node-sass compiler to dart-sass compiler. Dart-sass is the primary implementation of Sass, which
means it gets new features before any other implementation and at current time node-sass do not support the
use of @use, which is the module system replacing @import.

##### Breaking changes

We do not believe this will affect you as a user.

# Update [0.5.0]

Major renaming of icons. All icons now follow the correct and desired naming scheme for a maintainable
library.

##### Breaking changes

Icon names have changed, so some references should be expected to now be broken

# Update [0.4.0]

In this update icons are injected as background-images again on the 'i' tags with e-icon classes.

##### Breaking changes

We dont think this will have a large impact on how to use icons.

# Update [0.3.0]

In this update we provided a solution for icons changing colors on hover. This affected buttons particularly.

##### Breaking changes

The structure of a button with icon was changed.

# Update [0.2.0]

In this update outline was changes to work on IE11 and Firefox.

##### Breaking changes

The input field structure had to be updated because of the outline changes.
