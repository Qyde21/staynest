import React from 'react';
import { Helmet } from 'react-helmet-async';

function SEO({ title, description, image }) {
  const fullTitle = title ? `${title} | StayNest Kenya` : 'StayNest Kenya | Find Your Perfect Stay in Kenya';
  const desc = description || 'Discover unique beach, safari, mountain and lakeside stays across Kenya. Book verified properties with secure M-Pesa payments.';
  const img = image || 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&q=80';

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:image" content={img} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={img} />
    </Helmet>
  );
}

export default SEO;