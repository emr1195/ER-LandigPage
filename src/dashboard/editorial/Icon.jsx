import React from 'react'
const paths = {
  home: 'm3 10 9-7 9 7v10H3Z M9 20v-8h6v8',
  menu: 'M4 5h16v14H4Z M4 10h16',
  sun: 'M7 17a5 5 0 0 1 10 0 M3 21h18 M12 2v4 M4 7l3 3 M20 7l-3 3 M2 15h3 M19 15h3',
  book: 'M12 5C9 3 5 3 2 5v15c3-2 7-2 10 0 3-2 7-2 10 0V5c-3-2-7-2-10 0Z M12 5v15',
  layers: 'm12 3 10 5-10 5L2 8Z M2 12l10 5 10-5 M2 16l10 5 10-5',
  flag: 'M5 22V3c5-4 9 4 14 0v11c-5 4-9-4-14 0',
  calendar: 'M4 5h16v16H4Z M4 10h16 M8 2v6 M16 2v6',
  users:
    'M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8 M1 22v-3a6 6 0 0 1 12 0v3 M16 4a4 4 0 0 1 0 8 M17 15a6 6 0 0 1 6 5v2',
  pin: 'M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z M15 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0',
  history: 'M3 3v6h6 M3 9a9 9 0 1 1 0 7 M12 7v6l4 2',
  arrow: 'M4 12h16 M14 6l6 6-6 6',
  close: 'm5 5 14 14 M19 5 5 19',
  bars: 'M3 6h18 M3 12h18 M3 18h18',
  check: 'm4 12 5 5L20 6',
  shield: 'm12 2 9 4v6c0 6-9 10-9 10S3 18 3 12V6Z m-4 10 3 3 5-6',
}
export const Icon = ({name, ...props}) => (
  <svg
    width="21"
    height="21"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <path d={paths[name] || paths.menu} />
  </svg>
)
