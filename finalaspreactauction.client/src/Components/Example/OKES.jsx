import {
    Zap,
    Github,
    Twitter,
    Linkedin,
    Copyright,
} from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-5">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center space-x-2">
                        <Zap className="h-8 w-8 text-indigo-400" />
                        <span className="text-2xl font-bold">Auction</span>
                    </div>

                    <nav className="flex flex-wrap justify-center gap-6 text-sm">
                        <a href="#features" className="hover:text-indigo-400 transition-colors">Features</a>
                        <a href="#about" className="hover:text-indigo-400 transition-colors">About</a>
                        <a href="#contact" className="hover:text-indigo-400 transition-colors">Contact</a>
                    </nav>

                    <div className="flex space-x-4">
                        <a href="#" aria-label="GitHub" className="hover:text-indigo-400 transition-colors">
                            <Github className="h-6 w-6" />
                        </a>
                        <a href="#" aria-label="Twitter" className="hover:text-indigo-400 transition-colors">
                            <Twitter className="h-6 w-6" />
                        </a>
                        <a href="#" aria-label="LinkedIn" className="hover:text-indigo-400 transition-colors">
                            <Linkedin className="h-6 w-6" />
                        </a>
                    </div>
                </div>

                {/* Bottom Text */}
                <div className="border-t border-gray-800 mt-8 pt-6 text-center text-sm text-gray-400">
                    <p className="flex justify-center items-center gap-1">
                        <Copyright className="h-4 w-4" />
                        {new Date().getFullYear()} Auction. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
