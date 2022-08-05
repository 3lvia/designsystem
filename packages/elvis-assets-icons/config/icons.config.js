/*
for renaming/deprecating icons add the following:
- deprecated: 'version number' e.g 4.6.0
- newIconName : reference to new icon to be displayed

for keeping licensing in order
- thidpary {
  name: name of which thirdparty supplier of icons we use, f.ex "streamline" 
  duplicate: If we modify an icon with a valid license, refernce to which icon we modified and has a valid license
}

example:
    { name: 'add_circle', deprecated: '4.6.0', newIconName: 'add_circle_new' },
*/
module.exports = [
  {
    name: 'access_control',
    terms: ['tilgangsstyring'],
    thirdparty: { name: ['streamline'] },
  },
  {
    name: 'access_control-color',
    terms: ['tilgangsstyring'],
    thirdparty: { name: ['streamline'], duplicate: 'access_control' },
  },
  {
    name: 'add_circle',
    terms: ['plus', '+', 'maximize', 'expand', 'create'],
    thirdparty: { name: ['streamline'] },
  },
  {
    name: 'add_circle-color',
    terms: ['plus', '+', 'maximize', 'expand', 'create'],
    thirdparty: { name: ['streamline'], duplicate: ['add_circle'] },
  },
  {
    name: 'add_circle-filled',
    terms: ['plus', '+', 'maximize', 'expand', 'create'],
    thirdparty: { name: ['streamline'], duplicate: ['add_circle'] },
  },
  {
    name: 'add_circle-filled-color',
    terms: ['plus', '+', 'maximize', 'expand', 'create'],
    thirdparty: { name: ['streamline'], duplicate: ['add_circle'] },
  },
  { name: 'add_powermeter', terms: [], thirdparty: { name: ['streamline'] } },
  {
    name: 'add_powermeter-color',
    terms: [],
    thirdparty: { name: ['streamline'], duplicate: ['add_powermeter'] },
  },
  {
    name: 'adjust',
    terms: ['expand', 'drag', 'rearrange'],
    thirdparty: { name: ['streamline'] },
  },
  { name: 'agreements-color', terms: [], thirdparty: { name: ['streamline'] } },
  {
    name: 'analytics_bars',
    terms: ['data', 'effect', 'board', 'wave', 'measure'],
    thirdparty: { name: ['streamline'] },
  },
  { name: 'arrow_circle-color', deprecated: '4.7.0', newIconName: 'arrow_right_circle-color' },
  {
    name: 'arrow_right_circle-color',
    terms: ['next', 'forward'],
    thirdparty: { name: ['streamline'], duplicate: ['arrow_right_circle'] },
  },
  { name: 'arrow_circle-filled-color', deprecated: '4.7.0', newIconName: 'arrow_right_circle-filled-color' },
  {
    name: 'arrow_right_circle-filled-color',
    terms: ['next', 'forward'],
    thirdparty: { name: ['streamline'], duplicate: ['arrow_right_circle'] },
  },
  { name: 'arrow_right_circle', terms: ['long', 'next', 'forward'], thirdparty: { name: ['streamline'] } },
  {
    name: 'arrow_left_circle',
    terms: ['long', 'back', 'previous', 'backward'],
    thirdparty: { name: ['streamline'] },
  },
  {
    name: 'arrow_left_circle-color',
    terms: ['back', 'backward', 'previous'],
    thirdparty: { name: ['streamline'], duplicate: ['arrow_left_circle'] },
  },
  {
    name: 'arrow_left_circle-filled-color',
    terms: ['back', 'backward', 'previous'],
    thirdparty: { name: ['streamline'], duplicate: ['arrow_left_circle'] },
  },
  { name: 'arrow_down', terms: ['expand', 'open'], thirdparty: { name: ['streamline'] } },
  {
    name: 'arrow_down-bold',
    terms: ['expand', 'open'],
    thirdparty: { name: ['streamline'], duplicate: ['arrow_down'] },
  },
  {
    name: 'arrow_external',
    terms: ['link'],
    deprecated: '7.4.0',
    newIconName: 'new_tab-bold',
    thirdparty: { name: ['streamline'] },
  },
  {
    name: 'arrow_external-bold',
    terms: ['link'],
    deprecated: '7.4.0',
    newIconName: 'new_tab-bold',
    thirdparty: { name: ['streamline'], duplicate: ['arrow_external'] },
  },
  { name: 'arrow_left', terms: [], thirdparty: { name: ['streamline'] } },
  { name: 'arrow_left-bold', terms: [], thirdparty: { name: ['streamline'], duplicate: ['arrow_left'] } },
  { name: 'arrow_long_left', terms: ['back', 'backward', 'previous'], thirdparty: { name: ['streamline'] } },
  {
    name: 'arrow_long_left-bold',
    terms: ['back', 'backward', 'previous'],
    thirdparty: { name: ['streamline'], duplicate: ['arrow_long_left'] },
  },
  { name: 'arrow_long_right', terms: ['next', 'forward'], thirdparty: { name: ['streamline'] } },
  { name: 'arrow_long', deprecated: '6.2.0', newIconName: 'arrow_long_right' },
  {
    name: 'arrow_long_right-bold',
    terms: ['next', 'forward'],
    thirdparty: { name: ['streamline'], duplicate: ['arrow_long_right'] },
  },
  { name: 'arrow_long-bold', deprecated: '6.2.0', newIconName: 'arrow_long_right-bold' },
  { name: 'arrow_right', terms: ['open'], thirdparty: { name: ['streamline'] } },
  {
    name: 'arrow_right-bold',
    terms: ['open'],
    thirdparty: { name: ['streamline'], duplicate: ['arrow_right'] },
  },
  { name: 'arrow_up', terms: ['collapse', 'close'], thirdparty: { name: ['streamline'] } },
  {
    name: 'arrow_up-bold',
    terms: ['collapse', 'close'],
    thirdparty: { name: ['streamline'], duplicate: ['arrow_up'] },
  },
  {
    name: 'attendance',
    terms: ['person', 'check', 'participation'],
    thirdparty: { name: ['streamline'] },
    streamlineIcons: ['single-neutral-actions-check-1'],
  },
  { name: 'attachment', terms: ['link', 'connection', 'file'], thirdparty: { name: ['streamline'] } },
  {
    name: 'attachment-color',
    terms: ['link', 'connection', 'file'],
    thirdparty: { name: ['streamline'], duplicate: ['attachment'] },
  },
  { name: 'bin', terms: ['delete', 'trash'], thirdparty: { name: ['streamline'] } },
  { name: 'bookmark', terms: [], thirdparty: { name: ['streamline'] } },
  { name: 'bookmark-filled', terms: [], thirdparty: { name: ['streamline'], duplicate: ['bookmark'] } },
  { name: 'bookshelf', terms: ['library', 'bookcase'], thirdparty: { name: ['streamline'] } },
  { name: 'box', terms: ['shipment', 'package', 'cardboard'], thirdparty: { name: ['streamline'] } },
  { name: 'business-color', terms: [], thirdparty: { name: ['streamline'] } },
  { name: 'cabin', terms: ['cottage', 'house', 'outside', 'woods'], thirdparty: { name: ['streamline'] } },
  { name: 'cable', terms: ['cord', 'wire', 'power line', 'electricity'] },
  { name: 'calendar', terms: [], thirdparty: { name: ['streamline'] } },
  { name: 'calendar_clock-color', terms: [], thirdparty: { name: ['streamline'] } },
  { name: 'calendar-color', terms: [], thirdparty: { name: ['streamline'], duplicate: ['calendar'] } },
  { name: 'call', terms: ['phone', 'mobile', 'telephone'], thirdparty: { name: ['streamline'] } },
  { name: 'car_charger-color', terms: [], thirdparty: { name: ['streamline'] } },
  { name: 'chainsaw', terms: ['motorized saw', 'electric'] },
  { name: 'chat', terms: ['message', 'text', 'write', 'conversation'], thirdparty: { name: ['streamline'] } },
  {
    name: 'charging_battery',
    terms: ['charge', 'load', 'electricity'],
    thirdparty: { name: ['streamline'] },
  },
  { name: 'charge', terms: ['power'] },
  {
    name: 'charging_battery-color',
    terms: ['charge', 'power', 'electricity'],
    thirdparty: { name: ['streamline'], duplicate: ['charging_battery'] },
  },
  { name: 'check', deprecated: '7.5.0', newIconName: 'check-bold' },
  { name: 'check-bold', terms: [], thirdparty: { name: ['streamline'] } },
  { name: 'check_circle', terms: [], thirdparty: { name: ['streamline'] } },
  {
    name: 'check_circle-color',
    terms: ['approved', 'done', 'finished', 'complete', 'accepted', 'confirm'],
    thirdparty: { name: ['streamline'], duplicate: ['check_circle'] },
  },
  {
    name: 'check_circle-filled',
    terms: [],
    thirdparty: { name: ['streamline'], duplicate: ['check_circle'] },
  },
  {
    name: 'check_circle-filled-color',
    terms: [],
    thirdparty: { name: ['streamline'], duplicate: ['check_circle'] },
  },
  { name: 'check_shield', terms: ['guard', 'safe'], thirdparty: { name: ['streamline'] } },
  { name: 'checklist-color', terms: [], thirdparty: { name: ['streamline'] } },
  { name: 'clock', terms: [], thirdparty: { name: ['streamline'] } },
  { name: 'close', deprecated: '7.5.0', newIconName: 'close-bold' },
  { name: 'close-bold', terms: ['x', 'remove'], thirdparty: { name: ['streamline'] } },
  { name: 'close_menu', terms: ['x', 'remove'], thirdparty: { name: ['streamline'] } },
  { name: 'cloud_upload', terms: ['upload', 'cloud', 'import'], thirdparty: { name: ['streamline'] } },
  { name: 'cog', terms: ['settings', 'gear'], thirdparty: { name: ['streamline'] } },
  { name: 'cookie', terms: ['cookies'], thirdparty: { name: ['streamline'] } },
  { name: 'cost_cut-color', terms: [], thirdparty: { name: ['streamline'] } },
  { name: 'collapse_circle-color', terms: [], thirdparty: { name: ['streamline'] } },
  {
    name: 'collapse_circle-filled-color',
    terms: [],
    thirdparty: { name: ['streamline'], duplicate: ['collapse_circle-color'] },
  },
  {
    name: 'configurations',
    terms: ['toggle', 'edit', 'adjust', 'switch'],
    thirdparty: { name: ['streamline'] },
  },
  { name: 'copy', terms: [], thirdparty: { name: ['streamline'] } },
  { name: 'crane', terms: ['hook', 'building', 'tower'], thirdparty: { name: ['streamline'] } },
  { name: 'credit_card', terms: [], thirdparty: { name: ['streamline'] } },
  {
    name: 'cut_electricity_pillar',
    terms: [
      'breakdown',
      'energy',
      'street lightning',
      'high tension',
      'cutout',
      'pole',
      'power off',
      'electricity',
    ],
    thirdparty: { name: ['streamline'] },
  },
  {
    name: 'cut_electricity_pillar-color',
    terms: [
      'breakdown',
      'energy',
      'street lightning',
      'high tension',
      'cutout',
      'pole',
      'power off',
      'electricity',
    ],
    thirdparty: { name: ['streamline'], duplicate: ['cut_electricity_pillar'] },
  },
  { name: 'danger_electricity-color', terms: ['electricity'], thirdparty: { name: ['streamline'] } },
  { name: 'dashboard', terms: [], thirdparty: { name: ['streamline'] } },
  { name: 'dashboard-color', terms: [], thirdparty: { name: ['streamline'], duplicate: ['dashboard'] } },
  { name: 'design_process-color', deprecated: '7.5.0', newIconName: 'bookshelf' },
  { name: 'digging-color', terms: [], thirdparty: { name: ['streamline'] } },
  { name: 'download', terms: [], thirdparty: { name: ['streamline'] } },
  { name: 'drag_handle', terms: ['drop', 'grab', 'sort', 'move'], thirdparty: { name: ['streamline'] } },
  { name: 'edit', terms: ['pencil', 'pen'], thirdparty: { name: ['streamline'] } },
  { name: 'electric_cabinet', terms: ['electricity'], thirdparty: { name: ['streamline'] } },
  {
    name: 'electric_cabinet-color',
    terms: ['electricity'],
    thirdparty: { name: ['streamline'], duplicate: ['electric_cabinet'] },
  },
  { name: 'electric_car-color', terms: ['electricity'], thirdparty: { name: ['streamline'] } },
  { name: 'electric_home', terms: ['electricity'], thirdparty: { name: ['streamline'] } },
  {
    name: 'electric_home-color',
    terms: ['electricity'],
    thirdparty: { name: ['streamline'], duplicate: ['electric_home'] },
  },
  { name: 'electrical_system', terms: ['electricity'], thirdparty: { name: ['streamline'] } },
  {
    name: 'electrical_system-color',
    terms: ['electricity'],
    thirdparty: { name: ['streamline'], duplicate: ['electrical_system'] },
  },
  { name: 'electricity_pillar', terms: ['electricity'], thirdparty: { name: ['streamline'] } },
  { name: 'electricity_safety', terms: ['electricity'], thirdparty: { name: ['streamline'] } },
  {
    name: 'electricity_safety-color',
    terms: ['electricity'],
    thirdparty: { name: ['streamline'], duplicate: ['electricity_safety'] },
  },
  {
    name: 'electricity_tower',
    terms: ['energy', 'high tension', 'tower', 'power', 'electricity'],
    thirdparty: { name: ['streamline'] },
  },
  { name: 'elsmart-color', terms: [], thirdparty: { name: ['streamline'] } },
  { name: 'exit_full_screen', terms: ['minimize', 'minimise'] },
  { name: 'exit_full_screen-color', terms: ['minimize', 'minimise'] },
  { name: 'expand_circle-color', terms: [], thirdparty: { name: ['streamline'] } },
  {
    name: 'expand_circle-filled-color',
    terms: [],
    thirdparty: { name: ['streamline'], duplicate: ['expand_circle-color'] },
  },
  { name: 'extension_cord', terms: ['cord', 'wire', 'power line', 'electricity'] },
  {
    name: 'facebook',
    terms: ['smsocial media', 'SoMeiley'],
    thirdparty: { name: ['streamline'] },
    streamlineIcons: ['social-media-facebook', 'messages-bubble'],
  },
  { name: 'feedback', terms: ['smiley'], thirdparty: { name: ['streamline'] } },
  { name: 'filter', terms: [], thirdparty: { name: ['streamline'] } },
  { name: 'filter-filled', terms: [], thirdparty: { name: ['streamline'], duplicate: ['filter'] } },
  { name: 'flag', terms: [], thirdparty: { name: ['streamline'] } },
  { name: 'flag-bold', terms: [], thirdparty: { name: ['streamline'], duplicate: ['flag'] } },
  { name: 'flag-bold-color', terms: [], thirdparty: { name: ['streamline'], duplicate: ['flag'] } },
  { name: 'flag-color', terms: [], thirdparty: { name: ['streamline'], duplicate: ['flag'] } },
  { name: 'folder', terms: [], thirdparty: { name: ['streamline'] } },
  { name: 'folder_create', terms: ['add'], thirdparty: { name: ['streamline'] } },
  { name: 'folder_open', terms: [], thirdparty: { name: ['streamline'] } },
  { name: 'form_check-color', terms: [], thirdparty: { name: ['streamline'] } },
  {
    name: 'form',
    terms: ['application', 'paper', 'sheet', 'letter', 'document', 'write', 'edit'],
    thirdparty: { name: ['streamline'] },
  },
  {
    name: 'form-color',
    terms: ['application', 'paper', 'sheet', 'letter', 'document', 'write', 'edit'],
    thirdparty: { name: ['streamline'], duplicate: ['form'] },
  },
  { name: 'full_battery', terms: ['electricity'], thirdparty: { name: ['streamline'] } },
  {
    name: 'full_battery-color',
    terms: ['electricity'],
    thirdparty: { name: ['streamline'], duplicate: ['full_battery'] },
  },
  { name: 'full_screen', terms: ['expand', 'width', 'utvid', 'full skjerm', 'maximize'] },
  { name: 'full_screen-color', terms: ['expand', 'width', 'utvid', 'full skjerm', 'maximize'] },

  { name: 'freshchat-color', terms: ['message', 'text', 'write'], thirdparty: { name: ['streamline'] } },
  { name: 'graph_bar', terms: [], thirdparty: { name: ['streamline'] } },
  { name: 'graph_bar-color', terms: [], thirdparty: { name: ['streamline'], duplicate: ['graph_bar'] } },
  { name: 'graph_up', terms: ['chart', 'cost'], thirdparty: { name: ['streamline'] } },
  { name: 'ground_fault', terms: ['breakdown', 'electricity'], thirdparty: { name: ['streamline'] } },
  {
    name: 'ground_fault-color',
    terms: ['breakdown', 'electricity'],
    thirdparty: { name: ['streamline'], duplicate: ['ground_fault'] },
  },
  { name: 'hammer_wrench-color', terms: [] },
  { name: 'han', terms: [], thirdparty: { name: ['streamline'] } },
  { name: 'han-color', terms: [], thirdparty: { name: ['streamline'], duplicate: ['han'] } },
  { name: 'heating', terms: ['warm up', 'radiator'] },
  { name: 'home', terms: [], thirdparty: { name: ['streamline'] } },
  { name: 'home-color', terms: [], thirdparty: { name: ['streamline'], duplicate: ['home'] } },
  { name: 'house_rebuilding-color', terms: [], thirdparty: { name: ['streamline'] } },
  {
    name: 'image',
    terms: ['picture', 'photo', 'content', 'document', 'file'],
    thirdparty: { name: ['streamline'] },
  },
  { name: 'image_add-color', terms: [], thirdparty: { name: ['streamline'] } },
  { name: 'information_circle', terms: ['help', 'advice', 'guidance'], thirdparty: { name: ['streamline'] } },
  {
    name: 'information_circle-color',
    terms: ['help', 'advice', 'guidance'],
    thirdparty: { name: ['streamline'], duplicate: ['information_circle'] },
  },
  {
    name: 'information_circle-filled-color',
    terms: ['help', 'advice', 'guidance'],
    thirdparty: { name: ['streamline'], duplicate: ['information_circle'] },
  },
  {
    name: 'installatorweb-color',
    terms: ['installatørweb', 'innstallatørweb'],
    thirdparty: { name: ['streamline'] },
  },
  { name: 'invoice', terms: ['check', 'bill', 'debt'], thirdparty: { name: ['streamline'] } },
  {
    name: 'invoice-color',
    terms: ['check', 'bill', 'debt'],
    thirdparty: { name: ['streamline'], duplicate: ['invoice'] },
  },
  { name: 'laptop-color', terms: ['computer', 'screen', 'pc', 'mac'] },
  { name: 'layers', terms: [], thirdparty: { name: ['streamline'] } },
  { name: 'lighting', terms: ['light', 'power'] },
  { name: 'list', terms: [], thirdparty: { name: ['streamline'] } },
  { name: 'list_color', terms: [], thirdparty: { name: ['streamline'], duplicate: ['list'] } },
  { name: 'list_bullets-bold', terms: [], thirdparty: { name: ['streamline'] } },
  { name: 'loading', terms: [], thirdparty: { name: ['streamline'] } },
  { name: 'lock', terms: [], thirdparty: { name: ['streamline'] } },
  {
    name: 'lock_hierarchy',
    terms: ['lock', 'hierarchy', 'closed', 'nodes'],
    thirdparty: { name: ['streamline'] },
  },
  { name: 'logout', terms: [], thirdparty: { name: ['streamline'] } },
  { name: 'mail', terms: ['e-mail', 'post', 'letter', 'email'], thirdparty: { name: ['streamline'] } },
  {
    name: 'mail_error-color',
    terms: ['e-mail', 'post', 'letter', 'fail', 'wrong', 'email'],
    thirdparty: { name: ['streamline'] },
  },
  { name: 'mail_monitor-color', terms: ['observe'], thirdparty: { name: ['streamline'] } },
  {
    name: 'mail_send-color',
    terms: ['e-mail', 'post', 'letter', 'email'],
    thirdparty: { name: ['streamline'] },
  },
  { name: 'map_pin-color', terms: [], thirdparty: { name: ['streamline'] } },
  {
    name: 'media',
    terms: ['tv', 'radio'],
    thirdparty: { name: ['streamline'] },
    streamlineIcons: ['video-player-movie-1'],
  },
  { name: 'menu', terms: [], thirdparty: { name: ['streamline'] } },
  { name: 'menu-bold', terms: [], thirdparty: { name: ['streamline'], duplicate: ['menu'] } },
  { name: 'minus', deprecated: '7.5.0', newIconName: 'minus-bold' },
  {
    name: 'minus-bold',
    terms: ['subtract', 'minimize', 'collapse'],
    thirdparty: { name: ['streamline'] },
  },
  {
    name: 'money-color',
    terms: ['finance', 'cash', 'coins', 'payment', 'pay', 'cost'],
    thirdparty: { name: ['streamline'] },
  },
  { name: 'more_menu', terms: ['actions', 'contextual', 'kebab', 'dots'] },
  { name: 'move_circle', terms: ['move', 'transfer'], thirdparty: { name: ['streamline'] } },
  { name: 'move_truck-color', terms: [], thirdparty: { name: ['streamline'] } },
  { name: 'new_tab-bold', terms: ['external', 'open', 'link'], thirdparty: { name: ['streamline'] } },
  { name: 'note_approved-color', terms: [], thirdparty: { name: ['streamline'] } },
  { name: 'note_check-color', terms: [], thirdparty: { name: ['streamline'] } },
  { name: 'notification-bold', terms: ['alarm', 'bell', 'alert'], thirdparty: { name: ['streamline'] } },
  { name: 'open_menu', terms: [], thirdparty: { name: ['streamline'] } },
  { name: 'paper_plane_speed_color', terms: ['send', 'message'], thirdparty: { name: ['streamline'] } },
  { name: 'paper_plane', terms: ['send', 'message'], thirdparty: { name: ['streamline'] } },
  { name: 'pause_circle-color', terms: ['stop'], thirdparty: { name: ['streamline'] } },
  {
    name: 'pause_circle-filled-color',
    terms: ['stop'],
    thirdparty: { name: ['streamline'], duplicate: ['pause_circle-color'] },
  },
  { name: 'phone', terms: ['mobile'], thirdparty: { name: ['streamline'] } },
  { name: 'phone_comment', terms: ['mobile'], thirdparty: { name: ['streamline'] } },
  {
    name: 'phone_comment-color',
    terms: ['mobile', 'write', 'text', 'message'],
    thirdparty: { name: ['streamline'], duplicate: ['phone_comment'] },
  },
  { name: 'phone_image', terms: ['mobile', 'picture', 'content'], thirdparty: { name: ['streamline'] } },
  { name: 'pdf_document', terms: ['adobe', 'file'], thirdparty: { name: ['streamline'] } },
  { name: 'pie_chart', terms: [], thirdparty: { name: ['streamline'] } },
  { name: 'pin', terms: [], thirdparty: { name: ['streamline'] } },
  {
    name: 'pin-color',
    terms: ['place', 'location', 'locate', 'position', 'area', 'map'],
    thirdparty: { name: ['streamline'], duplicate: ['pin'] },
  },
  {
    name: 'pin-filled',
    terms: ['place', 'location', 'locate', 'position', 'area', 'map'],
    thirdparty: { name: ['streamline'], duplicate: ['pin'] },
  },
  {
    name: 'pin-filled-color',
    terms: ['place', 'location', 'locate', 'position', 'area', 'map'],
    thirdparty: { name: ['streamline'], duplicate: ['pin'] },
  },
  { name: 'play_circle-color', terms: ['start', 'go'], thirdparty: { name: ['streamline'] } },
  {
    name: 'play_circle-filled-color',
    terms: ['start', 'go'],
    thirdparty: { name: ['streamline'], duplicate: ['play_circle-color'] },
  },
  { name: 'plus', deprecated: '7.5.0', newIconName: 'plus-bold' },
  {
    name: 'plus-bold',
    terms: ['add', 'maximize', 'expand', 'create'],
    thirdparty: { name: ['streamline'] },
  },
  { name: 'position-bold', terms: [], thirdparty: { name: ['streamline'] } },
  {
    name: 'position-bold-color',
    terms: [],
    thirdparty: { name: ['streamline'], duplicate: ['position-bold'] },
  },
  { name: 'position_off-bold', terms: [], thirdparty: { name: ['streamline'] } },
  { name: 'power', terms: ['electricity'], thirdparty: { name: ['streamline'] } },
  {
    name: 'power_2',
    terms: ['safety concern', 'power blackout, cut', 'failure', 'electricity', 'lightning', 'zap'],
  },
  { name: 'power_outage', terms: ['electricity'], thirdparty: { name: ['streamline'] } },
  { name: 'power_outage-2', terms: ['electricity'], thirdparty: { name: ['streamline'] } },
  {
    name: 'power_outage-2-color',
    terms: ['electricity'],
    thirdparty: { name: ['streamline'], duplicate: ['power_outage-2'] },
  },
  {
    name: 'power_outage-color',
    terms: ['electricity'],
    thirdparty: { name: ['streamline'], duplicate: ['power_outage'] },
  },
  { name: 'power_outage_map', terms: ['electricity'], thirdparty: { name: ['streamline'] } },
  {
    name: 'power_outage-orange-color',
    terms: ['electricity'],
    thirdparty: { name: ['streamline'], duplicate: ['power_outage'] },
  },
  {
    name: 'power_service',
    terms: ['electricity', 'warning', 'connect', 'disconnect', 'contact'],
    thirdparty: { name: ['streamline'] },
  },
  {
    name: 'power_service-color',
    terms: ['electricity', 'warning', 'connect', 'disconnect', 'contact'],
    thirdparty: { name: ['streamline'], duplicate: ['power_service'] },
  },
  { name: 'power-color', terms: ['electricity'], thirdparty: { name: ['streamline'], duplicate: ['power'] } },
  {
    name: 'powerline',
    terms: ['cable', 'power', 'cord', 'electricity', 'wire'],
    thirdparty: { name: ['streamline'] },
  },
  {
    name: 'powerline-color',
    terms: ['cable', 'power', 'cord', 'electricity', 'wire'],
    thirdparty: { name: ['streamline'], duplicate: ['powerline'] },
  },
  { name: 'powermeter_ams', terms: ['electricity'], thirdparty: { name: ['streamline'] } },
  {
    name: 'powermeter_ams-color',
    terms: ['electricity'],
    thirdparty: { name: ['streamline'], duplicate: ['powermeter_ams'] },
  },
  { name: 'powermeter_old', terms: ['electricity'] },
  { name: 'powermeter-color', terms: ['electricity'], thirdparty: { name: ['streamline'] } },
  { name: 'profile', terms: [], thirdparty: { name: ['streamline'] } },
  { name: 'profile-2', deprecated: '7.5.0', newIconName: 'profile' },
  { name: 'profile-2-color', deprecated: '7.5.0', newIconName: 'profile' },
  { name: 'profile-bold', terms: [], thirdparty: { name: ['streamline'], duplicate: ['profile'] } },
  { name: 'question_circle', terms: ['?', 'help', 'answer'], thirdparty: { name: ['streamline'] } },
  {
    name: 'question_circle-color',
    terms: ['?', 'help', 'answer'],
    thirdparty: { name: ['streamline'], duplicate: ['question_circle'] },
  },
  {
    name: 'question_circle-filled-color',
    terms: ['?', 'help', 'answer'],
    thirdparty: { name: ['streamline'], duplicate: ['question_circle'] },
  },
  { name: 'quotation-color', terms: ['quote', 'reference'], thirdparty: { name: ['streamline'] } },
  { name: 'refresh', terms: [], thirdparty: { name: ['streamline'] } },
  { name: 'remove_circle', terms: ['delete', 'dismiss', 'discard'], thirdparty: { name: ['streamline'] } },
  {
    name: 'remove_circle-color',
    terms: ['delete', 'dismiss', 'discard'],
    thirdparty: { name: ['streamline'], duplicate: ['remove_circle'] },
  },
  {
    name: 'remove_circle-filled',
    terms: ['delete', 'dismiss', 'discard'],
    thirdparty: { name: ['streamline'], duplicate: ['remove_circle'] },
  },
  {
    name: 'remove_circle-filled-color',
    terms: ['delete', 'dismiss', 'discard'],
    thirdparty: { name: ['streamline'], duplicate: ['remove_circle'] },
  },
  { name: 'renewable_energy', terms: ['electricity', 'power'], thirdparty: { name: ['streamline'] } },
  {
    name: 'renewable_energy-color',
    terms: ['electricity', 'power'],
    thirdparty: { name: ['streamline'], duplicate: ['renewable_energy'] },
  },
  { name: 'reset', terms: [], thirdparty: { name: ['streamline'] } },
  { name: 'rotate_right', terms: ['pivot', 'revolve', 'spin', 'turn'] },
  {
    name: 'rss-bold',
    terms: ['feed', 'connection', 'internet', 'online'],
    thirdparty: { name: ['streamline'] },
  },
  {
    name: 'search',
    terms: ['find', 'navigation', 'explore', 'inspect', 'look'],
    thirdparty: { name: ['streamline'] },
  },
  {
    name: 'search-color',
    terms: ['find', 'navigation', 'explore', 'inspect', 'look'],
    thirdparty: { name: ['streamline'], duplicate: ['search'] },
  },
  {
    name: 'search-bold',
    terms: ['find', 'navigation', 'explore', 'inspect', 'look'],
    thirdparty: { name: ['streamline'], duplicate: ['search'] },
  },
  {
    name: 'search-bold-color',
    terms: ['find', 'navigation', 'explore', 'inspect', 'look'],
    thirdparty: { name: ['streamline'], duplicate: ['search'] },
  },
  {
    name: 'season',
    terms: ['summer', 'winter', 'seasons', 'time'],
    thirdparty: { name: ['streamline'], duplicate: ['renewable_energy'] },
  },
  {
    name: 'select_area',
    terms: ['cursor', 'mark'],
    thirdparty: { name: ['streamline'] },
  },
  {
    name: 'settings_vertical',
    terms: ['toggle', 'edit', 'adjust', 'switch'],
    thirdparty: { name: ['streamline'] },
    deprecated: '7.14.1',
    newIconName: 'configurations',
  },
  { name: 'shovel', terms: ['scoop', 'dig'], thirdparty: { name: ['streamline'] } },
  {
    name: 'smart_city',
    terms: ['electricity'],
    thirdparty: { name: ['streamline'], duplicate: ['smart_city-color'] },
  },
  { name: 'smart_city-color', terms: ['electricity'], thirdparty: { name: ['streamline'] } },
  {
    name: 'solar_panel',
    terms: ['energy', 'power', 'cell', 'sunlight', 'electricity'],
    thirdparty: { name: ['streamline'] },
  },
  {
    name: 'solar_panel-color',
    terms: ['energy', 'power', 'cell', 'sunlight', 'electricity'],
    thirdparty: { name: ['streamline'], duplicate: ['solar_panel'] },
  },
  {
    name: 'sorting_ascending-bold',
    terms: ['sort', 'sorting', 'order', 'up'],
    thirdparty: { name: ['streamline'] },
  },
  {
    name: 'sorting_descending-bold',
    terms: ['sort', 'sorting', 'order', 'down'],
    thirdparty: { name: ['streamline'] },
  },
  {
    name: 'sorting_alfabetical_a_to_z',
    terms: ['sort', 'sorting', 'alfabetical', 'arrow', 'ascending'],
  },
  {
    name: 'sorting_alfabetical_z_to_a',
    terms: ['sort', 'sorting', 'alfabetical', 'arrow', 'descending'],
  },
  {
    name: 'sorting_date_earliest_to_latest',
    terms: ['sort', 'sorting', 'date', 'arrow', 'ascending'],
  },
  {
    name: 'sorting_date_latest_to_earliest',
    terms: ['sort', 'sorting', 'date', 'arrow', 'descending'],
  },
  { name: 'sorting-bold', terms: ['sort', 'sorting', 'order'], thirdparty: { name: ['streamline'] } },
  { name: 'sorting-2-bold', terms: ['sort', 'sorting', 'order', 'ascending'] },
  {
    name: 'sorting_number_high_to_low',
    terms: ['sort', 'sorting', 'integer', 'arrow', 'descending'],
  },
  {
    name: 'sorting_number_low_to_high',
    terms: ['sort', 'sorting', 'integer', 'arrow', 'ascending'],
  },
  {
    name: 'sorting_time_earliest_to_latest',
    terms: ['sort', 'sorting', 'time', 'arrow', 'ascending'],
  },
  {
    name: 'sorting_time_latest_to_earliest',
    terms: ['sort', 'sorting', 'time', 'arrow', 'descending'],
  },
  {
    name: 'star-filled',
    terms: ['favorite', 'favourite'],
    thirdparty: { name: ['streamline'], duplicate: ['star'] },
  },
  { name: 'star', terms: ['favorite', 'favourite'], thirdparty: { name: ['streamline'] } },
  { name: 'step_1', terms: ['number', 'first', 'one'], thirdparty: { name: ['streamline'] } },
  { name: 'step_2', terms: ['number', 'second', 'two'], thirdparty: { name: ['streamline'] } },
  { name: 'step_3', terms: ['number', 'third', 'three'], thirdparty: { name: ['streamline'] } },
  { name: 'step_4', terms: ['number', 'fourth', 'four'], thirdparty: { name: ['streamline'] } },
  { name: 'step_5', terms: ['number', 'fifth', 'five'], thirdparty: { name: ['streamline'] } },
  { name: 'stove', terms: ['oven'] },
  {
    name: 'subtract_circle',
    terms: ['minus', '-', 'minimize', 'collapse'],
    thirdparty: { name: ['streamline'] },
  },
  {
    name: 'subtract_circle-filled',
    terms: ['minus', '-', 'minimize', 'collapse'],
    thirdparty: { name: ['streamline'], duplicate: ['subtract_circle'] },
  },
  {
    name: 'subtract_circle-filled-color',
    terms: ['minus', '-', 'minimize', 'collapse'],
    thirdparty: { name: ['streamline'], duplicate: ['subtract_circle'] },
  },
  { name: 'support', terms: ['customer service', 'help'], thirdparty: { name: ['streamline'] } },
  {
    name: 'sync',
    terms: ['synchronization', 'refresh', 'reload', 'arrows'],
    thirdparty: { name: ['streamline'] },
  },
  { name: 'tag_add', deprecated: '7.5.0', newIconName: 'add_circle' },
  { name: 'tag', terms: [], thirdparty: { name: ['streamline'] } },
  { name: 'third_party', terms: ['network'], streamlineIcons: ['user-network'] },
  { name: 'thumbnail', terms: ['grid', 'app'], thirdparty: { name: ['streamline'] } },
  {
    name: 'thumbnail-color',
    terms: ['grid', 'app'],
    thirdparty: { name: ['streamline'], duplicate: ['thumbnail'] },
  },
  { name: 'touch_finger-color', terms: [], thirdparty: { name: ['streamline'] } },
  { name: 'transformer', terms: ['trafo', 'transformator', 'electricity'] },
  { name: 'transformer-color', terms: ['trafo', 'transformator', 'electricity'] },
  { name: 'transformer_change', terms: ['trafo', 'transformator', 'transformatorbytte'] },
  { name: 'transformer_change-color', terms: ['trafo', 'transformator', 'transformatorbytte'] },
  { name: 'tree_falling', terms: ['electricity'], thirdparty: { name: ['streamline'] } },
  { name: 'tree_powerline', terms: ['electricity'], thirdparty: { name: ['streamline'] } },
  {
    name: 'tree_powerline-color',
    terms: ['electricity'],
    thirdparty: { name: ['streamline'], duplicate: ['tree_powerline'] },
  },
  { name: 'unlock', terms: [], thirdparty: { name: ['streamline'] } },
  { name: 'upload', terms: [], thirdparty: { name: ['streamline'] } },
  { name: 'user_testing-color', terms: [], thirdparty: { name: ['streamline'] } },
  {
    name: 'users',
    terms: ['profile', 'persons', 'people', 'group', 'multiple'],
    thirdparty: { name: ['streamline'] },
  },
  { name: 'view_off', terms: ['eye', 'eye closed'], thirdparty: { name: ['streamline'] } },
  { name: 'view_on', terms: ['eye', 'eye open'], thirdparty: { name: ['streamline'] } },
  {
    name: 'warning_circle',
    terms: ['!', 'danger', 'alert', 'caution', 'exclamation'],
    thirdparty: { name: ['streamline'] },
  },
  {
    name: 'warning_circle-filled',
    terms: ['!', 'danger', 'alert', 'caution', 'exclamation'],
    thirdparty: { name: ['streamline'], duplicate: ['warning_circle'] },
  },
  {
    name: 'warning_electricity-color',
    terms: ['!', 'danger', 'alert', 'caution', 'exclamation'],
    thirdparty: { name: ['streamline'] },
  },
  {
    name: 'warning_triangle',
    terms: ['!', 'danger', 'alert', 'caution', 'exclamation'],
    thirdparty: { name: ['streamline'] },
  },
  {
    name: 'warning_circle-filled-color',
    terms: ['!', 'danger', 'alert', 'caution', 'exclamation'],
    thirdparty: { name: ['streamline'], duplicate: ['warning_circle'] },
  },
  { name: 'water_heater', terms: ['hot-water tank', 'warmer'] },
  { name: 'washing_machine', terms: ['washer'] },
  { name: 'web_library-color', terms: [], thirdparty: { name: ['streamline'] } },
  {
    name: 'worker',
    terms: ['person', 'user', 'professional', 'employee', 'staff'],
    thirdparty: { name: ['streamline'] },
    duplicate: ['worker-color'],
  },
  { name: 'work_under_line-color', terms: [], thirdparty: { name: ['streamline'] } },
  { name: 'worker-color', terms: [], thirdparty: { name: ['streamline'] } },
  { name: 'wrench', terms: ['working', 'in progress', 'tool'], thirdparty: { name: ['streamline'] } },
  { name: 'zoom_in', terms: [], thirdparty: { name: ['streamline'] } },
  { name: 'zoom_out', terms: [], thirdparty: { name: ['streamline'] } },
];
