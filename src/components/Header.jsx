import React from 'react';
import DarkModeToggle from './DarkModeToggle';

const Header = ({ contactCount, onAddClick }) => {
    return (
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
                {/* Mobile Layout */}
                <div className="flex flex-col gap-3 sm:hidden">
                    {/* Top row - Logo and Title */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-2">
                                <svg
                                    className="w-6 h-6 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                    />
                                </svg>
                            </div>
                            <div>
                                <h1 className="text-lg font-bold text-gray-900 dark:text-white">Contacts</h1>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{contactCount} contacts</p>
                            </div>
                        </div>
                        <DarkModeToggle />
                    </div>

                    {/* Bottom row - Add Button (Full Width) */}
                    <button
                        onClick={onAddClick}
                        className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 4v16m8-8H4"
                            />
                        </svg>
                        <span className="font-medium">Add Contact</span>
                    </button>
                </div>

                {/* Desktop Layout */}
                <div className="hidden sm:flex items-center justify-between">
                    {/* Logo and Title */}
                    <div className="flex items-center gap-3">
                        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-2">
                            <svg
                                className="w-8 h-8 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Contacts</h1>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{contactCount} contacts</p>
                        </div>
                    </div>

                    {/* Right Side - Dark Mode Toggle and Add Button */}
                    <div className="flex items-center gap-4">
                        <DarkModeToggle />
                        <button
                            onClick={onAddClick}
                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
                        >
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 4v16m8-8H4"
                                />
                            </svg>
                            <span className="font-medium">Add Contact</span>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
