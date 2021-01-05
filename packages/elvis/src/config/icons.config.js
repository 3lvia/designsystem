/*
for renaming/deprecating icons add the following:
- deprecated: 'version number' e.g 4.6.0
- newIconName : reference to new icon to be displayed

example:
    { name: 'add_circle', deprecated: '4.6.0', newIconName: 'add_circle_new' },
*/
module.exports = [
  { name: 'add_circle', terms: ['plus', '+', 'maximize', 'expand', 'create'] },
  { name: 'add_circle-color', terms: ['plus', '+', 'maximize', 'expand', 'create'] },
  { name: 'add_circle-filled', terms: ['plus', '+', 'maximize', 'expand', 'create'] },
  { name: 'add_circle-filled-color', terms: ['plus', '+', 'maximize', 'expand', 'create'] },
  { name: 'add_powermeter', terms: [] },
  { name: 'add_powermeter-color', terms: [] },
  { name: 'agreements-color', terms: [] },
  { name: 'analytics_bars', terms: ['data', 'effect', 'board', 'wave', 'measure'] },
  { name: 'arrow_circle-color', deprecated: '4.7.0', newIconName: 'arrow_right_circle-color' },
  { name: 'arrow_right_circle-color', terms: ['next', 'right', 'forward'] },
  { name: 'arrow_circle-filled-color', deprecated: '4.7.0', newIconName: 'arrow_right_circle-filled-color' },
  { name: 'arrow_right_circle-filled-color', terms: ['next', 'right', 'forward'] },
  { name: 'arrow_left_circle-color', terms: ['next', 'left', 'backward'] },
  { name: 'arrow_left_circle-filled-color', terms: ['next', 'left', 'backward'] },
  { name: 'arrow_down', terms: ['expand', 'open'] },
  { name: 'arrow_down-bold', terms: ['expand', 'open'] },
  { name: 'arrow_external', terms: ['link'] },
  { name: 'arrow_external-bold', terms: ['link'] },
  { name: 'arrow_left', terms: ['back', 'backward'] },
  { name: 'arrow_left-bold', terms: ['back', 'backward'] },
  { name: 'arrow_long_left', terms: ['back', 'backward'] },
  { name: 'arrow_long_left-bold', terms: ['back', 'backward'] },
  { name: 'arrow_long', terms: ['next', 'forward'] },
  { name: 'arrow_long-bold', terms: ['next', 'forward'] },
  { name: 'arrow_right', terms: ['next', 'forward', 'open'] },
  { name: 'arrow_right-bold', terms: ['next', 'forward', 'open'] },
  { name: 'arrow_up', terms: ['collapse', 'close'] },
  { name: 'arrow_up-bold', terms: ['collapse', 'close'] },
  { name: 'attachment-color', terms: [] },
  { name: 'bin', terms: ['delete', 'trash'] },
  { name: 'bookmark', terms: [] },
  { name: 'bookmark-filled', terms: [] },
  { name: 'business-color', terms: [] },
  { name: 'cabin', terms: ['cottage', 'house', 'outside', 'woods'] },
  { name: 'calendar', terms: [] },
  { name: 'calendar_clock-color', terms: [] },
  { name: 'calendar-color', terms: [] },
  { name: 'call', terms: ['phone', 'mobile', 'telephone'] },
  { name: 'car_charger-color', terms: [] },
  { name: 'chat', terms: ['message', 'text', 'write', 'conversation'] },
  { name: 'charging_battery', terms: ['charge', 'load'] },
  { name: 'charging_battery-color', terms: ['charge', 'power'] },
  { name: 'check', terms: [] },
  { name: 'check-bold', terms: [] },
  { name: 'check_circle', terms: [] },
  { name: 'check_circle-filled', terms: [] },
  { name: 'check_circle-filled-color', terms: [] },
  { name: 'check_shield', terms: ['guard', 'safe'] },
  { name: 'checklist-color', terms: [] },
  { name: 'clock', terms: [] },
  { name: 'close', terms: ['x', 'remove'] },
  { name: 'close-bold', terms: ['x', 'remove'] },
  { name: 'close_menu', terms: ['x', 'remove'] },
  { name: 'cog', terms: ['settings', 'gear'] },
  { name: 'cookie', terms: ['cookies'] },
  { name: 'cost_cut-color', terms: [] },
  { name: 'collapse_circle-color', terms: [] },
  { name: 'collapse_circle-filled-color', terms: [] },
  { name: 'copy', terms: [] },
  { name: 'crane', terms: ['hook', 'building', 'tower'] },
  { name: 'credit_card', terms: [] },
  { name: 'cut_electricity_pillar', terms: [] },
  { name: 'cut_electricity_pillar-color', terms: [] },
  { name: 'danger_electricity-color', terms: [] },
  { name: 'dashboard', terms: [] },
  { name: 'dashboard-color', terms: [] },
  { name: 'design_process-color', terms: [] },
  { name: 'digging-color', terms: [] },
  { name: 'download', terms: [] },
  { name: 'edit', terms: ['pencil', 'pen'] },
  { name: 'electric_cabinet', terms: [] },
  { name: 'electric_cabinet-color', terms: [] },
  { name: 'electric_car-color', terms: [] },
  { name: 'electric_home', terms: [] },
  { name: 'electric_home-color', terms: [] },
  { name: 'electrical_system', terms: [] },
  { name: 'electrical_system-color', terms: [] },
  { name: 'electricity_pillar', terms: [] },
  { name: 'electricity_safety', terms: [] },
  { name: 'electricity_safety-color', terms: [] },
  { name: 'electricity_tower', terms: ['energy', 'high tension', 'tower', 'power'] },
  { name: 'elsmart-color', terms: [] },
  { name: 'expand_circle-color', terms: [] },
  { name: 'expand_circle-filled-color', terms: [] },
  { name: 'filter', terms: [] },
  { name: 'filter-filled', terms: [] },
  { name: 'flag', terms: [] },
  { name: 'flag-bold', terms: [] },
  { name: 'flag-bold-color', terms: [] },
  { name: 'flag-color', terms: [] },
  { name: 'folder', terms: [] },
  { name: 'folder_create', terms: ['add'] },
  { name: 'folder_open', terms: [] },
  { name: 'form_check-color', terms: [] },
  { name: 'form', terms: ['application', 'paper', 'sheet', 'letter', 'document', 'write', 'edit'] },
  { name: 'form-color', terms: [] },
  { name: 'full_battery', terms: [] },
  { name: 'full_battery-color', terms: [] },
  { name: 'freshchat-color', terms: ['message', 'text', 'write'] },
  { name: 'graph_bar', terms: [] },
  { name: 'graph_bar-color', terms: [] },
  { name: 'graph_up', terms: ['chart', 'cost'] },
  { name: 'ground_fault', terms: [] },
  { name: 'ground_fault-color', terms: [] },
  { name: 'hammer_wrench-color', terms: [] },
  { name: 'han', terms: [] },
  { name: 'han-color', terms: [] },
  { name: 'home', terms: [] },
  { name: 'home-color', terms: [] },
  { name: 'house_rebuilding-color', terms: [] },
  { name: 'image_add-color', terms: [] },
  { name: 'information_circle', terms: ['help', 'advice', 'guidance'] },
  { name: 'information_circle-color', terms: ['help', 'advice', 'guidance'] },
  { name: 'information_circle-filled-color', terms: ['help', 'advice', 'guidance'] },
  { name: 'installatorweb-color', terms: ['installatørweb', 'innstallatørweb'] },
  { name: 'invoice-color', terms: [] },
  { name: 'laptop-color', terms: ['computer', 'screen', 'pc', 'mac'] },
  { name: 'list', terms: [] },
  { name: 'list_bullets-bold', terms: [] },
  { name: 'loading', terms: [] },
  { name: 'lock', terms: [] },
  { name: 'lock_hierarchy', terms: ['lock', 'hierarchy', 'closed', 'nodes'] },
  { name: 'logout', terms: [] },
  { name: 'long_circle_left', terms: ['arrow', 'long', 'circle', 'left', 'back'] },
  { name: 'long_circle_right', terms: ['arrow', 'long', 'circle', 'right', 'forward'] },
  { name: 'mail', terms: ['e-mail', 'post', 'letter', 'email'] },
  { name: 'mail_error-color', terms: ['e-mail', 'post', 'letter', 'fail', 'wrong', 'email'] },
  { name: 'mail_monitor-color', terms: ['observe'] },
  { name: 'mail_send-color', terms: ['e-mail', 'post', 'letter', 'email'] },
  { name: 'map_pin-color', terms: [] },
  { name: 'menu', terms: [] },
  { name: 'menu-bold', terms: [] },
  { name: 'minus', terms: ['subtract', 'minimize', 'collapse'] },
  { name: 'minus-bold', terms: ['subtract', 'minimize', 'collapse'] },
  { name: 'money-color', terms: ['finance', 'cash', 'coins', 'payment', 'pay', 'cost'] },
  { name: 'move_circle', terms: ['move', 'transfer'] },
  { name: 'move_truck-color', terms: [] },
  { name: 'new_tab-bold', terms: ['external', 'open', 'link'] },
  { name: 'note_approved-color', terms: [] },
  { name: 'note_check-color', terms: [] },
  { name: 'notification-bold', terms: ['alarm', 'bell', 'alert'] },
  { name: 'open_menu', terms: [] },
  { name: 'paper_plane', terms: ['send', 'message'] },
  { name: 'pause_circle-color', terms: ['stop'] },
  { name: 'pause_circle-filled-color', terms: ['stop'] },
  { name: 'phone', terms: ['mobile'] },
  { name: 'phone_comment', terms: ['mobile'] },
  { name: 'phone_comment-color', terms: ['mobile', 'write', 'text', 'message'] },
  { name: 'phone_image', terms: ['mobile', 'picture', 'content'] },
  { name: 'pdf_document', terms: ['adobe', 'file'] },
  { name: 'pie_chart', terms: [] },
  { name: 'pin', terms: [] },
  { name: 'pin-color', terms: ['place', 'location', 'locate', 'position', 'area', 'map'] },
  { name: 'pin-filled', terms: ['place', 'location', 'locate', 'position', 'area', 'map'] },
  { name: 'play_circle-color', terms: ['start', 'go'] },
  { name: 'play_circle-filled-color', terms: ['start', 'go'] },
  { name: 'plus', terms: ['add', 'maximize', 'expand', 'create'] },
  { name: 'plus-bold', terms: ['add', 'maximize', 'expand', 'create'] },
  { name: 'position-bold', terms: [] },
  { name: 'position-bold-color', terms: [] },
  { name: 'position_off-bold', terms: [] },
  { name: 'power', terms: [] },
  { name: 'power_outage', terms: [] },
  { name: 'power_outage-2', terms: [] },
  { name: 'power_outage-2-color', terms: [] },
  { name: 'power_outage-color', terms: [] },
  { name: 'power_outage_map', terms: [] },
  { name: 'power_outage-orange-color', terms: [] },
  { name: 'power_service', terms: [] },
  { name: 'power-color', terms: [] },
  { name: 'powerline', terms: [] },
  { name: 'powerline-color', terms: [] },
  { name: 'powermeter_ams', terms: [] },
  { name: 'powermeter_ams-color', terms: [] },
  { name: 'powermeter_old', terms: [] },
  { name: 'powermeter-color', terms: [] },
  { name: 'profile', terms: [] },
  { name: 'profile-2', terms: [] },
  { name: 'profile-2-color', terms: [] },
  { name: 'profile-bold', terms: [] },
  { name: 'question_circle', terms: ['?', 'help', 'answer'] },
  { name: 'question_circle-color', terms: ['?', 'help', 'answer'] },
  { name: 'question_circle-filled-color', terms: ['?', 'help', 'answer'] },
  { name: 'quotation-color', terms: ['quote', 'reference'] },
  { name: 'refresh', terms: [] },
  { name: 'remove_circle', terms: ['delete', 'dismiss', 'discard'] },
  { name: 'remove_circle-color', terms: ['delete', 'dismiss', 'discard'] },
  { name: 'remove_circle-filled', terms: ['delete', 'dismiss', 'discard'] },
  { name: 'remove_circle-filled-color', terms: ['delete', 'dismiss', 'discard'] },
  { name: 'renewable_energy', terms: [] },
  { name: 'renewable_energy-color', terms: [] },
  { name: 'reset', terms: [] },
  { name: 'rss-bold', terms: ['feed', 'connection', 'internet', 'online'] },
  { name: 'figma', terms: [] },
  { name: 'search', terms: [] },
  { name: 'search-color', terms: [] },
  { name: 'search-bold', terms: [] },
  { name: 'smart_city', terms: [] },
  { name: 'smart_city-color', terms: [] },
  { name: 'solar_panel', terms: [] },
  { name: 'solar_panel-color', terms: [] },
  { name: 'sorting-bold', terms: ['sort', 'sorting', 'order'] },
  { name: 'star-filled', terms: ['favorite', 'favourite'] },
  { name: 'star', terms: ['favorite', 'favourite'] },
  { name: 'step_1', terms: ['number', 'first', 'one'] },
  { name: 'step_2', terms: ['number', 'second', 'two'] },
  { name: 'step_3', terms: ['number', 'third', 'three'] },
  { name: 'step_4', terms: ['number', 'fourth', 'four'] },
  { name: 'step_5', terms: ['number', 'fifth', 'five'] },
  { name: 'subtract_circle', terms: ['minus', '-', 'minimize', 'collapse'] },
  { name: 'subtract_circle-filled', terms: ['minus', '-', 'minimize', 'collapse'] },
  { name: 'subtract_circle-filled-color', terms: ['minus', '-', 'minimize', 'collapse'] },
  { name: 'support', terms: ['customer service', 'help'] },
  { name: 'sync', terms: ['synchronization', 'refresh', 'reload', 'arrows'] },
  { name: 'tag_add', terms: [] },
  { name: 'tag', terms: [] },
  { name: 'thumbnail', terms: [] },
  { name: 'touch_finger-color', terms: [] },
  { name: 'tree_falling', terms: [] },
  { name: 'tree_powerline', terms: [] },
  { name: 'tree_powerline-color', terms: [] },
  { name: 'unlock', terms: [] },
  { name: 'upload', terms: [] },
  { name: 'user_testing-color', terms: [] },
  { name: 'users', terms: ['profile', 'persons', 'people', 'group', 'multiple'] },
  { name: 'view_off', terms: ['eye', 'eye closed'] },
  { name: 'view_on', terms: ['eye', 'eye open'] },
  { name: 'warning_circle', terms: ['!', 'danger', 'alert', 'caution', 'exclamation'] },
  { name: 'warning_circle-filled', terms: ['!', 'danger', 'alert', 'caution', 'exclamation'] },
  { name: 'warning_electricity-color', terms: ['!', 'danger', 'alert', 'caution', 'exclamation'] },
  { name: 'warning_triangle', terms: ['!', 'danger', 'alert', 'caution', 'exclamation'] },
  { name: 'warning_circle-filled-color', terms: ['!', 'danger', 'alert', 'caution', 'exclamation'] },
  { name: 'web_library-color', terms: [] },
  { name: 'work_under_line-color', terms: [] },
  { name: 'worker-color', terms: [] },
  { name: 'wrench', terms: ['working', 'in progress', 'tool'] },
];
