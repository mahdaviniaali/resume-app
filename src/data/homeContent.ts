import type { HomeContent } from '@/lib/api'

/** English landing copy — bold, sharp, invitation to build with us */
export const homeContent: HomeContent = {
  hero: {
    eyebrow: '[ ISEMPTY PROTOCOL ]',
    line1: 'From the void',
    line2_prefix: 'of',
    line2_stroke: 'is empty',
    line3_prefix: 'We code the',
    line3_accent: 'light',
    description:
      'Half-baked ideas. Messy systems. Users lost in their own product. We turn that chaos into architecture you can ship — and a path people can actually follow.',
  },
  beyond: {
    title: 'More than code',
    subtitle: 'Idea · Craft · Reach',
    lead: 'We don’t pick a lane. Engineering, UI/UX, and marketing move as one — from raw idea, through craft you can ship, to reach that actually lands.',
    stages: [
      {
        label: 'Idea',
        text: 'Every build starts as two questions at once: what should exist, and who will care. We hold both — product spark and market itch — before craft freezes the wrong answer.',
        highlight: 'who will care',
      },
      {
        label: 'Craft',
        text: 'Then engineering and UI/UX move as one craft. Systems that hold, interfaces that guide — power under the hood, clarity on the surface.',
        highlight: 'move as one craft',
      },
      {
        label: 'Reach',
        text: 'Marketing only works when the product can carry it. We braid shippable craft with a clear story — so attention lands on something real.',
        highlight: 'something real',
      },
    ],
  },
  leverage: {
    title: 'AI is loud. Output is rare.',
    subtitle: 'Leverage',
    lead: 'Models can generate almost anything. The hard part is turning that noise into a system you can ship — or rescuing a vibe-coded project that hit a wall.',
    leftLabel: 'AI alone',
    leftText: 'Fast drafts. Fragile structure. Demos that stall when real users and real constraints show up.',
    rightLabel: 'With us',
    rightText: 'We direct the model, own the architecture, and turn its output into something durable you can ship.',
    vibeLabel: 'Vibe coding dead-end?',
    vibeText: 'Hand it over. We take the stalled prototype and make it shippable.',
  },
  method: {
    title: 'How we move',
    subtitle: 'Method',
    lead: 'From thought to an experience that doesn’t lose anyone.',
    steps: [
      {
        key: 'Discover',
        text: 'We hear the idea — even unfinished. We name the real pain in the domain and the user.',
      },
      {
        key: 'Model',
        text: 'We build a shared language: domain, flows, and paths that the UI can feel too.',
      },
      {
        key: 'Build',
        text: 'Modular systems. Experiences arranged so the path stays lit the whole way.',
      },
      {
        key: 'Illuminate',
        text: 'We hand over clarity — documented, observable, owned by your team and your users.',
      },
    ],
  },
  team: {
    title: 'The circle',
    subtitle: 'Architects of idea, system, and experience',
  },
  contact: {
    title: 'Got chaos? Good.',
    subtitle:
      'Half-built idea. Product users get lost in. System that fights you. Throw it our way — we’ll turn it into light.',
    button: 'Send your chaos →',
  },
}

/** @deprecated use homeContent — kept so old imports don’t break mid-refactor */
export const homeFa = homeContent
