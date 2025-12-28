# DualsFWShield Portfolio

> A neo-brutalist, cyberpunk-inspired portfolio website with advanced animations, hidden Easter eggs, and experimental multi-window physics.

![Status](https://img.shields.io/badge/status-active-00ff00)
![Version](https://img.shields.io/badge/version-2.6.0-neon-pink)

---

## 🎨 Design Philosophy

**Neo-Brutalist Cyberpunk**: Raw, bold typography meets hacker aesthetics. The design emphasizes:
-   **High Contrast**: Black/White base with Acid Yellow (#CCFF00), Terminal Green (#20C20E), and Neon Pink (#FF0099) accents.
-   **Typography**: *Archivo Black* for display headers, *Space Mono* for data/terminal text.
-   **Visual FX**:
    -   **CRT Scanlines**: Overlay for a retro-monitor aesthetic.
    -   **Chromatic Aberration (CMY)**: Main title splits into Cyan/Magenta/Yellow layers based on mouse movement (Desktop) or Gyroscope tilt (Mobile).
    -   **Glitch & Reveal**: Text decodes from random characters on hover.

---

## ✨ Core Features

### 1. Boot Sequence
Simulated system initialization with scrolling logs, integrity checks, and a dramatic "SYSTEM ROOT" reveal.

### 2. Physics-Based Data Disk (Gravity Box)
A draggable, physics-enabled element that serves as a playground.
-   **Desktop**: Drag and throw with momentum, gravity, and bounce.
-   **Mobile Integration**:
    -   **Gyroscope Control**: Tilt phone to slide the box (User must toggle **ON** via the small button in the box).
    -   **Haptic Feedback**: Vibrates on wall collisions.
    -   **Inactivity Hint**: If untouched, a hint "TAP TO ACTIVATE SENSORS" appears pointing to the toggle.
-   **Bending Reality (Multi-Window)**: Throw the disk off-screen, and it can land in another open window of the site!

### 3. Interactive Terminal
A fully functional command line interface.
-   **Scroll Trigger**: Rows animate in as you scroll down.
-   **Mobile Motion**: Rows slide horizontally based on device tilt (Gyro Parallax).
-   **Commands**:
    -   `help`: detailed command list.
    -   `ls`: list project directories.
    -   `whoami`: user identification.
    -   `matrix`: trigger the digital rain.
    -   `konami`: secret hint.

### 4. Tech Stack Marquee
An infinite scrolling ticker featuring development skills.

### 5. Advanced Parallax (Mobile)
On mobile devices, the Gyroscope breathes life into the static page:
-   **Hero Title**: CMY layers split based on device orientation.
-   **Depths**: Project Cards, Videos, Logo Grid, and Footer Title all have varying depth (parallax) layers responsive to tilt.

---

## 🥚 Easter Eggs & Secrets (System Hints)

The site features a **Smart Hint Manager** that guides you if you miss secrets. Hints appear at the bottom-left as system logs. If ignored for 120s, the system gets sarcastic.

| Secret | How to Trigger | Standard Hint (Time) | Sarcastic Follow-up (+2m) |
| :--- | :--- | :--- | :--- |
| **Hacker Text** | Hover over glitchy text to decrypt | "Encrypted signatures detected..." (45s) | "Curiosity levels critical. Hover..." |
| **Terminal** | Type `help` in the terminal | "Terminal uplink active..." (60s) | "Keyboard missing? Type 'help'..." |
| **Konami Code** | `↑↑↓↓←→←→BA` (Desktop) | "Vintage cheat codes supported..." (90s) | "Disappointed. ↑↑↓↓←→←→BA. Do it." |
| **God Mode** | Long-press top-left Logo (3s) (Mobile) | "The Identity Grid logo holds root..." (90s) | "Patience is a virtue. Hold logo 3s." |
| **ASCII Art** | Right-Click -> View Source (Desktop) | "Source code contains hidden art." (120s) | "Right-click -> View Source. Not rocket science." |

**System Reward**: Using a feature marks it as "Found" and cancels future hints.

---

## 📱 Mobile Adaptations

The experience is fully responsive while maintaining the "Raw" aesthetic.

| Feature | Desktop Behavior | Mobile Behavior |
| :--- | :--- | :--- |
| **Inputs** | Mouse / Kidney-Board | Touch / Gyroscope |
| **Cursor** | Custom Ring + Dot | Native (Hidden) |
| **Parallax** | Mouse Position | Device Tilt (Gamma/Beta) |
| **Sensors** | N/A | Tilt for Gravity & Parallax |
| **God Mode** | Konami Code | Logo Long-Press (3s) |
| **CRT Effect** | 40% Opacity | 15% Opacity (Performance) |

---

## 🛠️ Technical Stack

-   **HTML5 / CSS3 / Vanilla JS**: No framework bloat. Pure performance.
-   **Tailwind CSS**: Utility-first styling with custom config for Neo-Brutalist colors.
-   **GSAP (GreenSock)**: Complex timelines, ScrollTrigger, and tweening.
-   **Lenis**: Smooth, inertial scrolling.
-   **Canvas / Three.js**: Specific visual effects.

---

## 🚀 Quick Start

1.  **Clone**: `git clone ...`
2.  **Run**: Open `index.html` via Live Server or standard browser.
3.  **Deploy**: Static hosting (Vercel/Netlify/GitHub Pages).

**Pro Tip**: Open two windows side-by-side on a desktop to test the **Wormhole** physics transfer!

---

> *"SYSTEM INTEGRITY: 100%. WELCOME TO THE GRID."*
