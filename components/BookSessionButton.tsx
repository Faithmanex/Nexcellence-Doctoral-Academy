'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { CalendlyWidget } from '@/components/CalendlyWidget'

interface BookSessionButtonProps {
  url?: string;
  variant?: 'default' | 'outline' | 'link' | 'ghost' | 'secondary' | 'destructive';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
  children?: React.ReactNode;
}

export function BookSessionButton({ 
  url = "https://calendly.com/nexcellence", 
  variant = "default", 
  size = "lg", 
  className,
  children = "Book a Consultation"
}: BookSessionButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button 
        variant={variant} 
        size={size} 
        className={className} 
        onClick={(e) => {
          e.preventDefault()
          setIsOpen(true)
        }}
      >
        {children}
      </Button>
      <CalendlyWidget 
        url={url} 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
      />
    </>
  )
}
