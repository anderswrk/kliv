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
              <div className="text-gray-700 dark:text-gray-300 space-y-4">
                <p>{t('aboutPage.foundersNote.paragraph1')}</p>
                <p>{t('aboutPage.foundersNote.paragraph2')}</p>
                <p>{t('aboutPage.foundersNote.paragraph3')}</p>
                <p>{t('aboutPage.foundersNote.paragraph4')}</p>
                <p>{t('aboutPage.foundersNote.paragraph5')}</p>
                <p>{t('aboutPage.foundersNote.paragraph6')}</p>
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
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}