'use client';

import Link from "next/link";
import { useTranslations } from "@/hooks/useLanguage";
import React from "react";

export default function AboutPage() {
  const t = useTranslations();

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 space-y-8">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="urdu urdu-heading text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
          {t.about.header}
        </h1>
        <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-red-800 mx-auto rounded-full"></div>
      </div>

      {/* Main Content */}
      <div className="space-y-8">
        {/* Introduction */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
          <p 
            className="text-xl leading-relaxed text-gray-200"
            dangerouslySetInnerHTML={{ __html: t.about.introduction }}
          />
        </div>

        {/* Problem Statement */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
          <p className="text-lg text-gray-300 leading-relaxed">
            {t.about.problemStatement}
          </p>
        </div>

        {/* Quote */}
        <blockquote className="border-l-4 border-red-500 pl-6 py-4 italic text-gray-300 text-lg bg-gradient-to-r from-red-900/20 to-transparent rounded-r-2xl">
          {t.about.quote}
        </blockquote>

        {/* Principles */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-red-400 mb-6">
            {t.about.principlesTitle}
          </h2>
          <p className="text-lg text-gray-300 mb-6">
            {t.about.principlesDescription}
          </p>
          
          <ul className="space-y-4">
            {t.about.principles.map((principle: { title: string, description: string }, index: number) => (
              <li key={index} className="flex items-start gap-4">
                <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <span className="text-gray-200">
                  <strong className="text-red-300">{principle.title}</strong> — {principle.description}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Mission */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
          <p className="text-lg text-gray-300 leading-relaxed">
            {t.about.mission}
          </p>
        </div>

        {/* Urdu Calligraphy */}
        <div className="text-center py-8">
          <p className="font-urdu text-3xl md:text-4xl text-red-300 mb-4">
            {t.about.urduCalligraphy}
          </p>
          <p className="text-gray-400 text-sm">
            {t.about.urduCalligraphyTranslation}
          </p>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-red-900/30 to-red-800/20 border border-red-700/30 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-red-300 mb-4">
            {t.about.ctaTitle}
          </h3>
          <p className="text-gray-300 mb-6">
            {t.about.ctaDescription}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="px-8 py-3 bg-gradient-to-r from-red-700 to-red-800 text-white rounded-xl font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 border border-red-600/30"
            >
              {t.about.startLearning}
            </Link>
            <Link
              href="/contribute"
              className="px-8 py-3 border border-red-600/50 text-red-400 rounded-xl font-semibold hover:bg-red-900/30 transition-all duration-300 transform hover:scale-105"
            >
              {t.about.contribute}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}