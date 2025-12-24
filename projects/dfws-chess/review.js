// --- review.js (Advanced Analysis Version) ---

import { Chess } from './chess.js';

// --- Constants and Globals ---
const MOVE_CLASSIFICATION_SVG_ICONS = {
    "Brillant": `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" style="vertical-align:middle;"><g><path opacity="0.3" d="M9,.5a9,9,0,1,0,9,9A9,9,0,0,0,9,.5Z"></path><path fill="#26c2a3" d="M9,0a9,9,0,1,0,9,9A9,9,0,0,0,9,0Z"></path><g opacity="0.2"><path d="M12.57,14.6a.51.51,0,0,1,0,.13.44.44,0,0,1-.08.11l-.11.08-.13,0h-2l-.13,0L10,14.84A.41.41,0,0,1,10,14.6V12.7a.32.32,0,0,1,.09-.23.39.39,0,0,1,.1-.08l.13,0h2a.31.31,0,0,1,.24.1.39.39,0,0,1,.08.1.51.51,0,0,1,0,.13Zm-.12-3.93a.17.17,0,0,1,0,.12.41.41,0,0,1-.07.11.4.4,0,0,1-.23.08H10.35a.31.31,0,0,1-.34-.31L9.86,3.9A.36.36,0,0,1,10,3.66a.23.23,0,0,1,.11-.08.27.27,0,0,1,.13,0H12.3a.32.32,0,0,1,.25.1.36.36,0,0,1,.09.24Z"></path><path d="M8.07,14.6a.51.51,0,0,1,0,.13.44.44,0,0,1-.08.11l-.11.08-.13,0h-2l-.13,0-.11-.08a.41.41,0,0,1-.08-.24V12.7a.27.27,0,0,1,0-.13.36.36,0,0,1,.07-.1.39.39,0,0,1,.1-.08l.13,0h2a.31.31,0,0,1,.24.1.39.39,0,0,1,.08.1.51.51,0,0,1,0,.13ZM8,10.67a.17.17,0,0,1,0,.12.41.41,0,0,1-.07.11.4.4,0,0,1-.23.08H5.85a.31.31,0,0,1-.34-.31L5.36,3.9a.36.36,0,0,1,.09-.24.23.23,0,0,1,.11-.08.27.27,0,0,1,.13,0H7.8a.35.35,0,0,1,.25.1.36.36,0,0,1,.09.24Z"></path></g><g><path fill="#fff" d="M12.57,14.1a.51.51,0,0,1,0,.13.44.44,0,0,1-.08.11l-.11.08-.13,0h-2l-.13,0L10,14.34A.41.41,0,0,1,10,14.1V12.2A.32.32,0,0,1,10,12a.39.39,0,0,1,.1-.08l.13,0h2a.31.31,0,0,1,.24.1.39.39,0,0,1,.08.1.51.51,0,0,1,0,.13Zm-.12-3.93a.17.17,0,0,1,0,.12.41.41,0,0,1-.07.11.4.4,0,0,1-.23.08H10.35a.31.31,0,0,1-.34-.31L9.86,3.4A.36.36,0,0,1,10,3.16a.23.23,0,0,1,.11-.08.27.27,0,0,1,.13,0H12.3a.32.32,0,0,1,.25.1.36.36,0,0,1,.09.24Z"></path><path fill="#fff" d="M8.07,14.1a.51.51,0,0,1,0,.13.44.44,0,0,1-.08.11l-.11.08-.13,0h-2l-.13,0-.11-.08a.41.41,0,0,1-.08-.24V12.2a.27.27,0,0,1,0-.13.36.36,0,0,1,.07-.1.39.39,0,0,1,.1-.08l.13,0h2A.31.31,0,0,1,8,12a.39.39,0,0,1,.08.1.51.51,0,0,1,0,.13ZM8,10.17a.17.17,0,0,1,0,.12.41.41,0,0,1-.07.11.4.4,0,0,1-.23.08H5.85a.31.31,0,0,1-.34-.31L5.36,3.4a.36.36,0,0,1,.09-.24.23.23,0,0,1,.11-.08.27.27,0,0,1,.13,0H7.8a.35.35,0,0,1,.25.1.36.36,0,0,1,.09.24Z"></path></g></g></svg>`,
    "Très bon": `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" style="vertical-align:middle;"><g><path opacity="0.3" d="M9,.5a9,9,0,1,0,9,9A9,9,0,0,0,9,.5Z"></path><path fill="#749BBF" d="M9,0a9,9,0,1,0,9,9A9,9,0,0,0,9,0Z"></path><g><g opacity="0.2"><path d="M10.32,14.6a.27.27,0,0,1,0,.13.44.44,0,0,1-.08.11l-.11.08-.13,0H8l-.13,0-.11-.08a.41.41,0,0,1-.08-.24V12.7a.27.27,0,0,1,0-.13.36.36,0,0,1,.07-.1.39.39,0,0,1,.1-.08l.13,0h2a.31.31,0,0,1,.24.1.39.39,0,0,1,.08.1.51.51,0,0,1,0,.13Zm-.12-3.93a.17.17,0,0,1,0,.12.41.41,0,0,1-.07.11.4.4,0,0,1-.23.08H8.1a.31.31,0,0,1-.34-.31L7.61,3.9a.36.36,0,0,1,.09-.24.23.23,0,0,1,.11-.08.27.27,0,0,1,.13,0h2.11a.32.32,0,0,1,.25.1.36.36,0,0,1,.09.24Z"></path></g><path fill="#fff" d="M10.32,14.1a.27.27,0,0,1,0,.13.44.44,0,0,1-.08.11l-.11.08-.13,0H8l-.13,0-.11-.08a.41.41,0,0,1-.08-.24V12.2a.27.27,0,0,1,0-.13.36.36,0,0,1,.07-.1.39.39,0,0,1,.1-.08l.13,0h2a.31.31,0,0,1,.24.1.39.39,0,0,1,.08.1.51.51,0,0,1,0,.13Zm-.12-3.93a.17.17,0,0,1,0,.12.41.41,0,0,1-.07.11.4.4,0,0,1-.23.08H8.1a.31.31,0,0,1-.34-.31L7.61,3.4a.36.36,0,0,1,.09-.24.23.23,0,0,1,.11-.08.27.27,0,0,1,.13,0h2.11a.32.32,0,0,1,.25.1.36.36,0,0,1,.09.24Z"></path></g></g></svg>`,
    "Meilleur": `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" style="vertical-align:middle;"><g><path opacity="0.3" d="M9,.5a9,9,0,1,0,9,9A9,9,0,0,0,9,.5Z"></path><path fill="#81B64C" d="M9,0a9,9,0,1,0,9,9A9,9,0,0,0,9,0Z"></path><path opacity="0.2" d="M9,3.43a.5.5,0,0,0-.27.08.46.46,0,0,0-.17.22L7.24,7.17l-3.68.19a.52.52,0,0,0-.26.1.53.53,0,0,0-.16.23.45.45,0,0,0,0,.28.44.44,0,0,0,.15.23l2.86,2.32-1,3.56a.45.45,0,0,0,0,.28.46.46,0,0,0,.17.22.41.41,0,0,0,.26.09.43.43,0,0,0,.27-.08l3.09-2,3.09,2a.46.46,0,0,0,.53,0,.46.46,0,0,0,.17-.22.53.53,0,0,0,0-.28l-1-3.56L14.71,8.2A.44.44,0,0,0,14.86,8a.45.45,0,0,0,0-.28.53.53,0,0,0-.16-.23.52.52,0,0,0-.26-.1l-3.68-.2L9.44,3.73a.46.46,0,0,0-.17-.22A.5.5,0,0,0,9,3.43Z"></path><path fill="#fff" d="M9,2.93A.5.5,0,0,0,8.73,3a.46.46,0,0,0-.17.22L7.24,6.67l-3.68.19A.52.52,0,0,0,3.3,7a.53.53,0,0,0-.16.23.45.45,0,0,0,0,.28.44.44,0,0,0,.15.23L6.15,10l-1,3.56a.45.45,0,0,0,0,.28.46.46,0,0,0,.17.22.41.41,0,0,0,.26.09.43.43,0,0,0,.27-.08l3.09-2,3.09,2a.46.46,0,0,0,.53,0,.46.46,0,0,0,.17-.22.53.53,0,0,0,0-.28l-1-3.56L14.71,7.7a.44.44,0,0,0,.15-.23.45.45,0,0,0,0-.28A.53.53,0,0,0,14.7,7a.52.52,0,0,0-.26-.1l-3.68-.2L9.44,3.23A.46.46,0,0,0,9.27,3,.5.5,0,0,0,9,2.93Z"></path></g></svg>`,
    "Excellent": `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" style="vertical-align:middle;"><g><g><path opacity="0.3" d="M9,.5a9,9,0,1,0,9,9A9,9,0,0,0,9,.5Z"></path><path fill="#81B64C" d="M9,0a9,9,0,1,0,9,9A9,9,0,0,0,9,0Z"></path></g><g opacity="0.2"><path d="M13.79,11.34c0-.2.4-.53.4-.94S14,9.72,14,9.58a2.06,2.06,0,0,0,.18-.83,1,1,0,0,0-.3-.69,1.13,1.13,0,0,0-.55-.2,10.29,10.29,0,0,1-2.07,0c-.37-.23,0-1.18.18-1.7S11.9,4,10.62,3.7c-.69-.17-.66.37-.78.9-.05.21-.09.43-.13.57A5,5,0,0,1,7.05,8.23a1.57,1.57,0,0,1-.42.18v4.94A7.23,7.23,0,0,1,8,13.53c.52.12.91.25,1.44.33A11.11,11.11,0,0,0,11,14a6.65,6.65,0,0,0,1.18,0,1.09,1.09,0,0,0,1-.59.66.66,0,0,0,.06-.2,1.63,1.63,0,0,1,.07-.3c.13-.28.37-.3.5-.68S13.74,11.53,13.79,11.34Z"></path><path d="M5.49,8.09H4.31a.5.5,0,0,0-.5.5v4.56a.5.5,0,0,0,.5.5H5.49a.5.5,0,0,0,.5-.5V8.59A.5.5,0,0,0,5.49,8.09Z"></path></g><g><path fill="#fff" d="M13.79,10.84c0-.2.4-.53.4-.94S14,9.22,14,9.08a2.06,2.06,0,0,0,.18-.83,1,1,0,0,0-.3-.69,1.13,1.13,0,0,0-.55-.2,10.29,10.29,0,0,1-2.07,0c-.37-.23,0-1.18.18-1.7s.51-2.12-.77-2.43c-.69-.17-.66.37-.78.9-.05.21-.09.43-.13.57A5,5,0,0,1,7.05,7.73a1.57,1.57,0,0,1-.42.18v4.94A7.23,7.23,0,0,1,8,13c.52.12.91.25,1.44.33a11.11,11.11,0,0,0,1.62.16,6.65,6.65,0,0,0,1.18,0,1.09,1.09,0,0,0,1-.59.66.66,0,0,0,.06-.2,1.63,1.63,0,0,1,.07-.3c.13-.28.37-.3.5-.68S13.74,11,13.79,10.84Z"></path><path fill="#fff" d="M5.49,7.59H4.31a.5.5,0,0,0-.5.5v4.56a.5.5,0,0,0,.5.5H5.49a.5.5,0,0,0,.5-.5V8.09A.5.5,0,0,0,5.49,7.59Z"></path></g></g></svg>`,
    "Bon": `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" style="vertical-align:middle;"><g><g><path opacity="0.3" d="M9,.5a9,9,0,1,0,9,9A9,9,0,0,0,9,.5Z"></path><path fill="#95b776" d="M9,0a9,9,0,1,0,9,9A9,9,0,0,0,9,0Z"></path></g><g><path opacity="0.2" d="M15.11,6.81,9.45,12.47,7.79,14.13a.39.39,0,0,1-.28.11.39.39,0,0,1-.27-.11L2.89,9.78a.39.39,0,0,1-.11-.28.39.39,0,0,1,.11-.27L4.28,7.85a.34.34,0,0,1,.12-.09l.15,0a.37.37,0,0,1,.15,0,.38.38,0,0,1,.13.09l2.69,2.68,5.65-5.65a.38.38,0,0,1,.13-.09.37.37,0,0,1,.15,0,.4.4,0,0,1,.15,0,.34.34,0,0,1,.12.09l1.39,1.38a.41.41,0,0,1,.08.13.33.33,0,0,1,0,.15.4.4,0,0,1,0,.15A.5.5,0,0,1,15.11,6.81Z"></path><path fill="#fff" d="M15.11,6.31,9.45,12,7.79,13.63a.39.39,0,0,1-.28.11.39.39,0,0,1-.27-.11L2.89,9.28A.39.39,0,0,1,2.78,9a.39.39,0,0,1,.11-.27L4.28,7.35a.34.34,0,0,1,.12-.09l.15,0a.37.37,0,0,1,.15,0,.38.38,0,0,1,.13.09L7.52,10l5.65-5.65a.38.38,0,0,1,.13-.09.37.37,0,0,1,.15,0,.4.4,0,0,1,.15,0,.34.34,0,0,1,.12.09l1.39,1.38a.41.41,0,0,1,.08.13.33.33,0,0,1,0,.15.4.4,0,0,1,0,.15A.5.5,0,0,1,15.11,6.31Z"></path></g></g></svg>`,
    "Théorique": `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" style="vertical-align:middle;"><g><path opacity="0.3" d="M9,.5a9,9,0,1,0,9,9A9,9,0,0,0,9,.5Z"></path><path fill="#D5A47D" d="M9,0a9,9,0,1,0,9,9A9,9,0,0,0,9,0Z"></path><g><path opacity="0.3" isolation="isolate" d="M8.45,5.9c-1-.75-2.51-1.09-4.83-1.09H2.54v8.71H3.62a8.16,8.16,0,0,1,4.83,1.17Z"></path><path opacity="0.3" isolation="isolate" d="M9.54,14.69a8.14,8.14,0,0,1,4.84-1.17h1.08V4.81H14.38c-2.31,0-3.81.34-4.84,1.09Z"></path><path fill="#fff" d="M8.45,5.4c-1-.75-2.51-1.09-4.83-1.09H3V13h.58a8.09,8.09,0,0,1,4.83,1.17Z"></path><path fill="#fff" d="M9.54,14.19A8.14,8.14,0,0,1,14.38,13H15V4.31h-.58c-2.31,0-3.81.34-4.84,1.09Z"></path></g></g></svg>`,
    "Imprécision": `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" style="vertical-align:middle;"><g><path opacity="0.3" d="M9,.5a9,9,0,1,0,9,9A9,9,0,0,0,9,.5Z"></path><path fill="#F7C631" d="M9,0a9,9,0,1,0,9,9A9,9,0,0,0,9,0Z"></path><g opacity="0.2"><path d="M13.66,14.8a.28.28,0,0,1,0,.13.23.23,0,0,1-.08.11.28.28,0,0,1-.11.08l-.12,0h-2l-.13,0a.27.27,0,0,1-.1-.08A.36.36,0,0,1,11,14.8V12.9a.59.59,0,0,1,0-.13.36.36,0,0,1,.07-.1l.1-.08.13,0h2a.33.33,0,0,1,.23.1.39.39,0,0,1,.08.1.28.28,0,0,1,0,.13Zm-.12-3.93a.31.31,0,0,1,0,.13.3.3,0,0,1-.07.1.3.3,0,0,1-.23.08H11.43a.31.31,0,0,1-.34-.31L10.94,4.1A.5.5,0,0,1,11,3.86l.11-.08.13,0h2.11a.35.35,0,0,1,.26.1.41.41,0,0,1,.08.24Z"></path><path d="M7.65,14.82a.27.27,0,0,1,0,.12.26.26,0,0,1-.07.11l-.1.07-.13,0H5.43a.25.25,0,0,1-.12,0,.27.27,0,0,1-.1-.08.31.31,0,0,1-.09-.22V13a.36.36,0,0,1,.09-.23l.1-.07.12,0H7.32a.32.32,0,0,1,.23.09.3.3,0,0,1,.07.1.28.28,0,0,1,0,.13Zm2.2-7.17a3.1,3.1,0,0,1-.36.73A5.58,5.58,0,0,1,9,9a4.85,4.85,0,0,1-.52.49,8,8,0,0,0-.65.63,1,1,0,0,0-.27.7V11a.21.21,0,0,1,0,.12.17.17,0,0,1-.06.1.23.23,0,0,1-.1.07l-.12,0H5.53a.21.21,0,0,1-.12,0,.18.18,0,0,1-.1-.07.2.2,0,0,1-.08-.1.37.37,0,0,1,0-.12v-.35a2.68,2.68,0,0,1,.13-.84,2.91,2.91,0,0,1,.33-.66,3.38,3.38,0,0,1,.45-.55c.16-.15.33-.29.49-.42a7.84,7.84,0,0,0,.65-.64,1,1,0,0,0,.25-.67.77.77,0,0,0-.07-.34.67.67,0,0,0-.23-.27A1.16,1.16,0,0,0,6.49,6,1.61,1.61,0,0,0,6,6.11a3,3,0,0,0-.41.18,1.75,1.75,0,0,0-.29.18l-.11.09A.5.5,0,0,1,5,6.62a.31.31,0,0,1-.21-.13l-1-1.21a.3.3,0,0,1,0-.4A1.36,1.36,0,0,1,4,4.68a3.07,3.07,0,0,1,.56-.38,5.49,5.49,0,0,1,.9-.37,3.69,3.69,0,0,1,1.19-.17,3.92,3.92,0,0,1,2.3.75,2.85,2.85,0,0,1,.77.92A2.82,2.82,0,0,1,10,6.71,3,3,0,0,1,9.85,7.65Z"></path></g><g><path fill="#fff" d="M13.66,14.3a.28.28,0,0,1,0,.13.23.23,0,0,1-.08.11.28.28,0,0,1-.11.08l-.12,0h-2l-.13,0a.27.27,0,0,1-.1-.08A.36.36,0,0,1,11,14.3V12.4a.59.59,0,0,1,0-.13.36.36,0,0,1,.07-.1l.1-.08.13,0h2a.33.33,0,0,1,.23.1.39.39,0,0,1,.08.1.28.28,0,0,1,0,.13Zm-.12-3.93a.31.31,0,0,1,0,.13.3.3,0,0,1-.07.1.3.3,0,0,1-.23.08H11.43a.31.31,0,0,1-.34-.31L10.94,3.6A.5.5,0,0,1,11,3.36l.11-.08.13,0h2.11a.35.35,0,0,1,.26.1.41.41,0,0,1,.08.24Z"></path><path fill="#fff" d="M7.65,14.32a.27.27,0,0,1,0,.12.26.26,0,0,1-.07.11l-.1.07-.13,0H5.43a.25.25,0,0,1-.12,0,.27.27,0,0,1-.1-.08.31.31,0,0,1-.09-.22V12.49a.36.36,0,0,1,.09-.23l.1-.07.12,0H7.32a.32.32,0,0,1,.23.09.3.3,0,0,1,.07.1.28.28,0,0,1,0,.13Zm2.2-7.17a3.1,3.1,0,0,1-.36.73,5.58,5.58,0,0,1-.49.6A4.85,4.85,0,0,1,8.48,9a8,8,0,0,0-.65.63,1,1,0,0,0-.27.7v.22a.21.21,0,0,1,0,.12.17.17,0,0,1-.06.1.23.23,0,0,1-.1.07l-.12,0H5.53a.21.21,0,0,1-.12,0,.18.18,0,0,1-.1-.07.2.2,0,0,1-.08-.1.37.37,0,0,1,0-.12v-.35a2.68,2.68,0,0,1,.13-.84,2.91,2.91,0,0,1,.33-.66,3.38,3.38,0,0,1,.45-.55c.16-.15.33-.29.49-.42a7.84,7.84,0,0,0,.65-.64,1,1,0,0,0,.25-.67.77.77,0,0,0-.07-.34.67.67,0,0,0-.23-.27,1.16,1.16,0,0,0-.72-.24A1.61,1.61,0,0,0,6,5.61a3,3,0,0,0-.41.18A1.75,1.75,0,0,0,5.3,6l-.11.09A.5.5,0,0,1,5,6.12.31.31,0,0,1,4.74,6l-1-1.21a.3.3,0,0,1,0-.4A1.36,1.36,0,0,1,4,4.18a3.07,3.07,0,0,1,.56-.38,5.49,5.49,0,0,1,.9-.37A3.69,3.69,0,0,1,8.93,4a2.85,2.85,0,0,1,.77.92A2.82,2.82,0,0,1,10,6.21,3,3,0,0,1,9.85,7.15Z"></path></g></g></svg>`,
    "Erreur": `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" style="vertical-align:middle;"><g><g><path opacity="0.3" d="M9,.5a9,9,0,1,0,9,9A9,9,0,0,0,9,.5Z"></path><path fill="#FFA459" d="M9,0a9,9,0,1,0,9,9A9,9,0,0,0,9,0Z"></path></g><g><g opacity="0.2"><path d="M9.92,15a.27.27,0,0,1,0,.12.41.41,0,0,1-.07.11.32.32,0,0,1-.23.09H7.7a.25.25,0,0,1-.12,0,.27.27,0,0,1-.1-.08A.31.31,0,0,1,7.39,15V13.19A.32.32,0,0,1,7.48,13l.1-.07.12,0H9.59a.32.32,0,0,1,.23.09.61.61,0,0,1,.07.1.28.28,0,0,1,0,.13Zm2.2-7.17a3.1,3.1,0,0,1-.36.73,5.58,5.58,0,0,1-.49.6,6,6,0,0,1-.52.49,8,8,0,0,0-.65.63,1,1,0,0,0-.27.7v.22a.24.24,0,0,1,0,.12.17.17,0,0,1-.06.1.3.3,0,0,1-.1.07l-.12,0H7.79l-.12,0a.3.3,0,0,1-.1-.07.26.26,0,0,1-.07-.1.37.37,0,0,1,0-.12v-.35A2.42,2.42,0,0,1,7.61,10a2.55,2.55,0,0,1,.33-.66,3.38,3.38,0,0,1,.45-.55c.16-.15.33-.29.49-.42a7.73,7.73,0,0,0,.64-.64,1,1,0,0,0,.26-.67.77.77,0,0,0-.07-.34.75.75,0,0,0-.23-.27,1.16,1.16,0,0,0-.72-.24,1.61,1.61,0,0,0-.49.07,3,3,0,0,0-.41.18,1.41,1.41,0,0,0-.29.18l-.11.09A.5.5,0,0,1,7,6.69L6,5.48a.29.29,0,0,1,0-.4,1.36,1.36,0,0,1,.21-.2,3.07,3.07,0,0,1,.56-.38,5.38,5.38,0,0,1,.89-.37A3.75,3.75,0,0,1,8.9,4,4.07,4.07,0,0,1,10.1,4.19a4,4,0,0,1,1.09.56,2.76,2.76,0,0,1,.78.92,2.82,2.82,0,0,1,.28,1.28A3,3,0,0,1,12.12,7.85Z"></path></g><path fill="#fff" d="M9.92,14.52a.27.27,0,0,1,0,.12.41.41,0,0,1-.07.11.32.32,0,0,1-.23.09H7.7a.25.25,0,0,1-.12,0,.27.27,0,0,1-.1-.08.31.31,0,0,1-.09-.22V12.69a.32.32,0,0,1,.09-.23l.1-.07.12,0H9.59a.32.32,0,0,1,.23.09.61.61,0,0,1,.07.1.28.28,0,0,1,0,.13Zm2.2-7.17a3.1,3.1,0,0,1-.36.73,5.58,5.58,0,0,1-.49.6,6,6,0,0,1-.52.49,8,8,0,0,0-.65.63,1,1,0,0,0-.27.7v.22a.24.24,0,0,1,0,.12.17.17,0,0,1-.06.1.3.3,0,0,1-.1.07l-.12,0H7.79l-.12,0a.3.3,0,0,1-.1-.07.26.26,0,0,1-.07-.1.37.37,0,0,1,0-.12v-.35A2.42,2.42,0,0,1,7.61,10a2.55,2.55,0,0,1,.33-.66,3.38,3.38,0,0,1,.45-.55c.16-.15.33-.29.49-.42a7.73,7.73,0,0,0,.64-.64,1,1,0,0,0,.26-.67.77.77,0,0,0-.07-.34A.75.75,0,0,0,9.48,6a1.16,1.16,0,0,0-.72-.24,1.61,1.61,0,0,0-.49.07A3,3,0,0,0,7.86,6a1.41,1.41,0,0,0-.29.18l-.11.09a.5.5,0,0,1-.24.06A.31.31,0,0,1,7,6.19L6,5a.29.29,0,0,1,0-.4,1.36,1.36,0,0,1,.21-.2,3.07,3.07,0,0,1,.56-.38,5.38,5.38,0,0,1,.89-.37A3.75,3.75,0,0,1,8.9,4,4.07,4.07,0,0,1,10.1,4.19,4,4,0,0,1,11.19,4.75a2.76,2.76,0,0,1,.78.92,2.82,2.82,0,0,1,.28,1.28A3,3,0,0,1,12.12,7.35Z"></path></g></g></svg>`,
    "Manqué": `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" style="vertical-align:middle;"><defs><style>.cls-1{fill:#f1f2f2;}.cls-2{fill:#FF7769;}.cls-3{opacity:.2;}.cls-4{opacity:.3;}</style></defs><g><path class="cls-4" d="M9,.5C4.03,.5,0,4.53,0,9.5s4.03,9,9,9,9-4.03,9-9S13.97,.5,9,.5Z"></path><path class="cls-2" d="M9,0C4.03,0,0,4.03,0,9s4.03,9,9,9,9-4.03,9-9S13.97,0,9,0Z"></path><g class="cls-3"><path d="M13.99,12.51s.06,.08,.08,.13c.02,.05,.03,.1,.03,.15s-.01,.1-.03,.15c-.02,.05-.05,.09-.08,.13l-1.37,1.37s-.08,.06-.13,.08c-.05,.02-.1,.03-.15,.03s-.1-.01-.15-.03c-.05-.02-.09-.05-.13-.08l-3.06-3.06-3.06,3.06s-.08,.06-.13,.08c-.05,.02-.1,.03-.15,.03s-.1-.01-.15-.03c-.05-.02-.09-.05-.13-.08l-1.37-1.37c-.07-.07-.11-.17-.11-.28s.04-.2,.11-.28l3.06-3.06-3.06-3.06c-.07-.07-.11-.17-.11-.28s.04-.2,.11-.28l1.37-1.37c.07-.07,.17-.11,.28-.11s.2,.04,.28,.11l3.06,3.06,3.06-3.06c.07-.07,.17-.11,.28-.11s.2,.04,.28,.11l1.37,1.37s.06,.08,.08,.13c.02,.05,.03,.1,.03,.15s-.01,.1-.03,.15c-.02,.05-.05,.09-.08,.13l-3.06,3.06,3.06,3.06Z"></path></g><path class="cls-1" d="M13.99,12.01s.06,.08,.08,.13c.02,.05,.03,.1,.03,.15s-.01,.1-.03,.15c-.02,.05-.05,.09-.08,.13l-1.37,1.37s-.08,.06-.13,.08c-.05,.02-.1,.03-.15,.03s-.1-.01-.15-.03c-.05-.02-.09-.05-.13-.08l-3.06-3.06-3.06,3.06s-.08,.06-.13,.08c-.05,.02-.1,.03-.15,.03s-.1-.01-.15-.03c-.05-.02-.09-.05-.13-.08l-1.37-1.37c-.07-.07-.11-.17-.11-.28s.04-.2,.11-.28l3.06-3.06-3.06-3.06c-.07-.07-.11-.17-.11-.28s.04-.2,.11-.28l1.37-1.37c.07-.07,.17-.11,.28-.11s.2,.04,.28,.11l3.06,3.06,3.06-3.06c.07-.07,.17-.11,.28-.11s.2,.04,.28,.11l1.37,1.37s.06,.08,.08,.13c.02,.05,.03,.1,.03,.15s-.01,.1-.03,.15c-.02,.05-.05,.09-.08,.13l-3.06,3.06,3.06,3.06Z"></path></g></svg>`,
    "Gaffe": `<svg xmlns="http://www.w3.org/2000/svg" class="" width="18" height="19" viewBox="0 0 18 19" style="vertical-align:middle;"><g id="Gaffe"><path class="icon-shadow" opacity="0.3" d="M9,.5a9,9,0,1,0,9,9A9,9,0,0,0,9,.5Z"></path><path class="icon-background" fill="#FA412D" d="M9,0a9,9,0,1,0,9,9A9,9,0,0,0,9,0Z"></path><g class="icon-component-shadow" opacity="0.2"><path d="M14.74,5.45A2.58,2.58,0,0,0,14,4.54,3.76,3.76,0,0,0,12.89,4a4.07,4.07,0,0,0-1.2-.19A3.92,3.92,0,0,0,10.51,4a5.87,5.87,0,0,0-.9.37,3,3,0,0,0-.32.2,3.46,3.46,0,0,1,.42.63,3.29,3.29,0,0,1,.36,1.47.31.31,0,0,0,.19-.06l.11-.08a2.9,2.9,0,0,1,.29-.19,3.89,3.89,0,0,1,.41-.17,1.55,1.55,0,0,1,.48-.07,1.1,1.1,0,0,1,.72.24.72.72,0,0,1,.23.26.8.8,0,0,1,.07.34,1,1,0,0,1-.25.67,7.71,7.71,0,0,1-.65.63,6.2,6.2,0,0,0-.48.43,2.93,2.93,0,0,0-.45.54,2.55,2.55,0,0,0-.33.66,2.62,2.62,0,0,0-.13.83V11a.24.24,0,0,0,0,.12.35.35,0,0,0,.17.17l.12,0h1.71l.12,0a.23.23,0,0,0,.1-.07.21.21,0,0,0,.06-.1.27.27,0,0,0,0-.12V10.8a1,1,0,0,1,.26-.7q.27-.28.66-.63A5.79,5.79,0,0,0,14.05,9a4.51,4.51,0,0,0,.48-.6,2.56,2.56,0,0,0,.36-.72,2.81,2.81,0,0,0,.14-1A2.66,2.66,0,0,0,14.74,5.45Z"></path><path d="M12.38,12.65H10.5l-.12,0a.34.34,0,0,0-.18.29v1.82a.36.36,0,0,0,.08.23.23.23,0,0,0,.1.07l.12,0h1.88a.24.24,0,0,0,.12,0,.26.26,0,0,0,.11-.07.36.36,0,0,0,.07-.1.28.28,0,0,0,0-.13V13a.27.27,0,0,0,0-.12.61.61,0,0,0-.07-.1A.32.32,0,0,0,12.38,12.65Z"></path><path d="M6.79,12.65H4.91l-.12,0a.34.34,0,0,0-.18.29v1.82a.36.36,0,0,0,.08.23.23.23,0,0,0,.1.07l.12,0H6.79a.24.24,0,0,0,.12,0A.26.26,0,0,0,7,15a.36.36,0,0,0,.07-.1.28.28,0,0,0,0-.13V13a.27.27,0,0,0,0-.12.61.61,0,0,0-.07-.1A.32.32,0,0,0,6.79,12.65Z"></path><path d="M8.39,4.54A3.76,3.76,0,0,0,7.3,4a4.07,4.07,0,0,0-1.2-.19A3.92,3.92,0,0,0,4.92,4a5.87,5.87,0,0,0-.9.37,3.37,3.37,0,0,0-.55.38l-.21.19a.32.32,0,0,0,0,.41l1,1.2a.26.26,0,0,0,.2.12.48.48,0,0,0,.24-.06l.11-.08a2.9,2.9,0,0,1,.29-.19l.4-.17A1.66,1.66,0,0,1,6,6.06a1.1,1.1,0,0,1,.72.24.72.72,0,0,1,.23.26A.77.77,0,0,1,7,6.9a1,1,0,0,1-.26.67,7.6,7.6,0,0,1-.64.63,6.28,6.28,0,0,0-.49.43,2.93,2.93,0,0,0-.45.54,2.72,2.72,0,0,0-.33.66,2.62,2.62,0,0,0-.13.83V11a.43.43,0,0,0,0,.12.39.39,0,0,0,.08.1.18.18,0,0,0,.1.07.21.21,0,0,0,.12,0H6.72l.12,0a.23.23,0,0,0,.1-.07.36.36,0,0,0,.07-.1A.5.5,0,0,0,7,11V10.8a1,1,0,0,1,.27-.7A8,8,0,0,1,8,9.47c.18-.15.35-.31.52-.48A7,7,0,0,0,9,8.39a3.23,3.23,0,0,0,.36-.72,3.07,3.07,0,0,0,.13-1,2.66,2.66,0,0,0-.29-1.27A2.58,2.58,0,0,0,8.39,4.54Z"></path></g><g><path class="icon-component" fill="#fff" d="M14.74,5A2.58,2.58,0,0,0,14,4a3.76,3.76,0,0,0-1.09-.56,4.07,4.07,0,0,0-1.2-.19,3.92,3.92,0,0,0-1.18.17,5.87,5.87,0,0,0-.9.37,3,3,0,0,0-.32.2,3.46,3.46,0,0,1,.42.63,3.29,3.29,0,0,1,.36,1.47.31.31,0,0,0,.19-.06L10.37,6a2.9,2.9,0,0,1,.29-.19,3.89,3.89,0,0,1,.41-.17,1.55,1.55,0,0,1,.48-.07,1.1,1.1,0,0,1,.72.24.72.72,0,0,1,.23.26.8.8,0,0,1,.07.34,1,1,0,0,1-.25.67,7.71,7.71,0,0,1-.65.63,6.2,6.2,0,0,0-.48.43,2.93,2.93,0,0,0-.45.54,2.55,2.55,0,0,0-.33.66,2.62,2.62,0,0,0-.13.83v.35a.24.24,0,0,0,0,.12.35.35,0,0,0,.17.17l.12,0h1.71l.12,0a.23.23,0,0,0,.1-.07.21.21,0,0,0,.06-.1.27.27,0,0,0,0-.12V10.3a1,1,0,0,1,.26-.7q.27-.28.66-.63a5.79,5.79,0,0,0,.51-.48,4.51,4.51,0,0,0,.48-.6,2.56,2.56,0,0,0,.36-.72,2.81,2.81,0,0,0,.14-1A2.66,2.66,0,0,0,14.74,5Z"></path><path class="icon-component" fill="#fff" d="M12.38,12.15H10.5l-.12,0a.34.34,0,0,0-.18.29v1.82a.36.36,0,0,0,.08.23.23.23,0,0,0,.1.07l.12,0h1.88a.24.24,0,0,0,.12,0,.26.26,0,0,0,.11-.07.36.36,0,0,0,.07-.1.28.28,0,0,0,0-.13V12.46a.27.27,0,0,0,0-.12.61.61,0,0,0-.07-.1A.32.32,0,0,0,12.38,12.15Z"></path><path class="icon-component" fill="#fff" d="M6.79,12.15H4.91l-.12,0a.34.34,0,0,0-.18.29v1.82a.36.36,0,0,0,.08.23.23.23,0,0,0,.1.07l.12,0H6.79a.24.24,0,0,0,.12,0A.26.26,0,0,0,7,14.51a.36.36,0,0,0,.07-.1.28.28,0,0,0,0-.13V12.46a.27.27,0,0,0,0-.12.61.61,0,0,0-.07-.1A.32.32,0,0,0,6.79,12.15Z"></path><path class="icon-component" fill="#fff" d="M8.39,4A3.76,3.76,0,0,0,7.3,3.48a4.07,4.07,0,0,0-1.2-.19,3.92,3.92,0,0,0-1.18.17,5.87,5.87,0,0,0-.9.37,3.37,3.37,0,0,0-.55.38l-.21.19a.32.32,0,0,0,0,.41l1,1.2a.26.26,0,0,0,.2.12.48.48,0,0,0,.24-.06L4.78,6a2.9,2.9,0,0,1,.29-.19l.4-.17A1.66,1.66,0,0,1,6,5.56a1.1,1.1,0,0,1,.72.24.72.72,0,0,1,.23.26A.77.77,0,0,1,7,6.4a1,1,0,0,1-.26.67,7.6,7.6,0,0,1-.64.63,6.28,6.28,0,0,0-.49.43,2.93,2.93,0,0,0-.45.54,2.72,2.72,0,0,0-.33.66,2.62,2.62,0,0,0-.13.83v.35a.43.43,0,0,0,0,.12.39.39,0,0,0,.08.1.18.18,0,0,0,.1.07.21.21,0,0,0,.12,0H6.72l.12,0a.23.23,0,0,0,.1-.07.36.36,0,0,0,.07-.1.5.5,0,0,0,0-.12V10.3a1,1,0,0,1,.27-.7A8,8,0,0,1,8,9c.18-.15.35-.31.52-.48A7,7,0,0,0,9,7.89a3.23,3.23,0,0,0,.36-.72,3.07,3.07,0,0,0,.13-1A2.66,2.66,0,0,0,9.15,5,2.58,2.58,0,0,0,8.39,4Z"></path></g></g></svg>`
};
const chessboardEl = document.getElementById('chessboard');
const moveListEl = document.getElementById('review-move-list');
const statusEl = document.getElementById('review-status');
const scoreEl = document.getElementById('review-score');
const bestMoveEl = document.getElementById('review-best-move')?.querySelector('span');
const playedMoveInfoEl = document.getElementById('played-move-info');
const whiteProgressEl = document.getElementById('review-white-progress');
const blackProgressEl = document.getElementById('review-black-progress');
const btnFirst = document.getElementById('btn-first');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
const btnLast = document.getElementById('btn-last');
const analysisProgressText = document.getElementById('analysis-progress-text');
const overlaySvg = document.getElementById('board-overlay');
const pgnHeadersDisplayEl = document.getElementById('pgn-headers-display');
const goodStrategyEl = document.getElementById('review-good-strategy')?.querySelector('span');
const accuracyWhiteEl = document.getElementById('accuracy-white');
const accuracyBlackEl = document.getElementById('accuracy-black');
const accuracyChartCanvas = document.getElementById('accuracy-chart');
const pgnInputArea = document.getElementById('pgn-input-area');
const loadPgnButton = document.getElementById('load-pgn-button');

// Filters
const filterPlayedEl = document.getElementById('filter-played');
const filterBestEl = document.getElementById('filter-best');
const filterPvEl = document.getElementById('filter-pv');
const filterThreatsEl = document.getElementById('filter-threats');
const filterMatEl = document.getElementById('filter-mat'); // Added

const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const pieceRenderMode = localStorage.getItem('chess-render-mode') || 'png';
const pieces = {
    'r': '♜', 'n': '♞', 'b': '♝', 'q': '♛', 'k': '♚', 'p': '♟',
    'R': '♖', 'N': '♘', 'B': '♗', 'Q': '♕', 'K': '♔', 'P': '♙'
};

let reviewGame = new Chess(); // Instance for displaying the current position
let fullGameHistory = []; // [{ san: 'e4', from: 'e2', ..., fen_before: '...', fen_after: '...' }, ...]
let moveAnalysisData = []; // Parallel array for analysis results { fen_before, fen_after, played_move, eval_before, best_move_before, pv, eval_after_played, classification, analysis_depth, pass1_complete, pass2_complete, cpl }
let currentMoveIndex = -1; // -1 = initial position

let stockfish;
let isStockfishReady = false;
let stockfishQueue = [];
let currentAnalysisJob = null;
let isProcessingQueue = false;
let analysisComplete = false; // Flag to track if all analysis passes are done

// Accuracy Chart
let accuracyChart = null;
let accuracyData = { white: [], black: [], labels: [] }; // Store calculated accuracy data

// Configurable Analysis Depths & Thresholds
const DEPTH_PASS_1 = 12;
const DEPTH_PASS_2 = 16; // Increase for deeper analysis (slower)
const THRESHOLD_BLUNDER = 200; // Centipawns
const THRESHOLD_MISTAKE = 90;
const THRESHOLD_INACCURACY = 40;
const THRESHOLD_BRILLIANT = 10;        // Added: threshold for brilliant moves (centipawn loss)
const THRESHOLD_VERY_GOOD = 20;        // Added: threshold for very good moves

// Overlay State
let boardRect = null;
let squareSize = 0;

// Arrow Style Defaults
const ARROW_COLORS = {
    played: 'rgba(60, 100, 180, 0.75)', // Blueish
    best: 'rgba(40, 160, 40, 0.85)',     // Green
    pv: ['rgba(255, 165, 0, 0.7)', 'rgba(255, 140, 0, 0.6)', 'rgba(255, 115, 0, 0.5)'], // Oranges
    threat: 'rgba(200, 40, 40, 0.6)',      // Red for capture indication
    mate: ['rgba(180, 0, 180, 0.8)', 'rgba(160, 0, 160, 0.7)', 'rgba(140, 0, 140, 0.6)', 'rgba(120, 0, 120, 0.5)'] // Purples for mate sequence
};
const ARROW_THICKNESS = {
    played: 5,
    best: 7, // Thicker best move arrow
    pv: [5, 4, 3], // Decreasing thickness for PV
    threat: 5, // Thickness for capture arrows
    mate: [8, 7, 6, 5] // Decreasing thickness for mate sequence
};

// Interactive Play Globals
let selectedSquareAlg_Review = null; // For interactive move selection
let promotionCallback_Review = null; // Callback for interactive promotion

// --- Helper Functions (Defined Early) ---

function algToPixel(alg) {
    // Ensure boardRect and squareSize are valid before calculation
    if (!boardRect || squareSize <= 0 || !alg || alg.length < 2) {
        // console.warn(`algToPixel: Invalid input or board state. alg=${alg}, squareSize=${squareSize}`);
        return null;
    }
    const col = files.indexOf(alg[0]);
    const row = 8 - parseInt(alg[1]);
    if (col === -1 || isNaN(row) || row < 0 || row > 7) {
        // console.warn(`algToPixel: Invalid alg conversion. alg=${alg}`);
        return null;
    }
    // Center of the square
    const x = col * squareSize + squareSize / 2;
    const y = row * squareSize + squareSize / 2;
    return { x, y };
}

function coordToAlg(row, col) {
    return files[col] + (8 - row);
}

function algToCoord(alg) {
    if (!alg || alg.length < 2) return null;
    const col = files.indexOf(alg[0]);
    const row = 8 - parseInt(alg[1]);
    if (col === -1 || isNaN(row) || row < 0 || row > 7) return null;
    return [row, col];
}

function clearOverlays() {
    if (overlaySvg) {
        // Keep <defs> but remove lines, circles etc.
        const children = Array.from(overlaySvg.children);
        children.forEach(child => {
            if (child.tagName.toLowerCase() !== 'defs') {
                overlaySvg.removeChild(child);
            }
        });
    }
}

function highlightSquare(alg, color = 'rgba(255, 0, 0, 0.3)', radius = squareSize * 0.2) {
    if (!overlaySvg || !boardRect || squareSize <= 0) return;
    const center = algToPixel(alg);
    if (!center) return;

    const svgNs = "http://www.w3.org/2000/svg";
    const circle = document.createElementNS(svgNs, 'circle');
    circle.setAttribute('cx', center.x);
    circle.setAttribute('cy', center.y);
    circle.setAttribute('r', radius);
    circle.setAttribute('fill', color);
    overlaySvg.appendChild(circle);
}

function drawArrow(fromAlg, toAlg, color = 'rgba(0, 0, 0, 0.5)', id = null, thickness = 6) {
    // Add validation for board state and coordinates
    if (!overlaySvg || !boardRect || squareSize <= 0) return;
    const start = algToPixel(fromAlg);
    const end = algToPixel(toAlg);
    if (!start || !end) {
        console.warn(`Cannot draw arrow, invalid coords: ${fromAlg} -> ${toAlg}`);
        return;
    }

    const svgNs = "http://www.w3.org/2000/svg";
    const arrowId = `arrow-marker-${id || color.replace(/[^a-zA-Z0-9]/g, '')}`; // Unique ID for marker

    // Define marker (arrowhead) if not already defined
    let marker = overlaySvg.querySelector(`marker#${arrowId}`);
    if (!marker) {
        marker = document.createElementNS(svgNs, 'marker');
        marker.setAttribute('id', arrowId);
        marker.setAttribute('viewBox', '0 0 10 10');
        // Adjust refX to position arrowhead closer to the line end
        marker.setAttribute('refX', '9'); // Changed from 8
        marker.setAttribute('refY', '5');
        marker.setAttribute('markerUnits', 'strokeWidth');
        marker.setAttribute('markerWidth', thickness * 0.8); // Make arrowhead proportional to thickness
        marker.setAttribute('markerHeight', thickness * 0.8);
        marker.setAttribute('orient', 'auto-start-reverse'); // Keep this orientation

        const path = document.createElementNS(svgNs, 'path');
        path.setAttribute('d', 'M 0 0 L 10 5 L 0 10 z'); // Triangle shape
        path.setAttribute('fill', color);
        marker.appendChild(path);

        // Add marker definition to SVG <defs> (create if needed)
        let defs = overlaySvg.querySelector('defs');
        if (!defs) {
            defs = document.createElementNS(svgNs, 'defs');
            overlaySvg.insertBefore(defs, overlaySvg.firstChild);
        }
        defs.appendChild(marker);
    }


    // Arrow Line
    const line = document.createElementNS(svgNs, 'line');
    line.setAttribute('x1', start.x);
    line.setAttribute('y1', start.y);
    line.setAttribute('x2', end.x);
    // Adjust end point slightly to account for arrowhead marker if needed (optional)
    // Example: Calculate vector and shorten line slightly - complex, try adjusting refX first.
    line.setAttribute('y2', end.y); // Keep original end point for now
    line.setAttribute('stroke', color);
    line.setAttribute('stroke-width', thickness);
    line.setAttribute('stroke-linecap', 'round');
    line.setAttribute('marker-end', `url(#${arrowId})`); // Apply marker

    overlaySvg.appendChild(line);
}

function drawArrowWithNumber(fromAlg, toAlg, color = 'rgba(0, 0, 0, 0.5)', id = null, thickness = 6, labelNumber = 1) {
    // Add validation for board state and coordinates
    if (!overlaySvg || !boardRect || squareSize <= 0) return;
    const start = algToPixel(fromAlg);
    const end = algToPixel(toAlg);
    if (!start || !end) {
        console.warn(`Cannot draw numbered arrow, invalid coords: ${fromAlg} -> ${toAlg}`);
        return;
    }
    const svgNs = "http://www.w3.org/2000/svg";
    const arrowId = `arrow-marker-${id || color.replace(/[^a-zA-Z0-9]/g, '')}`;

    // Create marker if needed
    let marker = overlaySvg.querySelector(`marker#${arrowId}`);
    if (!marker) {
        marker = document.createElementNS(svgNs, 'marker');
        marker.setAttribute('id', arrowId);
        marker.setAttribute('viewBox', '0 0 10 10');
        // Adjust refX to position arrowhead closer to the line end
        marker.setAttribute('refX', '9'); // Changed from 8
        marker.setAttribute('refY', '5');
        marker.setAttribute('markerUnits', 'strokeWidth');
        marker.setAttribute('markerWidth', thickness * 0.8);
        marker.setAttribute('markerHeight', thickness * 0.8);
        marker.setAttribute('orient', 'auto-start-reverse'); // Keep this orientation
        const path = document.createElementNS(svgNs, 'path');
        path.setAttribute('d', 'M 0 0 L 10 5 L 0 10 z');
        path.setAttribute('fill', color);
        marker.appendChild(path);
        let defs = overlaySvg.querySelector('defs');
        if (!defs) {
            defs = document.createElementNS(svgNs, 'defs');
            overlaySvg.insertBefore(defs, overlaySvg.firstChild);
        }
        defs.appendChild(marker);
    }
    // Draw the arrow line
    const line = document.createElementNS(svgNs, 'line');
    line.setAttribute('x1', start.x);
    line.setAttribute('y1', start.y);
    line.setAttribute('x2', end.x);
    line.setAttribute('y2', end.y); // Keep original end point for now
    line.setAttribute('stroke', color);
    line.setAttribute('stroke-width', thickness);
    line.setAttribute('stroke-linecap', 'round');
    line.setAttribute('marker-end', `url(#${arrowId})`);
    overlaySvg.appendChild(line);
    // Compute midpoint for the number label
    const midX = (start.x + end.x) / 2;
    const midY = (start.y + end.y) / 2;
    // Offset the number slightly perpendicular to the arrow direction (optional, complex)
    const text = document.createElementNS(svgNs, 'text');
    text.setAttribute('x', midX);
    text.setAttribute('y', midY);
    text.setAttribute('fill', 'white'); // Use white for better contrast on colored arrows
    text.setAttribute('stroke', 'black'); // Add a black outline
    text.setAttribute('stroke-width', '0.5');
    text.setAttribute('font-size', thickness * 1.5);
    text.setAttribute('font-weight', 'bold');
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('dominant-baseline', 'central');
    text.textContent = labelNumber;
    overlaySvg.appendChild(text);
}

function getSquaresAttackedBy(fen, attackingColor) {
    const attacked = new Set();
    const board = new Chess(fen);
    const squares = files.flatMap(f => Array.from({ length: 8 }, (_, i) => f + (i + 1))); // a1, a2, ..., h8

    for (const sq of squares) {
        const piece = board.get(sq);
        if (piece && piece.color === attackingColor) {
            if (board.turn() === attackingColor) {
                const legalMoves = board.moves({ square: sq, verbose: true });
                legalMoves.forEach(move => attacked.add(move.to));
            }
            if (piece.type === 'p') {
                const colIndex = files.indexOf(sq[0]);
                const rowIndex = 8 - parseInt(sq[1]);
                const attackOffsets = (attackingColor === 'w') ? [[-1, -1], [-1, 1]] : [[1, -1], [1, 1]];
                attackOffsets.forEach(offset => {
                    const targetRow = rowIndex + offset[0];
                    const targetCol = colIndex + offset[1];
                    if (targetRow >= 0 && targetRow < 8 && targetCol >= 0 && targetCol < 8) {
                        const targetAlg = files[targetCol] + (8 - targetRow);
                        attacked.add(targetAlg);
                    }
                });
            }
        }
    }
    return attacked;
}

function clearAnalysisUI() {
    scoreEl.textContent = "N/A";
    if (bestMoveEl) bestMoveEl.textContent = "N/A";
    if (playedMoveInfoEl) playedMoveInfoEl.textContent = "";
    if (whiteProgressEl) whiteProgressEl.style.width = `50%`;
    if (blackProgressEl) blackProgressEl.style.width = `50%`;
}

function updateNavButtons() {
    if (!btnFirst) return; // Ensure buttons exist
    const numMoves = fullGameHistory.length;
    btnFirst.disabled = currentMoveIndex <= -1;
    btnPrev.disabled = currentMoveIndex <= -1;
    btnNext.disabled = currentMoveIndex >= numMoves - 1;
    btnLast.disabled = currentMoveIndex >= numMoves - 1;
}

function updateStatus() {
    let statusText = "";
    if (currentMoveIndex === -1) {
        statusText = "Position initiale";
    } else if (currentMoveIndex < fullGameHistory.length) {
        const move = fullGameHistory[currentMoveIndex];
        if (move && move.color && move.san) {
            const moveNumber = Math.floor(currentMoveIndex / 2) + 1;
            const turnIndicator = move.color === 'w' ? "." : "...";
            statusText = `Après ${moveNumber}${turnIndicator} ${move.san}`;
        } else {
            statusText = `Coup ${currentMoveIndex + 1} (Données invalides)`;
            console.warn("Invalid move data at index", currentMoveIndex);
        }
    } else {
        statusText = "Fin de partie";
    }
    statusEl.textContent = statusText;
}

function getOverallAnalysisProgress() {
    const totalMoves = fullGameHistory.length;
    if (totalMoves === 0) return "";

    const analysisEntries = moveAnalysisData.slice(1);
    if (analysisEntries.length !== totalMoves) {
        console.warn("Analysis data length mismatch!");
    }

    const pass1DoneCount = analysisEntries.filter(d => d && d.pass1_complete).length;
    const pass2DoneCount = analysisEntries.filter(d => d && d.pass2_complete).length;

    if (pass2DoneCount === totalMoves) return "Analyse Profonde Terminée";
    if (pass1DoneCount === totalMoves) return `Analyse Rapide Terminée, Profonde: ${pass2DoneCount}/${totalMoves}`;
    if (isProcessingQueue && currentAnalysisJob) {
        const currentJobDisplayIndex = currentAnalysisJob.moveIndex + 1;
        const passNum = currentAnalysisJob.isPass1 ? 1 : 2;
        return `Analyse (P${passNum}): ${currentJobDisplayIndex}/${totalMoves}...`;
    }
    return `Analyse Rapide: ${pass1DoneCount}/${totalMoves}`;
}

// --- Board Overlay & Filters ---

function setupBoardOverlay() {
    if (!chessboardEl || !overlaySvg) return;

    // Use getBoundingClientRect for more accurate dimensions and position relative to viewport
    const rect = chessboardEl.getBoundingClientRect();
    const parentRect = chessboardEl.offsetParent ? chessboardEl.offsetParent.getBoundingClientRect() : { top: 0, left: 0 };

    // Calculate position relative to the offset parent, which is usually what absolute positioning uses
    boardRect = {
        left: rect.left - parentRect.left,
        top: rect.top - parentRect.top,
        width: rect.width,
        height: rect.height
    };

    // Check for valid dimensions immediately after calculation
    if (boardRect.width <= 0 || boardRect.height <= 0) {
        console.warn("Board rect has zero or negative size, retrying overlay setup.", boardRect);
        // Retry after a short delay to allow layout reflow
        setTimeout(setupBoardOverlay, 250);
        return;
    }

    squareSize = boardRect.width / 8;

    // Ensure squareSize is valid
    if (squareSize <= 0) {
         console.warn("Calculated square size is invalid, retrying overlay setup.", squareSize);
         setTimeout(setupBoardOverlay, 250);
         return;
    }

    overlaySvg.setAttribute('viewBox', `0 0 ${boardRect.width} ${boardRect.height}`);
    // Set SVG size explicitly
    overlaySvg.style.width = `${boardRect.width}px`;
    overlaySvg.style.height = `${boardRect.height}px`;
    // Position SVG absolutely relative to its container (should be the chessboard div or similar)
    overlaySvg.style.position = 'absolute'; // Ensure position is absolute
    overlaySvg.style.left = `0px`; // Position relative to container
    overlaySvg.style.top = `0px`;  // Position relative to container
    overlaySvg.style.pointerEvents = 'none'; // Make sure it doesn't interfere with clicks

    console.log(`Overlay setup: Size=${boardRect.width}x${boardRect.height}, SquareSize=${squareSize}, Pos=${boardRect.top},${boardRect.left}`);
    // Update overlays immediately after setup
    updateBoardOverlays();
}

function updateBoardOverlays() {
    if (!overlaySvg) return;
    clearOverlays();

    // Ensure board dimensions are valid before drawing
    if (!boardRect || squareSize <= 0) {
        console.warn("updateBoardOverlays: Invalid board dimensions, skipping draw.");
        return;
    }

    const analysisIndex = currentMoveIndex + 1;
    // Ensure analysisIndex is within bounds
    if (analysisIndex < 0 || analysisIndex >= moveAnalysisData.length) {
        // console.log("updateBoardOverlays: No analysis data for current index.");
        return;
    }
    const currentAnalysis = moveAnalysisData[analysisIndex];
    const previousAnalysis = (currentMoveIndex >= 0 && currentMoveIndex < moveAnalysisData.length) ? moveAnalysisData[currentMoveIndex] : null;
    const playedMove = (currentMoveIndex >= 0 && currentMoveIndex < fullGameHistory.length) ? fullGameHistory[currentMoveIndex] : null;

    // Filter: Played Move
    if (filterPlayedEl?.checked && playedMove) {
        // Validate move coordinates before drawing
        if (algToPixel(playedMove.from) && algToPixel(playedMove.to)) {
            drawArrow(playedMove.from, playedMove.to, ARROW_COLORS.played, 'played', ARROW_THICKNESS.played);
        } else {
            console.warn(`Skipping played move arrow: Invalid coords ${playedMove.from}->${playedMove.to}`);
        }
    }

    // Filter: Best Move (from previous position's analysis)
    if (filterBestEl?.checked && previousAnalysis?.best_move_before) {
        const bestUci = previousAnalysis.best_move_before;
        if (bestUci && bestUci !== '(none)' && bestUci !== '0000') {
            const from = bestUci.substring(0, 2);
            const to = bestUci.substring(2, 4);
            const playedUci = playedMove ? playedMove.from + playedMove.to + (playedMove.promotion || '') : null;
            // Only draw if best move is different from played move and coords are valid
            if (bestUci !== playedUci && algToPixel(from) && algToPixel(to)) {
                drawArrow(from, to, ARROW_COLORS.best, 'best', ARROW_THICKNESS.best);
            } else if (!algToPixel(from) || !algToPixel(to)) {
                 console.warn(`Skipping best move arrow: Invalid coords ${from}->${to}`);
            }
        }
    }

    // Filter: Principal Variation (from current position's analysis)
    if (filterPvEl?.checked && currentAnalysis?.pv && currentAnalysis.pv.length > 0) {
        // Use a temporary board based on the *current* reviewGame state
        const tempGamePV = new Chess(reviewGame.fen());
        for (let i = 0; i < Math.min(currentAnalysis.pv.length, ARROW_COLORS.pv.length); i++) {
            const uciMove = currentAnalysis.pv[i];
            const from = uciMove.substring(0, 2);
            const to = uciMove.substring(2, 4);
            // Validate coordinates before attempting move/draw
            if (!algToPixel(from) || !algToPixel(to)) {
                 console.warn(`Skipping PV arrow ${i}: Invalid coords ${from}->${to}`);
                 break; // Stop drawing PV if coords are bad
            }
            // Attempt the move on the temporary board
            const moveResult = tempGamePV.move(uciMove, { sloppy: true });
            if (moveResult) {
                // Draw arrow only if the move was legal on the temp board
                drawArrow(from, to, ARROW_COLORS.pv[i], `pv-${i}`, ARROW_THICKNESS.pv[i]);
            } else {
                // Stop drawing PV sequence if an illegal move is encountered
                console.warn(`PV drawing stopped: Invalid move ${uciMove} at step ${i} from FEN ${reviewGame.fen()}`);
                break;
            }
        }
    }

    // Filter: Threats (Legal Captures from current position)
    if (filterThreatsEl?.checked) {
        const board = reviewGame.board();
        let threatCounter = 0; // Counter for unique arrow IDs if needed
        for (let r = 0; r < 8; r++) {
            for (let c = 0; c < 8; c++) {
                const piece = board[r]?.[c];
                if (piece && piece.color === reviewGame.turn()) { // Only show threats for the current player
                    const fromAlg = files[c] + (8 - r);
                    // Get only legal moves for the piece
                    const moves = reviewGame.moves({ square: fromAlg, verbose: true });
                    const captureMoves = moves.filter(m => m.captured);

                    if (captureMoves.length > 0) {
                        // Highlight the attacking piece's square
                        highlightSquare(fromAlg, ARROW_COLORS.threat, squareSize * 0.25);
                        // Draw arrows for each legal capture
                        captureMoves.slice(0, 4).forEach((move, index) => {
                            // Validate coordinates before drawing
                            if (algToPixel(fromAlg) && algToPixel(move.to)) {
                                drawArrowWithNumber(fromAlg, move.to, ARROW_COLORS.threat, `capture-${fromAlg}-${move.to}-${threatCounter++}`, ARROW_THICKNESS.threat, index + 1);
                            } else {
                                 console.warn(`Skipping threat arrow: Invalid coords ${fromAlg}->${move.to}`);
                            }
                        });
                    }
                }
            }
        }
    }

    // Filter: Mate Sequence (from current position's analysis)
    if (filterMatEl?.checked && currentAnalysis?.eval_before && typeof currentAnalysis.eval_before === 'string' && currentAnalysis.eval_before.startsWith('M')) {
        const mateIn = parseInt(currentAnalysis.eval_before.substring(1));
        if (!isNaN(mateIn)) { // Ensure mateIn is a valid number
            const isMateForCurrentPlayer = (reviewGame.turn() === 'w' && mateIn > 0) || (reviewGame.turn() === 'b' && mateIn < 0);

            if (isMateForCurrentPlayer && Math.abs(mateIn) <= ARROW_COLORS.mate.length && currentAnalysis.pv && currentAnalysis.pv.length >= Math.abs(mateIn)) {
                const tempGameMate = new Chess(reviewGame.fen());
                for (let i = 0; i < Math.abs(mateIn); i++) {
                    const uciMove = currentAnalysis.pv[i];
                    const from = uciMove.substring(0, 2);
                    const to = uciMove.substring(2, 4);

                    if (!algToPixel(from) || !algToPixel(to)) {
                        console.warn(`Skipping Mate arrow ${i}: Invalid coords ${from}->${to}`);
                        break;
                    }

                    const moveResult = tempGameMate.move(uciMove, { sloppy: true });
                    if (moveResult) {
                        const colorIndex = Math.min(i, ARROW_COLORS.mate.length - 1);
                        const thicknessIndex = Math.min(i, ARROW_THICKNESS.mate.length - 1);
                        drawArrowWithNumber(from, to, ARROW_COLORS.mate[colorIndex], `mate-${i}`, ARROW_THICKNESS.mate[thicknessIndex], i + 1);
                    } else {
                        console.warn(`Mate sequence drawing stopped: Invalid move ${uciMove} at step ${i} from FEN ${reviewGame.fen()}`);
                        break;
                    }
                }
            }
        }
    }
}

// --- Board Rendering (Review Specific) ---
function createBoard_Review() {
    if (!chessboardEl) {
        console.error("createBoard_Review: chessboardEl not found!");
        return;
    }
    if (!reviewGame || typeof reviewGame.board !== 'function') {
        console.error("createBoard_Review: reviewGame object is invalid.");
        chessboardEl.innerHTML = '<p style="color: red; padding: 20px;">Erreur: État du jeu invalide</p>';
        return;
    }
    console.log("createBoard_Review: Rendering board...");
    chessboardEl.innerHTML = '';
    const boardFragment = document.createDocumentFragment();
    let boardData;
    try {
        boardData = reviewGame.board();
        if (!boardData) throw new Error("reviewGame.board() returned invalid data");
    } catch (e) {
        console.error("createBoard_Review: Error getting board data:", e);
        chessboardEl.innerHTML = '<p style="color: red; padding: 20px;">Erreur: Données du plateau invalides</p>';
        return;
    }

    for (let rowIndex = 0; rowIndex < 8; rowIndex++) {
        for (let colIndex = 0; colIndex < 8; colIndex++) {
            const square = document.createElement('div');
            square.classList.add('square');
            square.classList.add((rowIndex + colIndex) % 2 === 0 ? 'light' : 'dark');
            square.dataset.row = rowIndex;
            square.dataset.col = colIndex;
            const alg = files[colIndex] + (8 - rowIndex);

            const pieceInfo = boardData[rowIndex]?.[colIndex];
            if (pieceInfo) {
                const myPieceFormat = pieceInfo.color === 'w' ? pieceInfo.type.toUpperCase() : pieceInfo.type.toLowerCase();
                if (pieceRenderMode === 'ascii') {
                    const pieceElement = document.createElement('span');
                    pieceElement.className = 'piece';
                    pieceElement.textContent = pieces[myPieceFormat];
                    pieceElement.classList.add(pieceInfo.color === 'w' ? 'white-piece' : 'black-piece');
                    square.appendChild(pieceElement);
                } else {
                    const img = document.createElement('img');
                    const colorPrefix = pieceInfo.color === 'w' ? 'w' : 'b';
                    const pieceCode = pieceInfo.type;
                    const filename = `pieces/${colorPrefix}${pieceCode}.png`;
                    img.src = filename;
                    img.alt = myPieceFormat;
                    img.classList.add("piece");
                    img.draggable = false;
                    img.onerror = () => { console.warn(`Image not found: ${filename}`); img.style.display = 'none'; };
                    square.appendChild(img);
                }
            }

            if (currentMoveIndex >= 0) {
                const lastMovePlayed = fullGameHistory[currentMoveIndex];
                if (lastMovePlayed && (alg === lastMovePlayed.from || alg === lastMovePlayed.to)) {
                    square.classList.add('last-move');
                }
            }

            // Add notation overlay if filter enabled and if this is the destination square of the last move
            // Notation overlay: show SAN + classification SVG in top-right if filter enabled
            if (document.getElementById('filter-notation')?.checked && currentMoveIndex >= 0) {
                const lastMove = fullGameHistory[currentMoveIndex];
                if (lastMove && alg === lastMove.to) {
                    const analysis = moveAnalysisData[currentMoveIndex + 1];
                    const classification = analysis?.classification;
                    const iconHtml = classification && MOVE_CLASSIFICATION_SVG_ICONS[classification] ? MOVE_CLASSIFICATION_SVG_ICONS[classification] : '';
                    if (iconHtml) { // Only create div if there's an icon
                        const notationDiv = document.createElement('div');
                        notationDiv.className = 'notation-overlay';
                        notationDiv.innerHTML = iconHtml; // Only the icon
                        notationDiv.style.position = 'absolute';
                        notationDiv.style.top = '4px';
                        notationDiv.style.right = '4px';
                        // Removed background, border, padding for icon-only display
                        notationDiv.style.display = 'flex';
                        notationDiv.style.alignItems = 'center';
                        notationDiv.style.zIndex = '10';
                        notationDiv.style.pointerEvents = 'none';

                        // Permet d'ajuster la taille de l'icône
                        const iconScale = 1.2; // Ajustez cette valeur (ex: 0.8 pour plus petit, 1.2 pour plus grand)
                        notationDiv.style.transform = `scale(${iconScale})`;
                        notationDiv.style.transformOrigin = 'top right'; // Important pour le positionnement lors du scaling

                        square.appendChild(notationDiv);
                    }
                }
            }

            if (colIndex === 0 || rowIndex === 7) {
                const label = document.createElement('span');
                label.className = 'square-label';
                if (colIndex === 0) label.textContent = `${8 - rowIndex}`;
                if (rowIndex === 7) label.textContent += files[colIndex];
                if (colIndex === 0 && rowIndex === 7) label.textContent = `${files[colIndex]}${8 - rowIndex}`;
                if (label.textContent) square.appendChild(label);
            }

            square.addEventListener('click', handleSquareClick_Review);
            square.style.cursor = 'pointer';

            boardFragment.appendChild(square);
        }
    }
    chessboardEl.appendChild(boardFragment);
    console.log("createBoard_Review: Board rendered.");

    try {
        if (reviewGame.in_check()) {
            const kingColor = reviewGame.turn();
            const boardState = reviewGame.board();
            for (let r = 0; r < 8; r++) {
                for (let c = 0; c < 8; c++) {
                    const piece = boardState[r]?.[c];
                    if (piece && piece.type === 'k' && piece.color === kingColor) {
                        const kingSquareEl = chessboardEl.querySelector(`.square[data-row="${r}"][data-col="${c}"]`);
                        if (kingSquareEl) kingSquareEl.classList.add('in-check');
                        break;
                    }
                }
            }
        }
    } catch (e) { console.error("Error highlighting check:", e); }

    // Call setupBoardOverlay *after* the board is fully in the DOM and rendered.
    // Using a small timeout can help ensure layout calculations are complete.
    setTimeout(setupBoardOverlay, 50); // Increased timeout slightly

    if (selectedSquareAlg_Review) {
        const moves = reviewGame.moves({ square: selectedSquareAlg_Review, verbose: true });
        highlightMoves_Review(moves);
    }
}

// --- Interactive Move Handling ---
function handleSquareClick_Review(event) {
    const square = event.currentTarget;
    const row = parseInt(square.dataset.row);
    const col = parseInt(square.dataset.col);
    const clickedAlg = coordToAlg(row, col);

    if (promotionCallback_Review) return;

    const pieceOnSquare = reviewGame.get(clickedAlg);

    if (selectedSquareAlg_Review) {
        const fromAlg = selectedSquareAlg_Review;
        const fromSquareEl = chessboardEl.querySelector(`.square[data-row="${algToCoord(fromAlg)[0]}"][data-col="${algToCoord(fromAlg)[1]}"]`);

        if (clickedAlg === fromAlg) {
            if (fromSquareEl) fromSquareEl.classList.remove('selected');
            selectedSquareAlg_Review = null;
            highlightMoves_Review([]);
            return;
        }

        const legalMoves = reviewGame.moves({ square: fromAlg, verbose: true });
        const targetMove = legalMoves.find(move => move.to === clickedAlg);

        if (targetMove) {
            if (fromSquareEl) fromSquareEl.classList.remove('selected');
            highlightMoves_Review([]);
            selectedSquareAlg_Review = null;

            if (targetMove.flags.includes('p')) {
                showPromotionModal_Review(reviewGame.turn() === 'w' ? 'white' : 'black', (promoChoice) => {
                    if (promoChoice) {
                        makeInteractiveMove(fromAlg, clickedAlg, promoChoice);
                    }
                });
            } else {
                makeInteractiveMove(fromAlg, clickedAlg);
            }
        } else {
            if (fromSquareEl) fromSquareEl.classList.remove('selected');
            highlightMoves_Review([]);
            selectedSquareAlg_Review = null;

            if (pieceOnSquare && pieceOnSquare.color === reviewGame.turn()) {
                selectedSquareAlg_Review = clickedAlg;
                square.classList.add('selected');
                const newMoves = reviewGame.moves({ square: clickedAlg, verbose: true });
                highlightMoves_Review(newMoves);
            }
        }
    } else if (pieceOnSquare && pieceOnSquare.color === reviewGame.turn()) {
        selectedSquareAlg_Review = clickedAlg;
        square.classList.add('selected');
        const moves = reviewGame.moves({ square: clickedAlg, verbose: true });
        highlightMoves_Review(moves);
    }
}

function makeInteractiveMove(fromAlg, toAlg, promotionChoice = null) {
    const fenBefore = reviewGame.fen();
    const moveData = { from: fromAlg, to: toAlg };
    if (promotionChoice) {
        moveData.promotion = promotionChoice.toLowerCase();
    }

    const moveResult = reviewGame.move(moveData);

    if (moveResult === null) {
        return false;
    }

    if (currentMoveIndex < fullGameHistory.length - 1) {
        fullGameHistory = fullGameHistory.slice(0, currentMoveIndex + 1);
        moveAnalysisData = moveAnalysisData.slice(0, currentMoveIndex + 2);
    }

    fullGameHistory.push({ ...moveResult, fen_before: fenBefore, fen_after: reviewGame.fen() });

    moveAnalysisData.push({
        fen_before: fenBefore, fen_after: reviewGame.fen(),
        played_move: { san: moveResult.san, uci: fromAlg + toAlg + (promotionChoice || '') },
        eval_before: null, best_move_before: null, pv: null,
        eval_after_played: null, classification: null, analysis_depth: 0,
        pass1_complete: false, pass2_complete: false, cpl: null
    });

    currentMoveIndex = fullGameHistory.length - 1;

    createBoard_Review();
    buildMoveListUI();
    updateStatus();
    updateNavButtons();
    updateAnalysisDisplayForCurrentMove();
    updateBoardOverlays();

    analyzeCurrentPosition();

    return true;
}

function analyzeCurrentPosition() {
    if (!isStockfishReady) {
        return;
    }
    if (isProcessingQueue) {
        return;
    }

    const analysisIndexToRun = currentMoveIndex + 1;
    if (analysisIndexToRun < 0 || analysisIndexToRun >= moveAnalysisData.length) {
        return;
    }

    const analysisEntry = moveAnalysisData[analysisIndexToRun];
    if (!analysisEntry || analysisEntry.pass1_complete) {
        return;
    }

    stockfishQueue.push({
        analysisDataIndex: analysisIndexToRun,
        fen: analysisEntry.fen_after,
        depth: DEPTH_PASS_1,
        purpose: 'eval_position',
        isPass1: true
    });

    if (!isProcessingQueue) {
        processStockfishQueue();
    }
}

function showPromotionModal_Review(color, callback) {
    const choice = prompt(`Promote pawn to (q, r, n, b)?`, 'q') || 'q';
    callback(choice.toLowerCase());
}

function highlightMoves_Review(moves) {
    if (!chessboardEl) return;
    chessboardEl.querySelectorAll('.square.highlight, .square.capture').forEach(sq => {
        sq.classList.remove('highlight', 'capture');
    });

    moves.forEach(move => {
        const toCoord = algToCoord(move.to);
        if (!toCoord) return;
        const [r, c] = toCoord;
        const square = chessboardEl.querySelector(`.square[data-row="${r}"][data-col="${c}"]`);
        if (square) {
            square.classList.add(move.flags.includes('c') ? 'capture' : 'highlight');
        }
    });
}

// --- Move List UI ---

function buildMoveListUI() {
    if (!moveListEl) return;
    moveListEl.innerHTML = '';
    let moveNumber = 1;
    let currentLi = null;

    const initialLi = document.createElement('li');
    initialLi.dataset.moveIndex = -1;
    initialLi.innerHTML = `<span class="move-number">0.</span><span>Position initiale</span>`;
    initialLi.addEventListener('click', () => goToMove(-1));
    moveListEl.appendChild(initialLi);

    if (fullGameHistory.length === 0) return;

    for (let i = 0; i < fullGameHistory.length; i++) {
        const move = fullGameHistory[i];
        if (!move || !move.color || !move.san) {
            console.warn(`Skipping invalid move data at index ${i}`);
            continue;
        }

        if (move.color === 'w') {
            currentLi = document.createElement('li');
            currentLi.dataset.moveIndex = i;
            const numSpan = `<span class="move-number">${moveNumber}.</span>`;
            const whiteSpan = document.createElement('span');
            whiteSpan.className = 'move-white';
            whiteSpan.textContent = move.san;
            whiteSpan.addEventListener('click', () => goToMove(i)); // Navigate to the specific move
            const classificationSpan = `<span class="move-classification white-class" title=""></span>`;
            currentLi.innerHTML = numSpan;
            currentLi.appendChild(whiteSpan);
            currentLi.innerHTML += classificationSpan;
            moveListEl.appendChild(currentLi);
        } else {
            if (currentLi) {
                const blackSpan = document.createElement('span');
                blackSpan.className = 'move-black';
                blackSpan.textContent = move.san;
                blackSpan.addEventListener('click', () => goToMove(i)); // Navigate to the specific move
                const classificationSpan = `<span class="move-classification black-class" title=""></span>`;
                currentLi.appendChild(blackSpan);
                currentLi.innerHTML += classificationSpan;
            } else {
                console.warn(`No parent <li> for black move at index ${i}`);
            }
            moveNumber++;
        }

        if (currentLi) {
            currentLi.addEventListener('click', () => goToMove(i)); // Ensure the entire row is clickable
        }
    }
}

function updateMoveListHighlight() {
    moveListEl?.querySelectorAll('li').forEach(li => {
        li.classList.remove('current-move');
        const liIndex = parseInt(li.dataset.moveIndex);

        if (liIndex === currentMoveIndex) {
            li.classList.add('current-move');
            li.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
        const blackIndexStr = li.dataset.moveIndexBlack;
        if (blackIndexStr) {
            const liIndexBlack = parseInt(blackIndexStr);
            if (liIndexBlack === currentMoveIndex) {
                li.classList.add('current-move');
                li.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }
    });
}

function updateMoveListClassification(moveIndex, classificationText) {
    if (!moveListEl || moveIndex < 0 || moveIndex >= fullGameHistory.length) return;

    const move = fullGameHistory[moveIndex];
    if (!move) return;

    const liIndex = Math.floor(moveIndex / 2) * 2;
    const liElement = moveListEl.querySelector(`li[data-move-index="${liIndex}"]`);
    if (!liElement) return;

    const targetClass = (move.color === 'w') ? '.white-class' : '.black-class';
    const spanElement = liElement.querySelector(targetClass);
    if (!spanElement) return;

    // Notations for each classification
    const notations = {
        "Brillant": "Brillant",
        "Très bon": "Très bon",
        "Meilleur": "Meilleur",
        "Excellent": "Excellent",
        "Bon": "Bon",
        "Théorique": "Théorique",
        "Imprécision": "Imprécision",
        "Erreur": "Erreur",
        "Manqué": "Manqué",
        "Gaffe": "Gaffe"
    };

    // Use SVG if available, else fallback to text
    let iconHtml = MOVE_CLASSIFICATION_SVG_ICONS[classificationText] || '';
    let notation = notations[classificationText] || (classificationText || '');

    // Compose icon + notation
    spanElement.innerHTML = iconHtml ? iconHtml : '';
    spanElement.title = notation;
}

// --- Analysis Display Update ---

function updateGoodStrategyDisplay() {
    const strategyEl = document.getElementById('review-good-strategy');
    if (!strategyEl) return;
    const strategySpan = strategyEl.querySelector('span');
    if (!strategySpan) return; // Ensure the span exists

    let strategyText = "N/A";
    const MAX_MOVES_TO_SHOW = 5; // Limit the number of moves displayed

    // Get analysis data for the current position (index = currentMoveIndex + 1)
    // Ensure index is valid
    const analysisIndex = currentMoveIndex + 1;
    if (analysisIndex < 0 || analysisIndex >= moveAnalysisData.length) {
        strategySpan.textContent = "N/A"; // Or "Analyse requise"
        return;
    }
    const analysisCurrent = moveAnalysisData[analysisIndex];

    if (analysisCurrent?.pv && analysisCurrent.pv.length > 0) {
        // Use the FEN of the current board state to simulate the PV
        const fenForPV = reviewGame.fen();
        const tempGame = new Chess(fenForPV); // Create new instance for simulation
        let mateFound = false;
        const movesSAN = [];

        // Iterate through the PV, respecting the MAX_MOVES_TO_SHOW limit
        for (let i = 0; i < Math.min(analysisCurrent.pv.length, MAX_MOVES_TO_SHOW); i++) {
            const moveUci = analysisCurrent.pv[i];
            // Validate move format before attempting
            if (!/^[a-h][1-8][a-h][1-8][qrbn]?$/.test(moveUci)) {
                 console.warn(`Invalid UCI format in PV: ${moveUci}`);
                 break;
            }
            const moveObj = tempGame.move(moveUci, { sloppy: true });

            if (!moveObj) {
                // Stop if an invalid move is encountered in the PV
                console.warn(`Invalid move in PV: ${moveUci} at step ${i} from FEN ${fenForPV}`);
                break; // Stop processing PV
            }
            movesSAN.push(moveObj.san);

            // Check if the current move results in checkmate *after* the move is made
            if (tempGame.in_checkmate()) {
                mateFound = true;
                // Add '#' to the last move SAN if it's checkmate
                if (movesSAN.length > 0) {
                    movesSAN[movesSAN.length - 1] += '#';
                }
                break; // Stop processing PV if mate is found
            }
        }
        // Format the strategy text based on findings
        if (mateFound) {
            strategyText = `Mat forcé: ${movesSAN.join(' ')}`;
        } else if (movesSAN.length > 0) {
            strategyText = movesSAN.join(' ');
            // Indicate if the PV was longer than the display limit
            if (analysisCurrent.pv.length > MAX_MOVES_TO_SHOW) {
                strategyText += ' ...';
            }
        } else {
            // Handle cases where PV exists but no valid moves could be processed
             strategyText = "Ligne principale non calculable."; // More specific message
        }
    } else if (analysisCurrent && (analysisCurrent.pass1_complete || analysisCurrent.pass2_complete) && !analysisCurrent.pv) {
         // If analysis is done but no PV (e.g., mate in 0 or error), indicate calculation status
         strategyText = "Calcul...";
    } else if (!analysisCurrent || (!analysisCurrent.pass1_complete && !analysisCurrent.pass2_complete)) {
        // If analysis hasn't run or completed for this position
        strategyText = "Analyse requise";
    }


    strategySpan.textContent = strategyText;
}

function updateAnalysisDisplayForCurrentMove() {
    const displayIndex = currentMoveIndex + 1;
    if (displayIndex < 0 || displayIndex >= moveAnalysisData.length) {
        console.warn("Analysis display update requested for invalid index:", displayIndex);
        clearAnalysisUI();
        return;
    }

    const analysisResult = moveAnalysisData[displayIndex];
    if (!analysisResult) {
        console.warn("No analysis data found for index:", displayIndex);
        clearAnalysisUI();
        return;
    }

    // Correction: pour le meilleur coup, utiliser l'analyse de la position précédente
    let bestMoveToShow = null;
    if (currentMoveIndex >= 0) {
        const prevAnalysis = moveAnalysisData[currentMoveIndex];
        bestMoveToShow = prevAnalysis?.best_move_before;
    } else {
        bestMoveToShow = null;
    }

    const evalToShow = analysisResult.eval_before;
    const pvToShow = analysisResult.pv;
    const classificationOfPrevMove = analysisResult.classification;

    let scoreText = "N/A";
    let whitePerc = 50;
    const turn = reviewGame.turn();

    if (evalToShow !== null) {
        if (typeof evalToShow === 'number') {
            scoreText = (evalToShow > 0 ? '+' : '') + evalToShow.toFixed(2);
            const advantage = Math.max(-8, Math.min(8, evalToShow));
            whitePerc = 50 + (advantage * 6);
            whitePerc = Math.max(2, Math.min(98, whitePerc));
        } else if (typeof evalToShow === 'string' && evalToShow.startsWith('M')) {
            const mateIn = parseInt(evalToShow.substring(1));
            if ((turn === 'w' && mateIn > 0) || (turn === 'b' && mateIn < 0)) {
                scoreText = `#${Math.abs(mateIn)}`;
                whitePerc = (turn === 'w') ? 100 : 0;
            } else {
                scoreText = `#-${Math.abs(mateIn)}`;
                whitePerc = (turn === 'w') ? 0 : 100;
            }
        }
    } else if (analysisResult.pass1_complete || analysisResult.pass2_complete) {
        scoreText = "Calcul...";
    }

    scoreEl.textContent = scoreText;
    if (whiteProgressEl) whiteProgressEl.style.width = `${whitePerc}%`;
    if (blackProgressEl) blackProgressEl.style.width = `${100 - whitePerc}%`;

    if (bestMoveEl) {
        if (bestMoveToShow && bestMoveToShow !== '(none)' && bestMoveToShow !== '0000') {
            try {
                // Afficher le SAN du meilleur coup à partir de la position précédente (et non courante !)
                // Il faut utiliser la position AVANT le coup, donc moveAnalysisData[currentMoveIndex].fen_after
                let fenForBest = null;
                if (currentMoveIndex >= 0 && moveAnalysisData[currentMoveIndex]?.fen_after) {
                    fenForBest = moveAnalysisData[currentMoveIndex].fen_after;
                } else {
                    fenForBest = reviewGame.fen();
                }
                const tempGame = new Chess(fenForBest);
                const moveObj = tempGame.move(bestMoveToShow, { sloppy: true });
                bestMoveEl.textContent = moveObj ? moveObj.san : bestMoveToShow;
            } catch (e) { bestMoveEl.textContent = bestMoveToShow; }
        } else {
            bestMoveEl.textContent = (evalToShow === null && (analysisResult.pass1_complete || analysisResult.pass2_complete)) ? "..." : "N/A";
        }
    }

    if (playedMoveInfoEl) {
        if (currentMoveIndex >= 0) {
            if (classificationOfPrevMove) {
                // SVGs for each classification (same as in updateMoveListClassification)
                const notations = {
                    "Brillant": "Brillant",
                    "Très bon": "Très bon",
                    "Meilleur": "Meilleur",
                    "Excellent": "Excellent",
                    "Bon": "Bon",
                    "Théorique": "Théorique",
                    "Imprécision": "Imprécision",
                    "Erreur": "Erreur",
                    "Manqué": "Manqué",
                    "Gaffe": "Gaffe"
                };
                let iconHtml = MOVE_CLASSIFICATION_SVG_ICONS[classificationOfPrevMove] || '';
                let notation = notations[classificationOfPrevMove] || (classificationOfPrevMove || '');
                playedMoveInfoEl.innerHTML = `Coup Joué: ${iconHtml ? iconHtml + ' <span style="margin-left:2px;">' + notation + '</span>' : notation}`;
            } else if (analysisResult.pass1_complete || analysisResult.pass2_complete) {
                playedMoveInfoEl.textContent = "Coup Joué: Classification...";
            } else {
                playedMoveInfoEl.textContent = "";
            }
        } else {
            playedMoveInfoEl.textContent = "";
        }
    }

    updateGoodStrategyDisplay();
}

// --- Navigation ---
function goToMove(index) {
    index = Math.max(-1, Math.min(index, fullGameHistory.length - 1));

    if (index === currentMoveIndex) return;

    console.log(`Navigating to move index: ${index}`);
    currentMoveIndex = index;

    const targetFen = (index === -1)
        ? moveAnalysisData[0]?.fen_after
        : moveAnalysisData[index + 1]?.fen_after;

    if (!targetFen) {
        console.error(`goToMove: Could not find target FEN for index ${index}`);
        statusEl.textContent = "Erreur: Impossible de charger la position.";
        if (chessboardEl) chessboardEl.innerHTML = '<p style="color: red; padding: 20px;">Erreur chargement FEN</p>';
        return;
    }

    console.log(`goToMove: Loading FEN: ${targetFen}`);
    try {
        const loadedOk = reviewGame.load(targetFen);
        if (!loadedOk) {
            throw new Error(`chess.js load returned false for FEN: ${targetFen}`);
        }
        console.log("goToMove: FEN loaded successfully.");
    } catch (e) {
        console.error(`goToMove: Error loading FEN: ${e.message}`, e);
        statusEl.textContent = "Erreur critique: FEN invalide.";
        if (chessboardEl) chessboardEl.innerHTML = '<p style="color: red; padding: 20px;">Erreur chargement FEN critique</p>';
        return;
    }

    createBoard_Review();
    updateStatus();
    updateMoveListHighlight();
    updateNavButtons();
    updateAnalysisDisplayForCurrentMove();
    updateBoardOverlays();
}

// --- Accuracy Calculation and Chart ---

/**
 * --- Accuracy Chart & Stats (Lichess Style) ---
 * Calcule l'accuracy selon la formule officielle Lichess :
 * https://lichess.org/page/accuracy
 * 
 * 1. Win% = 50 + 50 * (2 / (1 + exp(-0.00368208 * centipawns)) - 1)
 * 2. Accuracy% = 103.1668 * exp(-0.04354 * (winPercentBefore - winPercentAfter)) - 3.1669
 */

// Convertit une évaluation (cp ou mate) en centipawns (du point de vue du joueur)
function evalToCentipawns(evalVal, color) {
    if (typeof evalVal === "string" && evalVal.startsWith("M")) {
        // Mate: très grand cp, signe selon camp
        const mateVal = parseInt(evalVal.substring(1));
        if ((color === 'w' && mateVal > 0) || (color === 'b' && mateVal < 0)) {
            return 10000;
        }
        return -10000;
    }
    if (typeof evalVal === "number") {
        return Math.round(evalVal * 100);
    }
    return 0;
}

// Lichess Win% formula
function centipawnsToWinPercent(cp) {
    // Clamp cp to [-10000, 10000] for stability
    cp = Math.max(-10000, Math.min(10000, cp));
    return 50 + 50 * (2 / (1 + Math.exp(-0.00368208 * cp)) - 1);
}

// Calcule la précision d'un coup selon la formule Lichess
function calculateSingleMoveAccuracy_Lichess(moveIndex) {
    // On a besoin de l'analyse AVANT et APRES le coup
    if (moveIndex < 0 || moveIndex >= fullGameHistory.length) return null;
    const analysisBefore = moveAnalysisData[moveIndex];
    const analysisAfter = moveAnalysisData[moveIndex + 1];
    if (!analysisBefore || !analysisAfter) return null;

    const move = fullGameHistory[moveIndex];
    const color = move.color;

    // Eval avant/après (du point de vue du joueur)
    const cpBefore = evalToCentipawns(analysisBefore.eval_before, color);
    const cpAfter = evalToCentipawns(analysisAfter.eval_before, color);

    const winPercentBefore = centipawnsToWinPercent(cpBefore);
    const winPercentAfter = centipawnsToWinPercent(cpAfter);

    // Accuracy% = 103.1668 * exp(-0.04354 * (winPercentBefore - winPercentAfter)) - 3.1669
    const diff = winPercentBefore - winPercentAfter;
    const accuracy = 103.1668 * Math.exp(-0.04354 * diff) - 3.1669;
    return Math.max(0, Math.min(100, accuracy));
}

// Moyenne d'accuracy pour un camp (Lichess)
function calculateAverageAccuracy_Lichess(color) {
    let total = 0, count = 0;
    for (let i = 0; i < fullGameHistory.length; i++) {
        const move = fullGameHistory[i];
        if (move.color !== color) continue;
        const acc = calculateSingleMoveAccuracy_Lichess(i);
        if (acc !== null && !isNaN(acc)) {
            total += acc;
            count++;
        }
    }
    return count > 0 ? (total / count) : null;
}

// --- Met à jour le graphique et les stats de précision ---
function updateAccuracyChartAndStats() {
    if (!accuracyChart) return;

    // Labels: 1., 1... 2., 2... etc
    const labels = [];
    const whiteData = [];
    const blackData = [];
    let lastWhite = null, lastBlack = null;

    for (let i = 0; i < fullGameHistory.length; i++) {
        const move = fullGameHistory[i];
        const analysis = moveAnalysisData[i + 1];
        const moveNumber = Math.floor(i / 2) + 1;
        const label = `${moveNumber}${move.color === 'w' ? '.' : '...'}`;
        labels.push(label);

        const acc = calculateSingleMoveAccuracy_Lichess(i);
        if (move.color === 'w') {
            whiteData.push(acc);
            blackData.push(lastBlack); // Pour relier la courbe
            lastWhite = acc;
        } else {
            blackData.push(acc);
            whiteData.push(lastWhite);
            lastBlack = acc;
        }
    }

    // Calcul des moyennes
    const avgWhite = calculateAverageAccuracy_Lichess('w');
    const avgBlack = calculateAverageAccuracy_Lichess('b');
    if (accuracyWhiteEl) accuracyWhiteEl.textContent = `Blanc : ${avgWhite !== null ? avgWhite.toFixed(1) + '%' : 'N/A'}`;
    if (accuracyBlackEl) accuracyBlackEl.textContent = `Noir : ${avgBlack !== null ? avgBlack.toFixed(1) + '%' : 'N/A'}`;

    // Met à jour le graphique
    accuracyChart.data.labels = labels;
    accuracyChart.data.datasets[0].data = whiteData;
    accuracyChart.data.datasets[1].data = blackData;
    accuracyChart.update();
}

// --- Initialisation du graphique de précision (look chess.com) ---
function initAccuracyChart() {
    if (!accuracyChartCanvas) {
        console.error("Accuracy chart canvas not found.");
        return;
    }
    const ctx = accuracyChartCanvas.getContext('2d');
    if (accuracyChart) {
        accuracyChart.destroy();
        accuracyChart = null;
    }

    // Dégradé pour la zone sous la courbe
    const whiteGradient = ctx.createLinearGradient(0, 0, 0, 200);
    whiteGradient.addColorStop(0, "rgba(255,255,255,0.35)");
    whiteGradient.addColorStop(1, "rgba(255,255,255,0.05)");
    const blackGradient = ctx.createLinearGradient(0, 0, 0, 200);
    blackGradient.addColorStop(0, "rgba(60,60,60,0.35)");
    blackGradient.addColorStop(1, "rgba(60,60,60,0.05)");

    accuracyChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [
                {
                    label: 'Blanc',
                    data: [],
                    borderColor: '#e6e6e6',
                    backgroundColor: whiteGradient,
                    borderWidth: 3,
                    fill: true,
                    tension: 0.3,
                    pointRadius: 0, // Hide points
                    pointHoverRadius: 0,
                    pointBackgroundColor: '#fff',
                    pointBorderColor: '#bbb',
                    pointBorderWidth: 2,
                    spanGaps: true,
                    order: 1
                },
                {
                    label: 'Noir',
                    data: [],
                    borderColor: '#222',
                    backgroundColor: blackGradient,
                    borderWidth: 3,
                    fill: true,
                    tension: 0.3,
                    pointRadius: 0, // Hide points
                    pointHoverRadius: 0,
                    pointBackgroundColor: '#222',
                    pointBorderColor: '#888',
                    pointBorderWidth: 2,
                    spanGaps: true,
                    order: 2
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        color: '#ccc',
                        font: { weight: 'bold', size: 14 }
                    }
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: 'rgba(30,30,30,0.97)',
                    titleColor: '#fff',
                    bodyColor: '#eee',
                    borderColor: '#888',
                    borderWidth: 1,
                    callbacks: {
                        title: function(items) {
                            return items[0]?.label || '';
                        },
                        label: function(context) {
                            const value = context.parsed.y;
                            if (value === null || isNaN(value)) return null;
                            let label = `${context.dataset.label}: ${value.toFixed(1)}%`;
                            // Ajoute la classification si dispo
                            const idx = context.dataIndex;
                            const analysis = moveAnalysisData[idx + 1];
                            if (analysis?.classification) label += ` (${analysis.classification})`;
                            return label;
                        }
                    }
                }
            },
            scales: {
                y: {
                    min: 0,
                    max: 100,
                    title: { display: true, text: 'Précision (%)', color: '#bbb', font: { weight: 'bold' } },
                    ticks: {
                        color: '#aaa',
                        stepSize: 20,
                        callback: function(v) {
                            // Affiche 0%, 20%, 40%, 50%, 60%, 80%, 100%
                            if ([0, 20, 40, 50, 60, 80, 100].includes(v)) return v + '%';
                            return '';
                        }
                    },
                    grid: {
                        color: 'rgba(180,180,180,0.13)',
                        drawBorder: false,
                    }
                },
                x: {
                    title: { display: false, text: '', color: '#bbb', font: { weight: 'bold' } },
                    ticks: {
                        color: '#aaa',
                        display: false, // Hide move labels
                        maxRotation: 0,
                        autoSkip: true,
                        maxTicksLimit: 24
                    },
                    grid: { display: false }
                }
            },
            interaction: {
                mode: 'index',
                intersect: false
            },
            elements: {
                line: {
                    borderJoinStyle: 'round'
                }
            }
        }
    });
    // Premier affichage (vide)
    updateAccuracyChartAndStats();
}

// --- Mise à jour automatique du graphique à chaque navigation ou analyse ---
function hookAccuracyChartUpdates() {
    // Patch navigation
    const origGoToMove = goToMove;
    goToMove = function(idx) {
        origGoToMove(idx);
        updateAccuracyChartAndStats();
    };
    // Patch analyse
    const origClassifyMove = classifyMove;
    classifyMove = function(idx) {
        origClassifyMove(idx);
        updateAccuracyChartAndStats();
    };
    // Patch chargement de partie
    const origBuildMoveListUI = buildMoveListUI;
    buildMoveListUI = function() {
        origBuildMoveListUI();
        updateAccuracyChartAndStats();
    };
}
hookAccuracyChartUpdates();

// --- Move Classification ---
function classifyMove(moveIndex) {
    if (moveIndex < 0 || moveIndex >= fullGameHistory.length) return;

    const dataIndexBefore = moveIndex;
    const dataIndexAfter = moveIndex + 1;

    const analysisBefore = moveAnalysisData[dataIndexBefore];
    const analysisAfter = moveAnalysisData[dataIndexAfter];
    const playedMove = fullGameHistory[moveIndex];

    // --- Theoretical Moves: Only for very first move for each side ---
    const THEORETICAL_UCI_MOVES = new Set([
        "e2e4", "d2d4", "c2c4", "g2g3", "b2b3", "f2f4", "b2b4", "g2g4", "a2a3", "h2h4", "a2a4", "e2e3", "d2d3", "f2f3",
        "e7e5", "d7d5", "c7c5", "g7g6", "b7b6", "f7f5", "b7b5", "g7g5", "a7a6", "h7h5", "a7a5", "e7e6", "d7d6", "f7f6"
    ]);
    const playedMoveUCI = (playedMove.from + playedMove.to + (playedMove.promotion || '')).toLowerCase();

    // Only classify as "Théorique" if it's the very first move for White or Black
    const isWhite = playedMove.color === 'w';
    const isBlack = playedMove.color === 'b';
    const isFirstWhite = isWhite && moveIndex === 0;
    const isFirstBlack = isBlack && moveIndex === 1;

    if ((isFirstWhite || isFirstBlack) && THEORETICAL_UCI_MOVES.has(playedMoveUCI)) {
        if (moveAnalysisData[dataIndexAfter]) {
            moveAnalysisData[dataIndexAfter].classification = "Théorique";
            updateMoveListClassification(moveIndex, "Théorique");
        }
        return;
    }

    // --- Expected Points Model (Chess.com V2) ---
    function evalToEP(evalVal) {
        if (typeof evalVal === "string" && evalVal.startsWith("M")) {
            const mateVal = parseInt(evalVal.substring(1));
            return mateVal > 0 ? 1.0 : 0.0;
        }
        if (typeof evalVal === "number") {
            const x = Math.max(-10, Math.min(10, evalVal));
            return 0.5 + 0.5 * Math.tanh(x / 4.0);
        }
        return 0.5;
    }

    const evalBeforeMove = analysisBefore?.eval_before;
    const evalAfterPlayed = analysisAfter?.eval_before;

    if (evalBeforeMove === null || evalAfterPlayed === null) {
        if (moveAnalysisData[dataIndexAfter]) {
            moveAnalysisData[dataIndexAfter].classification = null;
            moveAnalysisData[dataIndexAfter].cpl = null;
        }
        updateMoveListClassification(moveIndex, null);
        return;
    }

    const epBefore = evalToEP(evalBeforeMove);
    const epAfter = evalToEP(evalAfterPlayed);

    // Store CPL for accuracy chart
    function evalToCp(evalVal, color) {
        if (typeof evalVal === "string" && evalVal.startsWith("M")) {
            const mateVal = parseInt(evalVal.substring(1));
            return mateVal > 0 ? 10000 : -10000;
        }
        if (typeof evalVal === "number") {
            return Math.round(evalVal * 100);
        }
        return 0;
    }
    const color = playedMove.color;
    const cpBefore = evalToCp(evalBeforeMove, color);
    const cpAfter = evalToCp(evalAfterPlayed, color);
    const cpl = (cpBefore - cpAfter) * ((color === 'w') ? 1 : -1);
    if (moveAnalysisData[dataIndexAfter]) {
        moveAnalysisData[dataIndexAfter].cpl = cpl;
    }

    // --- Standard Chess.com V2 Table ---
    let classification = null;
    const epLost = epBefore - epAfter;
    if (Math.abs(epLost) < 1e-6) {
        classification = "Meilleur";
    } else if (epLost <= 0.02) {
        classification = "Excellent";
    } else if (epLost <= 0.05) {
        classification = "Bon";
    } else if (epLost <= 0.10) {
        classification = "Imprécision";
    } else if (epLost <= 0.20) {
        classification = "Erreur";
    } else {
        classification = "Gaffe";
    }

    // --- Special Classifications (Miss, Great, Brilliant) ---
    if (epBefore >= 0.90 && epAfter < 0.90 && (classification === "Erreur" || classification === "Gaffe")) {
        classification = "Manqué";
    }
    if (
        (classification === "Meilleur" || classification === "Excellent" || classification === "Bon") &&
        (
            (epBefore <= 0.10 && epAfter >= 0.40) ||
            (epBefore >= 0.40 && epBefore <= 0.60 && epAfter >= 0.90)
        )
    ) {
        classification = "Très bon";
    }
    if (classification === "Meilleur" || classification === "Très bon") {
        const isCapture = playedMove.captured && playedMove.captured.toLowerCase() !== 'p';
        const isSacrifice = isCapture && playedMove.piece && playedMove.piece.toLowerCase() !== 'p';
        const bestMoveBefore = analysisBefore?.best_move_before;
        const isBest = bestMoveBefore && playedMoveUCI === bestMoveBefore.toLowerCase();
        const notWinningBefore = epBefore < 0.90;
        const notMateBefore = !(typeof evalBeforeMove === "string" && evalBeforeMove.startsWith("M"));
        const notLosingAfter = epAfter > 0.10;
        if (isSacrifice && isBest && notWinningBefore && notMateBefore && notLosingAfter) {
            classification = "Brillant";
        }
    }

    // --- Piece Activity & Missed Opportunity Heuristics ---
    // 1. If a minor/major piece is developed from its initial square to a more active square, and not blundering, prefer "Bon" or "Excellent"
    // 2. If a move allows the opponent to chase away a piece (e.g., bishop on g5, and black can play h6/g5), and the player does not prevent it, mark as "Imprécision"
    // 3. If a pawn move (like g6) does not challenge an advanced enemy piece (like Bg5), and allows it to stay, penalize

    // Helper: Detect if a piece is developed from its initial square
    function isPieceDeveloped(move) {
        if (!move || !move.piece) return false;
        const piece = move.piece.toLowerCase();
        const from = move.from;
        if (piece === 'b') {
            // White bishops: c1/f1; Black bishops: c8/f8
            if ((move.color === 'w' && (from === 'c1' || from === 'f1')) ||
                (move.color === 'b' && (from === 'c8' || from === 'f8'))) {
                return true;
            }
        }
        if (piece === 'n') {
            // White knights: b1/g1; Black knights: b8/g8
            if ((move.color === 'w' && (from === 'b1' || from === 'g1')) ||
                (move.color === 'b' && (from === 'b8' || from === 'g8'))) {
                return true;
            }
        }
        if (piece === 'r') {
            // White rooks: a1/h1; Black rooks: a8/h8
            if ((move.color === 'w' && (from === 'a1' || from === 'h1')) ||
                (move.color === 'b' && (from === 'a8' || from === 'h8'))) {
                return true;
            }
        }
        if (piece === 'q') {
            // White queen: d1; Black queen: d8
            if ((move.color === 'w' && from === 'd1') || (move.color === 'b' && from === 'd8')) {
                return true;
            }
        }
        return false;
    }

    // Helper: Detect if a move is a pawn move that could have challenged an enemy piece (e.g., g6 vs Bg5)
    function missedOpportunityToChasePiece(move, analysisBefore) {
        if (!move || !analysisBefore) return false;
        // Only for pawn moves
        if (move.piece.toLowerCase() !== 'p') return false;
        // Only for g6, h6, b6, a6, f6, e6, d6, c6 (for black), or g3, h3, b3, a3, f3, e3, d3, c3 (for white)
        const to = move.to;
        const squares = ['g6', 'h6', 'b6', 'a6', 'f6', 'e6', 'd6', 'c6', 'g3', 'h3', 'b3', 'a3', 'f3', 'e3', 'd3', 'c3'];
        if (!squares.includes(to)) return false;
        // See if there is an enemy bishop or knight on g5/h5/b5/a5/f5/e5/d5/c5 (for black) or g4/h4/b4/a4/f4/e4/d4/c4 (for white)
        const oppColor = move.color === 'w' ? 'b' : 'w';
        const board = new Chess(analysisBefore.fen_after).board();
        const targetRows = move.color === 'w' ? 4 : 5; // row 4 (index 4) for white, 5 for black
        for (let c = 0; c < 8; c++) {
            const sq = board[targetRows][c];
            if (sq && sq.color === oppColor && (sq.type === 'b' || sq.type === 'n')) {
                // If the pawn move does not attack this piece, it's a missed opportunity
                // For example, g6 does not attack Bg5, but h6 does
                // So, if the pawn could have attacked but didn't, it's a miss
                // We'll check if the pawn could have moved to a square that attacks the piece
                // For black: if white bishop on g5, black could play h6 or f6 to attack
                // For white: if black bishop on g4, white could play h3 or f3
                // We'll just flag as missed opportunity if such a piece exists
                return true;
            }
        }
        return false;
    }

    // --- Nouvelle heuristique : Si le coup active une pièce peu active ou permet d'activer une autre pièce (ex : bouger un pion libère un fou), c'est un bon coup ---
    function activatesPieceOrFreesAnother(move, analysisBefore, analysisAfter) {
        if (!move || !analysisBefore || !analysisAfter) return false;
        // 1. Si la pièce bougée était peu active (peu de cases accessibles) et après le coup elle a plus de mobilité
        try {
            const before = new Chess(analysisBefore.fen_after);
            const after = new Chess(analysisAfter.fen_after);
            // Pour la pièce bougée
            if (move.piece && move.from && move.to) {
                // Nombre de coups possibles avant/après pour cette pièce
                const movesBefore = before.moves({ square: move.from, verbose: true }).length;
                const movesAfter = after.moves({ square: move.to, verbose: true }).length;
                if (movesBefore <= 1 && movesAfter >= 3) {
                    return true;
                }
            }
            // 2. Si une autre pièce alliée (non-pion) ne pouvait pas bouger avant, et peut bouger après (ex : un fou bloqué par un pion)
            for (let r = 0; r < 8; r++) {
                for (let c = 0; c < 8; c++) {
                    const sqAlg = files[c] + (8 - r);
                    if (sqAlg === move.from || sqAlg === move.to) continue;
                    const pieceBefore = before.get(sqAlg);
                    const pieceAfter = after.get(sqAlg);
                    if (pieceBefore && pieceAfter && pieceBefore.color === move.color && pieceAfter.color === move.color && pieceBefore.type === pieceAfter.type) {
                        if (['b', 'n', 'r', 'q'].includes(pieceBefore.type)) {
                            const movesBefore = before.moves({ square: sqAlg, verbose: true }).length;
                            const movesAfter = after.moves({ square: sqAlg, verbose: true }).length;
                            if (movesBefore === 0 && movesAfter > 0) {
                                return true;
                            }
                        }
                    }
                }
            }
        } catch (e) {}
        return false;
    }

    // --- Apply Activity/Development Heuristics ---
    if (
        (classification === "Gaffe" || classification === "Erreur" || classification === "Imprécision") &&
        isPieceDeveloped(playedMove) &&
        !playedMove.captured
    ) {
        // If the move develops a piece from its initial square and doesn't lose material, it's at least "Bon"
        classification = "Bon";
    }

    if (
        (classification === "Gaffe" || classification === "Erreur" || classification === "Imprécision") &&
        activatesPieceOrFreesAnother(playedMove, analysisBefore, analysisAfter) &&
        !playedMove.captured
    ) {
        // Si le coup active une pièce peu active ou libère une autre pièce, c'est au moins "Bon"
        classification = "Bon";
    }

    if (
        (classification === "Théorique" || classification === "Excellent" || classification === "Bon") &&
        missedOpportunityToChasePiece(playedMove, analysisBefore)
    ) {
        // If a pawn move misses the chance to chase away an enemy piece, downgrade to "Imprécision"
        classification = "Imprécision";
    }

    // --- Nouvelle règle : Si un coup fait perdre par la suite une autre pièce alors qu'un autre coup pouvait la sauver, ce coup est une erreur ---
    // On vérifie si, après ce coup, une pièce non-pion du joueur est capturée dans le(s) coup(s) suivant(s), alors qu'un autre coup aurait pu la sauver.
    // On ne fait cette vérification que si le coup n'est pas déjà une "Erreur" ou "Gaffe".
    if (classification !== "Erreur" && classification !== "Gaffe") {
        try {
            // 1. On regarde la position avant le coup joué
            const fenBefore = analysisBefore.fen_after;
            const gameBefore = new Chess(fenBefore);
            // 2. On liste toutes les pièces non-pion du joueur
            const myColor = playedMove.color;
            const myPieces = [];
            for (let r = 0; r < 8; r++) {
                for (let c = 0; c < 8; c++) {
                    const sq = gameBefore.board()[r][c];
                    if (sq && sq.color === myColor && sq.type !== 'p' && sq.type !== 'k') {
                        myPieces.push({ type: sq.type, alg: files[c] + (8 - r) });
                    }
                }
            }
            // 3. On joue le coup joué, puis on simule les 2 prochains coups (adversaire puis joueur)
            const gameAfter = new Chess(fenBefore);
            gameAfter.move(playedMove.san, { sloppy: true });
            // On regarde si une de nos pièces non-pion a disparu après le coup adverse
            let lostPieceAlg = null;
            let lostPieceType = null;
            let pieceLost = false;
            // Génère tous les coups adverses
            const oppMoves = gameAfter.moves({ verbose: true });
            for (const oppMove of oppMoves) {
                const sim = new Chess(gameAfter.fen());
                sim.move(oppMove);
                // Liste les pièces restantes
                const remaining = [];
                for (let r = 0; r < 8; r++) {
                    for (let c = 0; c < 8; c++) {
                        const sq = sim.board()[r][c];
                        if (sq && sq.color === myColor && sq.type !== 'p' && sq.type !== 'k') {
                            remaining.push(files[c] + (8 - r));
                        }
                    }
                }
                // Si une pièce a disparu
                for (const p of myPieces) {
                    if (!remaining.includes(p.alg)) {
                        lostPieceAlg = p.alg;
                        lostPieceType = p.type;
                        pieceLost = true;
                        break;
                    }
                }
                if (pieceLost) break;
            }
            // 4. Si une pièce est perdue, on vérifie si un autre coup aurait pu la sauver
            if (pieceLost && lostPieceAlg) {
                // Pour chaque coup légal possible à la place du coup joué
                const allMoves = gameBefore.moves({ verbose: true });
                let canSave = false;
                for (const altMove of allMoves) {
                    if (altMove.from === playedMove.from && altMove.to === playedMove.to && altMove.promotion === playedMove.promotion) continue;
                    const sim = new Chess(fenBefore);
                    sim.move(altMove);
                    // L'adversaire joue son meilleur coup (on prend le premier)
                    const oppAltMoves = sim.moves({ verbose: true });
                    let stillLost = false;
                    for (const oppAltMove of oppAltMoves) {
                        const sim2 = new Chess(sim.fen());
                        sim2.move(oppAltMove);
                        // La pièce est-elle toujours perdue ?
                        let found = false;
                        for (let r = 0; r < 8; r++) {
                            for (let c = 0; c < 8; c++) {
                                const sq = sim2.board()[r][c];
                                if (sq && sq.color === myColor && sq.type === lostPieceType && files[c] + (8 - r) === lostPieceAlg) {
                                    found = true;
                                }
                            }
                        }
                        if (!found) {
                            stillLost = true;
                            break;
                        }
                    }
                    if (!stillLost) {
                        canSave = true;
                        break;
                    }
                }
                if (canSave) {
                    classification = "Erreur";
                }
            }
        } catch (e) {
            // Ignore errors in simulation
        }
    }

    // --- Ne féliciter que si le coup ne fait pas perdre un avantage SANS compensation ---
    // Si le coup fait perdre un avantage significatif (epLost > 0.05), on ne félicite pas,
    // sauf si le coup permet de récupérer un avantage matériel équivalent ou supérieur dans la PV.
    if (
        (classification === "Très bon" || classification === "Brillant" || classification === "Excellent" || classification === "Bon")
        && epLost > 0.05
    ) {
        // Vérifie si la PV (ligne principale) permet de récupérer du matériel ou un avantage conséquent
        let hasCompensation = false;
        if (analysisAfter?.pv && analysisAfter.pv.length > 1) {
            // On simule la PV à partir de la position après le coup joué
            const sim = new Chess(analysisAfter.fen_after);
            let materialBefore = 0;
            let materialAfter = 0;
            // Matériel du joueur après le coup joué (avant PV)
            for (let r = 0; r < 8; r++) {
                for (let c = 0; c < 8; c++) {
                    const sq = sim.board()[r][c];
                    if (sq && sq.color === playedMove.color) {
                        switch (sq.type) {
                            case 'q': materialBefore += 9; break;
                            case 'r': materialBefore += 5; break;
                            case 'b': materialBefore += 3; break;
                            case 'n': materialBefore += 3; break;
                            case 'p': materialBefore += 1; break;
                        }
                    }
                }
            }
            // On joue la PV (jusqu'à 4 demi-coups)
            let pvMoves = 0;
            for (const uci of analysisAfter.pv.slice(0, 4)) {
                const moveObj = sim.move(uci, { sloppy: true });
                if (!moveObj) break;
                pvMoves++;
            }
            // Matériel du joueur après la PV
            for (let r = 0; r < 8; r++) {
                for (let c = 0; c < 8; c++) {
                    const sq = sim.board()[r][c];
                    if (sq && sq.color === playedMove.color) {
                        switch (sq.type) {
                            case 'q': materialAfter += 9; break;
                            case 'r': materialAfter += 5; break;
                            case 'b': materialAfter += 3; break;
                            case 'n': materialAfter += 3; break;
                            case 'p': materialAfter += 1; break;
                        }
                    }
                }
            }
            // Si le matériel après la PV est au moins égal à avant (ou perte < 2 points), on considère qu'il y a compensation
            if (materialAfter >= materialBefore - 2) {
                hasCompensation = true;
            }
        }
        if (!hasCompensation) {
            if (epLost <= 0.10) {
                classification = "Imprécision";
            } else if (epLost <= 0.20) {
                classification = "Erreur";
            } else {
                classification = "Gaffe";
            }
        }
    }

    if (moveAnalysisData[dataIndexAfter]) {
        moveAnalysisData[dataIndexAfter].classification = classification;
    }

    updateMoveListClassification(moveIndex, classification);
}

// --- Move Commentary (Classification Explanation) ---

/**
 * Fournit une explication concise et précise pour la classification d'un coup,
 * en s'appuyant sur l'analyse Stockfish et la logique de classifymove.
 * Utilise des phrases concrètes sur les occasions manquées ou les pièces en prise.
 * Limité à 3 lignes, sans superflu.
 */
// --- Supposons quelques constantes et utilitaires ---
const PIECE_NAMES_FR = {
    'p': 'pion', 'n': 'cavalier', 'b': 'fou', 'r': 'tour', 'q': 'dame', 'k': 'roi'
};
const PIECE_NAMES_FR_FEMININE = { // Pour "votre dame", "une tour"
    'p': 'pion', 'n': 'cavalier', 'b': 'fou', 'r': 'tour', 'q': 'dame', 'k': 'roi'
};
const ARTICLE_PIECE_FR = { // "un pion", "une dame"
    'p': 'un', 'n': 'un', 'b': 'un', 'r': 'une', 'q': 'une', 'k': 'un'
};

// Fonction utilitaire pour convertir l'évaluation en texte (plus robuste)
function formatEvaluation(evalValue, forPlayerColor = 'w') {
    if (typeof evalValue === 'number') {
        // L'évaluation est toujours du point de vue des Blancs.
        // Si c'est au tour des Noirs de jouer et que l'eval est pour les Noirs, on l'inverse.
        const sign = (forPlayerColor === 'w') ? 1 : -1;
        const displayEval = evalValue * sign;
        return (displayEval > 0 ? "+" : "") + displayEval.toFixed(2);
    } else if (typeof evalValue === 'string' && evalValue.startsWith("M")) {
        const mateIn = parseInt(evalValue.substring(1));
        if (mateIn > 0 && forPlayerColor === 'b') return "#" + (-mateIn); // Mate pour les noirs, affiché négativement
        if (mateIn < 0 && forPlayerColor === 'w') return "#" + mateIn; // Mate pour les blancs (par les noirs), affiché négativement
        return "#" + mateIn; // Mate pour les blancs, ou mat pour les noirs si eval est déjà inversée
    }
    return "";
}


/**
 * Fournit une explication concise et précise pour la classification d'un coup,
 * en s'appuyant sur l'analyse Stockfish et la logique de classifymove.
 * Utilise des phrases concrètes sur les occasions manquées ou les pièces en prise.
 * Limité à 3 lignes, sans superflu.
 * 
 * NOTE: Cette version utilise les variables globales fullGameHistory et moveAnalysisData
 * si elles ne sont pas passées explicitement (pour compatibilité avec l'appel dans updateMoveCommentary).
 */
function getClassificationExplanation(classification, moveIndex, fullGameHistoryArg, moveAnalysisDataArg) {
    // Utilise les arguments si fournis, sinon les variables globales
    const gameHistory = fullGameHistoryArg || fullGameHistory;
    const analysisData = moveAnalysisDataArg || moveAnalysisData;

    if (!classification) return "Aucune explication disponible pour ce coup.";

    const currentMoveData = gameHistory[moveIndex];
    if (!currentMoveData) return "Données du coup manquantes.";

    // analysisBeforeMove: analyse de la position AVANT que currentMoveData ne soit joué
    const analysisBeforeMove = analysisData[moveIndex];
    // analysisAfterMove: analyse de la position APRES que currentMoveData ait été joué
    const analysisAfterMove = analysisData[moveIndex + 1];

    if (!analysisBeforeMove || !analysisAfterMove) return "Données d'analyse manquantes pour ce coup.";

    const playedMoveUCI = currentMoveData.from + currentMoveData.to + (currentMoveData.promotion || '');
    const san = currentMoveData.san || playedMoveUCI;
    const playerColor = currentMoveData.color;

    // Évaluation de la position actuelle (après le coup joué)
    const currentEval = analysisAfterMove.eval_before; // eval_before de l'analyse suivante est l'eval APRES le coup courant
    const scoreText = formatEvaluation(currentEval, playerColor);

    // Contexte du coup pour les fonctions d'aide
    const moveContext = {
        moveData: currentMoveData,
        playedMoveUCI: playedMoveUCI,
        san: san,
        playerColor: playerColor,
        opponentColor: playerColor === 'w' ? 'b' : 'w',
        fenBeforePlay: analysisBeforeMove.fen_after, // FEN de la position où le coup a été joué
        fenAfterPlay: analysisAfterMove.fen_after,   // FEN après le coup joué
        boardBeforePlay: null, // Sera initialisé avec new Chess()
        boardAfterPlay: null,  // Sera initialisé avec new Chess()
        bestMoveUciBefore: analysisBeforeMove.best_move_before,
        evalBeforePlay: analysisBeforeMove.eval_before,                 // Eval de la position avant le coup du joueur
        evalAfterPlay: analysisAfterMove.eval_before,                   // Eval de la position après le coup du joueur
        evalIfBestMovePlayed: analysisBeforeMove.eval_after_best_move_if_played, // Eval si le meilleur coup avait été joué
        bestMoveSan: "",
        classification: classification,
        scoreText: scoreText,
        moveIndex: moveIndex
    };

    try {
        moveContext.boardBeforePlay = new Chess(moveContext.fenBeforePlay);
        moveContext.boardAfterPlay = new Chess(moveContext.fenAfterPlay);
    } catch (e) {
        console.error("Erreur initialisation Chess.js:", e, moveContext.fenBeforePlay, moveContext.fenAfterPlay);
        return "Erreur d'analyse de la position.";
    }

    // Calculer le SAN du meilleur coup
    if (moveContext.bestMoveUciBefore) {
        try {
            const tempGame = new Chess(moveContext.fenBeforePlay);
            const bestMoveObj = tempGame.move(moveContext.bestMoveUciBefore, { sloppy: true });
            moveContext.bestMoveSan = bestMoveObj ? bestMoveObj.san : moveContext.bestMoveUciBefore;
        } catch {
            moveContext.bestMoveSan = moveContext.bestMoveUciBefore;
        }
    }

    // --- Fonctions d'aide améliorées ---

    function getPieceName(pieceChar, feminine = false, article = false) {
        const type = pieceChar.toLowerCase();
        let name = feminine ? PIECE_NAMES_FR_FEMININE[type] : PIECE_NAMES_FR[type];
        if (article && name) {
            name = ARTICLE_PIECE_FR[type] + " " + name;
        }
        return name || "pièce";
    }

    function getLostMaterialBlunderPhrase(ctx) {
        if (!ctx.moveData.captured &&
            (ctx.classification === "Gaffe" || ctx.classification === "Erreur")) {
            // Vérifier si le MEILLEUR coup était une capture importante que l'on a ratée
            if (ctx.bestMoveUciBefore) {
                const tempGame = new Chess(ctx.fenBeforePlay);
                const bestMoveObj = tempGame.move(ctx.bestMoveUciBefore, { sloppy: true });
                if (bestMoveObj && bestMoveObj.captured) {
                    const capturedPieceType = bestMoveObj.captured.toLowerCase();
                    if (['q', 'r'].includes(capturedPieceType)) {
                        return `Vous avez raté ${ctx.bestMoveSan}, qui capturait ${getPieceName(capturedPieceType, true, true)} adverse.`;
                    }
                }
            }
            // Vérifier si le coup joué laisse une pièce en prise non défendue
            // (Simplifié: on ne fait pas cette vérification ici, car chess.js vanilla ne fournit pas isAttacked/attackers)
        }
        return "";
    }

    function getMissedOpportunityPhrase(ctx) {
        if (ctx.playedMoveUCI.toLowerCase() === ctx.bestMoveUciBefore?.toLowerCase()) return "";

        const evalDrop = calculateEvalDrop(ctx.evalIfBestMovePlayed, ctx.evalAfterPlay, ctx.playerColor);

        if (ctx.bestMoveUciBefore) {
            const tempGame = new Chess(ctx.fenBeforePlay);
            const bestMoveObj = tempGame.move(ctx.bestMoveUciBefore, { sloppy: true });

            if (bestMoveObj) {
                // Occasion de mat manquée
                if (typeof ctx.evalIfBestMovePlayed === 'string' && ctx.evalIfBestMovePlayed.startsWith('M')) {
                    const mateForPlayer = (ctx.playerColor === 'w' && parseInt(ctx.evalIfBestMovePlayed.substring(1)) > 0) ||
                                          (ctx.playerColor === 'b' && parseInt(ctx.evalIfBestMovePlayed.substring(1)) < 0);
                    if (mateForPlayer) {
                         return `Incroyable ! Vous aviez un mat en ${Math.abs(parseInt(ctx.evalIfBestMovePlayed.substring(1)))} coups avec ${ctx.bestMoveSan}.`;
                    }
                }
                // Occasion de gain matériel important manquée
                if (bestMoveObj.captured) {
                    const piece = bestMoveObj.captured.toLowerCase();
                    if (['q', 'r'].includes(piece) && evalDrop > 2) {
                        return `Dommage, ${ctx.bestMoveSan} gagnait ${getPieceName(piece, true, true)} adverse.`;
                    }
                    if (['b', 'n'].includes(piece) && evalDrop > 1) {
                        return `Occasion manquée avec ${ctx.bestMoveSan} de gagner ${getPieceName(piece, false, true)} adverse.`;
                    }
                }
                // Occasion de gain d'avantage décisif
                const advantageThreshold = ctx.playerColor === 'w' ? 2.5 : -2.5;
                const currentAdvantageThreshold = ctx.playerColor === 'w' ? 0.5 : -0.5;
                const bestWasWinning = (ctx.playerColor === 'w' && ctx.evalIfBestMovePlayed > advantageThreshold) || (ctx.playerColor === 'b' && ctx.evalIfBestMovePlayed < advantageThreshold);
                const currentIsNotWinning = (ctx.playerColor === 'w' && ctx.evalAfterPlay < currentAdvantageThreshold) || (ctx.playerColor === 'b' && ctx.evalAfterPlay > currentAdvantageThreshold);

                if (bestWasWinning && currentIsNotWinning && evalDrop > 2) {
                    return `${ctx.bestMoveSan} vous aurait donné un avantage décisif.`;
                }
            }
        }
        if (evalDrop > 1.5) {
             return `Il y avait une meilleure continuation avec ${ctx.bestMoveSan}.`;
        }
        return "";
    }
    
    function calculateEvalDrop(evalBest, evalPlayed, playerColor) {
        const MATE_SCORE = 1000;
        function getNumericValue(evaluation, color) {
            if (typeof evaluation === 'string' && evaluation.startsWith('M')) {
                let mateIn = parseInt(evaluation.substring(1));
                if ((color === 'w' && mateIn > 0) || (color === 'b' && mateIn < 0)) {
                    return MATE_SCORE - Math.abs(mateIn);
                }
                return -(MATE_SCORE - Math.abs(mateIn));
            }
            return (color === 'w') ? evaluation : -evaluation;
        }
        const numericBest = getNumericValue(evalBest, playerColor);
        const numericPlayed = getNumericValue(evalPlayed, playerColor);
        return numericBest - numericPlayed;
    }

    function getPositivePlayPhrase(ctx) {
        const move = ctx.moveData;
        let phrases = [];

        // Capture gratuite ou avantageuse
        if (move.captured) {
            const evalGain = calculateEvalDrop(ctx.evalAfterPlay, ctx.evalBeforePlay, ctx.playerColor);
            if (evalGain > 0.8) {
                 phrases.push(`Bien joué ! La capture de ${getPieceName(move.captured, true, true)} en ${move.to} améliore votre position.`);
            } else if (['Meilleur', 'Brillant', 'Très bon'].includes(ctx.classification)) {
                 phrases.push(`La capture en ${move.to} est un bon échange.`);
            }
        }

        // Développement / Activation
        const pieceType = move.piece.toLowerCase();
        const fromRank = parseInt(move.from[1]);
        const toRank = parseInt(move.to[1]);
        const fromFile = move.from[0];
        const toFile = move.to[0];

        // Développement d'une pièce depuis sa case initiale (simplifié)
        const initialRanks = { w: [1, 2], b: [7, 8] };
        const isDeveloping = initialRanks[ctx.playerColor].includes(fromRank) &&
                             !initialRanks[ctx.playerColor].includes(toRank);

        if (isDeveloping && ['n', 'b'].includes(pieceType) && ctx.moveIndex < 15) {
            phrases.push(`Bon développement de votre ${getPieceName(pieceType)}. ${ctx.san} active la pièce.`);
        }
        if (move.flags && (move.flags.includes('k') || move.flags.includes('q')) && ctx.moveIndex < 20) {
            phrases.push(`Excellent ! Le roque ${ctx.san} met votre roi à l'abri et connecte vos tours.`);
        }

        // Centralisation
        const centerSquares = ['d4', 'e4', 'd5', 'e5'];
        if (centerSquares.includes(move.to) && !centerSquares.includes(move.from) && ['n', 'b', 'q'].includes(pieceType)) {
            phrases.push(`${ctx.san} place votre ${getPieceName(pieceType)} sur une case centrale influente.`);
        }
        
        // Création d'une menace (simplifié)
        if (['Meilleur', 'Brillant', 'Très bon', 'Excellent'].includes(ctx.classification) && !move.captured) {
            if (calculateEvalDrop(ctx.evalAfterPlay, ctx.evalBeforePlay, ctx.playerColor) > 0.5) {
                 phrases.push(`${ctx.san} renforce votre position et pose des problèmes à l'adversaire.`);
            }
        }
        
        if (ctx.classification === "Brillant") {
            phrases.push(`${ctx.san} est une idée subtile et très forte !`);
        }

        return phrases.filter(p => p).join(" ");
    }
    
    function getGeneralAdvicePhrase(ctx) {
        if (ctx.moveIndex < 10) {
            if (ctx.moveData.piece.toLowerCase() === 'q' && (ctx.moveData.from[1] === (ctx.playerColor === 'w' ? '1' : '8'))) {
                if (ctx.classification === "Imprécision" || ctx.classification === "Erreur") {
                    return "Sortir la dame trop tôt en début de partie peut la rendre vulnérable aux attaques.";
                }
            }
            if (ctx.moveIndex > 2) {
                const prevMove = gameHistory[ctx.moveIndex - 2];
                if (prevMove && prevMove.color === ctx.playerColor && prevMove.piece === ctx.moveData.piece && prevMove.to !== ctx.moveData.from) {
                     if (ctx.classification === "Imprécision" || ctx.classification === "Bon") {
                        return "En général, il est préférable de développer différentes pièces dans l'ouverture plutôt que de bouger plusieurs fois la même.";
                     }
                }
            }
        }
        return "";
    }

    // --- Construction de l'explication finale ---
    let explanation = "";
    let subPhrases = [];

    const mainEvalDrop = calculateEvalDrop(moveContext.evalIfBestMovePlayed, moveContext.evalAfterPlay, moveContext.playerColor);

    switch (classification) {
        case "Théorique":
            explanation = `${san} est un coup d'ouverture théorique (${scoreText}).`;
            subPhrases.push("Vous suivez une ligne connue, c'est une bonne base pour la partie.");
            break;
        case "Meilleur":
            explanation = `${san} est le meilleur coup ! (${scoreText}).`;
            subPhrases.push("Excellent choix, vous maintenez la pression ou exploitez au mieux la position.");
            break;
        case "Brillant":
            explanation = `🌟 ${san} est un coup brillant ! (${scoreText}).`;
            break;
        case "Très bon":
            explanation = `${san} est un très bon coup (${scoreText}).`;
            subPhrases.push("Vous améliorez significativement votre position.");
            break;
        case "Excellent":
            explanation = `${san} est un excellent coup (${scoreText}).`;
            subPhrases.push("Presque parfait ! Vous continuez sur la bonne voie.");
            break;
        case "Bon":
            explanation = `${san} est un coup solide (${scoreText}).`;
            if (moveContext.bestMoveSan && mainEvalDrop > 0.5 && mainEvalDrop < 1.5) {
                subPhrases.push(`Cependant, ${moveContext.bestMoveSan} aurait été légèrement plus précis.`);
            }
            break;
        case "Imprécision":
            explanation = `${san} est une imprécision (${scoreText}).`;
            if (moveContext.bestMoveSan && mainEvalDrop > 0.7) {
                subPhrases.push(`Cela réduit un peu votre avantage. Mieux valait considérer ${moveContext.bestMoveSan}.`);
            }
            break;
        case "Erreur":
            explanation = `${san} est une erreur (${scoreText}).`;
            if (moveContext.bestMoveSan && mainEvalDrop > 1.5) {
                subPhrases.push(`Ce coup détériore votre position. ${moveContext.bestMoveSan} était nécessaire.`);
            }
            break;
        case "Manqué":
            explanation = `${san} est un coup manqué (${scoreText}).`;
            break;
        case "Gaffe":
            explanation = `😱 ${san} est une gaffe ! (${scoreText}).`;
            if (moveContext.bestMoveSan && mainEvalDrop > 3) {
                subPhrases.push(`Ce coup risque de vous coûter cher. Il fallait absolument jouer ${moveContext.bestMoveSan}.`);
            }
            break;
        default:
            explanation = `${san} (${scoreText}).`;
            subPhrases.push("L'analyse suggère cette évaluation pour votre coup.");
            break;
    }

    // Ajouter des phrases contextuelles
    const positivePhrase = getPositivePlayPhrase(moveContext);
    const blunderPhrase = getLostMaterialBlunderPhrase(moveContext);
    const missedOpportunity = getMissedOpportunityPhrase(moveContext);
    const generalAdvice = getGeneralAdvicePhrase(moveContext);

    if (blunderPhrase) {
        subPhrases.push(blunderPhrase);
    } else if (missedOpportunity) {
        subPhrases.push(missedOpportunity);
    }
    
    if (positivePhrase) {
        subPhrases.push(positivePhrase);
    }
    if (generalAdvice && subPhrases.length < 2) {
        subPhrases.push(generalAdvice);
    }
    
    // Assembler l'explication finale
    let fullExplanation = explanation;
    const uniqueSubPhrases = [...new Set(subPhrases.filter(p => p && p.trim() !== ""))];

    for (let i = 0; i < Math.min(uniqueSubPhrases.length, 2); i++) {
        fullExplanation += " " + uniqueSubPhrases[i];
    }

    // Nettoyage final et limite de longueur (approximative par phrases)
    let sentences = fullExplanation.split('. ').map(s => s.trim()).filter(s => s.length > 0);
    if (sentences.length > 3) {
        sentences = sentences.slice(0, 3);
    }
    fullExplanation = sentences.join('. ') + (sentences.length > 0 && !sentences[sentences.length-1].endsWith('.') ? '.' : '');
    
    return fullExplanation.trim();
}

function updateMoveCommentary(moveIndex) {
    const commentaryEl = document.getElementById('move-commentary');
    if (!commentaryEl) return;

    if (moveIndex < 0 || moveIndex >= fullGameHistory.length) {
        commentaryEl.textContent = "Sélectionnez un coup pour voir une explication sur sa classification.";
        return;
    }

    const analysis = moveAnalysisData[moveIndex + 1];
    const classification = analysis?.classification;
    if (!classification) {
        commentaryEl.textContent = "Ce coup n'a pas encore été analysé ou classifié.";
        return;
    }

    const explanation = getClassificationExplanation(classification, moveIndex);
    commentaryEl.innerHTML = `<b>Classification :</b> ${classification}<br><span style="opacity:0.85;">${explanation}</span>`;
}

// --- Hook commentary update into navigation and move selection ---

// Update commentary when navigating moves
const originalGoToMove = goToMove;
goToMove = function(index) {
    originalGoToMove(index);
    updateMoveCommentary(index);
};

// Update commentary when clicking in move list
function patchMoveListForCommentary() {
    if (!moveListEl) return;
    moveListEl.querySelectorAll('li').forEach(li => {
        li.addEventListener('click', () => {
            const idx = parseInt(li.dataset.moveIndex);
            updateMoveCommentary(idx);
        });
    });
}

// Patch after building move list
const originalBuildMoveListUI = buildMoveListUI;
buildMoveListUI = function() {
    originalBuildMoveListUI();
    patchMoveListForCommentary();
};

// Initial commentary on page load
document.addEventListener('DOMContentLoaded', () => {
    updateMoveCommentary(currentMoveIndex);
});

// --- Stockfish Analysis Orchestration ---

function processStockfishQueue() {
    if (stockfishQueue.length === 0) {
        console.log("Stockfish queue empty.");
        isProcessingQueue = false;
        analysisProgressText.textContent = getOverallAnalysisProgress();

        const allPass1Done = moveAnalysisData.slice(1).every(d => d && d.pass1_complete);
        if (allPass1Done && !analysisComplete) {
            console.log("Analysis Pass 1 complete. Calculating accuracy...");
            analysisComplete = true;
            updateAccuracyChartAndStats();
            analysisProgressText.textContent = "Analyse Terminée.";
        }
        return;
    }

    if (isProcessingQueue) {
        console.log("Still processing previous job, queue will continue.");
        return;
    }

    isProcessingQueue = true;
    currentAnalysisJob = stockfishQueue.shift();

    const totalJobs = moveAnalysisData.length;
    const currentJobNum = totalJobs - stockfishQueue.length;
    const passNum = currentAnalysisJob.isPass1 ? 1 : 2;
    analysisProgressText.textContent = `Analyse (P${passNum}): Position ${currentJobNum}/${totalJobs} (Prof ${currentAnalysisJob.depth})...`;

    console.log(`Requesting analysis: Idx=${currentAnalysisJob.analysisDataIndex}, Depth=${currentAnalysisJob.depth}, Fen=${currentAnalysisJob.fen.substring(0, 20)}...`);

    stockfish.postMessage('stop');
    stockfish.postMessage('ucinewgame');
    stockfish.postMessage(`position fen ${currentAnalysisJob.fen}`);
    stockfish.postMessage(`go depth ${currentAnalysisJob.depth}`);
}

function handleStockfishMessage_Review(event) {
    const message = event.data;

    if (message === 'uciok') {
        console.log("Review UCI OK");
        stockfish.postMessage('isready');
        return;
    }
    if (message === 'readyok') {
        isStockfishReady = true;
        console.log("Review Stockfish ready.");
        analysisProgressText.textContent = "Moteur Prêt.";
        if (!isProcessingQueue && stockfishQueue.length > 0) {
            processStockfishQueue();
        }
        return;
    }

    if (!currentAnalysisJob) return;

    let currentEval = null;
    let currentBestMove = null;
    let currentPv = null;

    if (message.startsWith('info')) {
        const cpMatch = message.match(/score cp (-?\d+)/);
        const mateMatch = message.match(/score mate (-?\d+)/);
        const pvMatch = message.match(/ pv (.+)/);

        if (mateMatch) {
            currentEval = `M${mateMatch[1]}`;
        } else if (cpMatch) {
            currentEval = parseFloat((parseInt(cpMatch[1], 10) / 100.0).toFixed(2));
        }

        if (pvMatch) {
            currentPv = pvMatch[1].split(' ');
            if (currentPv.length > 0) {
                currentBestMove = currentPv[0];
            }
        }
        const dataEntry = moveAnalysisData[currentAnalysisJob.analysisDataIndex];
        if (dataEntry) {
            if (currentEval !== null) dataEntry.eval_before_temp = currentEval;
            if (currentBestMove !== null) dataEntry.best_move_before_temp = currentBestMove;
            if (currentPv !== null) dataEntry.pv_temp = currentPv;
        }


    } else if (message.startsWith('bestmove')) {
        const finalBestMove = message.split(' ')[1];
        const analysisIndex = currentAnalysisJob.analysisDataIndex;

        console.log(`Analysis complete for index ${analysisIndex} (Depth ${currentAnalysisJob.depth}): Best=${finalBestMove}, Eval=${currentEval ?? 'N/A'}`);

        const dataEntry = moveAnalysisData[analysisIndex];
        if (dataEntry) {
            dataEntry.eval_before = dataEntry.eval_before_temp ?? currentEval ?? null;
            dataEntry.best_move_before = dataEntry.best_move_before_temp ?? finalBestMove;
            dataEntry.pv = dataEntry.pv_temp ?? (finalBestMove && finalBestMove !== '(none)' ? [finalBestMove] : null);
            dataEntry.analysis_depth = currentAnalysisJob.depth;

            if (currentAnalysisJob.isPass1) dataEntry.pass1_complete = true;
            else dataEntry.pass2_complete = true;

            delete dataEntry.eval_before_temp;
            delete dataEntry.best_move_before_temp;
            delete dataEntry.pv_temp;

            const moveIndexToClassify = analysisIndex - 1;
            if (moveIndexToClassify >= 0) {
                classifyMove(moveIndexToClassify);
            }

            if (currentMoveIndex === moveIndexToClassify) {
                updateAnalysisDisplayForCurrentMove();
                updateBoardOverlays();
            } else if (currentMoveIndex === -1 && analysisIndex === 0) {
                updateAnalysisDisplayForCurrentMove();
                updateBoardOverlays();
            }
        } else {
            console.error(`Data entry not found for analysis index ${analysisIndex}`);
        }

        currentAnalysisJob = null;
        isProcessingQueue = false;
        processStockfishQueue();
    }
}

function startFullGameAnalysis() {
    if (!isStockfishReady) {
        console.warn("Stockfish not ready, delaying analysis start.");
        analysisProgressText.textContent = "Moteur en attente...";
        setTimeout(startFullGameAnalysis, 1000);
        return;
    }
    if (isProcessingQueue || stockfishQueue.length > 0) {
        console.log("Analysis already in progress or queued.");
        return;
    }
    console.log("Starting full game analysis...");
    analysisProgressText.textContent = "Préparation de l'analyse...";
    stockfishQueue = [];

    for (let i = 0; i < moveAnalysisData.length; i++) {
        const analysisEntry = moveAnalysisData[i];
        if (analysisEntry && !analysisEntry.pass1_complete) {
            stockfishQueue.push({
                analysisDataIndex: i,
                fen: analysisEntry.fen_after,
                depth: DEPTH_PASS_1,
                purpose: 'eval_position',
                isPass1: true
            });
        }
    }

    if (!isProcessingQueue) {
        processStockfishQueue();
    } else {
        console.log("Queue populated, waiting for current job to finish.");
    }
}

// --- Stockfish Initialization ---
function initStockfish_Review() {
    try {
        stockfish = new Worker('./stockfish.wasm.js');
        stockfish.onmessage = handleStockfishMessage_Review;
        stockfish.onerror = (e) => {
            console.error("Review Stockfish Error:", e);
            statusEl.textContent = "Erreur Moteur Analyse.";
            analysisProgressText.textContent = "Moteur Indisponible";
            isStockfishReady = false;
        };
        setTimeout(() => {
            stockfish.postMessage('uci');
            stockfish.postMessage('setoption name Hash value 64');
        }, 50);

        console.log("Review Stockfish worker initializing...");
    } catch (e) {
        console.error("Failed to init Review Stockfish Worker:", e);
        statusEl.textContent = "Erreur: Worker IA non supporté.";
        analysisProgressText.textContent = "Moteur Indisponible";
        isStockfishReady = false;
    }
}

// --- Game Loading and State Management ---

function loadGameAndPrepareHistory(pgnString = null) {
    const pgn = pgnString || localStorage.getItem('reviewGamePGN');
    if (!pgn) {
        if (pgnString === null) {
            console.log("No PGN in localStorage, preparing for Analysis Board mode or PGN paste.");
        } else {
            statusEl.textContent = "Erreur: PGN fourni est vide.";
            console.error("Empty PGN provided for review.");
        }
        fullGameHistory = [];
        moveAnalysisData = [];
        return false;
    }

    const tempGame = new Chess();
    let pgnHeaders = {};
    try {
        const loaded = tempGame.load_pgn(pgn, { sloppy: true });
        if (!loaded) throw new Error("chess.js couldn't load PGN.");

        pgnHeaders = tempGame.header();
        const historyVerbose = tempGame.history({ verbose: true });
        if (historyVerbose.length === 0) throw new Error("No moves in PGN");

        fullGameHistory = [];
        moveAnalysisData = [];
        const fenGame = new Chess();

        const initialFen = fenGame.fen();
        moveAnalysisData.push({
            fen_before: null, fen_after: initialFen, played_move: null,
            eval_before: null, best_move_before: null, pv: null,
            eval_after_played: null, classification: null, analysis_depth: 0,
            pass1_complete: false, pass2_complete: false, cpl: null
        });

        for (const move of historyVerbose) {
            const fen_before = fenGame.fen();
            const moveResult = fenGame.move(move.san);
            if (!moveResult) {
                console.warn(`Skipping invalid move in PGN: ${move.san} at FEN ${fen_before}`);
                continue;
            }
            const fen_after = fenGame.fen();

            fullGameHistory.push({ ...move, fen_before, fen_after });
            moveAnalysisData.push({
                fen_before: fen_before, fen_after: fen_after,
                played_move: { san: move.san, uci: move.from + move.to + (move.promotion || '') },
                eval_before: null, best_move_before: null, pv: null,
                eval_after_played: null, classification: null, analysis_depth: 0,
                pass1_complete: false, pass2_complete: false, cpl: null
            });
        }
        console.log(`Prepared history with ${fullGameHistory.length} moves.`);

        if (pgnHeadersDisplayEl) {
            let headerText = '';
            for (const key in pgnHeaders) {
                if (pgnHeaders.hasOwnProperty(key)) {
                    headerText += `[${key} "${pgnHeaders[key]}"]\n`;
                }
            }
            pgnHeadersDisplayEl.textContent = headerText || "Aucun en-tête PGN trouvé.";
        }
        return true;

    } catch (error) {
        statusEl.textContent = `Erreur lecture PGN: ${error.message}`;
        console.error("Error loading/parsing PGN:", error);
        fullGameHistory = [];
        moveAnalysisData = [];
        if (pgnHeadersDisplayEl) pgnHeadersDisplayEl.textContent = "Erreur chargement PGN.";
        return false;
    }
}

function resetAnalysisState() {
    console.log("Resetting analysis state...");
    if (stockfish) {
        stockfish.postMessage('stop');
    }
    stockfishQueue = [];
    currentAnalysisJob = null;
    isProcessingQueue = false;
    analysisComplete = false;

    reviewGame = new Chess();
    fullGameHistory = [];
    moveAnalysisData = [];
    currentMoveIndex = -1;

    const initialFen = reviewGame.fen();
    moveAnalysisData.push({
        fen_before: null, fen_after: initialFen, played_move: null,
        eval_before: null, best_move_before: null, pv: null,
        eval_after_played: null, classification: null, analysis_depth: 0,
        pass1_complete: false, pass2_complete: false, cpl: null
    });

    if (moveListEl) buildMoveListUI();
    if (pgnHeadersDisplayEl) pgnHeadersDisplayEl.textContent = 'N/A';
    statusEl.textContent = "Position initiale.";
    analysisProgressText.textContent = "";
    clearAnalysisUI();
    clearOverlays();
    if (accuracyChart) {
        updateAccuracyChartAndStats();
    }
    if (accuracyWhiteEl) accuracyWhiteEl.textContent = "Blanc: N/A%";
    if (accuracyBlackEl) accuracyBlackEl.textContent = "Noir: N/A%";

    createBoard_Review();
    updateNavButtons();
    updateAnalysisDisplayForCurrentMove();
}

// --- UI Setup ---

function setupUI() {
    btnFirst.onclick = () => goToMove(-1);
    btnPrev.onclick = () => goToMove(currentMoveIndex - 1);
    btnNext.onclick = () => goToMove(currentMoveIndex + 1);
    btnLast.onclick = () => goToMove(fullGameHistory.length - 1);

    buildMoveListUI();

    [filterPlayedEl, filterBestEl, filterPvEl, filterThreatsEl, filterMatEl].forEach(el => { // Added filterMatEl
        if (el) el.addEventListener('change', updateBoardOverlays);
        else console.warn("A filter element is missing");
    });

    if (loadPgnButton && pgnInputArea) {
        loadPgnButton.onclick = () => {
            const pgnText = pgnInputArea.value.trim();
            if (!pgnText) {
                console.log("Resetting to initial position via Load button (empty PGN).");
                statusEl.textContent = "Réinitialisation à la position initiale...";
                resetAnalysisState();
                startFullGameAnalysis();
                return;
            }
            console.log("Load PGN button clicked.");
            statusEl.textContent = "Chargement du PGN...";
            resetAnalysisState();

            const loadedOK = loadGameAndPrepareHistory(pgnText);

            if (loadedOK && fullGameHistory.length > 0) {
                statusEl.textContent = "PGN chargé. Préparation de l'analyse...";
                buildMoveListUI();
                updateAccuracyChartAndStats();
                goToMove(-1);
                startFullGameAnalysis();
            } else if (!loadedOK) {
                resetAnalysisState();
                statusEl.textContent = "Erreur chargement PGN. Affichage position initiale.";
                startFullGameAnalysis();
            } else {
                resetAnalysisState();
                statusEl.textContent = "PGN chargé, mais aucun coup trouvé. Affichage position initiale.";
                startFullGameAnalysis();
            }
        };
    } else {
        console.warn("PGN input area or load button not found.");
    }
}

// --- Theme Application ---
function applyTheme() {
    const theme = localStorage.getItem('theme') || 'default';
    document.body.className = theme;
}

// --- Online Games Import (Lichess & Chess.com) ---
const lichessUsernameInput = document.getElementById('lichess-username');
const chesscomUsernameInput = document.getElementById('chesscom-username');
const fetchLichessBtn = document.getElementById('fetch-lichess-games');
const fetchChesscomBtn = document.getElementById('fetch-chesscom-games');
const onlineGamesContainer = document.getElementById('online-games-container');
const onlineGamesStatus = document.getElementById('online-games-status');
const onlineGamesList = document.getElementById('online-games-list');
const loadMoreOnlineGamesBtn = document.getElementById('load-more-online-games');
const filterStartDateInput = document.getElementById('filter-start-date');
const filterEndDateInput = document.getElementById('filter-end-date');
const searchGamesByDateBtn = document.getElementById('search-games-by-date');

let onlineGamesState = {
    platform: null, // 'lichess' | 'chesscom'
    username: null,
    games: [],
    page: 1,
    perPage: 50,
    hasMore: true,
    loading: false,
    dateFilter: null // {from, to}
};

function resetOnlineGamesUI() {
    onlineGamesList.innerHTML = '';
    onlineGamesStatus.textContent = '';
    loadMoreOnlineGamesBtn.style.display = 'none';
    onlineGamesContainer.style.display = 'none';
    onlineGamesState.games = [];
    onlineGamesState.page = 1;
    onlineGamesState.hasMore = true;
    onlineGamesState.loading = false;
    onlineGamesState.dateFilter = null;
}

function showOnlineGamesUI() {
    onlineGamesContainer.style.display = '';
}

function renderOnlineGamesList() {
    onlineGamesList.innerHTML = '';
    if (!onlineGamesState.games.length) {
        onlineGamesList.innerHTML = '<li style="opacity:0.7;">Aucune partie trouvée.</li>';
        return;
    }
    onlineGamesState.games.forEach((g, idx) => {
        const li = document.createElement('li');
        li.innerHTML = `<b>${g.white} vs ${g.black}</b> (${g.result}) <small>${g.date} • ${g.site}</small>`;
        li.title = g.event || '';
        li.style.cursor = 'pointer';
        li.onclick = () => {
            if (g.pgn) {
                pgnInputArea.value = g.pgn;
                onlineGamesContainer.style.display = 'none';
                loadPgnButton.click();
            }
        };
        onlineGamesList.appendChild(li);
    });
}

function setOnlineGamesStatus(msg, isError = false) {
    onlineGamesStatus.textContent = msg;
    onlineGamesStatus.style.color = isError ? 'red' : '';
}

async function fetchLichessGames(username, page = 1, perPage = 50, dateFilter = null) {
    setOnlineGamesStatus('Chargement des parties Lichess...');
    let url = `https://lichess.org/api/games/user/${encodeURIComponent(username)}?max=${perPage}&page=${page}&pgnInJson=true&clocks=false&evals=false&opening=true&tags=true&perfType=all`;
    if (dateFilter && dateFilter.from) url += `&since=${dateFilter.from}`;
    if (dateFilter && dateFilter.to) url += `&until=${dateFilter.to}`;
    try {
        const resp = await fetch(url, { headers: { 'Accept': 'application/x-ndjson' } });
        if (!resp.ok) throw new Error('Utilisateur ou requête invalide');
        const text = await resp.text();
        const lines = text.trim().split('\n');
        const games = [];
        for (const line of lines) {
            if (!line.trim()) continue;
            try {
                const obj = JSON.parse(line);
                games.push({
                    white: obj.players.white.user?.name || obj.players.white.userId || 'Blanc',
                    black: obj.players.black.user?.name || obj.players.black.userId || 'Noir',
                    result: obj.status || obj.winner || '',
                    date: obj.createdAt ? (new Date(obj.createdAt)).toLocaleDateString() : '',
                    site: 'Lichess',
                    event: obj.opening?.name || '',
                    pgn: obj.pgn
                });
            } catch {}
        }
        return games;
    } catch (e) {
        setOnlineGamesStatus('Erreur Lichess: ' + e.message, true);
        return [];
    }
}

async function fetchChesscomGames(username, page = 1, perPage = 50, dateFilter = null) {
    setOnlineGamesStatus('Chargement des parties Chess.com...');
    try {
        // Chess.com API: must fetch archives, then fetch games for each month
        const archivesResp = await fetch(`https://api.chess.com/pub/player/${encodeURIComponent(username)}/games/archives`);
        if (!archivesResp.ok) throw new Error('Utilisateur ou requête invalide');
        const archives = await archivesResp.json();
        let archiveUrls = archives.archives || [];
        archiveUrls = archiveUrls.reverse(); // Most recent first

        let games = [];
        // Collect games from most recent months first, until enough for the requested page
        for (let i = 0; i < archiveUrls.length && games.length < perPage * page; i++) {
            const url = archiveUrls[i];
            const monthResp = await fetch(url);
            if (!monthResp.ok) continue;
            const monthData = await monthResp.json();
            // Add games from this month, most recent first
            const monthGames = (monthData.games || []).slice().reverse();
            for (const g of monthGames) {
                // Date filter
                const endTime = g.end_time ? new Date(g.end_time * 1000) : null;
                if (dateFilter) {
                    if (dateFilter.from && endTime && endTime < new Date(dateFilter.from)) continue;
                    if (dateFilter.to && endTime && endTime > new Date(dateFilter.to)) continue;
                }
                games.push({
                    white: g.white?.username || 'Blanc',
                    black: g.black?.username || 'Noir',
                    result: g.white?.result && g.black?.result ? `${g.white.result}-${g.black.result}` : '',
                    date: endTime ? endTime.toLocaleDateString() : '',
                    site: 'Chess.com',
                    event: g.tournament || '',
                    pgn: g.pgn
                });
                if (games.length >= perPage * page) break;
            }
        }
        // Paginate: always return the N most recent games for the requested page
        const startIdx = perPage * (page - 1);
        return games.slice(startIdx, startIdx + perPage);
    } catch (e) {
        setOnlineGamesStatus('Erreur Chess.com: ' + e.message, true);
        return [];
    }
}

async function handleFetchOnlineGames(platform) {
    resetOnlineGamesUI();
    let username = '';
    if (platform === 'lichess') username = lichessUsernameInput.value.trim();
    if (platform === 'chesscom') username = chesscomUsernameInput.value.trim();
    if (!username) {
        setOnlineGamesStatus('Veuillez entrer un pseudo.', true);
        return;
    }
    showOnlineGamesUI();
    onlineGamesState.platform = platform;
    onlineGamesState.username = username;
    onlineGamesState.page = 1;
    onlineGamesState.hasMore = true;
    onlineGamesState.games = [];
    onlineGamesState.loading = true;
    onlineGamesState.dateFilter = null;
    setOnlineGamesStatus('Chargement...');
    let games = [];
    if (platform === 'lichess') {
        games = await fetchLichessGames(username, 1, onlineGamesState.perPage);
    } else {
        games = await fetchChesscomGames(username, 1, onlineGamesState.perPage);
    }
    onlineGamesState.games = games;
    onlineGamesState.loading = false;
    onlineGamesState.hasMore = games.length === onlineGamesState.perPage;
    renderOnlineGamesList();
    setOnlineGamesStatus(`${games.length} parties chargées${onlineGamesState.hasMore ? ' (plus disponibles)' : ''}.`);
    loadMoreOnlineGamesBtn.style.display = onlineGamesState.hasMore ? '' : 'none';
}

async function handleLoadMoreOnlineGames() {
    if (onlineGamesState.loading || !onlineGamesState.hasMore) return;
    onlineGamesState.page += 1;
    onlineGamesState.loading = true;
    setOnlineGamesStatus('Chargement de plus de parties...');
    let games = [];
    if (onlineGamesState.platform === 'lichess') {
        games = await fetchLichessGames(onlineGamesState.username, onlineGamesState.page, onlineGamesState.perPage, onlineGamesState.dateFilter);
    } else {
        games = await fetchChesscomGames(onlineGamesState.username, onlineGamesState.page, onlineGamesState.perPage, onlineGamesState.dateFilter);
    }
    if (games.length) {
        onlineGamesState.games = onlineGamesState.games.concat(games);
        renderOnlineGamesList();
        setOnlineGamesStatus(`${onlineGamesState.games.length} parties chargées${games.length === onlineGamesState.perPage ? ' (plus disponibles)' : ''}.`);
        onlineGamesState.hasMore = games.length === onlineGamesState.perPage;
        loadMoreOnlineGamesBtn.style.display = onlineGamesState.hasMore ? '' : 'none';
    } else {
        setOnlineGamesStatus('Aucune partie supplémentaire trouvée.');
        onlineGamesState.hasMore = false;
        loadMoreOnlineGamesBtn.style.display = 'none';
    }
    onlineGamesState.loading = false;
}

async function handleSearchGamesByDate() {
    if (!onlineGamesState.platform || !onlineGamesState.username) return;
    const from = filterStartDateInput.value ? new Date(filterStartDateInput.value).getTime() : null;
    const to = filterEndDateInput.value ? new Date(filterEndDateInput.value).getTime() : null;
    onlineGamesState.dateFilter = { from, to };
    onlineGamesState.page = 1;
    onlineGamesState.games = [];
    onlineGamesState.hasMore = true;
    onlineGamesState.loading = true;
    setOnlineGamesStatus('Recherche par date...');
    let games = [];
    if (onlineGamesState.platform === 'lichess') {
        games = await fetchLichessGames(onlineGamesState.username, 1, onlineGamesState.perPage, { from, to });
    } else {
        games = await fetchChesscomGames(onlineGamesState.username, 1, onlineGamesState.perPage, { from, to });
    }
    onlineGamesState.games = games;
    onlineGamesState.loading = false;
    onlineGamesState.hasMore = games.length === onlineGamesState.perPage;
    renderOnlineGamesList();
    setOnlineGamesStatus(`${games.length} parties chargées${onlineGamesState.hasMore ? ' (plus disponibles)' : ''}.`);
    loadMoreOnlineGamesBtn.style.display = onlineGamesState.hasMore ? '' : 'none';
}

// --- UI Setup (additions) ---
function setupOnlineGamesUI() {
    if (fetchLichessBtn) fetchLichessBtn.onclick = () => handleFetchOnlineGames('lichess');
    if (fetchChesscomBtn) fetchChesscomBtn.onclick = () => handleFetchOnlineGames('chesscom');
    if (loadMoreOnlineGamesBtn) loadMoreOnlineGamesBtn.onclick = handleLoadMoreOnlineGames;
    if (searchGamesByDateBtn) searchGamesByDateBtn.onclick = handleSearchGamesByDate;
}

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    initStockfish_Review();
    const loadedFromStorage = loadGameAndPrepareHistory();
    setupUI();
    initAccuracyChart();
    applyTheme();
    setupOnlineGamesUI();

    if (loadedFromStorage && fullGameHistory.length > 0) {
        console.log("Game loaded from localStorage for review.");
        statusEl.textContent = "Partie chargée depuis la session précédente.";
        updateAccuracyChartAndStats();
        goToMove(-1); // Aller à la position initiale après chargement
        startFullGameAnalysis();
    } else if (!loadedFromStorage && !pgnInputArea.value.trim()) {
        console.log("Starting in Analysis Board mode (initial position).");
        resetAnalysisState();
        statusEl.textContent = "Échiquier d'Analyse. Collez un PGN ou analysez la position initiale.";
        if (moveAnalysisData.length > 0 && moveAnalysisData[0].fen_after) {
            startFullGameAnalysis();
        } else {
            console.warn("Could not start analysis for initial position, data missing.");
        }
    } else {
        statusEl.textContent = "Prêt. Collez un PGN pour commencer l'analyse.";
        updateNavButtons();
        clearAnalysisUI();
        updateAccuracyChartAndStats();
    }
    setTimeout(setupBoardOverlay, 150);
    window.addEventListener('resize', () => {
        // Use a debounce mechanism if resize events fire too rapidly
        clearTimeout(window.resizeTimer);
        window.resizeTimer = setTimeout(setupBoardOverlay, 200); // Recalculate on resize end
    });
    initAccuracyChart(); // Ensure chart is initialized
});

console.log("Review page script (Interactive Play Enabled) loaded.");