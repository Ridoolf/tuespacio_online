import { useEffect } from 'react';
import { siteConfig } from '../config/siteConfig';

function upsertMeta(attribute, key, content) {
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`);

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.setAttribute('content', content);
}

function upsertCanonical(href) {
  let element = document.head.querySelector('link[rel="canonical"]');

  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', 'canonical');
    document.head.appendChild(element);
  }

  element.setAttribute('href', href);
}

function buildPageTitle(pageName) {
  return `${pageName} — ${siteConfig.seo.siteName}`;
}

export function usePageMeta({ title, description, path } = {}) {
  useEffect(() => {
    const { seo, siteUrl } = siteConfig;
    const pageTitle = title ?? seo.defaultTitle;
    const pageDescription = description ?? seo.defaultDescription;
    const canonicalUrl = path ? `${siteUrl}${path}` : `${siteUrl}/`;

    document.title = pageTitle;
    upsertMeta('name', 'description', pageDescription);
    upsertMeta('property', 'og:title', pageTitle);
    upsertMeta('property', 'og:description', pageDescription);
    upsertMeta('property', 'og:url', canonicalUrl);
    upsertCanonical(canonicalUrl);

    return () => {
      document.title = seo.defaultTitle;
      upsertMeta('name', 'description', seo.defaultDescription);
      upsertMeta('property', 'og:title', seo.defaultTitle);
      upsertMeta('property', 'og:description', seo.defaultDescription);
      upsertMeta('property', 'og:url', `${siteUrl}/`);
      upsertCanonical(`${siteUrl}/`);
    };
  }, [title, description, path]);
}

/** @deprecated Prefer usePageMeta with explicit title, description and path. */
export function usePageTitle(pageName) {
  usePageMeta({ title: buildPageTitle(pageName) });
}

export { buildPageTitle };
