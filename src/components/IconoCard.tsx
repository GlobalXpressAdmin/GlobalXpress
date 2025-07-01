import React from 'react';

interface IconoCardProps {
  tipo: 'asesoria' | 'acompanamiento' | 'legal' | 'mercado' | 'residencia' | 'house' | 'hands' | 'document';
  className?: string;
}

export default function IconoCard({ tipo, className = '' }: IconoCardProps) {
  switch (tipo) {
    case 'asesoria':
      return (
        <svg width="56" height="56" fill="none" stroke="#006494" strokeWidth="2" viewBox="0 0 48 48" className={className}><circle cx="24" cy="18" r="6" stroke="#006494" strokeWidth="2"/><rect x="12" y="30" width="24" height="10" rx="5" stroke="#006494" strokeWidth="2"/><rect x="32" y="10" width="8" height="6" rx="2" stroke="#006494" strokeWidth="2"/><path d="M36 13h4" stroke="#006494" strokeWidth="2"/></svg>
      );
    case 'acompanamiento':
      return (
        <svg width="56" height="56" fill="none" stroke="#006494" strokeWidth="2" viewBox="0 0 48 48" className={className}><path d="M16 20a8 8 0 0 1 16 0v4a8 8 0 0 1-16 0v-4Z" stroke="#006494" strokeWidth="2"/><path d="M24 28v8" stroke="#006494" strokeWidth="2"/><path d="M20 36h8" stroke="#006494" strokeWidth="2"/><path d="M32 24l4 4" stroke="#006494" strokeWidth="2"/><path d="M16 24l-4 4" stroke="#006494" strokeWidth="2"/></svg>
      );
    case 'legal':
      return (
        <svg width="56" height="56" fill="none" stroke="#006494" strokeWidth="2" viewBox="0 0 48 48" className={className}><rect x="8" y="16" width="32" height="20" rx="4" stroke="#006494" strokeWidth="2"/><rect x="8" y="16" width="32" height="6" rx="2" fill="#fff" stroke="#006494" strokeWidth="2"/><rect x="12" y="20" width="8" height="4" rx="1" fill="#fff" stroke="#006494" strokeWidth="2"/></svg>
      );
    case 'mercado':
      return (
        <svg width="56" height="56" fill="none" stroke="#006494" strokeWidth="2" viewBox="0 0 48 48" className={className}><rect x="8" y="16" width="32" height="20" rx="4" stroke="#006494" strokeWidth="2"/><rect x="8" y="16" width="32" height="6" rx="2" fill="#fff" stroke="#006494" strokeWidth="2"/><rect x="12" y="20" width="8" height="4" rx="1" fill="#fff" stroke="#006494" strokeWidth="2"/></svg>
      );
    case 'residencia':
      return (
        <svg width="56" height="56" fill="none" stroke="#006494" strokeWidth="2" viewBox="0 0 48 48" className={className}><rect x="12" y="12" width="24" height="32" rx="4" stroke="#006494" strokeWidth="2"/><path d="M16 20h16M16 28h16M16 36h8" stroke="#006494" strokeWidth="2"/><circle cx="36" cy="16" r="4" fill="#fff" stroke="#006494" strokeWidth="2"/><path d="M34 16l2 2 4-4" stroke="#006494" strokeWidth="2" strokeLinecap="round"/></svg>
      );
    case 'house':
      return (
        <svg width="48" height="48" fill="none" stroke="#05608a" strokeWidth="2" viewBox="0 0 48 48" className={className}><rect x="8" y="16" width="32" height="20" rx="4" stroke="#05608a" strokeWidth="2"/><rect x="8" y="16" width="32" height="6" rx="2" fill="#fff" stroke="#05608a" strokeWidth="2"/><rect x="12" y="20" width="8" height="4" rx="1" fill="#fff" stroke="#05608a" strokeWidth="2"/></svg>
      );
    case 'hands':
      return (
        <svg width="48" height="48" fill="none" stroke="#05608a" strokeWidth="2" viewBox="0 0 48 48" className={className}><rect x="12" y="12" width="24" height="32" rx="4" stroke="#05608a" strokeWidth="2"/><path d="M16 20h16M16 28h16M16 36h8" stroke="#05608a" strokeWidth="2"/><circle cx="36" cy="16" r="4" fill="#fff" stroke="#05608a" strokeWidth="2"/><path d="M34 16l2 2 4-4" stroke="#05608a" strokeWidth="2" strokeLinecap="round"/></svg>
      );
    case 'document':
      return (
        <svg width="48" height="48" fill="none" stroke="#05608a" strokeWidth="2" viewBox="0 0 48 48" className={className}><circle cx="24" cy="24" r="20" stroke="#05608a" strokeWidth="2"/><path d="M24 32v-8M24 24l6-6M24 24l-6-6" stroke="#05608a" strokeWidth="2"/><circle cx="24" cy="36" r="2" fill="#fff" stroke="#05608a" strokeWidth="2"/></svg>
      );
    default:
      return null;
  }
} 