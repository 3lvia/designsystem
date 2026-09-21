- [Elvis Web Components](#elvis-web-components)
  - [Attributes and properties](#attributes-and-properties)
  - [Attribute names](#attribute-names)
  - [Arrays and objects](#arrays-and-objects)
  - [Events](#events)
  - [Frameworks](#frameworks)
    - [Angular](#angular)
    - [Vue](#vue)

# Elvis Web Components

These rules come from the wrapper shared by Elvis web components. See the component reference for its API.

## Attributes and properties

The wrapper converts declared attributes according to the component configuration. It copies an attribute only
while the corresponding property is unset; after a property is set, attribute updates do not overwrite it.
Property updates do not reflect back to the HTML attribute.

## Attribute names

The generated custom element observes lowercase attribute names. For names containing uppercase letters, it
generates both canonical camelCase and lowercase property accessors. In JavaScript, use the canonical name
shown in the component reference, such as `element.ariaLabel`.

## Arrays and objects

For attributes declared as `object`, the wrapper parses JSON5; this includes arrays. Prefer direct property
assignment to avoid serialization:

```js
tabs.items = ['Profil', 'Sikkerhet', 'Varsler'];
```

In markup, pass JSON or JSON5 text:

```html
<elvia-tabs items="['Profil', 'Sikkerhet', 'Varsler']"></elvia-tabs>
```

## Events

Events use `{ detail: { value }, bubbles: false, composed: true }`. CamelCase event names are dispatched under
both the original and kebab-case forms; for example, `valueOnChange` and `value-on-change`. Listen on the
element using one form only.

## Frameworks

### Angular

Add `CUSTOM_ELEMENTS_SCHEMA` to the component or module, then use property and event bindings:

```html
<elvia-tabs [items]="items" (valueOnChange)="handleValueOnChange($any($event).detail.value)" />
```

```ts
handleValueOnChange(value: number) {
  this.value = value;
}
```

### Vue

Use Vue bindings and kebab-case events:

```html
<elvia-tabs :items="items" @value-on-change="handleValueOnChange($event.detail.value)"></elvia-tabs>
```

```ts
const handleValueOnChange = (newValue: number) => {
  value.value = newValue;
};
```
