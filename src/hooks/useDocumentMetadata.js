import { useEffect } from 'react';

/**
 * Hook to dynamically update the document title and description meta tag.
 * @param {string} title - The title of the page.
 * @param {string} description - The description meta content.
 */
export function useDocumentMetadata(title, description) {
  useEffect(() => {
    if (title) {
      document.title = `${title} | VSI Creations`;
    } else {
      document.title = 'VSI Creations | Premium Event Design & Production';
    }

    if (description) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', description);
    }
  }, [title, description]);
}
