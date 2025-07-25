'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  UsersIcon, 
  BriefcaseIcon, 
  DocumentTextIcon, 
  ChatBubbleLeftRightIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon
} from '@heroicons/react/24/outline';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (status === 'unauthenticated') {
        router.push('/ingreso-cliente');
        return;
      }

      if (status === 'authenticated' && session?.user?.email) {
        try {
          const res = await fetch('/api/admin/check-role', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: session.user.email })
          });
          const data = await res.json();
          
          if (data.ok && data.isAdmin) {
            setIsAdmin(true);
          } else {
            router.push('/area-personal');
          }
        } catch (error) {
          console.error('Error checking admin status:', error);
          router.push('/area-personal');
        }
      }
      setLoading(false);
    };

    checkAdminStatus();
  }, [status, session, router]);

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: ChartBarIcon },
    { name: 'Usuarios', href: '/admin/usuarios', icon: UsersIcon },
    { name: 'Vacantes', href: '/admin/vacantes', icon: BriefcaseIcon },
    { name: 'Postulaciones', href: '/admin/postulaciones', icon: DocumentTextIcon },
    { name: 'Mensajería', href: '/admin/mensajeria', icon: ChatBubbleLeftRightIcon },
    { name: 'Configuración', href: '/admin/configuracion', icon: Cog6ToothIcon },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Panel de Administración</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                {session?.user?.email}
              </span>
              <button
                onClick={() => router.push('/area-personal')}
                className="flex items-center space-x-2 text-gray-500 hover:text-gray-700 transition-colors"
              >
                <ArrowLeftOnRectangleIcon className="h-5 w-5" />
                <span>Salir</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-64 flex-shrink-0">
            <nav className="space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-colors"
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Main content */}
          <div className="flex-1">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}