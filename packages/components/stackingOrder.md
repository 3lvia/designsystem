# Stacking order (z-index)

Use this table to get an overview over the stacking order of all components that should have a z-index greater
than 0. The table is based on the table originally created on
[Confluence](https://elvia.atlassian.net/wiki/spaces/TEAMATOM/pages/64493453737/Z-index).

| Component    | `z-index` | Description                                                         |
| ------------ | --------- | ------------------------------------------------------------------- |
| Datepicker   | 99999     | Datepicker åpnes helt ytterst i DOMen så må derfor ha høyeste index |
| Modal        | 99999     |                                                                     |
| Spotlight    | 99999     |                                                                     |
| Header       | 109       | Header skal over alt annet enn modal                                |
| Dropdown     | 100       |                                                                     |
| Popover      | 100       |                                                                     |
| Tooltip      | 100       |                                                                     |
| Autocomplete | 100       |                                                                     |
| Badge        | 10        |                                                                     |
