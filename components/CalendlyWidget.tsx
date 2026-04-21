'use client'

import { useState, useEffect } from 'react'
import { PopupModal } from 'react-calendly'

interface CalendlyWidgetProps {
  url: string;
  isOpen: boolean;
  onClose: () => void;
}

export function CalendlyWidget({ url, isOpen, onClose }: CalendlyWidgetProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Use the default NDA url if none is provided
  const targetUrl = url || "https://calendly.com/nexcellence";

  return (
    <PopupModal
      url={targetUrl}
      onModalClose={onClose}
      open={isOpen}
      rootElement={document.getElementById('main-content') || document.body}
      pageSettings={{
        backgroundColor: 'ffffff',
        hideEventTypeDetails: false,
        hideLandingPageDetails: false,
        primaryColor: 'c9a227',
        textColor: '0f172a'
      }}
    />
  )
}
