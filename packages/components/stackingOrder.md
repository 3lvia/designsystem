# Stacking order (z-index)

Use this table to get an overview over the stacking order of all components that should have a z-index greater
than 0. The table is based on the table originally created on
[Confluence](https://elvia.atlassian.net/wiki/spaces/TEAMATOM/pages/64493453737/Z-index).

| Component    | `z-index` | Description                                                         |
| ------------ | --------- | ------------------------------------------------------------------- |
| Toast        | 100 000   | Toasts skal vises over alle overlays                                |
| Datepicker   | 99 999    | Datepicker åpnes helt ytterst i DOMen så må derfor ha høyeste index |
| Modal        | 99 999    |                                                                     |
| Spotlight    | 99 999    |                                                                     |
| Tooltip      | 99 999    |                                                                     |
| Header       | 109       | Header skal over alt annet enn modal                                |
| Autocomplete | 100       |                                                                     |
| Dropdown     | 100       |                                                                     |
| Popover      | 100       |                                                                     |
| Badge        | 10        |                                                                     |
