---
name: anime-ui-design
description: Design guidelines and UI/UX patterns for Anime-themed applications in Antigravity. Enforces strict vector iconography (Lucide), zero-emoji policy, high-contrast typography, anime hero showcase integrations, and seamless dark/light responsive aesthetics.
---

# Anime UI/UX Design System for Antigravity

This skill defines the visual hierarchy, component architecture, and design principles for anime productivity applications.

## Core Rules

1. **Zero-Emoji Policy**:
   - Never use unicode emojis (e.g. ⛩️, 📺, ⏱️, 🌸, ⚔️, 🔥).
   - Use vector icon libraries (`lucide-react`) exclusively with semantic sizes (`w-4 h-4`, `w-5 h-5`).
   - Every badge, status indicator, action button, and tab must use a cohesive icon from the icon set.

2. **Anime Character Integration**:
   - Feature high-fidelity artwork and banners for iconic franchises:
     - One Piece (Monkey D. Luffy)
     - Black Clover (Asta)
     - Naruto Shippuden (Naruto Uzumaki)
     - Nanatsu no Taizai (Meliodas)
     - Hajime no Ippo (Ippo Makunouchi)
   - Allow users to select their focus companion to foster deep work immersion with character mantras.

3. **Color Palettes & Surfaces**:
   - Work mode: Crimson / Rose accent (`from-rose-500 to-rose-600`) representing fiery determination.
   - Break mode: Indigo / Violet accent (`from-indigo-500 to-indigo-600`) representing calm recovery.
   - Dark mode background: Deep Zenith (`bg-slate-950` / `bg-zinc-950` / `bg-[#0a0f1d]`).
   - Card surfaces: Subtle translucency with backdrop blur (`backdrop-blur-xl bg-white/90 dark:bg-slate-900/90`).

4. **Typography & Layout**:
   - Minimum font size: 12px (`text-xs`), clear hierarchy with font weights (`font-bold`, `font-extrabold`).
   - Monospaced digits for timers (`font-mono tabular-nums`).
   - Responsive grid for catalog cards with fluid aspect ratio (`aspect-[3/4]`).
