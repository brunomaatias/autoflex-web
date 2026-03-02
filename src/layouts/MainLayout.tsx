import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Package, Droplets, Factory, LayoutDashboard, ChevronRight, Menu, X, Github } from "lucide-react";

export default function MainLayout({ children }: { children: React.ReactNode }) {
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const isActive = (path: string) => location.pathname === path;

    const navItems = [
        { name: "Products", path: "/", icon: Package },
        { name: "Raw Materials", path: "/raw-materials", icon: Droplets },
        { name: "Production", path: "/production-plans", icon: Factory },
    ];

    return (
        <div className="min-h-screen flex flex-col bg-slate-100 font-sans">
            <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-40 shadow-sm">
                <div className="flex items-center gap-2">
                    <div className="bg-blue-600 p-1.5 rounded-lg shadow-lg shadow-red-200">
                        <LayoutDashboard className="text-white w-5 h-5" />
                    </div>
                    <h1 className="text-xl font-extrabold tracking-tight text-slate-800">
                        Auto<span className="text-blue-600">Flex</span>
                    </h1>
                </div>

                <div className="flex items-center gap-2">
                    <a href="https://github.com/brunomaatias/autoflex-web"
                        target="_blank" rel="noopener noreferrer" title="FrontEnd Source Code"
                        className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-600 hover:text-green-600 hover:bg-blue-50 rounded-lg transition-all duration-200">
                        <Github className="w-5 h-5" />
                    </a>

                    <a href="https://github.com/brunomaatias/autoflex-api"
                        target="_blank" rel="noopener noreferrer" title="BackEnd Source Code"
                        className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-600 hover:text-red-600 hover:bg-blue-50 rounded-lg transition-all duration-200">
                        <Github className="w-5 h-5" />
                    </a>

                    <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-md transition-colors">
                        {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-md transition-colors">
                    {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </header>

            <div className="flex flex-1 overflow-hidden relative">
                {isSidebarOpen && (
                    <div
                        className="fixed inset-0 bg-slate-900/60 z-40 lg:hidden backdrop-blur-sm transition-opacity"
                        onClick={() => setIsSidebarOpen(false)}
                    />
                )}

                <aside className={`
          fixed lg:static inset-y-0 left-0 z-50 w-72 bg-gray-200 flex flex-col 
          transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>

                    <div className="p-4">
                        <div className="flex items-center justify-between mb-4">
                            <p className="text-xs font-semibold text-slate-700 uppercase tracking-widest">
                                Menu
                            </p>
                            <button
                                onClick={() => setIsSidebarOpen(false)}
                                className="lg:hidden text-slate-400 hover:text-white p-1" >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <nav className="flex flex-col space-y-2">
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                const active = isActive(item.path);

                                return (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        onClick={() => setIsSidebarOpen(false)}
                                        className={`group flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
                                            ${active ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20" : "text-slate-600 hover:bg-blue-500 hover:text-white"}`}>

                                        <div className="flex items-center gap-3">
                                            <Icon className={`w-5 h-5 ${active ? "text-white" : "group-hover:text-gray-200 transition-colors"}`} />
                                            {item.name}
                                        </div>

                                        {active && <ChevronRight className="w-4 h-4 text-white/70" />}
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>

                    <div className="mt-auto p-4 border-t border-slate-200">
                        <div className="bg-blue-200 rounded-lg p-3 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
                                BM
                            </div>
                            <div className="overflow-hidden">
                                <a target="_blank" href="https://github.com/brunomaatias"
                                    className="text-sm font-medium text-white-600 truncate no-underline hover:underline">
                                    Bruno Matias
                                </a>
                                <p className="text-xs text-slate-800">Developer</p>
                            </div>
                        </div>
                    </div>
                </aside>

                <main className="flex-1 overflow-y-auto bg-slate-50 w-full">
                    <div className="max-w-10xl mx-auto w-full px-4 sm:px-8 py-6 sm:py-10">
                        {children}
                    </div>
                </main>

            </div>

            <footer className="bg-white border-t border-slate-200 py-3 px-4 sm:px-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-tighter relative z-10">
                <span>© 2026 AutoFlex System</span>
                <span className="text-slate-300">Bruno Matias</span>
            </footer>
        </div>
    );
}