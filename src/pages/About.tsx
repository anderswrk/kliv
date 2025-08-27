import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useTranslation } from 'react-i18next';

export function About() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-100 via-slate-100 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-600 py-20">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white">
              {t('aboutPage.title')}
            </h1>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-20 max-w-4xl">
          <div className="space-y-12">
            {/* Founder's Note */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {t('aboutPage.foundersNote.title')}
              </h2>
              <div className="flex flex-col lg:flex-row gap-8 items-start">
                {/* Founder Photo */}
                <div className="flex-shrink-0">
                  <div className="w-48 h-48 rounded-lg overflow-hidden shadow-lg">
                    <img 
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
                      alt={t('aboutPage.foundersNote.founderAlt')}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                {/* Note Content */}
                <div className="flex-1 text-gray-700 dark:text-gray-300 space-y-4">
                  <p>{t('aboutPage.foundersNote.paragraph1')}</p>
                  <p>{t('aboutPage.foundersNote.paragraph2')}</p>
                  <p>{t('aboutPage.foundersNote.paragraph3')}</p>
                  <p>{t('aboutPage.foundersNote.paragraph4')}</p>
                  <p>{t('aboutPage.foundersNote.paragraph5')}</p>
                  <p>{t('aboutPage.foundersNote.paragraph6')}</p>
                  
                  {/* Signature */}
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-gray-900 dark:text-white font-medium">
                      {t('aboutPage.foundersNote.signature')}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* What is Kliv */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {t('aboutPage.whatIsKliv.title')}
              </h2>
              <div className="text-gray-700 dark:text-gray-300 space-y-4">
                <p>{t('aboutPage.whatIsKliv.paragraph1')}</p>
                <p>{t('aboutPage.whatIsKliv.paragraph2')}</p>
              </div>
            </section>

            {/* Where we're going */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {t('aboutPage.whereWereGoing.title')}
              </h2>
              <div className="text-gray-700 dark:text-gray-300 space-y-4">
                <p>{t('aboutPage.whereWereGoing.paragraph1')}</p>
                <p>{t('aboutPage.whereWereGoing.listIntro')}</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>{t('aboutPage.whereWereGoing.features.backgroundJobs')}</li>
                  <li>{t('aboutPage.whereWereGoing.features.queuesWorkers')}</li>
                  <li>{t('aboutPage.whereWereGoing.features.apiEndpoints')}</li>
                  <li>{t('aboutPage.whereWereGoing.features.workflows')}</li>
                  <li>{t('aboutPage.whereWereGoing.features.backendLogic')}</li>
                  <li>{t('aboutPage.whereWereGoing.features.dataPipelines')}</li>
                  <li>{t('aboutPage.whereWereGoing.features.permissions')}</li>
                  <li>{t('aboutPage.whereWereGoing.features.infrastructure')}</li>
                </ul>
                <p>{t('aboutPage.whereWereGoing.paragraph2')}</p>
              </div>
            </section>

            {/* Investors */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {t('aboutPage.investors.title')}
              </h2>
              <div className="text-gray-700 dark:text-gray-300 space-y-4">
                <p>{t('aboutPage.investors.paragraph1')}</p>
                <p>
                  {t('aboutPage.investors.paragraph2')}{' '}
                  <a 
                    href="https://rational.ventures/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {t('aboutPage.investors.rationalVentures')}
                  </a>
                  {t('aboutPage.investors.paragraph2Suffix')}
                </p>
                <p>
                  {t('aboutPage.investors.paragraph3')}{' '}
                  <a 
                    href="mailto:hello@kliv.dev"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    hello@kliv.dev
                  </a>
                  {t('aboutPage.investors.paragraph3Suffix')}
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}