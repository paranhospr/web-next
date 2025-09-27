
import Link from "next/link";
import { MapPin, ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <MapPin className="h-6 w-6 text-blue-400" />
              <span className="font-bold text-xl">Paranhos PR</span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Portal institucional dos territórios e municípios de Paranhos PR
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Navegação</h3>
            <div className="space-y-2">
              <Link href="/territorios" className="block text-gray-300 hover:text-white transition-colors">
                Territórios
              </Link>
              <Link href="/municipios" className="block text-gray-300 hover:text-white transition-colors">
                Municípios
              </Link>
              <Link href="/agenda" className="block text-gray-300 hover:text-white transition-colors">
                Agenda
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Status</h3>
            <div className="space-y-2">
              <a
                href="https://api.paranhospr.com.br/health"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-gray-300 hover:text-white transition-colors"
              >
                Status da API
                <ExternalLink className="w-4 h-4 ml-1" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Paranhos PR - Todos os direitos reservados</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
