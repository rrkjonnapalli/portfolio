import data from './content.json';

type Link = { label: string; href: string };
type List<T> = { label: string; items: T[] };

export type Content = {
  masthead: { title: string; established?: string; github?: Link; motto?: string };
  lead?: {
    headline: string;
    kicker?: string;
    deck?: string;
    portrait?: { alt: string; caption?: string };
    story?: string[];
  };
  projects?: List<{ name: string; href: string; text: string }>;
  career?: List<{ company: string; role: string; dates: string }>;
  skills?: List<string>;
  contact?: { heading: string; email: string; button?: string };
};

// Typed so any section except the masthead can be dropped from content.json and simply not render.
const content: Content = data;

export default content;
