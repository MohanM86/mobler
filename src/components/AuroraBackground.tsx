'use client';

import React, { ReactNode } from 'react';

interface AuroraBackgroundProps {
  children: ReactNode;
  className?: string;
}

export default function AuroraBackground({ children, className = '' }: AuroraBackgroundProps) {
  return (
    <div className={`aurora-hero ${className}`}>
      <div className="aurora-bg">
        <div className="aurora-bg-inner" />
      </div>
      {children}
    </div>
  );
}
