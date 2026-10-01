// Product categories, in the order they appear in the homepage category menu.
// `icon` maps to a react-icons component in components/ui/CategoryIcon.js.

export const categories = [
  { slug: 'furniture', name: 'Furniture', icon: 'sofa' },
  { slug: 'plants', name: 'Plants', icon: 'plant' },
  { slug: 'lightening', name: 'Lightening', icon: 'lamp' },
  { slug: 'mirror', name: 'Mirror', icon: 'mirror' },
  { slug: 'bathroom', name: 'Bathroom', icon: 'bath' },
  { slug: 'decorative', name: 'Decorative', icon: 'stool' },
  { slug: 'kitchen', name: 'Kitchen', icon: 'pot' },
  { slug: 'bedroom', name: 'Bedroom', icon: 'bed' },
  { slug: 'inside', name: 'Inside', icon: 'cabinet' },
  { slug: 'chair', name: 'Chair', icon: 'chair' },
  { slug: 'console', name: 'Console', icon: 'console' },
  { slug: 'desk', name: 'Desk', icon: 'desk' },
];

export const getCategory = (slug) => categories.find((c) => c.slug === slug);
