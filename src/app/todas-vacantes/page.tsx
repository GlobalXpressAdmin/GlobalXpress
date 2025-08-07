'use client';

import Link from "next/link";
import { useEffect, useState, useMemo, useRef } from "react";
import { 
  Search, 
  Filter, 
  Building2, 
  DollarSign, 
  Briefcase,
  X,
  ChevronDown,
  SortAsc,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal
} from "lucide-react";

interface Vacante {
  id: string;
  empresa: string;
  cargo: string;
  salario?: string;
  descripcion?: string;
  email?: string;
  workers?: string;
  link?: string;
  creado_en: string;
  activa: boolean;
}

type SortOption = 'recent' | 'oldest' | 'company_az' | 'company_za' | 'salary_high' | 'salary_low';

export default function TodasVacantes() {
  const [vacantes, setVacantes] = useState<Vacante[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Estados para filtros
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCompany, setSelectedCompany] = useState<string>('');
  const [selectedSalary, setSelectedSalary] = useState<string>('');
  const [selectedCargo, setSelectedCargo] = useState<string>('');
  const [sortBy, setSortBy] = useState<SortOption>('recent');
  const [showFilters, setShowFilters] = useState(false);
  const [showSortMenu, setShowSortMenu] = useState(false);

  // Estados para paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);

  // Refs para manejar clicks fuera de los menús
  const sortMenuRef = useRef<HTMLDivElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchVacantes = async () => {
      try {
        const response = await fetch('/api/vacantes');
        if (response.ok) {
          const data = await response.json();
          setVacantes(data);
        }
      } catch (error) {
        console.error('Error al cargar vacantes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVacantes();
  }, []);

  // Manejar clicks fuera de los menús
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortMenuRef.current && !sortMenuRef.current.contains(event.target as Node)) {
        setShowSortMenu(false);
      }
      if (filtersRef.current && !filtersRef.current.contains(event.target as Node)) {
        setShowFilters(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Obtener opciones únicas para filtros
  const uniqueCompanies = useMemo(() => {
    const companies = vacantes.map(v => v.empresa).filter(Boolean);
    return [...new Set(companies)].sort();
  }, [vacantes]);

  const uniqueSalaries = useMemo(() => {
    const salaries = vacantes.map(v => v.salario).filter(Boolean);
    return [...new Set(salaries)].sort();
  }, [vacantes]);

  const uniqueCargos = useMemo(() => {
    const cargos = vacantes.map(v => v.cargo).filter(Boolean);
    return [...new Set(cargos)].sort();
  }, [vacantes]);

  // Filtrar y ordenar vacantes
  const filteredAndSortedVacantes = useMemo(() => {
    let filtered = vacantes.filter(vacante => {
      // Filtro por término de búsqueda
      const matchesSearch = searchTerm === '' || 
        vacante.empresa.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vacante.cargo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (vacante.descripcion && vacante.descripcion.toLowerCase().includes(searchTerm.toLowerCase()));

      // Filtro por empresa
      const matchesCompany = selectedCompany === '' || vacante.empresa === selectedCompany;

      // Filtro por salario
      const matchesSalary = selectedSalary === '' || vacante.salario === selectedSalary;

      // Filtro por cargo
      const matchesCargo = selectedCargo === '' || vacante.cargo === selectedCargo;

      return matchesSearch && matchesCompany && matchesSalary && matchesCargo;
    });

    // Ordenar vacantes
    switch (sortBy) {
      case 'recent':
        filtered.sort((a, b) => new Date(b.creado_en).getTime() - new Date(a.creado_en).getTime());
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.creado_en).getTime() - new Date(b.creado_en).getTime());
        break;
      case 'company_az':
        filtered.sort((a, b) => a.empresa.localeCompare(b.empresa));
        break;
      case 'company_za':
        filtered.sort((a, b) => b.empresa.localeCompare(a.empresa));
        break;
      case 'salary_high':
        filtered.sort((a, b) => {
          const salaryA = a.salario ? parseFloat(a.salario.replace(/[^0-9.]/g, '')) : 0;
          const salaryB = b.salario ? parseFloat(b.salario.replace(/[^0-9.]/g, '')) : 0;
          return salaryB - salaryA;
        });
        break;
      case 'salary_low':
        filtered.sort((a, b) => {
          const salaryA = a.salario ? parseFloat(a.salario.replace(/[^0-9.]/g, '')) : 0;
          const salaryB = b.salario ? parseFloat(b.salario.replace(/[^0-9.]/g, '')) : 0;
          return salaryA - salaryB;
        });
        break;
    }

    return filtered;
  }, [vacantes, searchTerm, selectedCompany, selectedSalary, selectedCargo, sortBy]);

  // Calcular paginación
  const totalPages = Math.ceil(filteredAndSortedVacantes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentVacantes = filteredAndSortedVacantes.slice(startIndex, endIndex);

  // Resetear página cuando cambian los filtros
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCompany, selectedSalary, selectedCargo, sortBy]);

  // Limpiar todos los filtros
  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedCompany('');
    setSelectedSalary('');
    setSelectedCargo('');
    setSortBy('recent');
    setCurrentPage(1);
  };

  // Verificar si hay filtros activos
  const hasActiveFilters = searchTerm || selectedCompany || selectedSalary || selectedCargo || sortBy !== 'recent';

  const getSortLabel = (sort: SortOption) => {
    switch (sort) {
      case 'recent': return 'Más recientes';
      case 'oldest': return 'Más antiguas';
      case 'company_az': return 'Empresa A-Z';
      case 'company_za': return 'Empresa Z-A';
      case 'salary_high': return 'Salario mayor';
      case 'salary_low': return 'Salario menor';
      default: return 'Más recientes';
    }
  };

  // Generar números de página para paginación
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  // Manejar selección de ordenamiento
  const handleSortSelect = (sortOption: SortOption) => {
    setSortBy(sortOption);
    setShowSortMenu(false);
  };

  if (loading) {
    return (
      <section className="w-full py-12 bg-white min-h-screen">
        <div style={{ height: "50px" }} />
        <h1 className="text-3xl md:text-4xl font-bold text-[#0D4A7A] mb-10 text-center">Todas las vacantes</h1>
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0D4A7A]"></div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-12 bg-white min-h-screen">
      <div style={{ height: "50px" }} />
      
      {/* Header con título y estadísticas */}
      <div className="px-4 md:px-12 mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-[#0D4A7A] mb-4 text-center">
          Todas las vacantes
        </h1>
        <div className="text-center text-gray-600 mb-6">
          <p className="text-lg">
            Encuentra la oportunidad perfecta para tu futuro profesional
          </p>
          <p className="text-sm mt-1">
            {filteredAndSortedVacantes.length} de {vacantes.length} vacantes disponibles
            {totalPages > 1 && ` • Página ${currentPage} de ${totalPages}`}
          </p>
        </div>
      </div>

      {/* Sistema de Filtros */}
      <div className="px-4 md:px-12 mb-8">
        {/* Barra de búsqueda principal */}
        <div className="mb-6">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por empresa, cargo o descripción..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0D4A7A] focus:border-[#0D4A7A] transition-colors"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Controles de filtros y ordenamiento */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-6">
          {/* Botón de filtros */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <SlidersHorizontal className="h-4 w-4" />
            <span>Filtros</span>
            <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>

          {/* Ordenamiento */}
          <div className="relative" ref={sortMenuRef}>
            <button
              onClick={() => setShowSortMenu(!showSortMenu)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <SortAsc className="h-4 w-4" />
              <span>{getSortLabel(sortBy)}</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${showSortMenu ? 'rotate-180' : ''}`} />
            </button>

            {/* Menú de ordenamiento */}
            {showSortMenu && (
              <div className="absolute right-0 top-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-20 min-w-[200px]">
                {[
                  { value: 'recent', label: 'Más recientes' },
                  { value: 'oldest', label: 'Más antiguas' },
                  { value: 'company_az', label: 'Empresa A-Z' },
                  { value: 'company_za', label: 'Empresa Z-A' },
                  { value: 'salary_high', label: 'Salario mayor' },
                  { value: 'salary_low', label: 'Salario menor' },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleSortSelect(option.value as SortOption)}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-50 ${
                      sortBy === option.value ? 'bg-[#0D4A7A] text-white' : ''
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Limpiar filtros */}
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="flex items-center gap-2 px-4 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors"
            >
              <X className="h-4 w-4" />
              <span>Limpiar filtros</span>
            </button>
          )}
        </div>

        {/* Panel de filtros expandible */}
        {showFilters && (
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 mb-6 shadow-sm" ref={filtersRef}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Filtro por empresa */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Building2 className="h-4 w-4 text-[#0D4A7A]" />
                  Empresa
                </label>
                <select
                  value={selectedCompany}
                  onChange={(e) => setSelectedCompany(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0D4A7A] focus:border-[#0D4A7A] transition-colors bg-white"
                >
                  <option value="">Todas las empresas</option>
                  {uniqueCompanies.map((company) => (
                    <option key={company} value={company}>
                      {company}
                    </option>
                  ))}
                </select>
              </div>

              {/* Filtro por salario */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <DollarSign className="h-4 w-4 text-[#0D4A7A]" />
                  Salario
                </label>
                <select
                  value={selectedSalary}
                  onChange={(e) => setSelectedSalary(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0D4A7A] focus:border-[#0D4A7A] transition-colors bg-white"
                >
                  <option value="">Todos los salarios</option>
                  {uniqueSalaries.map((salary) => (
                    <option key={salary} value={salary}>
                      {salary}
                    </option>
                  ))}
                </select>
              </div>

              {/* Filtro por cargo */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Briefcase className="h-4 w-4 text-[#0D4A7A]" />
                  Cargo
                </label>
                <select
                  value={selectedCargo}
                  onChange={(e) => setSelectedCargo(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0D4A7A] focus:border-[#0D4A7A] transition-colors bg-white"
                >
                  <option value="">Todos los cargos</option>
                  {uniqueCargos.map((cargo) => (
                    <option key={cargo} value={cargo}>
                      {cargo}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Indicadores de filtros activos */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2 mb-4">
            {searchTerm && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                Búsqueda: &quot;{searchTerm}&quot;
                <button onClick={() => setSearchTerm('')} className="ml-1 hover:text-blue-600">
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {selectedCompany && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                Empresa: {selectedCompany}
                <button onClick={() => setSelectedCompany('')} className="ml-1 hover:text-green-600">
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {selectedSalary && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                Salario: {selectedSalary}
                <button onClick={() => setSelectedSalary('')} className="ml-1 hover:text-yellow-600">
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {selectedCargo && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                Cargo: {selectedCargo}
                <button onClick={() => setSelectedCargo('')} className="ml-1 hover:text-purple-600">
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
          </div>
        )}
      </div>

      {/* Resultados */}
      {filteredAndSortedVacantes.length === 0 ? (
        <div className="text-center py-12 px-4 md:px-12">
          <div className="max-w-md mx-auto">
            <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No se encontraron vacantes
            </h3>
            <p className="text-gray-500 mb-4">
              {hasActiveFilters 
                ? "Intenta ajustar los filtros o términos de búsqueda."
                : "No hay vacantes disponibles en este momento."
              }
            </p>
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="px-4 py-2 bg-[#0D4A7A] text-white rounded-lg hover:bg-[#1161A9] transition-colors"
              >
                Limpiar filtros
              </button>
            )}
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-12">
            {currentVacantes.map((v) => (
              <div key={v.id} className="w-full max-w-md border-2 border-[#0D4A7A] rounded-2xl bg-white p-6 shadow-md flex flex-col gap-1.5 relative mx-auto min-h-[220px] hover:shadow-lg transition-shadow">
                <div className="font-semibold text-lg text-[#0D4A7A] break-words mb-1">{v.empresa}</div>
                <div className="text-xs text-gray-500 mb-1">{v.descripcion}</div>
                <div className="text-sm text-gray-700 mb-1"><b>Cargo:</b> {v.cargo}</div>
                <div className="text-sm text-gray-700 mb-1"><b>Salario:</b> {v.salario || 'No especificado'}</div>
                <div className="text-sm text-gray-700 mb-1"><b>Email:</b> {v.email || 'No especificado'}</div>
                <div className="text-sm text-gray-700 mb-1"><b>Number of Workers Requested:</b> {v.workers || 'No especificado'}</div>
                <div className="mb-2 flex items-center gap-2">
                  <a href={v.link || '#'} target="_blank" rel="noopener noreferrer" className="ml-1 flex items-center group">
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="11" cy="11" r="11" fill="#22c55e"/>
                      <path d="M8 11h6m0 0l-2.5-2.5M14 11l-2.5 2.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                  <Link
                    href={`/postulacion?vacante=${v.id}`}
                    className="px-6 py-2 rounded-lg font-bold text-white bg-[#0D4A7A] hover:bg-[#1161A9] transition-colors text-base mt-2"
                    style={{display: 'inline-block'}}
                  >
                    Postular ahora
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Paginación */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-8 px-4 md:px-12">
              <nav className="flex items-center gap-2">
                {/* Botón anterior */}
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="flex items-center gap-1 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Anterior
                </button>

                {/* Números de página */}
                <div className="flex items-center gap-1">
                  {getPageNumbers().map((page, index) => (
                    <button
                      key={index}
                      onClick={() => typeof page === 'number' && setCurrentPage(page)}
                      disabled={page === '...'}
                      className={`px-3 py-2 border rounded-lg ${
                        page === currentPage
                          ? 'bg-[#0D4A7A] text-white border-[#0D4A7A]'
                          : page === '...'
                          ? 'border-gray-300 text-gray-500 cursor-not-allowed'
                          : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                {/* Botón siguiente */}
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-1 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Siguiente
                  <ChevronRight className="h-4 w-4" />
                </button>
              </nav>
            </div>
          )}
        </>
      )}
    </section>
  );
} 