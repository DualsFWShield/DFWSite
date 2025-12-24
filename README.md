# DualsFWShield Portfolio

> A neo-brutalist, cyberpunk-inspired portfolio website with advanced animations, hidden Easter eggs, and experimental multi-window physics.

![Status](https://img.shields.io/badge/status-active-00ff00)
![Version](https://img.shields.io/badge/version-2.5.0--RC1-cyan)

---

## 🎨 Design Philosophy

**Neo-Brutalist Cyberpunk**: Raw, bold typography meets hacker aesthetics. The design emphasizes:
- High contrast black/white with accent colors (Acid Yellow, Terminal Green)
- Monospace fonts and system-inspired UI
- Glitch effects and CRT-style overlays
- CMY color splitting for a chromatic aberration effect

---

## ✨ Core Features

### 1. Boot Sequence Animation
On page load, a simulated system boot sequence plays:
- Scrolling log messages (`BIOS_INIT`, `MEMORY_CHECK`, etc.)
- Progress bar animation
- Dramatic reveal transition

### 2. CMY Title Split
The hero title "DUALSFW SHIELD" uses `mix-blend-mode: multiply` with Cyan, Magenta, and Yellow layers that shift based on mouse position, creating a living chromatic aberration effect.

### 3. Smooth Scrolling
Powered by [Lenis](https://github.com/studio-freight/lenis) for buttery-smooth momentum scrolling.

### 4. Text Reveal Animations
Elements with `.reveal-text` class animate in with GSAP ScrollTrigger as you scroll.

### 5. Velocity Skew
Sections skew slightly based on scroll velocity for a dynamic, responsive feel.

### 6. CRT Scanlines
A subtle animated scanline overlay gives everything a retro-monitor aesthetic.

### 7. Custom Cursor
A dual-element cursor (dot + outline ring) that:
- Follows mouse movement with easing
- Scales up on hoverable elements (`.hover-trigger`)
- Blends with the page content

### 8. Global Grid Overlay
A fixed 40px grid pattern covers the entire viewport, extending behind the navigation.

---

## 🕹️ Interactive Elements

### Data Disk (Gravity Box)
A draggable physics element in the hero section.

| Feature | Description |
|---------|-------------|
| **Drag & Throw** | Click and drag to move, release to throw with momentum |
| **Physics** | Simulated gravity, friction, and bounce |
| **Multi-Window Transfer** | Throw the disk into another browser window and it transfers there! |

### Interactive Terminal
Navigate to `[TERM]` section or press commands:

| Command | Action |
|---------|--------|
| `help` | List available commands |
| `about` | Display bio information |
| `skills` | List technical skills |
| `projects` | Show project cards |
| `contact` | Display contact info |
| `clear` | Clear terminal output |
| `matrix` | Matrix rain effect |

---

## 🥚 Easter Eggs & Secrets

### 1. Konami Code
**Sequence**: `↑ ↑ ↓ ↓ ← → ← → B A`

**Effect**: Triggers "GOD MODE" - the page inverts colors, glitches, and broadcasts the activation to all open windows.

### 2. Hidden ASCII Logo
Right-click → "View Page Source" → Find the ASCII art logo hidden in HTML comments:
```
    ██████╗ ██╗   ██╗ █████╗ ██╗     ███████╗    ███████╗██╗    ██╗    ███████╗██╗  ██╗██╗███████╗██╗     ██████╗ 
    ██╔══██╗██║   ██║██╔══██╗██║     ██╔════╝    ██╔════╝██║    ██║    ██╔════╝██║  ██║██║██╔════╝██║     ██╔══██╗
    ██║  ██║██║   ██║███████║██║     ███████╗    █████╗  ██║ █╗ ██║    ███████╗███████║██║█████╗  ██║     ██║  ██║
    ██║  ██║██║   ██║██╔══██║██║     ╚════██║    ██╔══╝  ██║███╗██║    ╚════██║██╔══██║██║██╔══╝  ██║     ██║  ██║
    ██████╔╝╚██████╔╝██║  ██║███████╗███████║    ██║     ╚███╔███╔╝    ███████║██║  ██║██║███████╗███████╗██████╔╝
    ╚═════╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚══════╝    ╚═╝      ╚══╝╚══╝     ╚══════╝╚═╝  ╚═╝╚═╝╚══════╝╚══════╝╚═════╝ 
```

### 3. Terminal Secrets
- Type `matrix` for a Matrix-style code rain

### 4. Multi-Window Sync
Open the site in multiple browser windows:
- **God Mode** syncs across all windows via `localStorage`
- **Data Disk** can be thrown between windows - it actually transfers!

---

## 🛠️ Technical Stack

| Technology | Purpose |
|------------|---------|
| **HTML5/CSS3** | Structure & Styling |
| **Tailwind CSS** | Utility-first styling |
| **GSAP** | Animations & ScrollTrigger |
| **Lenis** | Smooth scrolling |
| **Vanilla JavaScript** | Interactivity & Physics |

---

## 📁 Project Structure

```
DFWSite/
├── index.html          # Main (and only) file - everything is self-contained
├── README.md           # This file
└── assets/             # (Optional) Images/videos if any
```

---

## ⚡ Performance Notes

- **No build step required** - Pure HTML/CSS/JS
- **CDN dependencies** - Tailwind, GSAP, Lenis loaded via CDN
- **Lightweight** - No heavy frameworks
- **Hardware accelerated** - CSS transforms for animations

---

## 🚀 Quick Start

1. Clone or download the repository
2. Open `index.html` in a modern browser
3. Enjoy the boot sequence!

For the full multi-window experience:
1. Open `index.html`
2. Duplicate the tab (Ctrl+Shift+D or Cmd+Shift+D)
3. Arrange windows side-by-side
4. Try throwing the Data Disk between them!

---

## 📜 License

© 2025 DualsFWShield. All rights reserved.

---

## 🔗 Links

- **GitHub**: [github.com/DualsFWShield](https://github.com/DualsFWShield)
- **Live Site**: *Deploy to see in action*

---

> *"SECURE CONNECTION ESTABLISHED."*
